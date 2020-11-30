import React from 'react';
import PropTypes from 'prop-types';
import * as Text from '../../../shared-components/base-text';
import './styles.css';
import { useData } from "../../../context";
import labels  from "./labels";

export default function BasePlayer ({ playerId }) {
  const [ data ] = useData();

  return (
    <div className={`base-player-display ${playerId}`}>
      <Text.Title>{labels[playerId]}</Text.Title>
      <Text.P>Wins: {data[playerId].wins}</Text.P>
    </div>
  );
}

BasePlayer.propTypes = {
  playerId: PropTypes.string.isRequired,
};
