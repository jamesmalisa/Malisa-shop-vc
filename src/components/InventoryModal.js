import React, { useState } from 'react';

const InventoryModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    itemName: '',
    quantity: '',
    unitPrice: '',
    reorderPoint: ''
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
        <h2>Add New Inventory Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="itemName">Item Name</label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              min="1"
            />
          </div>
          <div className="form-group">
            <label htmlFor="unitPrice">Unit Price ($)</label>
            <input
              type="number"
              id="unitPrice"
              name="unitPrice"
              value={formData.unitPrice}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
            />
          </div>
          <div className="form-group">
            <label htmlFor="reorderPoint">Reorder Point</label>
            <input
              type="number"
              id="reorderPoint"
              name="reorderPoint"
              value={formData.reorderPoint}
              onChange={handleChange}
              required
              min="0"
            />
          </div>
          <div className="modal-actions">
            <button type="submit" className="action-btn">Save</button>
            <button type="button" className="action-btn secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryModal;