'use client';

import React, { useState } from 'react';

const StockInput = ({ onPredict, disabled }) => {
  const [stockSymbol, setStockSymbol] = useState('AAPL');
  const [daysToPredict, setDaysToPredict] = useState(7);
  const [trainingData, setTrainingData] = useState(90);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass parameters individually, not as an object
    onPredict(stockSymbol, daysToPredict, trainingData);
  };

  return (
    <div className="input-card">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="stockSymbol">Stock Symbol:</label>
          <select 
            id="stockSymbol"
            value={stockSymbol}
            onChange={(e) => setStockSymbol(e.target.value)}
            disabled={disabled}
          >
            <option value="AAPL">AAPL (Apple)</option>
            <option value="MSFT">MSFT (Microsoft)</option>
            <option value="GOOGL">GOOGL (Alphabet)</option>
            <option value="AMZN">AMZN (Amazon)</option>
            <option value="TSLA">TSLA (Tesla)</option>
            <option value="META">META (Meta/Facebook)</option>
            <option value="NFLX">NFLX (Netflix)</option>
            <option value="NVDA">NVDA (Nvidia)</option>
            <option value="JPM">JPM (JPMorgan Chase)</option>
            <option value="V">V (Visa)</option>
          </select>
        </div>
        
        <div className="input-group">
          <label htmlFor="daysToPredict">Days to Predict:</label>
          <input 
            type="number" 
            id="daysToPredict"
            value={daysToPredict}
            onChange={(e) => setDaysToPredict(parseInt(e.target.value))}
            min="1" 
            max="30"
            disabled={disabled}
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="trainingData">Training Data (days):</label>
          <input 
            type="number" 
            id="trainingData"
            value={trainingData}
            onChange={(e) => setTrainingData(parseInt(e.target.value))}
            min="30" 
            max="365"
            disabled={disabled}
          />
        </div>
        
        <button 
          type="submit" 
          className="predict-btn"
          disabled={disabled}
        >
          <i className="fas fa-rocket"></i> Predict Stock Price
        </button>
      </form>
    </div>
  );
};

export default StockInput;