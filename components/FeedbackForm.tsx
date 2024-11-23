'use client';

import { useState } from 'react';

type FeedbackFormData = {
  name: string;
  email: string;
  phone: string;
  vehicleModel: string;
  issueType: string[];
  issueDescription: string;
  satisfaction: number;
  recommend: boolean;
  additionalComments: string;
};

type FeedbackFormProps = {
  closeForm: () => void; // Function to close the form
};

export default function FeedbackForm({ closeForm }: FeedbackFormProps) {
  const [formData, setFormData] = useState<FeedbackFormData>({
    name: '',
    email: '',
    phone: '',
    vehicleModel: '',
    issueType: [],
    issueDescription: '',
    satisfaction: 3,
    recommend: true,
    additionalComments: '',
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (value === 'No Issue' && checked) {
      setFormData((prevData) => ({
        ...prevData,
        issueType: [value],
        issueDescription: '',
      }));
    } else if (value === 'No Issue' && !checked) {
      setFormData((prevData) => ({
        ...prevData,
        issueType: prevData.issueType.filter((type) => type !== value),
      }));
    } else if (checked) {
      setFormData((prevData) => ({
        ...prevData,
        issueType: [...prevData.issueType.filter((type) => type !== 'No Issue'), value],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        issueType: prevData.issueType.filter((type) => type !== value),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Feedback submitted successfully!');
        closeForm(); // Close the form after submission
      } else {
        console.error('Error submitting feedback:', response.statusText);
        alert('Failed to submit feedback.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting feedback.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Customer Feedback Form</h2>

      {/* Customer Information */}
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="border w-full p-2"
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="border w-full p-2"
      />
      <input
        type="text"
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        className="border w-full p-2"
      />

      {/* Vehicle Information */}
      <input
        type="text"
        placeholder="Vehicle Model (e.g., 2024 Honda Amaze)"
        value={formData.vehicleModel}
        onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
        className="border w-full p-2"
      />

      {/* Fuel Injector Issue Type */}
      <fieldset className="border p-4 rounded">
        <legend className="font-semibold">Fuel Injector Issue Type</legend>
        <label className="block">
          <input
            type="checkbox"
            value="Fuel Economy Decrease"
            checked={formData.issueType.includes('Fuel Economy Decrease')}
            onChange={handleCheckboxChange}
          />
          Fuel Economy Decrease
        </label>
        <label className="block">
          <input
            type="checkbox"
            value="Engine Stalling"
            checked={formData.issueType.includes('Engine Stalling')}
            onChange={handleCheckboxChange}
          />
          Engine Stalling
        </label>
        <label className="block">
          <input
            type="checkbox"
            value="Misfiring"
            checked={formData.issueType.includes('Misfiring')}
            onChange={handleCheckboxChange}
          />
          Misfiring
        </label>
        <label className="block">
          <input
            type="checkbox"
            value="Unusual Engine Noise"
            checked={formData.issueType.includes('Unusual Engine Noise')}
            onChange={handleCheckboxChange}
          />
          Unusual Engine Noise
        </label>
        <label className="block">
          <input
            type="checkbox"
            value="Other"
            checked={formData.issueType.includes('Other')}
            onChange={handleCheckboxChange}
          />
          Other
        </label>
        <label className="block">
          <input
            type="checkbox"
            value="No Issue"
            checked={formData.issueType.includes('No Issue')}
            onChange={handleCheckboxChange}
          />
          No Issue
        </label>
      </fieldset>

      {/* Describe the Issue */}
      {!formData.issueType.includes('No Issue') && (
        <textarea
          placeholder="Describe the issue in detail"
          value={formData.issueDescription}
          onChange={(e) => setFormData({ ...formData, issueDescription: e.target.value })}
          className="border w-full p-2"
        />
      )}

      {/* Satisfaction Rating */}
      <fieldset className="border p-4 rounded">
        <legend className="font-semibold">Overall Satisfaction (1-5)</legend>
        {[1, 2, 3, 4, 5].map((value) => (
          <label key={value} className="inline-block mr-4">
            <input
              type="radio"
              name="satisfaction"
              value={value}
              checked={formData.satisfaction === value}
              onChange={(e) =>
                setFormData({ ...formData, satisfaction: parseInt(e.target.value) })
              }
            />
            {value}
          </label>
        ))}
      </fieldset>

      {/* Would Recommend */}
      <fieldset className="border p-4 rounded">
        <legend className="font-semibold">Would you recommend this product?</legend>
        <label className="mr-4">
          <input
            type="radio"
            name="recommend"
            value="yes"
            checked={formData.recommend === true}
            onChange={() => setFormData({ ...formData, recommend: true })}
          />
          Yes
        </label>
        <label>
          <input
            type="radio"
            name="recommend"
            value="no"
            checked={formData.recommend === false}
            onChange={() => setFormData({ ...formData, recommend: false })}
          />
          No
        </label>
      </fieldset>

      {/* Additional Comments */}
      <textarea
        placeholder="Additional Comments (Optional)"
        value={formData.additionalComments}
        onChange={(e) =>
          setFormData({ ...formData, additionalComments: e.target.value })
        }
        className="border w-full p-2"
      />

      {/* Submit Button */}
      <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
        Submit Feedback
      </button>
    </form>
  );
}
