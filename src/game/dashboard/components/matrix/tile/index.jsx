import React from 'react';
import { useData } from "../../../../context";
import X from '../../../../assets/media/mark_x.svg';
import O from '../../../../assets/media/mark_o.svg';

import './styles.css';

export default function Tile ({ i }) {
  const [ data, actions ] = useData();
  const [content, setContent] = React.useState(null);
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
