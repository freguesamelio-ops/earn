import React from 'react';
import { Card } from './Card';
import { Transaction, PaymentMethodType } from '../types';
import { ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, XCircle } from 'lucide-react';

interface HistoryProps {
  transactions: Transaction[];
}

export const History: React.FC<HistoryProps> = ({ transactions }) => {
  return (
    <div className="space-y-4 pb-20">
      <h2 className="text-xl font-bold text-white mb-4">Transaction History</h2>
      {transactions.length === 0 ? (
        <Card className="text-center py-12">
          <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-500">
            <Clock className="w-8 h-8" />
          </div>
          <p className="text-slate-400">No transactions yet.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {transactions.map((tx) => (
            <Card key={tx.id} className="!p-4 flex items-center justify-between group hover:bg-slate-800/80 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  tx.type === 'earning' 
                    ? 'bg-emerald-500/10 text-emerald-500' 
                    : 'bg-indigo-500/10 text-indigo-500'
                }`}>
                  {tx.type === 'earning' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="font-medium text-slate-200">{tx.description}</h4>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                    <span>{new Date(tx.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span className={`capitalize flex items-center gap-1 ${
                      tx.status === 'completed' ? 'text-emerald-400' :
                      tx.status === 'pending' ? 'text-amber-400' : 'text-red-400'
                    }`}>
                      {tx.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className={`font-bold ${tx.type === 'earning' ? 'text-emerald-400' : 'text-white'}`}>
                  {tx.type === 'earning' ? '+' : '-'}{tx.amount.toLocaleString()}
                </span>
                <p className="text-xs text-slate-500">{tx.type === 'earning' ? 'Coins' : 'EUR'}</p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};