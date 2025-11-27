import React, { useEffect, useState } from 'react';

interface AnalysisLoaderProps {
  messages: string[];
  didYouKnow: string;
}

export const AnalysisLoader: React.FC<AnalysisLoaderProps> = ({ messages, didYouKnow }) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Message rotation
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 1500);

    // Progress bar simulation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;
        // Slow down as it gets closer to 100
        const increment = Math.max(1, (100 - prev) / 10);
        return prev + increment;
      });
    }, 100);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, [messages.length]);

  return (
    <div className="flex flex-col items-center justify-center h-full px-8 animate-fade-in">
      <div className="relative w-32 h-32 mb-8">
        {/* Pulsing outer ring */}
        <div className="absolute inset-0 bg-rose-100 rounded-full animate-ping opacity-75"></div>
        {/* Inner circle */}
        <div className="relative w-32 h-32 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-rose-50">
          <svg className="w-16 h-16 text-rose-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>
      </div>

      <h2 className="text-xl font-medium text-stone-800 mb-2 text-center h-8 transition-all duration-300">
        {messages[messageIndex]}
      </h2>
      
      <div className="w-full max-w-xs bg-stone-200 rounded-full h-1.5 mt-4 overflow-hidden">
        <div 
          className="bg-rose-500 h-1.5 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <p className="text-stone-400 text-sm mt-8 text-center max-w-xs">
        {didYouKnow}
      </p>
    </div>
  );
};