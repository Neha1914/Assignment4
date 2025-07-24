'use client';

import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StockDisplay = ({ historicalData, predictedData, stockSymbol, accuracy, trend }) => {
  const chartRef = useRef(null);

  // Prepare chart data
  const chartData = {
    labels: [
      ...historicalData.map((_, index) => `Day ${index + 1}`),
      ...predictedData.map((_, index) => `Prediction ${index + 1}`)
    ],
    datasets: [
      {
        label: 'Historical Prices',
        data: [...historicalData, ...Array(predictedData.length).fill(null)],
        borderColor: 'rgb(23, 162, 184)',
        backgroundColor: 'rgba(23, 162, 184, 0.5)',
        tension: 0.1,
        pointRadius: 3,
        pointBackgroundColor: 'rgb(23, 162, 184)',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        fill: false,
      },
      {
        label: 'Predicted Prices',
        data: [...Array(historicalData.length).fill(null), ...predictedData],
        borderColor: 'rgb(232, 62, 140)',
        backgroundColor: 'rgba(232, 62, 140, 0.5)',
        borderDash: [6, 3],
        tension: 0.1,
        pointRadius: 3,
        pointBackgroundColor: 'rgb(232, 62, 140)',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        fill: false,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }
        }
      },
      title: {
        display: true,
        text: `${stockSymbol} Stock Price Prediction`,
        font: {
          size: 18,
          weight: 'bold',
          family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        },
        color: '#374151'
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: $${context.parsed.y.toFixed(2)}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Price ($)',
          font: {
            size: 14,
            weight: 'bold',
            family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          },
          color: '#6c757d'
        },
        grid: {
          color: '#e5e7eb',
          drawBorder: false
        },
        ticks: {
          font: {
            size: 12,
            family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          },
          color: '#6c757d',
          callback: function(value) {
            return '$' + value.toFixed(0);
          }
        }
      },
      x: {
        title: {
          display: true,
          text: 'Time Period',
          font: {
            size: 14,
            weight: 'bold',
            family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          },
          color: '#6c757d'
        },
        grid: {
          color: '#e5e7eb',
          drawBorder: false
        },
        ticks: {
          font: {
            size: 12,
            family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          },
          color: '#6c757d',
          maxRotation: 45,
          minRotation: 0
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    elements: {
      point: {
        hoverRadius: 6,
        hoverBorderWidth: 3
      }
    }
  };

  const calculateStats = () => {
    const lastHistorical = historicalData[historicalData.length - 1];
    const firstPredicted = predictedData[0];
    const lastPredicted = predictedData[predictedData.length - 1];
    
    const immediateChange = ((firstPredicted - lastHistorical) / lastHistorical * 100).toFixed(2);
    const totalChange = ((lastPredicted - lastHistorical) / lastHistorical * 100).toFixed(2);
    
    return { immediateChange, totalChange };
  };

  const stats = calculateStats();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <div className="h-96">
          <Line data={chartData} options={options} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-2">Trend Analysis</h3>
          <p><strong>Overall Trend:</strong> {trend}</p>
          <p><strong>Model Accuracy:</strong> {accuracy}%</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-2">Price Changes</h3>
          <p><strong>Immediate Change:</strong> 
            <span className={stats.immediateChange >= 0 ? 'text-green-600' : 'text-red-600'}>
              {stats.immediateChange >= 0 ? '+' : ''}{stats.immediateChange}%
            </span>
          </p>
          <p><strong>Total Predicted Change:</strong> 
            <span className={stats.totalChange >= 0 ? 'text-green-600' : 'text-red-600'}>
              {stats.totalChange >= 0 ? '+' : ''}{stats.totalChange}%
            </span>
          </p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-2">Data Summary</h3>
          <p><strong>Historical Data Points:</strong> {historicalData.length}</p>
          <p><strong>Prediction Period:</strong> {predictedData.length} days</p>
          <p><strong>Current Price:</strong> ${historicalData[historicalData.length - 1].toFixed(2)}</p>
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-800 mb-2">Prediction Insights</h3>
        <ul className="text-blue-700 space-y-1">
          <li>• The AI model analyzed {historicalData.length} days of historical data</li>
          <li>• Predicted {predictedData.length} days into the future</li>
          <li>• Model confidence: {accuracy}% accuracy</li>
          <li>• Expected trend: {trend.toLowerCase()} movement</li>
        </ul>
      </div>
    </div>
  );
};

export default StockDisplay;