import React from 'react';
import './styles.css';

export default function Tile ({ i }) {
  const handleClick = () => {};

  return (
    <div
      onClick={handleClick}
      className="tile"
    />
  );
}
