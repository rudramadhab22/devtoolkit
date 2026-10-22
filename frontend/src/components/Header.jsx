import React from 'react';
import { Moon, Sun, Github, Wrench } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import HealthStatusBadge from './HealthStatusBadge';

const Header = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
            <Wrench size={28} />
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">DevToolkit</span>
          </div>
          <div className="hidden sm:block">
            <HealthStatusBadge />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
          >
            <Github size={20} />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;