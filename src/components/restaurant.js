import { useMemo } from 'react';
import Menu from './menu';
import Reviews from './reviews';
import Rate from './rate';

export default function Restaurant({menu, reviews}) {

  const averageRating = useMemo(()=> {
    const rating =  reviews.map(review => review.rating);
    return Math.round( rating.reduce((sum, current) => sum + current) / reviews.length );
  }, [reviews]);

  return (
    <div>
      <Menu menu={menu}/>
      <Reviews reviews={reviews}/>
      <p> Average rating for a restaurant:</p>
      <Rate value={averageRating}/>
    </div>
  );
}