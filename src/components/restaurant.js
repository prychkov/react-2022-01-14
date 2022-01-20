import Menu from './menu';
import Reviews from './reviews';
import Rate from './rate';

export default function Restaurant({menu, reviews}) {
  const rating =  reviews.map(review => review.rating);
  const averageRating = Math.round( rating.reduce((sum, current) => sum + current) / reviews.length );

  return (
    <div>
      <Menu menu={menu}/>
      <Reviews reviews={reviews}/>
      <p> Средний рейтинг по рестарану:</p>
      <Rate value={averageRating}/>
    </div>
    
  );
}