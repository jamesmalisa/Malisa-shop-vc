import React from 'react';

const TransactionsList = ({ transactions }) => {
  return (
    <div>
      {/* Add your transactions list content here */
       <div className="transactions-list">
       <h3>Recent Transactions</h3>
       <div className="transaction-item">
         <span>Date</span>
         <span>Type</span>
         <span>Amount</span>
         <span>Actions</span>
       </div>
       <div id="transactionsList">
         {transactions.map((transaction) => (
           <div key={transaction.id} className="transaction-item">
             <span>{transaction.date}</span>
             <span>{transaction.type}</span>
             <span>${transaction.amount}</span>
             <span>
               <button onClick={() => handleEdit(transaction.id)}>Edit</button>
               <button onClick={() => handleDelete(transaction.id)}>Delete</button>
             </span>
           </div>
         ))}
       </div>
     </div>
      
      }
    </div>
  );
};

export default TransactionsList;