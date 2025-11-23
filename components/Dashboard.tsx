import React, { useState } from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { Play, Video, Gamepad2, TrendingUp, Trophy } from 'lucide-react';
import { EarningActivity } from '../types';
import canvasConfetti from 'canvas-confetti';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface DashboardProps {
  balance: number;
  onEarn: (amount: number, description: string) => void;
}

const activities: EarningActivity[] = [
  { id: '1', title: 'Space Shooter', reward: 50, icon: 'game', color: 'from-purple-500 to-indigo-500', duration: '5 min' },
  { id: '2', title: 'Watch Ad', reward: 15, icon: 'video', color: 'from-pink-500 to-rose-500', duration: '30 sec' },
  { id: '3', title: 'Daily Puzzle', reward: 100, icon: 'game', color: 'from-emerald-500 to-teal-500', duration: '2 min' },
  { id: '4', title: 'Survey', reward: 250, icon: 'video', color: 'from-amber-500 to-orange-500', duration: '10 min' },
];

const data = [
  { name: 'Mon', coins: 400 },
  { name: 'Tue', coins: 300 },
  { name: 'Wed', coins: 600 },
  { name: 'Thu', coins: 200 },
  { name: 'Fri', coins: 800 },
  { name: 'Sat', coins: 1200 },
  { name: 'Sun', coins: 900 },
];

export const Dashboard: React.FC<DashboardProps> = ({ balance, onEarn }) => {
  const [activeActivity, setActiveActivity] = useState<string | null>(null);

  const handleEarn = (activity: EarningActivity) => {
    setActiveActivity(activity.id);
    
    // Simulate activity duration
    setTimeout(() => {
      onEarn(activity.reward, `Completed: ${activity.title}`);
      setActiveActivity(null);
      
      // Trigger confetti
      canvasConfetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#10b981', '#f43f5e']
      });
    }, 1000); // Fast for demo purposes
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-indigo-900/50 to-slate-900/50 border-indigo-500/20 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-slate-400 text-sm font-medium mb-1">Current Balance</h2>
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-bold text-white">{balance.toLocaleString()}</span>
              <span className="text-indigo-400 font-medium">coins</span>
            </div>
            <p className="text-sm text-slate-500 mt-2">≈ €{(balance / 1000).toFixed(2)} EUR</p>
          </div>
          <div className="absolute right-0 top-0 p-4 opacity-10">
             <Trophy size={100} />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-200 font-medium">Weekly Activity</h3>
            <TrendingUp className="text-emerald-400 w-5 h-5" />
          </div>
          <div className="h-[100px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                <XAxis dataKey="name" hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                  cursor={{fill: '#334155', opacity: 0.4}}
                />
                <Bar dataKey="coins" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Activities Grid */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
          <Gamepad2 className="w-6 h-6 mr-2 text-primary-500" />
          Available Tasks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {activities.map((activity) => (
            <Card key={activity.id} className="group hover:border-slate-600 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${activity.color} flex items-center justify-center text-white shadow-lg`}>
                    {activity.icon === 'game' ? <Gamepad2 className="w-6 h-6" /> : <Video className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-white group-hover:text-primary-400 transition-colors">{activity.title}</h3>
                    <p className="text-xs text-slate-400">{activity.duration} • +{activity.reward} coins</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => handleEarn(activity)}
                  isLoading={activeActivity === activity.id}
                  className="rounded-full !px-6"
                >
                  {activeActivity === activity.id ? 'Playing...' : 'Start'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Featured Banner */}
      <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-blue-900/80 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80" 
          alt="Premium" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="relative z-20 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div>
            <span className="inline-block px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-bold mb-2 border border-yellow-500/30">PREMIUM TASK</span>
            <h3 className="text-2xl font-bold text-white mb-1">Install & Play: Dragon Quest</h3>
            <p className="text-indigo-200 text-sm">Reach Level 10 to earn a massive reward.</p>
          </div>
          <div className="mt-4 sm:mt-0">
             <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 text-center">
               <span className="block text-2xl font-bold text-yellow-400">5,000</span>
               <span className="text-xs text-white uppercase tracking-wider">Coins</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};