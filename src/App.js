import React, { useState } from 'react';
import WelcomeCard from './components/WelcomeCard';
import StatCard from './components/StatCard';
import ActionButtons from './components/ActionButtons';
import TransactionsList from './components/TransactionsList';
import InventoryList from './components/InventoryList';
import TransactionModal from './components/TransactionModal';
import InventoryModal from './components/InventoryModal';
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

// Import styles
import './styles/App.css';
import './styles/Modal.css';
import './styles/StatCard.css';

function App() {
  // Modal states
  const [isTransactionModalOpen, setTransactionModalOpen] = useState(false);
  const [isInventoryModalOpen, setInventoryModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState('sale');

  // Data states
  const [transactions, setTransactions] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [stats, setStats] = useState({
    sales: 0,
    expenses: 0,
    profit: 0
  });

  // Transaction handling
  const handleTransactionSubmit = (formData) => {
    const newTransaction = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      type: formData.type,
      itemName: formData.itemName,
      amount: parseFloat(formData.amount),
      description: formData.description
    };

    setTransactions(prev => [newTransaction, ...prev]);

    // Update stats
    updateStats(newTransaction);
    
    // Close modal
    setTransactionModalOpen(false);
  };

  // Inventory handling
  const handleInventorySubmit = (formData) => {
    const newItem = {
      id: Date.now(),
      name: formData.itemName,
      quantity: parseInt(formData.quantity),
      unitPrice: parseFloat(formData.unitPrice),
      reorderPoint: parseInt(formData.reorderPoint),
      totalValue: formData.quantity * formData.unitPrice
    };

    setInventory(prev => [newItem, ...prev]);
    setInventoryModalOpen(false);
  };

  // Stats update function
  const updateStats = (transaction) => {
    setStats(prev => {
      const newStats = { ...prev };
      if (transaction.type === 'sale') {
        newStats.sales += transaction.amount;
        newStats.profit += transaction.amount;
      } else if (transaction.type === 'expense') {
        newStats.expenses += transaction.amount;
        newStats.profit -= transaction.amount;
      }
      return newStats;
    });
  };

  // Delete functions
  const handleDeleteTransaction = (id) => {
    setTransactions(prev => prev.filter(transaction => transaction.id !== id));
  };

  const handleDeleteInventoryItem = (id) => {
    setInventory(prev => prev.filter(item => item.id !== id));
  };

  // Edit functions
  const handleEditTransaction = (id, updatedData) => {
    setTransactions(prev => 
      prev.map(transaction => 
        transaction.id === id ? { ...transaction, ...updatedData } : transaction
      )
    );
  };

  const handleEditInventoryItem = (id, updatedData) => {
    setInventory(prev => 
      prev.map(item => 
        item.id === id ? { ...item, ...updatedData } : item
      )
    );
  };

  // Stats data
  const statsData = [
    {
      title: 'Sales',
      value: `$${stats.sales.toFixed(2)}`,
      description: "Today's Sales",
      trend: '↑ 12% vs yesterday'
    },
    {
      title: 'Expenses',
      value: `$${stats.expenses.toFixed(2)}`,
      description: "Today's Expenses",
      trend: '↓ 5% vs yesterday',
      isDown: true
    },
    {
      title: 'Inventory',
      value: inventory.length.toString(),
      description: 'Items in Stock',
      trend: `${inventory.filter(item => item.quantity <= item.reorderPoint).length} items low stock`
    },
    {
      title: 'Profit',
      value: `$${stats.profit.toFixed(2)}`,
      description: "Today's Profit",
      trend: '↑ 15% vs yesterday'
    }
  ];

  // Add these new functions for report generation
  const generateTransactionReport = (startDate, endDate) => {
    // Filter transactions for the given period
    const filteredTransactions = transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= startDate && transactionDate <= endDate;
    });

    // Calculate totals
    const report = {
      totalSales: 0,
      totalExpenses: 0,
      netProfit: 0,
      transactions: filteredTransactions,
      periodStart: startDate.toLocaleDateString(),
      periodEnd: endDate.toLocaleDateString(),
      generatedAt: new Date().toLocaleString()
    };

    filteredTransactions.forEach(transaction => {
      if (transaction.type === 'sale') {
        report.totalSales += transaction.amount;
      } else {
        report.totalExpenses += transaction.amount;
      }
    });

    report.netProfit = report.totalSales - report.totalExpenses;

    // Format and print the report
    printReport('Transaction Report', report);
  };

  const generateInventoryReport = () => {
    const report = {
      totalItems: inventory.length,
      totalValue: inventory.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0),
      lowStockItems: inventory.filter(item => item.quantity <= item.reorderPoint),
      inventory: inventory,
      generatedAt: new Date().toLocaleString()
    };

    // Format and print the report
    printReport('Inventory Report', report);
  };

  const printReport = (title, data) => {
    // Create a new window for the report
    const reportWindow = window.open('', '_blank');
    
    // Generate HTML content
    const reportContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #2c3e50; }
            .report-header { margin-bottom: 20px; }
            .report-section { margin-bottom: 30px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f8f9fa; }
            .total-row { font-weight: bold; background-color: #f8f9fa; }
          </style>
        </head>
        <body>
          <div class="report-header">
            <h1>${title}</h1>
            <p>Generated: ${data.generatedAt}</p>
            ${data.periodStart ? `<p>Period: ${data.periodStart} - ${data.periodEnd}</p>` : ''}
          </div>
          
          ${title === 'Transaction Report' ? `
            <div class="report-section">
              <h2>Summary</h2>
              <table>
                <tr><td>Total Sales:</td><td>$${data.totalSales.toFixed(2)}</td></tr>
                <tr><td>Total Expenses:</td><td>$${data.totalExpenses.toFixed(2)}</td></tr>
                <tr class="total-row"><td>Net Profit:</td><td>$${data.netProfit.toFixed(2)}</td></tr>
              </table>
            </div>
            <div class="report-section">
              <h2>Transactions</h2>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Item Name</th>
                    <th>Amount</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  ${data.transactions.map(t => `
                    <tr>
                      <td>${t.date}</td>
                      <td>${t.type}</td>
                      <td>${t.itemName}</td>
                      <td>$${t.amount.toFixed(2)}</td>
                      <td>${t.description}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          ` : `
            <div class="report-section">
              <h2>Summary</h2>
              <table>
                <tr><td>Total Items:</td><td>${data.totalItems}</td></tr>
                <tr><td>Total Value:</td><td>$${data.totalValue.toFixed(2)}</td></tr>
                <tr><td>Low Stock Items:</td><td>${data.lowStockItems.length}</td></tr>
              </table>
            </div>
            <div class="report-section">
              <h2>Inventory Details</h2>
              <table>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total Value</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${data.inventory.map(item => `
                    <tr>
                      <td>${item.name}</td>
                      <td>${item.quantity}</td>
                      <td>$${item.unitPrice.toFixed(2)}</td>
                      <td>$${(item.quantity * item.unitPrice).toFixed(2)}</td>
                      <td>${item.quantity <= item.reorderPoint ? 'Low Stock' : 'In Stock'}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `}
        </body>
      </html>
    `;

    reportWindow.document.write(reportContent);
    reportWindow.document.close();
    reportWindow.focus();
  };

  return (
    <div className="App">
      <div className="dashboard-container">
        <WelcomeCard username="Shop Owner" />
        
        <div className="stats-grid">
          {statsData.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              description={stat.description}
              trend={stat.trend}
              isDown={stat.isDown}
            />
          ))}
        </div>

        <div className="action-buttons">
          <button 
            className="action-btn" 
            onClick={() => {
              setTransactionType('sale');
              setTransactionModalOpen(true);
            }}
          >
            New Sale
          </button>
          <button 
            className="action-btn" 
            onClick={() => {
              setTransactionType('expense');
              setTransactionModalOpen(true);
            }}
          >
            New Expense
          </button>
          <button 
            className="action-btn" 
            onClick={() => setInventoryModalOpen(true)}
          >
            Add Inventory
          </button>
        </div>

        <TransactionsList 
          transactions={transactions}
          onDelete={handleDeleteTransaction}
          onEdit={handleEditTransaction}
        />
        
        <InventoryList 
          inventory={inventory}
          onDelete={handleDeleteInventoryItem}
          onEdit={handleEditInventoryItem}
        />

        {/* Transaction Modal */}
        {isTransactionModalOpen && (
          <TransactionModal
            isOpen={isTransactionModalOpen}
            onClose={() => setTransactionModalOpen(false)}
            onSubmit={handleTransactionSubmit}
            type={transactionType}
          />
        )}

        {/* Inventory Modal */}
        {isInventoryModalOpen && (
          <InventoryModal
            isOpen={isInventoryModalOpen}
            onClose={() => setInventoryModalOpen(false)}
            onSubmit={handleInventorySubmit}
          />
        )}

        <div className="reports-section">
          <h3>Generate Reports</h3>
          <div className="report-buttons">
            <button 
              className="report-btn"
              onClick={() => {
                const endDate = new Date();
                const startDate = new Date();
                startDate.setMonth(startDate.getMonth() - 1); // Last 30 days
                generateTransactionReport(startDate, endDate);
              }}
            >
              Transaction Report (Last 30 Days)
            </button>
            <button 
              className="report-btn"
              onClick={generateInventoryReport}
            >
              Current Inventory Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 