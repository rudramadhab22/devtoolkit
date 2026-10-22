import React, { useState } from 'react';
import ToolLayout from './ToolLayout';

const JwtDecoderPage = () => {
  const [token, setToken] = useState('');
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDecode = async () => {
    if (!token.trim()) {
      setError('Token cannot be empty');
      setHeader('');
      setPayload('');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/v1/tools/jwt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setHeader(JSON.stringify(data.data.header, null, 2));
        setPayload(JSON.stringify(data.data.payload, null, 2));
      } else {
        setError(data.error || data.message || 'An error occurred');
        setHeader('');
        setPayload('');
      }
    } catch (err) {
      setError('Failed to connect to the server');
      setHeader('');
      setPayload('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="JWT Decoder"
      description="Decode JSON Web Tokens to view header and payload without verifying the signature."
    >
      <div className="p-6 space-y-4">
        {error && (
          <div className="p-3 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label className="block text-sm font-medium">JWT Token (Encoded)</label>
          <textarea
            className="w-full h-32 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-none break-all"
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            value={token}
            onChange={(e) => {
              setToken(e.target.value);
              // Auto decode if pasted
              if (e.target.value.length > 20) {
                 // Debounce slightly to allow pasting to complete, or just let user click decode.
              }
            }}
          />
        </div>

        <div>
          <button
            onClick={handleDecode}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50 transition-colors"
          >
            {loading ? 'Decoding...' : 'Decode JWT'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-pink-600 dark:text-pink-400">Header (Algorithm & Type)</label>
            <textarea
              className="w-full h-64 p-4 bg-gray-50 dark:bg-gray-900 border border-pink-200 dark:border-pink-900/50 rounded-lg font-mono text-sm resize-none"
              readOnly
              value={header}
              placeholder="Header JSON..."
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-purple-600 dark:text-purple-400">Payload (Data)</label>
            <textarea
              className="w-full h-64 p-4 bg-gray-50 dark:bg-gray-900 border border-purple-200 dark:border-purple-900/50 rounded-lg font-mono text-sm resize-none"
              readOnly
              value={payload}
              placeholder="Payload JSON..."
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default JwtDecoderPage;