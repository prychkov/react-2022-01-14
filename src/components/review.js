import Rate from './rate';

export default function Review({review}) {
  return (
    <div>
      <p>{review.user}</p>
      <p>{review.text}</p>
      <Rate value={review.rating}/>
    </div>
  );
  
} 