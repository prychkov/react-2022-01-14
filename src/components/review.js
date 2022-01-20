import Rate from './rate';

export default function Review({review}) {
  return (
    <div>
      <p>{review.name}</p>
      <p>{review.text}</p>
      <Rate value={3}/>
    </div>
  );
  
} 