import React from 'react';
import './VerticalEmail.css';

const VerticalEmail = () => {
  return (
    <div className="fixed right-8 bottom-0 flex flex-col items-center">
      <a 
        href="mailto:saj24@buffalo.edu"
        className="writing-mode-vertical transform rotate-180 mb-6 text-gray-500 hover:text-blue-500 transition-colors duration-300"
        style={{ writingMode: 'vertical-rl' }}
      >
        saj24@buffalo.edu
      </a>
      <div className="w-px h-24 bg-gray-500"></div>
    </div>
  );
};

export default VerticalEmail;