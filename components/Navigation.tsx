import React from 'react';
import { ViewState } from '../types';
import { LayoutDashboard, Wallet, History, LogOut } from 'lucide-react';

interface NavigationProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onLogout: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate, onLogout }) => {
  const items = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Earn' },
    { id: 'withdraw', icon: Wallet, label: 'Wallet' },
    { id: 'history', icon: History, label: 'History' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-lg border-t border-slate-800 px-6 py-2 z-50 md:sticky md:top-0 md:h-screen md:w-64 md:flex-col md:border-r md:border-t-0 md:justify-start md:px-4 md:py-8">
      
      <div className="hidden md:flex items-center gap-3 px-4 mb-8">
        <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-lg shadow-primary-500/20">
          <span className="text-lg font-bold text-white">E</span>
        </div>
        <span className="text-xl font-bold text-white tracking-tight">EarnPlay</span>
      </div>

      <div className="flex md:flex-col justify-between md:justify-start md:gap-2 h-full">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as ViewState)}
              className={`flex flex-col md:flex-row items-center md:gap-3 p-2 md:px-4 md:py-3 rounded-xl transition-all duration-200
                ${isActive 
                  ? 'text-primary-400 md:bg-primary-500/10' 
                  : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
                }`}
            >
              <Icon className={`w-6 h-6 md:w-5 md:h-5 ${isActive ? 'animate-bounce-short' : ''}`} />
              <span className="text-xs md:text-sm font-medium mt-1 md:mt-0">{item.label}</span>
            </button>
          );
        })}
        
        <button
          onClick={onLogout}
          className="hidden md:flex items-center gap-3 p-2 md:px-4 md:py-3 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 mt-auto"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
};