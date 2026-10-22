import React, { useState } from 'react';
import ToolLayout from './ToolLayout';

const JsonFormatterPage = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAction = async (action) => {
    if (!input.trim()) {
      setError('Input cannot be empty');
      setOutput('');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/v1/tools/json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: input, action })
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setOutput(data.data);
      } else {
        setError(data.error || data.message || 'An error occurred');
        setOutput('');
      }
    } catch (err) {
      setError('Failed to connect to the server');
      setOutput('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="JSON Formatter & Validator"
      description="Format, minify, and validate JSON payloads instantly."
    >
      <div className="p-6 space-y-4">
        {error && (
          <div className="p-3 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Input JSON</label>
            <textarea
              className="w-full h-96 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-none"
              placeholder="Paste your JSON here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Output</label>
            <textarea
              className="w-full h-96 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg font-mono text-sm resize-none"
              readOnly
              value={output}
              placeholder="Result will appear here..."
            />
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => handleAction('PRETTIFY')}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50 transition-colors"
          >
            {loading ? 'Processing...' : 'Prettify'}
          </button>
          <button
            onClick={() => handleAction('MINIFY')}
            disabled={loading}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-medium disabled:opacity-50 transition-colors"
          >
            Minify
          </button>
        </div>
      </div>
    </ToolLayout>
  );
};

export default JsonFormatterPage;