import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, ChevronRight, ChevronLeft, Lightbulb, TrendingUp, HelpCircle, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import useStore from '../store';
import { generateSummary, chatWithClaude } from '../services/ai';
import { getTheme } from '../themes';

const EXAMPLE_PROMPTS = [
  { icon: TrendingUp, text: 'What are the main themes?' },
  { icon: HelpCircle, text: "What's missing from this brainstorm?" },
  { icon: Lightbulb, text: 'Suggest 3 new ideas I should add' },
  { icon: Zap, text: 'What connections am I missing?' },
];

// Parse action suggestions from AI response
function parseActionSuggestions(content) {
  const suggestions = [];

  // Match "→ Add idea:" patterns
  const addIdeaRegex = /\*\*→ Add idea:\*\*\s*(.+?)(?=\n|$)/gi;
  let match;
  while ((match = addIdeaRegex.exec(content)) !== null) {
    suggestions.push({
      type: 'add_idea',
      description: match[1].trim(),
    });
  }

  // Match "→ Connect:" patterns
  const connectRegex = /\*\*→ Connect:\*\*\s*\[?(node-[^\]]+)\]?\s*↔\s*\[?(node-[^\]]+)\]?\s*-\s*(.+?)(?=\n|$)/gi;
  while ((match = connectRegex.exec(content)) !== null) {
    suggestions.push({
      type: 'connect',
      sourceId: match[1].trim(),
      targetId: match[2].trim(),
      reasoning: match[3].trim(),
    });
  }

  return suggestions;
}

function Sidebar() {
  const {
    isSidebarOpen,
    toggleSidebar,
    nodes,
    edges,
    messages,
    addMessage,
    summary,
    setSummary,
    addNode,
    addEdge,
    theme: currentTheme,
  } = useStore();

  const theme = getTheme(currentTheme);

  const [input, setInput] = useState('');
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [isChatting, setIsChatting] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleGenerateSummary = async () => {
    setIsGeneratingSummary(true);

    try {
      const newSummary = await generateSummary(nodes, edges);
      setSummary(newSummary);
    } catch (error) {
      console.error('Failed to generate summary:', error);
      setSummary('Failed to generate summary. Check your API key and try again.');
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  const handleSendMessage = async (messageText = input) => {
    const userMessage = messageText.trim();
    if (!userMessage || isChatting) return;

    setInput('');
    addMessage({ role: 'user', content: userMessage });
    setIsChatting(true);

    try {
      const previousMessages = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const response = await chatWithClaude(userMessage, nodes, edges, previousMessages);
      addMessage({ role: 'assistant', content: response });
    } catch (error) {
      console.error('Failed to chat:', error);
      addMessage({
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please check your API key and try again.',
      });
    } finally {
      setIsChatting(false);
    }
  };

  const handlePromptClick = (promptText) => {
    if (nodes.length === 0) {
      alert('Add some ideas first to use the AI chat!');
      return;
    }
    handleSendMessage(promptText);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Handle applying AI suggestions
  const handleApplySuggestion = (suggestion) => {
    if (suggestion.type === 'add_idea') {
      // Find a good position for the new node (slightly offset from center)
      const randomOffset = () => Math.random() * 200 - 100;
      const newNode = {
        id: `node-${Date.now()}`,
        type: 'textNode',
        position: {
          x: 400 + randomOffset(),
          y: 300 + randomOffset(),
        },
        data: {
          label: suggestion.description,
          category: null,
          size: 'medium',
        },
      };
      addNode(newNode);

      // Add a message confirming the action
      addMessage({
        role: 'assistant',
        content: `✅ Added new idea: "${suggestion.description}"`,
      });
    } else if (suggestion.type === 'connect') {
      // Create connection between two nodes
      const sourceExists = nodes.find(n => n.id === suggestion.sourceId);
      const targetExists = nodes.find(n => n.id === suggestion.targetId);

      if (sourceExists && targetExists) {
        const newEdge = {
          id: `edge-suggestion-${Date.now()}`,
          source: suggestion.sourceId,
          target: suggestion.targetId,
          type: 'custom',
          data: { isAI: true, reasoning: suggestion.reasoning },
          markerEnd: {
            type: 'arrowclosed',
            width: 20,
            height: 20,
          },
        };
        addEdge(newEdge);

        addMessage({
          role: 'assistant',
          content: `✅ Connected ideas: ${sourceExists.data.label} ↔ ${targetExists.data.label}`,
        });
      } else {
        addMessage({
          role: 'assistant',
          content: '❌ Could not find the specified nodes to connect.',
        });
      }
    }
  };

  if (!isSidebarOpen) {
    return (
      <motion.button
        initial={{ x: 50 }}
        animate={{ x: 0 }}
        onClick={toggleSidebar}
        className="fixed right-0 top-1/2 -translate-y-1/2 bg-gradient-to-br from-blue-500 to-blue-600 text-white p-3 rounded-l-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all z-10"
        title="Open AI Assistant"
      >
        <ChevronLeft size={24} />
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ x: 400 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`fixed right-0 top-0 h-full w-96 ${theme.ui.sidebar} border-l ${theme.ui.border} shadow-2xl flex flex-col z-10`}
    >
      {/* Header */}
      <div className={`flex items-center justify-between p-5 border-b ${theme.ui.border} ${theme.ui.panel}`}>
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg">
            <Sparkles size={20} className="text-white" />
          </div>
          <h2 className={`text-lg font-bold ${theme.ui.text}`}>AI Assistant</h2>
        </div>
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-700/10 rounded-lg transition-colors"
          title="Close sidebar"
        >
          <ChevronRight size={20} className={theme.ui.text} />
        </button>
      </div>

      {/* Summary Section */}
      <div className={`border-b ${theme.ui.border} p-5 ${theme.ui.panel}`}>
        <div className="flex items-center justify-between mb-3">
          <h3 className={`font-bold ${theme.ui.text} flex items-center gap-2`}>
            <TrendingUp size={18} className="text-purple-500" />
            Summary
          </h3>
          <button
            onClick={handleGenerateSummary}
            disabled={isGeneratingSummary || nodes.length === 0}
            className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-1.5"
          >
            <Sparkles size={14} className={isGeneratingSummary ? 'animate-spin' : ''} />
            {isGeneratingSummary ? 'Generating...' : 'Generate'}
          </button>
        </div>

        <div className={`text-sm ${theme.ui.textSecondary} ${theme.ui.panel} rounded-xl p-4 max-h-52 overflow-y-auto border ${theme.ui.border} leading-relaxed`}>
          {summary || (
            <span className={`${theme.ui.textSecondary} italic`}>
              Click "Generate" to create an AI summary of your brainstorm.
            </span>
          )}
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className={`p-5 border-b ${theme.ui.border} ${theme.ui.panel}`}>
          <h3 className={`font-bold ${theme.ui.text} flex items-center gap-2`}>
            <Lightbulb size={18} className="text-blue-500" />
            Chat
          </h3>
          <p className={`text-xs ${theme.ui.textSecondary} mt-1`}>Ask questions about your brainstorm</p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center mt-4">
              <p className={`text-sm font-medium ${theme.ui.textSecondary} mb-4`}>Try these prompts:</p>
              <div className="space-y-2">
                {EXAMPLE_PROMPTS.map((prompt, idx) => {
                  const Icon = prompt.icon;
                  return (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handlePromptClick(prompt.text)}
                      disabled={nodes.length === 0}
                      className={`w-full flex items-center gap-3 px-4 py-3 ${theme.ui.panel} border-2 ${theme.ui.border} hover:border-blue-300 rounded-xl text-sm font-medium ${theme.ui.text} hover:text-blue-600 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      <Icon size={16} className="text-blue-500" />
                      <span className="text-left">{prompt.text}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          ) : (
            <>
              <AnimatePresence>
                {messages.map((msg, idx) => {
                  const suggestions = msg.role === 'assistant' ? parseActionSuggestions(msg.content) : [];

                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} gap-2`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-md ${
                          msg.role === 'user'
                            ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
                            : `${theme.ui.panel} ${theme.ui.text} border ${theme.ui.border}`
                        }`}
                      >
                        {msg.role === 'user' ? (
                          <p className="whitespace-pre-wrap break-words leading-relaxed">{msg.content}</p>
                        ) : (
                          <div className="prose prose-sm max-w-none">
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={{
                                // Style markdown elements
                                p: ({node, ...props}) => <p className="mb-2 last:mb-0 leading-relaxed" {...props} />,
                                ul: ({node, ...props}) => <ul className="mb-2 ml-4 list-disc" {...props} />,
                                ol: ({node, ...props}) => <ol className="mb-2 ml-4 list-decimal" {...props} />,
                                li: ({node, ...props}) => <li className="mb-1" {...props} />,
                                strong: ({node, ...props}) => <strong className="font-bold text-gray-900" {...props} />,
                                em: ({node, ...props}) => <em className="italic" {...props} />,
                                code: ({node, inline, ...props}) =>
                                  inline ? (
                                    <code className="bg-gray-100 px-1 py-0.5 rounded text-xs font-mono" {...props} />
                                  ) : (
                                    <code className="block bg-gray-100 p-2 rounded text-xs font-mono overflow-x-auto" {...props} />
                                  ),
                                h1: ({node, ...props}) => <h1 className="text-lg font-bold mb-2" {...props} />,
                                h2: ({node, ...props}) => <h2 className="text-base font-bold mb-2" {...props} />,
                                h3: ({node, ...props}) => <h3 className="text-sm font-bold mb-2" {...props} />,
                              }}
                            >
                              {msg.content}
                            </ReactMarkdown>
                          </div>
                        )}
                      </div>

                      {/* Action buttons for suggestions */}
                      {suggestions.length > 0 && (
                        <div className="flex flex-wrap gap-2 max-w-[85%]">
                          {suggestions.map((suggestion, sIdx) => (
                            <motion.button
                              key={sIdx}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleApplySuggestion(suggestion)}
                              className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
                            >
                              <span>✨</span>
                              <span>
                                {suggestion.type === 'add_idea' ? 'Add this idea' : 'Make connection'}
                              </span>
                            </motion.button>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              {isChatting && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className={`${theme.ui.panel} border ${theme.ui.border} rounded-2xl px-4 py-3 shadow-md`}>
                    <div className="flex gap-1">
                      <motion.span
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                        className="w-2 h-2 bg-blue-500 rounded-full"
                      />
                      <motion.span
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.1 }}
                        className="w-2 h-2 bg-blue-500 rounded-full"
                      />
                      <motion.span
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                        className="w-2 h-2 bg-blue-500 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input */}
        <div className={`p-5 border-t ${theme.ui.border} ${theme.ui.panel}`}>
          <div className="flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about your ideas..."
              rows={2}
              disabled={isChatting}
              className={`flex-1 px-4 py-3 text-sm border-2 ${theme.ui.border} rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 transition-all ${theme.ui.input}`}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!input.trim() || isChatting}
              className="px-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center"
              title="Send message"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Sidebar;
