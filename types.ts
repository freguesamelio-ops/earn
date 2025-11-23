export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export enum PaymentMethodType {
  PAYPAL = 'PayPal',
  STRIPE = 'Visa/Mastercard',
  MBWAY = 'MB WAY',
  MULTIBANCO = 'Multibanco',
  GIFTCARD = 'Gift Card'
}

export interface Transaction {
  id: string;
  type: 'earning' | 'withdrawal';
  amount: number; // In coins for earning, EUR for withdrawal
  method?: PaymentMethodType;
  details?: string;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  description: string;
}

export type ViewState = 'auth' | 'dashboard' | 'withdraw' | 'history';

export interface EarningActivity {
  id: string;
  title: string;
  reward: number;
  icon: string;
  color: string;
  duration: string;
}