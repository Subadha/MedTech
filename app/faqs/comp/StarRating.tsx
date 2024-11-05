// components/StarRating.js
const StarRating = ({ rating, setRating }:any) => {
  return (
    <div className="flex mb-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`w-10 text-4xl h-10 transition duration-200 ${
            rating >= star ? 'text-yellow-400' : 'text-gray-300'
          }`}
          onClick={() => setRating(star)}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default StarRating;
