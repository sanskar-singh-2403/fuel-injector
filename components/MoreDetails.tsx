'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function MoreDetails() {
  const [showDetails, setShowDetails] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  const defaultInfo = {
    title: 'Honda Amaze Diesel Car Fuel Injector',
    price: '₹ 7,500',
    specs: {
      'Vehicle Make/Model': 'Honda Amaze',
      'Suitable For': 'Car',
      Brand: 'Bosch',
      'Manufacturer Type': 'Aftermarket',
      Material: 'Iron',
      'Fuel Type': 'Diesel',
      'Item Part Number': '0445110547',
      'CR Valve No': 'F 00Z C01 317',
      'Nozzle No': '0 433 172 391',
      'Magnet Assly No': 'F 00V C30 319',
      'Valve Ball': 'F 00V C05 009',
      'Country of Origin': 'Made in India',
    },
  };

  const fullDetails = {
    description: `
      Fuel injectors are crucial components of modern automotive engines, ensuring the precise delivery of fuel to maintain performance and efficiency.
      They undergo extensive quality checks and often require feedback loops to address performance issues.
    `,
    technicalSpecifications: `
      MATERIAL

      There are three common steel materials: GCr15, 316L, and M2.

      GCr15 (100Cr6)
      Advantages: GCr15 is a high-carbon chromium-bearing steel with excellent wear resistance and load-bearing capacity. It is suitable for environments that withstand high pressure, high rotational speed, and a certain degree of impact.
      Limitations: Its corrosion resistance is not as good as 316L, especially in environments containing corrosive chemicals or high salinity, GCr15 may not be the best choice.

      316L stainless steel
      Advantages: 316L is an austenitic stainless steel with a higher molybdenum content, providing excellent corrosion resistance, especially chloride resistance. Suitable for applications requiring higher corrosion resistance, such as chemical processing or marine environments.
      Limitations: Compared with GCr15, 316L has poorer wear resistance and may not be suitable for long-term use in high-wear environments.

      M2 high-speed steel
      Advantages: M2 is a tungsten-molybdenum high-speed steel with excellent wear resistance and good toughness. It maintains hardness and wear resistance at higher temperatures, making it suitable for manufacturing cutting tools and other parts that require high wear resistance.
      Limitations: Although M2’s wear resistance is worse than 316L, its corrosion resistance is not as good as 316L, and its cost is higher than GCr15 and 316L.
    `,
    images: [
      '/images/nozzle-data.png',
      '/images/part-numbers.png',
      '/images/ford-mustang-chart.png',
    ],
  };

  return (
    <div>
      {/* Default Information */}
      <div className="rounded-lg bg-gray-100 p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800">{defaultInfo.title}</h2>
        <p className="text-xl font-semibold text-green-700 mt-2">{defaultInfo.price}</p>
        <ul className="mt-4 space-y-2">
          {Object.entries(defaultInfo.specs).map(([key, value], index) => (
            <li key={index} className="text-gray-700 text-lg">
              <span className="font-bold text-gray-800">{key}: </span>
              {value}
            </li>
          ))}
        </ul>

        <button
          onClick={() => setShowDetails(true)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg shadow-md mt-6 transition"
        >
          More Details
        </button>
      </div>

      {/* Detailed Information (Modal) */}
      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold mb-4">{defaultInfo.title} - Detailed Information</h2>
            <p className="text-gray-600 mb-6 whitespace-pre-line">{fullDetails.description}</p>

            <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
            <p className="text-gray-600 mb-6 whitespace-pre-line">
              {fullDetails.technicalSpecifications}
            </p>

            {/* Displaying Images or Tables */}
            <h3 className="text-xl font-semibold mb-4">Images and Diagrams</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fullDetails.images.map((image, idx) => (
                <div
                  key={idx}
                  className="cursor-pointer"
                  onClick={() => setEnlargedImage(image)}
                >
                  <Image
                    src={image}
                    alt={`Detail ${idx + 1}`}
                    width={400}
                    height={200}
                    className="rounded shadow-lg hover:scale-105 transition"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowDetails(false)}
              className="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-md transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Enlarged Image Modal */}
      {enlargedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <Image
              src={enlargedImage}
              alt="Enlarged View"
              width={800}
              height={400}
              className="rounded"
            />
            <button
              onClick={() => setEnlargedImage(null)}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-md transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
