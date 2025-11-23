import React, { useState, useEffect } from 'react';
import { User, ViewState, Transaction, PaymentMethodType } from './types';
import { AuthScreen } from './components/AuthScreen';
import { Dashboard } from './components/Dashboard';
import { Withdraw } from './components/Withdraw';
import { History } from './components/History';
import { Navigation } from './components/Navigation';
import { Bell, UserCircle } from 'lucide-react';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<ViewState>('auth');
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Simulate loading user from local storage
  useEffect(() => {
    const savedUser = localStorage.getItem('earnplay_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setBalance(2540); // Initial demo balance
      setView('dashboard');
    }
  }, []);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('earnplay_user', JSON.stringify(newUser));
    setBalance(100); // Sign up bonus
    setView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('earnplay_user');
    setView('auth');
  };

  const handleEarn = (amount: number, description: string) => {
    setBalance(prev => prev + amount);
    const newTx: Transaction = {
      id: Date.now().toString(),
      type: 'earning',
      amount,
      date: new Date().toISOString(),
      status: 'completed',
      description
    };
    setTransactions(prev => [newTx, ...prev]);
  };

  const handleWithdraw = async (amount: number, method: PaymentMethodType, details: string) => {
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const coinsDeducted = amount * 1000;
        setBalance(prev => prev - coinsDeducted);
        const newTx: Transaction = {
          id: Date.now().toString(),
          type: 'withdrawal',
          amount, // Store in EUR
          method,
          details,
          date: new Date().toISOString(),
          status: 'pending',
          description: `Withdrawal to ${method}`
        };
        setTransactions(prev => [newTx, ...prev]);
        resolve();
      }, 1500);
    });
  };

  if (!user || view === 'auth') {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      <Navigation currentView={view} onNavigate={setView} onLogout={handleLogout} />
      
      <main className="flex-1 max-w-5xl mx-auto w-full p-4 md:p-8">
        <header className="flex items-center justify-between mb-8">
          <div className="md:hidden">
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              EarnPlay
            </h1>
          </div>
          
          <div className="hidden md:block">
            <h2 className="text-2xl font-bold text-white">
              {view === 'dashboard' && 'Dashboard'}
              {view === 'withdraw' && 'Cashout'}
              {view === 'history' && 'History'}
            </h2>
            <p className="text-slate-400 text-sm">Welcome back, {user.name.split(' ')[0]}!</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-full hover:bg-slate-800 transition-colors">
              <Bell className="w-6 h-6 text-slate-400" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-950"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-700 overflow-hidden">
               {user.avatarUrl ? (
                 <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
               ) : (
                 <UserCircle className="w-full h-full text-slate-400 p-1" />
               )}
            </div>
          </div>
        </header>

        <div className="animate-fade-in">
          {view === 'dashboard' && (
            <Dashboard balance={balance} onEarn={handleEarn} />
          )}
          {view === 'withdraw' && (
            <Withdraw balance={balance} onWithdraw={handleWithdraw} />
          )}
          {view === 'history' && (
            <History transactions={transactions} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;