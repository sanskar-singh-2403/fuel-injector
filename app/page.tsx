'use client'

import { useState } from 'react';
import ImageCarousel from '../components/ImageCarousel';
import MoreDetails from '../components/MoreDetails';
import FeedbackForm from '../components/FeedbackForm';

export default function Home() {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  const closeFeedbackForm = () => {
    setShowFeedbackForm(false);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Fuel Injector System</h1>
      <p className="text-lg text-gray-600 mb-8">
        Fuel injectors are critical for car engines. They ensure smooth fuel delivery and are essential for proper engine performance.
      </p>

      <ImageCarousel />

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => alert('Manufacturer has received your product!')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Buy
        </button>
        <button
          onClick={() => setShowFeedbackForm(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Give Feedback
        </button>
      </div>

      {showFeedbackForm && (
        <div className="mt-8 w-full max-w-3xl bg-white p-6 rounded shadow-md">
          <FeedbackForm closeForm={closeFeedbackForm} />
        </div>
      )}

      <div className="mt-8 w-full max-w-3xl">
        <MoreDetails />
      </div>
    </div>
  );
}