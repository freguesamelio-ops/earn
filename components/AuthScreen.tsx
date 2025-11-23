import React, { useState } from 'react';
import { User } from '../types';
import { Button } from './Button';
import { Input } from './Input';
import { Mail, Facebook, Chrome, Lock } from 'lucide-react';

interface AuthScreenProps {
  onLogin: (user: User) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleSimulatedLogin = (provider: string) => {
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      onLogin({
        id: 'user-' + Math.random().toString(36).substr(2, 9),
        name: provider === 'email' ? 'Demo User' : `${provider} User`,
        email: provider === 'email' ? 'demo@example.com' : `user@${provider.toLowerCase()}.com`,
        avatarUrl: `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/200/200`
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm"></div>
      
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-primary-500/20">
            <span className="text-3xl font-bold text-white">E</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">EarnPlay</h1>
          <p className="text-slate-400">Play games, watch videos, earn real cash.</p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="secondary" 
              onClick={() => handleSimulatedLogin('Google')}
              disabled={isLoading}
              className="!bg-white !text-slate-900 hover:!bg-slate-100"
            >
              <Chrome className="w-5 h-5 mr-2 text-blue-500" />
              Google
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => handleSimulatedLogin('Facebook')}
              disabled={isLoading}
              className="!bg-[#1877F2] !text-white !border-[#1877F2] hover:!bg-[#1864D6]"
            >
              <Facebook className="w-5 h-5 mr-2" />
              Facebook
            </Button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-900 text-slate-500">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleSimulatedLogin('email'); }} className="space-y-4">
            <Input 
              type="email" 
              placeholder="Email address" 
              icon={<Mail className="w-5 h-5" />}
              required
            />
            <Input 
              type="password" 
              placeholder="Password" 
              icon={<Lock className="w-5 h-5" />}
              required
            />
            <Button type="submit" fullWidth isLoading={isLoading}>
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="text-center mt-6">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-primary-400 hover:text-primary-300"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
            <div className="mt-2">
              <button className="text-xs text-slate-500 hover:text-slate-400">
                Forgot password?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};