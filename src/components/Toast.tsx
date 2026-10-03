import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { AppNotification } from '../types';

interface ToastProps {
  notifications: AppNotification[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ notifications, onDismiss }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {notifications.map((n) => (
        <ToastItem key={n.id} notification={n} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ notification: AppNotification; onDismiss: (id: string) => void }> = ({
  notification,
  onDismiss
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(notification.id);
    }, 4500);
    return () => clearTimeout(timer);
  }, [notification.id, onDismiss]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-600 shrink-0" />
  };

  const borderClasses = {
    success: 'border-emerald-500 bg-emerald-50/95 text-emerald-950',
    error: 'border-red-500 bg-red-50/95 text-red-950',
    warning: 'border-amber-500 bg-amber-50/95 text-amber-950',
    info: 'border-blue-500 bg-blue-50/95 text-blue-950'
  };

  return (
    <div
      className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border-l-4 shadow-lg backdrop-blur-sm transition-all duration-300 transform translate-y-0 ${
        borderClasses[notification.type]
      }`}
      role="alert"
    >
      {icons[notification.type]}
      <div className="flex-1 text-xs sm:text-sm font-semibold leading-snug">
        {notification.message}
      </div>
      <button
        onClick={() => onDismiss(notification.id)}
        className="text-slate-400 hover:text-slate-700 p-0.5"
        aria-label="Tutup notifikasi"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
