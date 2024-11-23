'use client';

import { useState } from 'react';
import Image from 'next/image';

const carouselImages = [
  '/images/image.png',
  '/images/download.jpeg',
  '/images/download (1).jpeg',
  '/images/download (2).jpeg',
];

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-lg">
      {/* Image Container */}
      <div className="relative w-full aspect-video"> {/* aspect-video sets 16:9 aspect ratio */}
        <Image
          src={carouselImages[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          layout="fill"
          objectFit="contain" // Ensures no cropping
          objectPosition="center" // Centers the image
          className="rounded-lg"
        />
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black text-white px-3 py-1 rounded-full hover:bg-gray-700"
      >
        &#8592;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black text-white px-3 py-1 rounded-full hover:bg-gray-700"
      >
        &#8594;
      </button>
    </div>
  );
}
