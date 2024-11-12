import React from 'react';

const ActionButtons = ({ onNewSale, onNewExpense, onAddInventory }) => {
  return (
    <div>
      {/* Add your action buttons here */
      <div className="action-buttons">
      <button className="action-btn" onClick={() => onNewSale()}>
        New Sale
      </button>
      <button className="action-btn" onClick={() => onNewExpense()}>
        New Expense
      </button>
      <button className="action-btn" onClick={() => onAddInventory()}>
        Add Inventory
      </button>
    </div>
      }
    </div>
  );
};

export default ActionButtons;