import React from 'react';
import PropTypes from 'prop-types';

export default function BasePlayer ({ id }) {
  return (
    <div>
      <h1>Player {id}</h1>
      <p>Wins: {0}</p>
    </div>
  );
}

BasePlayer.propTypes = {
  id: PropTypes.oneOf(['one', 'two']).isRequired,
};
