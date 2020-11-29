import React from 'react';
import Player from './components/base-player';
import { PLAYERS_ID } from "../context/actions";

import './styles.css';
export default function Players () {
  return (
    <div className="players-wrapper">
      <Player playerId={PLAYERS_ID.PLAYER_ONE} />
      <Player playerId={PLAYERS_ID.PLAYER_TWO} />
    </div>
  )
}
