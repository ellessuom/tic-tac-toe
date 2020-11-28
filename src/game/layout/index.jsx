import React from 'react';

import './style.css';
export default function Layout({ children }) {
  return (
    <div className="game-layout">
      { children }
    </div>
  )
}
