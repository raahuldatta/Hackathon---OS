import React from 'react';
import { LineChart } from 'lucide-react';
import { Request } from '../utils/diskScheduler';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
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

interface VisualizationProps {
  currentPosition: number;
  diskSize: number;
  requests: Request[];
  processedRequests: Request[];
}

export default function Visualization({
  currentPosition,
  diskSize,
  requests,
  processedRequests
}: VisualizationProps) {
  const chartData = {
    labels: ['Start', ...processedRequests.map((_, index) => `Step ${index + 1}`)],
    datasets: [
      {
        label: 'Disk Head Position',
        data: [50, ...processedRequests.map(req => req.position)],
        borderColor: '#818cf8',
        backgroundColor: 'rgba(129, 140, 248, 0.1)',
        tension: 0.2,
        pointRadius: 6,
        pointHoverRadius: 8,
        borderWidth: 3,
        fill: true,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: diskSize,
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
          borderColor: 'rgba(148, 163, 184, 0.2)',
        },
        ticks: {
          color: '#94a3b8',
          font: {
            family: 'Inter, system-ui, sans-serif',
          },
        },
        title: {
          display: true,
          text: 'Disk Position',
          color: '#94a3b8',
          font: {
            family: 'Inter, system-ui, sans-serif',
            weight: '500',
            size: 14,
          },
        }
      },
      x: {
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
          borderColor: 'rgba(148, 163, 184, 0.2)',
        },
        ticks: {
          color: '#94a3b8',
          font: {
            family: 'Inter, system-ui, sans-serif',
          },
        },
        title: {
          display: true,
          text: 'Request Sequence',
          color: '#94a3b8',
          font: {
            family: 'Inter, system-ui, sans-serif',
            weight: '500',
            size: 14,
          },
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: '#94a3b8',
          font: {
            family: 'Inter, system-ui, sans-serif',
            weight: '500',
          },
        }
      },
      tooltip: {
        backgroundColor: 'rgba(30, 41, 59, 0.9)',
        titleColor: '#f1f5f9',
        bodyColor: '#f1f5f9',
        borderColor: 'rgba(148, 163, 184, 0.2)',
        borderWidth: 1,
        padding: 12,
        bodyFont: {
          family: 'Inter, system-ui, sans-serif',
        },
        titleFont: {
          family: 'Inter, system-ui, sans-serif',
          weight: '600',
        },
      }
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-indigo-500/10 p-2 rounded-lg">
          <LineChart className="w-5 h-5 text-indigo-400" />
        </div>
        <h2 className="text-xl font-semibold text-white">Disk Movement Graph</h2>
      </div>
      <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/50">
        <div className="h-[400px]">
          <Line data={chartData} options={options} />
        </div>
        <div className="flex justify-between mt-6 text-sm">
          <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-lg">
            <div className="w-3 h-3 bg-blue-400 rounded-full" />
            <span className="text-slate-300">Pending: {requests.length}</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-lg">
            <div className="w-3 h-3 bg-indigo-400 rounded-full" />
            <span className="text-slate-300">Current: {currentPosition}</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-lg">
            <div className="w-3 h-3 bg-purple-400 rounded-full" />
            <span className="text-slate-300">Processed: {processedRequests.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}