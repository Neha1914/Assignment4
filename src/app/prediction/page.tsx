'use client';

import { useState, useEffect } from 'react';
import StockInput from '../../components/StockInput';
import StockDisplay from '../../components/StockDisplay';

interface PredictionResults {
  stockSymbol: string;
  historicalData: any[];
  predictedData: any[];
  accuracy: number;
  trend: string;
}

export default function PredictionPage() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<PredictionResults | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [stockModel, setStockModel] = useState<any>(null);

  useEffect(() => {
    // Dynamically import StockModel to avoid SSR issues
    const loadStockModel = async () => {
      try {
        const StockModel = (await import('../../components/StockModel')).default;
        setStockModel(StockModel());
      } catch (error) {
        console.error('Failed to load StockModel:', error);
      }
    };
    
    loadStockModel();
  }, []);

  const handlePrediction = async (
    stockSymbol: string, 
    daysToPredict: number, 
    trainingData: any
  ) => {
    if (!stockModel) {
      setError('Stock model is still loading. Please try again.');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const predictionResults = await stockModel.predictStockPrice(
        stockSymbol, 
        daysToPredict, 
        trainingData
      );
      setResults(predictionResults);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Prediction failed';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Stock Market Predictor
          </h1>
          <p className="text-lg text-gray-600">
            AI-powered stock price forecasting using Brain.js
          </p>
        </div>

        <StockInput onPredict={handlePrediction} disabled={loading || !stockModel} />

        {!stockModel && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading AI model...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            <i className="fas fa-exclamation-triangle mr-2"></i>
            {error}
          </div>
        )}

        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Training AI model and analyzing data...</p>
          </div>
        )}

        {results && (
          <StockDisplay 
            historicalData={results.historicalData}
            predictedData={results.predictedData}
            stockSymbol={results.stockSymbol}
            accuracy={results.accuracy}
            trend={results.trend}
          />
        )}
      </div>
    </div>
  );
}