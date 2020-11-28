import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

export default function BasePlayer ({ id }) {
  return (
    <div className={`base-player-display ${id}`}>
      <h1>Player {id}</h1>
      <p>Wins: {0}</p>
    </div>
  );
}

BasePlayer.propTypes = {
  id: PropTypes.oneOf(['one', 'two']).isRequired,
};
