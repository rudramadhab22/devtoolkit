import React from 'react';

const ToolCard = ({ tool }) => {
  const Icon = tool.icon;

  return (
    <div className="group flex flex-col h-full bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative">

      {/* Coming Soon Badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
          Coming Phase 2
        </span>
      </div>

      <div className="p-6 flex-grow">
        <div className="w-12 h-12 rounded-lg bg-gray-50 dark:bg-gray-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-gray-100 dark:border-gray-800">
          <Icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </div>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {tool.name}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {tool.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {tool.tags.map(tag => (
            <span key={tag} className="inline-flex text-xs px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 mt-auto">
        <span className="text-sm font-medium text-blue-600 dark:text-blue-400 flex items-center">
          Explore Tool
          <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default ToolCard;