import React, { useState } from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { Input } from './Input';
import { PaymentMethodType } from '../types';
import { CreditCard, Smartphone, Wallet, Gift, AlertCircle, CheckCircle2 } from 'lucide-react';

interface WithdrawProps {
  balance: number;
  onWithdraw: (amount: number, method: PaymentMethodType, details: string) => Promise<void>;
}

const methods = [
  { type: PaymentMethodType.PAYPAL, icon: Wallet, label: 'PayPal', min: 2.00, color: 'text-blue-500' },
  { type: PaymentMethodType.STRIPE, icon: CreditCard, label: 'Visa / MC', min: 5.00, color: 'text-indigo-500' },
  { type: PaymentMethodType.MBWAY, icon: Smartphone, label: 'MB WAY', min: 1.00, color: 'text-red-500' },
  { type: PaymentMethodType.MULTIBANCO, icon: CreditCard, label: 'Multibanco', min: 10.00, color: 'text-slate-400' },
  { type: PaymentMethodType.GIFTCARD, icon: Gift, label: 'Gift Card', min: 5.00, color: 'text-pink-500' },
];

export const Withdraw: React.FC<WithdrawProps> = ({ balance, onWithdraw }) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>(PaymentMethodType.PAYPAL);
  const [amount, setAmount] = useState<string>('');
  const [details, setDetails] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const balanceEur = balance / 1000;
  const currentMethod = methods.find(m => m.type === selectedMethod);
  const amountNum = parseFloat(amount);
  const coinsNeeded = amountNum * 1000;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amountNum || amountNum < (currentMethod?.min || 0)) return;
    if (coinsNeeded > balance) return;

    setIsLoading(true);
    await onWithdraw(amountNum, selectedMethod, details);
    setIsLoading(false);
    setSuccess(true);
    setAmount('');
    setDetails('');
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20">
      <Card className="bg-gradient-to-br from-indigo-900 to-slate-900 border-indigo-500/30">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-slate-400 text-sm">Available for withdrawal</p>
            <h2 className="text-3xl font-bold text-white">€{balanceEur.toFixed(2)}</h2>
          </div>
          <div className="text-right">
            <p className="text-slate-400 text-sm">{balance.toLocaleString()} coins</p>
            <p className="text-xs text-slate-500">1000 coins = €1.00</p>
          </div>
        </div>
      </Card>

      <div>
        <h3 className="text-lg font-medium text-white mb-4">Select Payment Method</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {methods.map((method) => {
            const Icon = method.icon;
            const isSelected = selectedMethod === method.type;
            return (
              <div
                key={method.type}
                onClick={() => setSelectedMethod(method.type)}
                className={`cursor-pointer rounded-xl p-4 border transition-all duration-200 flex flex-col items-center justify-center gap-2
                  ${isSelected 
                    ? 'bg-primary-600/10 border-primary-500 shadow-lg shadow-primary-500/10' 
                    : 'bg-slate-800 border-slate-700 hover:border-slate-600 hover:bg-slate-750'
                  }`}
              >
                <Icon className={`w-8 h-8 ${method.color}`} />
                <span className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-slate-400'}`}>
                  {method.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <Card>
        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Withdrawal Requested!</h3>
            <p className="text-slate-400">Your request has been received and is pending approval.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Amount (EUR)</label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-slate-400">€</span>
                <input
                  type="number"
                  step="0.01"
                  min={currentMethod?.min}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="block w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-8 text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="0.00"
                />
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Minimum withdrawal for {currentMethod?.label}: €{currentMethod?.min.toFixed(2)}
              </p>
            </div>

            <Input 
              label={
                selectedMethod === PaymentMethodType.PAYPAL ? "PayPal Email" :
                selectedMethod === PaymentMethodType.MBWAY ? "Phone Number" :
                selectedMethod === PaymentMethodType.STRIPE ? "Card Number (Demo)" :
                selectedMethod === PaymentMethodType.MULTIBANCO ? "IBAN (for payout)" :
                "Email for Code Delivery"
              }
              placeholder="Enter details..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required
            />
            
            {amountNum > balanceEur && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4" />
                Insufficient balance
              </div>
            )}

            <Button 
              type="submit" 
              fullWidth 
              size="lg"
              disabled={!amountNum || amountNum < (currentMethod?.min || 0) || amountNum > balanceEur}
              isLoading={isLoading}
            >
              Withdraw €{amountNum ? amountNum.toFixed(2) : '0.00'}
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
};