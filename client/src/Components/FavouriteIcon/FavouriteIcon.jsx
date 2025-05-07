import React, { useState } from 'react';
import { Heart, HeartOff } from 'lucide-react'; // Make sure this is installed

const FavouriteIcon = ({ product }) => {
  const [liked, setLiked] = useState(false);

  const toggleFavourite = () => {
    setLiked(!liked);
    // Future: You can send this to a backend here.
  };

  return (
    <button onClick={toggleFavourite} className="text-rose-500">
      {liked ? <Heart fill="currentColor" /> : <HeartOff />}
    </button>
  );
};

export default FavouriteIcon;
