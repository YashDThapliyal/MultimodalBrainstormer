import { motion, AnimatePresence } from 'framer-motion';
import { Palette } from 'lucide-react';
import { useState } from 'react';
import useStore from '../store';
import { THEMES } from '../themes';

function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useStore();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2 font-semibold"
        title="Change theme"
      >
        <Palette size={20} />
        Theme
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 p-2 z-50 min-w-[180px]"
          >
            {Object.values(THEMES).map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all text-sm font-medium flex items-center gap-3 ${
                  theme === t.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <span className="text-xl">{t.icon}</span>
                <span>{t.name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ThemeSwitcher;
