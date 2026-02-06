import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true, // Note: In production, use a backend proxy
});

const MODEL = 'claude-sonnet-4-5-20250929';

/**
 * Analyze nodes and suggest semantic connections
 */
export async function suggestConnections(nodes) {
  if (nodes.length < 2) {
    return [];
  }

  const nodeList = nodes
    .map((node) => {
      if (node.type === 'imageNode') {
        // For image nodes, include the analysis
        const content = node.data.editedContent || node.data.analysis || 'Image (analyzing...)';
        return `[${node.id}] IMAGE NODE: ${content.substring(0, 200)}...`;
      } else {
        // For text nodes
        return `[${node.id}] ${node.data.label}`;
      }
    })
    .join('\n');

  const prompt = `You are analyzing a brainstorming session. Here are the current ideas:

${nodeList}

Identify semantic relationships between these ideas. Look for:
- Direct relationships (cause-effect, part-whole)
- Thematic connections (similar topics, complementary ideas)
- Non-obvious conceptual links (deeper patterns, analogies)

For each suggested connection, provide:
1. Source node ID
2. Target node ID
3. Brief reasoning (1 short sentence)

Respond ONLY with a JSON array of connections:
[
  {
    "source": "node-id-1",
    "target": "node-id-2",
    "reasoning": "Brief explanation"
  }
]

Suggest 3-8 meaningful connections. Focus on quality over quantity.`;

  try {
    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const responseText = message.content[0].text;

    // Extract JSON from response (handle potential markdown code blocks)
    const jsonMatch = responseText.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      console.error('No JSON found in response:', responseText);
      return [];
    }

    const connections = JSON.parse(jsonMatch[0]);

    // Validate connections
    const nodeIds = new Set(nodes.map(n => n.id));
    return connections.filter(
      (conn) => nodeIds.has(conn.source) && nodeIds.has(conn.target)
    );
  } catch (error) {
    console.error('Error suggesting connections:', error);
    throw error;
  }
}

/**
 * Generate a summary of all brainstormed content
 */
export async function generateSummary(nodes, edges) {
  if (nodes.length === 0) {
    return 'Your braindump is empty. Start adding ideas to see a summary!';
  }

  const nodeList = nodes.map((node) => {
    if (node.type === 'imageNode') {
      const content = node.data.editedContent || node.data.analysis || 'Image (analyzing...)';
      return `- [IMAGE] ${content.substring(0, 150)}...`;
    } else {
      return `- ${node.data.label}`;
    }
  }).join('\n');

  const edgeList = edges.length > 0
    ? edges
        .map((edge) => {
          const source = nodes.find(n => n.id === edge.source);
          const target = nodes.find(n => n.id === edge.target);
          const sourceLabel = source?.type === 'imageNode'
            ? '[IMAGE]'
            : source?.data.label;
          const targetLabel = target?.type === 'imageNode'
            ? '[IMAGE]'
            : target?.data.label;
          return `  • "${sourceLabel}" → "${targetLabel}"`;
        })
        .join('\n')
    : '  (No connections yet)';

  const prompt = `You are analyzing a brainstorming session. Here's what has been brainstormed:

Ideas:
${nodeList}

Connections:
${edgeList}

Provide a concise summary (2-4 paragraphs) covering:
1. Main themes and patterns
2. Key ideas and their relationships
3. Potential areas for further exploration
4. Any gaps or questions that emerge

Be insightful and help the user see the big picture of their thinking.`;

  try {
    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    return message.content[0].text;
  } catch (error) {
    console.error('Error generating summary:', error);
    throw error;
  }
}

/**
 * Chat with Claude about the brainstorm
 */
export async function chatWithClaude(userMessage, nodes, edges, previousMessages = []) {
  const nodeList = nodes.map((node) => {
    if (node.type === 'imageNode') {
      const content = node.data.editedContent || node.data.analysis || 'Image (analyzing...)';
      return `- [${node.id}] IMAGE NODE: ${content}`;
    } else {
      return `- [${node.id}] ${node.data.label}`;
    }
  }).join('\n');

  const edgeList = edges.length > 0
    ? edges
        .map((edge) => {
          const source = nodes.find(n => n.id === edge.source);
          const target = nodes.find(n => n.id === edge.target);
          const sourceLabel = source?.type === 'imageNode'
            ? '[IMAGE]'
            : source?.data.label;
          const targetLabel = target?.type === 'imageNode'
            ? '[IMAGE]'
            : target?.data.label;
          const reasoning = edge.data?.reasoning ? ` (${edge.data.reasoning})` : '';
          return `  • "${sourceLabel}" → "${targetLabel}"${reasoning}`;
        })
        .join('\n')
    : '  (No connections yet)';

  const context = `Current brainstorm content:

Ideas:
${nodeList}

Connections:
${edgeList}

---

You are an AI assistant helping someone organize and explore their thoughts. Answer their questions about the brainstorm, suggest expansions, identify patterns, and help them think more deeply about their ideas.

When suggesting new ideas or expansions, you can provide specific actionable suggestions by using this format:
**→ Add idea:** [Brief description of the idea to add]

When suggesting connections between existing ideas, use:
**→ Connect:** [node-id-1] ↔ [node-id-2] - [Brief reasoning]

The user can then click to apply your suggestions directly to their brainstorm.`;

  const messages = [
    {
      role: 'user',
      content: context,
    },
    {
      role: 'assistant',
      content: 'I understand the current brainstorm. How can I help you explore these ideas?',
    },
    ...previousMessages,
    {
      role: 'user',
      content: userMessage,
    },
  ];

  try {
    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 2048,
      messages,
    });

    return message.content[0].text;
  } catch (error) {
    console.error('Error chatting with Claude:', error);
    throw error;
  }
}

/**
 * Analyze image with Claude Vision API
 */
export async function analyzeImage(imageBase64, mediaType) {
  const prompt = `Analyze this image for a brainstorming application. If there is handwritten text, transcribe it exactly. Identify key objects, concepts, ideas, or diagrams present. Extract all text you can find.

Provide a structured breakdown in this format:

**Transcribed Text:** [If handwriting exists, transcribe it exactly. Otherwise write "None"]

**Key Objects/Concepts:** [List main objects, concepts, or ideas you identify - be specific]

**Diagrams/Relationships:** [If there are diagrams, flowcharts, or visual relationships, describe them. Otherwise write "None"]

**Summary:** [One paragraph overall summary of what this image represents and how it could be used in brainstorming]

Be thorough but concise. Focus on extracting actionable ideas and content that would be useful for connecting to other brainstorming nodes.`;

  try {
    const message = await anthropic.messages.create({
      model: 'claude-opus-4-5-20251101', // Use Opus for best vision quality
      max_tokens: 1500,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType,
                data: imageBase64,
              },
            },
            {
              type: 'text',
              text: prompt,
            },
          ],
        },
      ],
    });

    return message.content[0].text;
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
}
