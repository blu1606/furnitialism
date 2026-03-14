import React from 'react';
import { Star, StarHalf } from 'lucide-react';

const Rating = ({ value, count, showCount = true }) => {
  const stars = [];
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 !== 0;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<Star key={i} size={14} fill="#ffb400" color="#ffb400" />);
    } else if (i === fullStars && hasHalfStar) {
      stars.push(<StarHalf key={i} size={14} fill="#ffb400" color="#ffb400" />);
    } else {
      stars.push(<Star key={i} size={14} color="#555" />);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex">{stars}</div>
      {showCount && count && <span className="text-xs text-black/40">({count})</span>}
    </div>
  );
};

export default Rating;
