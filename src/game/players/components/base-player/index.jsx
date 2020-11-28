import React from 'react';
import PropTypes from 'prop-types';

import * as Text from '../base-text';
import './styles.css';

export default function Index ({ id }) {
  return (
    <div className={`base-player-display ${id}`}>
      <Text.Title>Player {id}</Text.Title>
      <Text.P>Wins: {0}</Text.P>
    </div>
  );
}

Index.propTypes = {
  id: PropTypes.oneOf(['one', 'two']).isRequired,
};
