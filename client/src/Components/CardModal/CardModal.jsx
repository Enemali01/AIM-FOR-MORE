import React from 'react';

const CardModal = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const cardData = {
      name: e.target.name.value,
      number: e.target.number.value,
      expiry: e.target.expiry.value,
      cvv: e.target.cvv.value,
    };
    onSubmit(cardData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h6 className="text-lg font-semibold mb-4">Enter Card Details</h6>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Cardholder Name"
            required
            className="w-full p-2 mb-3 border rounded"
          />
          <input
            type="text"
            name="number"
            placeholder="Card Number"
            required
            className="w-full p-2 mb-3 border rounded"
            maxLength="16"
          />
          <div className="flex gap-2">
            <input
              type="text"
              name="expiry"
              placeholder="MM/YY"
              required
              className="w-1/2 p-2 mb-3 border rounded"
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              required
              maxLength="4"
              className="w-1/2 p-2 mb-3 border rounded"
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded mr-2">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-emerald-700 text-white rounded">
              Save Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CardModal;
