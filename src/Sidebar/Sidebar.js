import React from 'react';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <a href="https://github.com/sabjohnson" target="_blank" rel="noopener noreferrer" className="sidebar-link">
        <img src="/assets/icons/github-icon.png" alt="GitHub" className="sidebar-icon" />
      </a>
      <a href="https://www.linkedin.com/in/sabjohnson" target="_blank" rel="noopener noreferrer" className="sidebar-link">
        <img src="/assets/icons/linkedin-icon.png" alt="LinkedIn" className="sidebar-icon" />
      </a>
      <a href="#" onClick={() => window.open('mailto:saj24@buffalo.edu', '_blank')}>
      <img src="/assets/icons/email-icon.png" alt="Email" className="sidebar-icon" />
      </a>
    </div>
  );
}

export default Sidebar;