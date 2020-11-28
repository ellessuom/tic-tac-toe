import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';
export default function Title ({ children }) {
  return (
    <div className={`title`}>
      { children }
    </div>
  );
}

Title.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};
