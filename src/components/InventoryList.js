import React from 'react';

const InventoryList = ({ inventory }) => {
  return (
    <div>
      {/* Add your inventory list content here */
      <div className="inventory-list">
      <h3>Current Inventory</h3>
      <div className="inventory-item header">
        <span>Item Name</span>
        <span>Quantity</span>
        <span>Unit Price</span>
        <span>Total Value</span>
        <span>Status</span>
        <span>Actions</span>
      </div>
      <div id="inventoryList">
        {inventory.map((item) => (
          <div key={item.id} className="inventory-item">
            <span>{item.name}</span>
            <span>{item.quantity}</span>
            <span>${item.unitPrice}</span>
            <span>${item.quantity * item.unitPrice}</span>
            <span>{item.quantity <= item.reorderPoint ? 'Low Stock' : 'In Stock'}</span>
            <span>
              <button onClick={() => handleEdit(item.id)}>Edit</button>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </span>
          </div>
        ))}
      </div>
    </div>
      }
    </div>
  );
};

export default InventoryList;