// components/ReviewCard.js
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import StarRating from './StarRating';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export default function ReviewCard() {
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0); // Add rating state
  const [loading, setLoading] = useState(false);
  const {toast}=useToast()
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/review/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, review, rating }), // Include rating
      });

      if (!response.ok) {
        throw new Error('Error submitting review');
      }

      const data = await response.json();
      toast({
        variant:"success",
        title:"Successfully added"
      })
      setName('');
      setReview('');
      setRating(0); // Reset rating after submission
    } catch (error) {
      console.error('Error: ', error);
      alert('Error submitting review.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" w-[90%] lg:w-[25vw] mx-auto p-4 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Leave a Review</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4"
          required
        />
        <Textarea
          placeholder="Your Review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="mb-4"
          required
        />
        <StarRating rating={rating} setRating={setRating} /> {/* Add StarRating component */}
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Submitting...' : 'Submit Review'}
        </Button>
      </form>
    </div>
  );
}
