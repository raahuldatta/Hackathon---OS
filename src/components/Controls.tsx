import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface ControlsProps {
  isRunning: boolean;
  onToggleRunning: () => void;
  onReset: () => void;
}

export default function Controls({ 
  isRunning, 
  onToggleRunning, 
  onReset 
}: ControlsProps) {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={onToggleRunning}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg ${
          isRunning 
            ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-500/25'
            : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/25'
        }`}
      >
        {isRunning ? (
          <>
            <Pause className="w-4 h-4" /> Pause
          </>
        ) : (
          <>
            <Play className="w-4 h-4" /> Start
          </>
        )}
      </button>
      <button
        onClick={onReset}
        className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium transition-all duration-200 shadow-lg shadow-slate-800/25"
      >
        <RotateCcw className="w-4 h-4" /> Reset
      </button>
    </div>
  );
}