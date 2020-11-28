import React from 'react';

import Tile from './tile';
import './styles.css';
export default function Matrix () {
  return (
    <div className="matrix-container">
      {
        new Array(9).fill().map((_, i) => (
          <Tile key={i} i={i} />
        ))
      }
    </div>
  );
}
