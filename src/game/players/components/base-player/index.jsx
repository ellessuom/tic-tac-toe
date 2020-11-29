import React from 'react';
import PropTypes from 'prop-types';
import * as Text from '../../../shared-components/base-text';
import './styles.css';
import { PLAYERS_ID } from "../../../context/actions";
import { useData } from "../../../context";

export default function Index ({ playerId }) {
  const [ data ] = useData();
  const labels = {
    [PLAYERS_ID.PLAYER_ONE]: 'Player One',
    [PLAYERS_ID.PLAYER_TWO]: 'Player Two',
  };

  return (
    <div className={`base-player-display ${playerId}`}>
      <Text.Title>{labels[playerId]}</Text.Title>
      <Text.P>Wins: {data[playerId].wins}</Text.P>
    </div>
  );
}

Index.propTypes = {
  playerId: PropTypes.string.isRequired,
};
