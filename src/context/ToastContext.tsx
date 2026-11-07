import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useTheme } from './ThemeContext';

export type ToastType = 'success' | 'info' | 'warning' | 'error';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number; // in milliseconds (default 5000)
  createdAt: number;
  action?: ToastAction;
}

export type ToastInput = Omit<Toast, 'id' | 'createdAt'>;

interface ToastContextType {
  toasts: Toast[];
  showToast: (input: ToastInput) => string;
  success: (title: string, message?: string, options?: Partial<ToastInput>) => string;
  error: (title: string, message?: string, options?: Partial<ToastInput>) => string;
  info: (title: string, message?: string, options?: Partial<ToastInput>) => string;
  warning: (title: string, message?: string, options?: Partial<ToastInput>) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastItemProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onRemove }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const duration = toast.duration ?? 5000;

  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(100);
  const [isExiting, setIsExiting] = useState(false);
  
  const startTimeRef = useRef<number>(Date.now());
  const remainingTimeRef = useRef<number>(duration);
  const animFrameRef = useRef<number | null>(null);

  const handleDismiss = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onRemove(toast.id);
    }, 240);
  }, [onRemove, toast.id]);

  useEffect(() => {
    if (duration <= 0) return;

    if (isPaused) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    startTimeRef.current = Date.now();

    const updateProgress = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const timeLeft = Math.max(0, remainingTimeRef.current - elapsed);
      const ratio = Math.max(0, (timeLeft / duration) * 100);
      setProgress(ratio);

      if (timeLeft <= 0) {
        handleDismiss();
      } else {
        animFrameRef.current = requestAnimationFrame(updateProgress);
      }
    };

    animFrameRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      remainingTimeRef.current = Math.max(0, remainingTimeRef.current - (Date.now() - startTimeRef.current));
    };
  }, [isPaused, duration, handleDismiss]);

  const typeConfig = {
    success: {
      badgeText: 'SUBSCRIPTION · LIVE',
      icon: CheckCircle2,
      accentColor: isDark ? 'text-[#D9A441]' : 'text-[#143C5A]',
      glowColor: isDark ? 'rgba(217, 164, 65, 0.25)' : 'rgba(20, 60, 90, 0.15)',
      progressBar: isDark ? 'bg-[#D9A441]' : 'bg-[#143C5A]',
      borderColor: isDark ? 'border-[#D9A441]/35' : 'border-[#143C5A]/30',
    },
    error: {
      badgeText: 'SYSTEM · ATTENTION',
      icon: AlertCircle,
      accentColor: isDark ? 'text-rose-400' : 'text-rose-600',
      glowColor: isDark ? 'rgba(251, 113, 133, 0.25)' : 'rgba(225, 29, 72, 0.15)',
      progressBar: isDark ? 'bg-rose-400' : 'bg-rose-600',
      borderColor: isDark ? 'border-rose-500/30' : 'border-rose-400/30',
    },
    warning: {
      badgeText: 'ADVISORY · NOTICE',
      icon: AlertTriangle,
      accentColor: isDark ? 'text-amber-400' : 'text-amber-600',
      glowColor: isDark ? 'rgba(251, 191, 36, 0.25)' : 'rgba(217, 119, 6, 0.15)',
      progressBar: isDark ? 'bg-amber-400' : 'bg-amber-600',
      borderColor: isDark ? 'border-amber-500/30' : 'border-amber-400/30',
    },
    info: {
      badgeText: 'SYSTEM · DISPATCH',
      icon: Info,
      accentColor: isDark ? 'text-cyan-400' : 'text-cyan-600',
      glowColor: isDark ? 'rgba(34, 211, 238, 0.25)' : 'rgba(8, 145, 178, 0.15)',
      progressBar: isDark ? 'bg-cyan-400' : 'bg-cyan-600',
      borderColor: isDark ? 'border-cyan-500/30' : 'border-cyan-400/30',
    },
  }[toast.type];

  const Icon = typeConfig.icon;

  return (
    <div
      role="status"
      aria-live="polite"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      style={{
        boxShadow: isDark
          ? `0 20px 45px -10px rgba(0,0,0,0.7), 0 0 25px -5px ${typeConfig.glowColor}`
          : `0 16px 36px -10px rgba(16,24,32,0.12), 0 0 18px -4px ${typeConfig.glowColor}`,
      }}
      className={`group relative overflow-hidden rounded-xl border backdrop-blur-2xl transition-all duration-300 pointer-events-auto ${
        typeConfig.borderColor
      } ${
        isDark
          ? 'bg-[#1E020C]/95 text-[#F5EAF0]'
          : 'bg-white/95 text-[#02060E]'
      } ${
        isExiting
          ? 'opacity-0 translate-y-3 scale-95'
          : 'opacity-100 translate-y-0 scale-100'
      }`}
    >
      {/* Dynamic ambient highlight glow */}
      <div
        className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 rounded-full blur-xl pointer-events-none opacity-30"
        style={{ backgroundColor: typeConfig.accentColor }}
        aria-hidden="true"
      />

      <div className="p-4 sm:p-5 flex items-start gap-3.5">
        {/* Leading Icon Badge */}
        <div
          className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center border transition-transform duration-200 group-hover:scale-105 ${
            isDark
              ? 'bg-[#02060E] border-[#69001F]/60'
              : 'bg-slate-50 border-black/5'
          }`}
        >
          <Icon className={`w-5 h-5 ${typeConfig.accentColor}`} />
        </div>

        {/* Content Body */}
        <div className="flex-1 min-w-0 pr-1">
          {/* Typographic Kicker */}
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`inline-block w-1.5 h-1.5 rounded-full animate-pulse ${
                toast.type === 'success'
                  ? isDark
                    ? 'bg-[#D9A441]'
                    : 'bg-[#143C5A]'
                  : isDark
                  ? 'bg-rose-400'
                  : 'bg-rose-600'
              }`}
            />
            <span
              className={`text-[10px] font-mono tracking-wider uppercase font-semibold ${
                typeConfig.accentColor
              }`}
            >
              {typeConfig.badgeText}
            </span>
          </div>

          <h4 className="font-display text-sm font-bold tracking-tight text-inherit">
            {toast.title}
          </h4>

          {toast.message && (
            <p
              className={`text-xs mt-1 leading-relaxed ${
                isDark ? 'text-[#FAF6EE]/75' : 'text-[#1D2733]/80'
              }`}
            >
              {toast.message}
            </p>
          )}

          {toast.action && (
            <div className="mt-3">
              <button
                type="button"
                onClick={() => {
                  toast.action?.onClick();
                  handleDismiss();
                }}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                  isDark
                    ? 'syene-gold-gradient text-[#0A1622] font-bold border-[#D9A441]/50 shadow-xs'
                    : 'bg-[#143C5A] text-white border-[#143C5A]'
                }`}
              >
                {toast.action.label}
              </button>
            </div>
          )}
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss notification"
          className={`shrink-0 p-1.5 rounded-lg transition-colors -mr-1 -mt-1 ${
            isDark
              ? 'text-white/40 hover:text-white hover:bg-white/10'
              : 'text-slate-400 hover:text-slate-800 hover:bg-slate-100'
          }`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Countdown Progress Bar */}
      {duration > 0 && (
        <div
          className={`h-0.5 w-full ${
            isDark ? 'bg-white/5' : 'bg-slate-100'
          }`}
        >
          <div
            className={`h-full transition-all duration-75 ${typeConfig.progressBar}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const showToast = useCallback(
    (input: ToastInput): string => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      const newToast: Toast = {
        ...input,
        id,
        createdAt: Date.now(),
      };

      setToasts((prev) => {
        // Keep max 4 toasts at once to prevent viewport clutter
        const updated = [...prev, newToast];
        if (updated.length > 4) {
          return updated.slice(updated.length - 4);
        }
        return updated;
      });

      return id;
    },
    []
  );

  const success = useCallback(
    (title: string, message?: string, options?: Partial<ToastInput>) => {
      return showToast({
        type: 'success',
        title,
        message,
        ...options,
      });
    },
    [showToast]
  );

  const error = useCallback(
    (title: string, message?: string, options?: Partial<ToastInput>) => {
      return showToast({
        type: 'error',
        title,
        message,
        ...options,
      });
    },
    [showToast]
  );

  const info = useCallback(
    (title: string, message?: string, options?: Partial<ToastInput>) => {
      return showToast({
        type: 'info',
        title,
        message,
        ...options,
      });
    },
    [showToast]
  );

  const warning = useCallback(
    (title: string, message?: string, options?: Partial<ToastInput>) => {
      return showToast({
        type: 'warning',
        title,
        message,
        ...options,
      });
    },
    [showToast]
  );

  return (
    <ToastContext.Provider
      value={{
        toasts,
        showToast,
        success,
        error,
        info,
        warning,
        removeToast,
        clearToasts,
      }}
    >
      {children}

      {/* Floating Toast Notification Container */}
      <aside
        aria-label="Notifications"
        className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-50 flex flex-col gap-3 max-w-[calc(100vw-2.5rem)] w-[390px] pointer-events-none select-none"
      >
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </aside>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
