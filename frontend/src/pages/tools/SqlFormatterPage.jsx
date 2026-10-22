import React, { useState } from 'react';
import ToolLayout from './ToolLayout';

const SqlFormatterPage = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFormat = async () => {
    if (!input.trim()) {
      setError('Input cannot be empty');
      setOutput('');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/v1/tools/sql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: input })
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
      title="SQL Formatter"
      description="Format unreadable SQL queries into beautifully indented text."
    >
      <div className="p-6 space-y-4">
        {error && (
          <div className="p-3 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Raw SQL</label>
            <textarea
              className="w-full h-[500px] p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-none"
              placeholder="SELECT * FROM users WHERE id=1..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Formatted SQL</label>
            <textarea
              className="w-full h-[500px] p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg font-mono text-sm resize-none"
              readOnly
              value={output}
              placeholder="Formatted result..."
            />
          </div>
        </div>

        <div>
          <button
            onClick={handleFormat}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50 transition-colors"
          >
            {loading ? 'Formatting...' : 'Format SQL'}
          </button>
        </div>
      </div>
    </ToolLayout>
  );
};

export default SqlFormatterPage;