import React from 'react';
import { useData } from "../../../../context";
import X from '../../../../assets/media/mark_x.svg';
import O from '../../../../assets/media/mark_o.svg';

import './styles.css';

export default function Tile ({ i }) {
  const [ data, actions ] = useData();
  let initState = null;
  if (data.usedTiles.includes(i)) {
    if (data.p1.selectedTiles.includes(i)) {
      initState = 'p1';
    } else {
      initState = 'p2';
    }
  }
  const [content, setContent] = React.useState(initState);
  const handleClick = () => {
    if (data.canPlay && !content) {
      actions.play(i);
      setContent(data.currentPlayer);
    }
  };


  const getClasses = (player) => {
    let output = ['tile'];
    if (data.canPlay) {
      if (content) {
        output.push('used');
      } else {
        output.push('available', player);
      }
    } else {
      if (content) {
        output.push('used');
      } else {
        output.push('disabled');
      }
    }
    if ([...data.winnerPattern].includes(String(i))) {
      output.push('highlight-win', data.winner);
    }
    return output.join(' ');
  };

  React.useEffect(() => {
    if (data.usedTiles.length === 0) {
      setContent(null);
    }

  }, [data.usedTiles]);

  return (
    <div
      onClick={handleClick}
      className={getClasses(data.currentPlayer)}
    >
      {
        !!content? (content === 'p1'? (
          <img width={50} src={X} alt="X" />
        ) : (
          <img width={50} src={O} alt="O" />
        )) : null
      }
    </div>
  );
}
