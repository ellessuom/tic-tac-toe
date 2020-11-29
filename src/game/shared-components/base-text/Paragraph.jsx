import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';
export default function Paragraph ({ children }) {
  return (
    <div className="paragraph">
      { children }
    </div>
  );
}

Paragraph.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};