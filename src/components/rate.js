import styles from './rate.module.css';

import { ReactComponent as StarFilled } from '../icons/starFilled.svg';
import { ReactComponent as StarNotFilled } from '../icons/starNotFilled.svg';

export default function Rate({value}) {
  const starsFilled = [...Array(value)].map((_, i) => (
    <StarFilled key={i} className = {styles.filled}/>
  ));

  const starNotFilled = [...Array(5 - value)].map((_, i) => (
    <StarNotFilled key={i} className = {styles.notFilled}/>
  ));

  return (
    <div>
      {starsFilled}
      {starNotFilled}
    </div>
  );
}