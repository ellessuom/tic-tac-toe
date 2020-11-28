import React from 'react';
import './styles.css';

import { useData } from '../../../../context';

export default function Tile ({ i }) {
  const [ data, actions ] = useData();
  const [isActive, setIsActive] = React.useState(false);
  const handleClick = () => {
    setIsActive(true);
    actions.startGame();
  };
  // console.log(data);

  return (
    <div
      onClick={handleClick}
      className="tile"
    >
      { isActive && 'X' }
    </div>
  );
}
