import React from 'react';
import { useData } from '../../../context';
import * as Text from "../../../shared-components/base-text";

export default function Status () {
  const [ data ] = useData();

  if (data.winner) {
    return <Text.Subtitle>{`Player ${data.winner === 'p1' ? 'One' : 'Two'} won the game!`}</Text.Subtitle>;
  }

  if (data.isTie) {
    return <Text.Subtitle>No one wins this time!</Text.Subtitle>;
  }
  if (data.usedTiles.length === 0) {
    return <Text.Subtitle>Select a tile to start the game!</Text.Subtitle>;
  }
  const playerId = data.currentPlayer === 'p1'? 'One' : 'Two';
  return <Text.Subtitle>{`Is Player ${playerId} turn`}</Text.Subtitle>;
};

