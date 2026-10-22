import React, { useState } from 'react';
import ToolLayout from './ToolLayout';
import { Copy, Check } from 'lucide-react';

const UuidGeneratorPage = () => {
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/v1/tools/uuid?count=${count}`);
      const data = await response.json();

      if (response.ok && data.success) {
        setUuids(data.data);
      } else {
        setError(data.error || data.message || 'An error occurred');
      }
    } catch (err) {
      setError('Failed to connect to the server');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <ToolLayout
      title="UUID Generator"
      description="Generate universally unique identifiers (UUIDs) of version 4."
    >
      <div className="p-6 space-y-6">
        {error && (
          <div className="p-3 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="flex items-center space-x-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium">Quantity to Generate</label>
            <input
              type="number"
              min="1"
              max="500"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value) || 1)}
              className="w-32 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50 transition-colors"
          >
            {loading ? 'Generating...' : 'Generate UUIDs'}
          </button>
        </div>

        {uuids.length > 0 && (
          <div className="space-y-2 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900">
            <div className="max-h-96 overflow-y-auto p-4 space-y-2">
              {uuids.map((uuid, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg shadow-sm">
                  <span className="font-mono text-gray-800 dark:text-gray-200 select-all">{uuid}</span>
                  <button
                    onClick={() => copyToClipboard(uuid, idx)}
                    className="p-2 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none"
                    title="Copy to clipboard"
                  >
                    {copiedIndex === idx ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default UuidGeneratorPage;