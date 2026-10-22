import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-500 dark:text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} DevToolkit. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;