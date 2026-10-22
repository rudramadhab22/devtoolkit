import React, { useState, useEffect } from 'react';

const HealthStatusBadge = () => {
  const [status, setStatus] = useState('checking'); // checking, up, down

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch('/api/v1/health');
        if (response.ok) {
          const data = await response.json();
          setStatus(data.data.status === 'UP' ? 'up' : 'down');
        } else {
          setStatus('down');
        }
      } catch (error) {
        setStatus('down');
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, []);

  const getTooltipText = () => {
    switch (status) {
      case 'up': return 'API Online';
      case 'down': return 'API Offline';
      default: return 'Checking API...';
    }
  };

  return (
    <div className="flex items-center justify-center p-2" title={getTooltipText()}>
      <span className="relative flex h-3 w-3">
        {status === 'up' && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        )}
        <span
          className={`relative inline-flex rounded-full h-3 w-3 ${
            status === 'up' ? 'bg-green-500' : status === 'down' ? 'bg-red-500' : 'bg-gray-400'
          }`}
        ></span>
      </span>
    </div>
  );
};

export default HealthStatusBadge;