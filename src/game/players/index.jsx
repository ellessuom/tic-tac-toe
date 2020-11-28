import React from 'react';
import Player from './components/base-player';

import './styles.css';
export default function Players () {
  return (
    <div className="players-wrapper">
      <Player id="one" />
      <Player id="two" />
    </div>
  )
}
