import React from 'react';
import './styles.css';

export default function Tile ({ i }) {
  const [isActive, setIsActive] = React.useState(false);
  const handleClick = () => {
    setIsActive(true);
  };

  return (
    <div
      onClick={handleClick}
      className="tile"
    >
      { isActive && 'X' }
    </div>
  );
}
