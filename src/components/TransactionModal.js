import React, { useState } from 'react';
import '../styles/Modal.css';

const TransactionModal = ({ isOpen, onClose, onSubmit, type }) => {
  const [formData, setFormData] = useState({
    type: type,
    itemName: '',  // Add this new field
    amount: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>New {type.charAt(0).toUpperCase() + type.slice(1)}</h2>
        <form onSubmit={handleSubmit}>
          {/* Add Item Name field */}
          <div className="form-group">
            <label htmlFor="itemName">Item Name</label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              required
              placeholder="Enter item name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              placeholder="Enter amount"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Enter description"
            />
          </div>

          <div className="modal-actions">
            <button type="submit" className="action-btn">Save</button>
            <button 
              type="button" 
              className="action-btn secondary" 
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;