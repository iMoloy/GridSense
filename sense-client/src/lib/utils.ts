import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatKwh(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2)} GWh`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)} MWh`;
  }
  return `${value.toLocaleString('en-US', { maximumFractionDigits: 1 })} kWh`;
}

export function formatCurrency(amount: number, currency: string = 'BDT'): string {
  const symbols: Record<string, string> = {
    BDT: '৳',
    USD: '$',
    EUR: '€',
    GBP: '£',
    INR: '₹',
  };
  const symbol = symbols[currency] ?? currency + ' ';
  return `${symbol}${amount.toLocaleString('en-US', {
    maximumFractionDigits: 0,
  })}`;
}

export function formatNumber(num: number): string {
  return num.toLocaleString('en-US');
}

export function formatCarbon(kg: number): string {
  if (kg >= 1_000) {
    return `${(kg / 1_000).toFixed(2)} t CO₂`;
  }
  return `${kg.toFixed(0)} kg CO₂`;
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

  if (diffInMinutes < 1) return 'just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays}d ago`;
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths}mo ago`;
  return `${Math.floor(diffInMonths / 12)}y ago`;
}
