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
  return (
    <div
      onClick={handleClick}
      className={`tile ${!data.canPlay && 'disable'}`}
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
