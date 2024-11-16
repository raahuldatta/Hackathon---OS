import React, { useState, useEffect } from 'react';
import { HardDrive } from 'lucide-react';
import { Request, cScanScheduler } from '../utils/diskScheduler';
import Controls from './Controls';
import Statistics from './Statistics';
import Visualization from './Visualization';

export default function DiskScheduler() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [currentPosition, setCurrentPosition] = useState(50);
  const [isRunning, setIsRunning] = useState(false);
  const [seekTime, setSeekTime] = useState(0);
  const [processedRequests, setProcessedRequests] = useState<Request[]>([]);
  const [direction, setDirection] = useState<'up' | 'down'>('up');
  const diskSize = 200;

  useEffect(() => {
    const initialRequests: Request[] = [
      { id: 1, position: 82, timestamp: Date.now() },
      { id: 2, position: 170, timestamp: Date.now() },
      { id: 3, position: 43, timestamp: Date.now() },
      { id: 4, position: 140, timestamp: Date.now() },
      { id: 5, position: 24, timestamp: Date.now() },
      { id: 6, position: 16, timestamp: Date.now() },
      { id: 7, position: 190, timestamp: Date.now() }
    ];
    setRequests(initialRequests);
  }, []);

  const processRequests = () => {
    if (requests.length === 0) return;

    const { totalSeekDistance, seekSequence } = cScanScheduler(requests, currentPosition, diskSize);
    
    if (seekSequence.length > 0) {
      const nextRequest = seekSequence[0];
      setCurrentPosition(nextRequest.position);
      setSeekTime(totalSeekDistance);
      setRequests(prev => prev.filter(r => r.id !== nextRequest.id));
      setProcessedRequests(prev => [...prev, nextRequest]);
      setDirection('up');
    }
  };

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(processRequests, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning, currentPosition, requests]);

  const reset = () => {
    const initialRequests: Request[] = [
      { id: 1, position: 82, timestamp: Date.now() },
      { id: 2, position: 170, timestamp: Date.now() },
      { id: 3, position: 43, timestamp: Date.now() },
      { id: 4, position: 140, timestamp: Date.now() },
      { id: 5, position: 24, timestamp: Date.now() },
      { id: 6, position: 16, timestamp: Date.now() },
      { id: 7, position: 190, timestamp: Date.now() }
    ];
    setRequests(initialRequests);
    setProcessedRequests([]);
    setCurrentPosition(50);
    setSeekTime(0);
    setDirection('up');
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="bg-indigo-500/10 p-3 rounded-xl">
                <HardDrive className="w-8 h-8 text-indigo-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  C-SCAN Disk Scheduler
                </h1>
                <p className="text-slate-400 mt-1">Disk Head Movement Visualization</p>
              </div>
            </div>
            <Controls 
              isRunning={isRunning}
              onToggleRunning={() => setIsRunning(!isRunning)}
              onReset={reset}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Visualization
                currentPosition={currentPosition}
                diskSize={diskSize}
                requests={requests}
                processedRequests={processedRequests}
              />
            </div>
            <div>
              <Statistics
                currentPosition={currentPosition}
                seekTime={seekTime}
                direction={direction}
                pendingRequests={requests.length}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}