import React from 'react';
import PropTypes from 'prop-types';

import './style.css';
export default function Layout({ children }) {
  return (
    <div className="game-layout">
      { children }
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};
