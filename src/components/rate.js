import styles from './rate.module.css';

import { ReactComponent as StarFilled } from '../icons/starFilled.svg';
import { ReactComponent as StarNotFilled } from '../icons/starNotFilled.svg';

export default function Rate({value}) {
  let starsFilled = [];
  let starNotFilled = [];

  for(let i = 0; i < value; i++) {
    starsFilled.push(<StarFilled key={i} className = {styles.filled}/>);
  }

  for(let i = 0; i < (5 - value); i++) {
    starNotFilled.push(<StarNotFilled key={i} className = {styles.notFilled}/>);
  }

  return (
    <div>
      {starsFilled}
      {starNotFilled}
    </div>
  );
}