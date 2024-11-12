import React from 'react';
import '../styles/StatCard.css';

const StatCard = ({ title, value, description, trend, isDown }) => {
  return (
    <div className="stat-card">
      <h3>{title}</h3>
      <div className="stat-value">{value}</div>
      <p>{description}</p>
      <span className={`stat-trend ${isDown ? 'down' : ''}`}>{trend}</span>
    </div>
  );
};

export default StatCard;