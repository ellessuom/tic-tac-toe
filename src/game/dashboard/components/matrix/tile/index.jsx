import React from 'react';
import { useData } from "../../../../context";
import './styles.css';

export default function Tile ({ i }) {
  const [ data, actions ] = useData();
  const [isActive, setIsActive] = React.useState(false);
  const handleClick = () => {
    if (data.canPlay && !isActive) {
      setIsActive(true);
      actions.play(i);
    }
  };
  const getContent = () => {
    if (isActive) {
      return data.p1.selectedTiles.includes(i)? 'X' : 'O';
    }
  };
  return (
    <div
      onClick={handleClick}
      className={`tile ${!data.canPlay && 'disable'}`}
    >
      {
        getContent(data.usedTiles.includes(i))
      }
    </div>
  );
}
