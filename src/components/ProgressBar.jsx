import React from 'react';

const ProgressBar = ({ current, max, label = 'pontos' }) => {
  const percentage = Math.min((current / max) * 100, 100);

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>{current}/{max} {label}</span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;