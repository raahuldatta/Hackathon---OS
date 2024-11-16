import React from 'react';
import { Settings, Activity, Compass, Clock } from 'lucide-react';

interface StatisticsProps {
  currentPosition: number;
  seekTime: number;
  direction: string;
  pendingRequests: number;
}

export default function Statistics({ 
  currentPosition, 
  seekTime, 
  direction, 
  pendingRequests 
}: StatisticsProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-purple-500/10 p-2 rounded-lg">
          <Activity className="w-5 h-5 text-purple-400" />
        </div>
        <h2 className="text-xl font-semibold text-white">Statistics</h2>
      </div>
      
      <div className="space-y-4">
        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
          <div className="flex items-center gap-3 mb-2">
            <Compass className="w-4 h-4 text-indigo-400" />
            <p className="text-slate-400">Current Position</p>
          </div>
          <p className="text-2xl font-bold text-white ml-7">{currentPosition}</p>
        </div>
        
        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-4 h-4 text-indigo-400" />
            <p className="text-slate-400">Total Seek Time</p>
          </div>
          <p className="text-2xl font-bold text-white ml-7">{seekTime}</p>
        </div>
        
        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
          <div className="flex items-center gap-3 mb-2">
            <Settings className="w-4 h-4 text-indigo-400" />
            <p className="text-slate-400">Direction</p>
          </div>
          <p className="text-2xl font-bold text-white capitalize ml-7">{direction}</p>
        </div>
        
        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-4 h-4 text-indigo-400" />
            <p className="text-slate-400">Pending Requests</p>
          </div>
          <p className="text-2xl font-bold text-white ml-7">{pendingRequests}</p>
        </div>
      </div>
    </div>
  );
}