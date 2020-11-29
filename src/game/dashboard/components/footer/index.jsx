import React from 'react';
import { useData } from "../../../context";

import './styles.css';
export default function Footer () {
  const [ data, actions ] = useData();

  let buttonText = '';

  if (data.winner) {
    buttonText = 'Play again';
  } else {
    buttonText = 'Restart';
  }

  const handleClick = () => {
    actions.startGame();
  };

  return (
    <div className="footer">
      {
        data.usedTiles.length > 0 && (
          <button onClick={handleClick}>{buttonText}</button>
        )
      }
    </div>
  )
}
