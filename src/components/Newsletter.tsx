import React, { useState, useEffect } from 'react';
import { Mail, ArrowRight, ArrowLeft, CheckCircle2, Loader2, ShieldCheck, AlertCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { useLanguage } from '../context/LanguageContext';

const STORAGE_KEY = 'nubix_newsletter_subscribers';

export const Newsletter: React.FC = () => {
  const { theme } = useTheme();
  const { language, isRTL, t } = useLanguage();
  const toast = useToast();
  const isDark = theme === 'dark';
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [lastSubscribedEmail, setLastSubscribedEmail] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const list = JSON.parse(stored);
        if (Array.isArray(list) && list.length > 0) {
          setLastSubscribedEmail(list[list.length - 1]);
        }
      }
    } catch {
      // Ignore localStorage issues
    }
  }, []);

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      const err = language === 'ar'
        ? 'يرجى إدخال عنوان بريدك الإلكتروني.'
        : 'Please enter your work or personal email address.';
      setStatus('error');
      setErrorMessage(err);
      toast.error(
        language === 'ar' ? 'فشل الاشتراك' : 'Subscription Failed',
        err
      );
      return;
    }

    if (!validateEmail(cleanEmail)) {
      const err = language === 'ar'
        ? 'يرجى التأكد من كتابة البريد الإلكتروني بشكل صحيح (مثال: name@company.com).'
        : 'Please enter a valid email address (e.g., name@company.com).';
      setStatus('error');
      setErrorMessage(err);
      toast.error(
        language === 'ar' ? 'بريد إلكتروني غير صالح' : 'Invalid Email Address',
        err
      );
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    setTimeout(() => {
      try {
        const existingRaw = localStorage.getItem(STORAGE_KEY);
        const existing: string[] = existingRaw ? JSON.parse(existingRaw) : [];
        if (!existing.includes(cleanEmail)) {
          existing.push(cleanEmail);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
        }
      } catch {
        // Fallback gracefully
      }

      setLastSubscribedEmail(cleanEmail);
      setStatus('success');
      setEmail('');

      toast.success(
        language === 'ar' ? 'تم تأكيد الاشتراك بنجاح' : 'Subscription Confirmed',
        language === 'ar'
          ? `تم اشتراكك في نشرة نوبيكس التقنية (${cleanEmail}). سنوافيك بآخر الإصدارات المعمارية والبرمجية.`
          : `You've been subscribed to Nubix Studio Dispatches (${cleanEmail}). The next architectural release note is on its way.`,
        {
          duration: 6000,
        }
      );
    }, 600);
  };

  const handleReset = () => {
    setStatus('idle');
    setErrorMessage('');
    setEmail('');
  };

  return (
    <div className="relative mb-16">
      {/* Dynamic 3D ambient aura behind the glass card */}
      <div
        className={`absolute -inset-1 rounded-3xl blur-2xl opacity-40 pointer-events-none transition-all duration-500 ${
          isDark
            ? 'bg-gradient-to-r from-[#C50337]/20 via-[#1E020C]/50 to-[#69001F]/30'
            : 'bg-gradient-to-r from-[#69001F]/15 via-[#F5EAF0]/60 to-[#69001F]/10'
        }`}
        aria-hidden="true"
      />

      {/* Main glass-panel-3d card container */}
      <div
        className={`glass-panel-3d relative rounded-2xl md:rounded-3xl p-8 sm:p-10 md:p-12 overflow-hidden border ${
          isDark
            ? 'border-[#69001F]/70 text-[#F5EAF0]'
            : 'border-[#69001F]/20 text-[#02060E]'
        }`}
      >
        {/* Subtle decorative grid overlay inside glass */}
        <div
          className="absolute inset-0 tech-grid-bg opacity-20 pointer-events-none"
          aria-hidden="true"
        />

        {/* Decorative corner light accent */}
        <div
          className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none ${
            isDark ? 'bg-[#C50337]/10' : 'bg-[#69001F]/10'
          }`}
          aria-hidden="true"
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Header & Value Proposition */}
          <div className="lg:col-span-7 space-y-4">
            {/* Tech Radar Editorial Kicker */}
            <div
              className={`flex items-center gap-2 text-xs font-mono tracking-wider uppercase ${
                isDark ? 'text-[#C50337]' : 'text-[#69001F]'
              }`}
            >
              <span className="font-semibold">
                {language === 'ar' ? 'رادار نوبيكس الهندسي' : 'Nubix Technical Radar'}
              </span>
              <span aria-hidden="true" className={isDark ? 'text-[#F5EAF0]/30' : 'text-[#69001F]/30'}>·</span>
              <span className={isDark ? 'text-[#F5EAF0]/65' : 'text-[#69001F]/70'}>
                {language === 'ar' ? 'نشرة هندسية نصف شهرية' : 'Bi-Weekly Dispatch'}
              </span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-balance">
              {t.newsletter.title}
            </h2>

            <p
              className={`text-sm sm:text-base leading-relaxed max-w-xl ${
                isDark ? 'text-[#F5EAF0]/75' : 'text-[#69001F]/80'
              }`}
            >
              {t.newsletter.subtitle}
            </p>

            {/* Topic Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono">
              <span
                className={`px-2.5 py-1 rounded-md border ${
                  isDark
                    ? 'bg-[#1E020C]/80 border-[#69001F]/60 text-[#F5EAF0]/85'
                    : 'bg-white/90 border-[#69001F]/15 text-[#02060E]'
                }`}
              >
                {language === 'ar' ? 'نماذج الذكاء الاصطناعي للإنتاج' : 'Production LLMs'}
              </span>
              <span
                className={`px-2.5 py-1 rounded-md border ${
                  isDark
                    ? 'bg-[#1E020C]/80 border-[#69001F]/60 text-[#F5EAF0]/85'
                    : 'bg-white/90 border-[#69001F]/15 text-[#02060E]'
                }`}
              >
                {language === 'ar' ? 'معماريات الأنظمة الموزعة' : 'Distributed Systems'}
              </span>
              <span
                className={`px-2.5 py-1 rounded-md border ${
                  isDark
                    ? 'bg-[#1E020C]/80 border-[#69001F]/60 text-[#F5EAF0]/85'
                    : 'bg-white/90 border-[#69001F]/15 text-[#02060E]'
                }`}
              >
                {language === 'ar' ? 'إصدارات الاستوديو' : 'Studio Releases'}
              </span>
            </div>
          </div>

          {/* Form / Subscription Action */}
          <div className="lg:col-span-5">
            {status === 'success' ? (
              <div
                className={`p-6 sm:p-7 rounded-xl border backdrop-blur-md transition-all animate-fadeIn ${
                  isDark
                    ? 'bg-[#1E020C]/95 border-[#C50337]/40 shadow-lg shadow-[#C50337]/10'
                    : 'bg-white/95 border-[#69001F]/30 shadow-lg shadow-[#69001F]/10'
                }`}
                role="status"
                aria-live="polite"
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`p-2 rounded-lg shrink-0 ${
                      isDark
                        ? 'bg-[#C50337]/15 text-[#C50337]'
                        : 'bg-[#69001F]/15 text-[#69001F]'
                    }`}
                  >
                    <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <h3 className="font-semibold text-base">
                      {language === 'ar' ? 'أنت الآن في قائمة المتابعين!' : "You're on the radar!"}
                    </h3>
                    <p
                      className={`text-xs sm:text-sm leading-relaxed ${
                        isDark ? 'text-[#F5EAF0]/75' : 'text-[#69001F]/80'
                      }`}
                    >
                      {t.newsletter.success}
                    </p>
                    <p
                      className={`font-mono text-xs font-semibold truncate ${
                        isDark ? 'text-[#C50337]' : 'text-[#69001F]'
                      }`}
                    >
                      {lastSubscribedEmail}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-dashed flex items-center justify-between text-xs border-current/15">
                  <span className={isDark ? 'text-[#F5EAF0]/60' : 'text-[#69001F]/70'}>
                    {language === 'ar' ? 'تصدر النشرة يومي ١ و ١٥ من كل شهر' : 'Check your inbox on the 1st & 15th'}
                  </span>
                  <button
                    type="button"
                    onClick={handleReset}
                    className={`font-medium underline transition-colors cursor-pointer ${
                      isDark
                        ? 'text-[#F5EAF0]/80 hover:text-[#C50337]'
                        : 'text-[#69001F] hover:text-[#02060E]'
                    }`}
                  >
                    {language === 'ar' ? 'تسجيل بريد آخر' : 'Subscribe another'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
                <div className="relative">
                  <label htmlFor="newsletter-email-input" className="sr-only">
                    {language === 'ar' ? 'البريد الإلكتروني للنشرة التقنية' : 'Email address for technical newsletter'}
                  </label>

                  <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-red-400/60">
                        <Mail className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <input
                        id="newsletter-email-input"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (status === 'error') setStatus('idle');
                        }}
                        disabled={status === 'loading'}
                        placeholder={t.newsletter.placeholder}
                        aria-invalid={status === 'error'}
                        aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
                        className={`w-full ps-10 pe-4 py-3.5 rounded-xl text-sm transition-all outline-none font-sans ${
                          isDark
                            ? 'bg-[#1E020C]/90 border border-[#69001F]/70 text-[#F5EAF0] placeholder-[#F5EAF0]/40 focus:border-[#C50337] focus:ring-2 focus:ring-[#C50337]/25'
                            : 'bg-white/95 border border-[#69001F]/25 text-[#02060E] placeholder-slate-400 focus:border-[#69001F] focus:ring-2 focus:ring-[#69001F]/20'
                        } ${status === 'error' ? '!border-rose-500 !ring-rose-500/20' : ''}`}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer shadow-md shrink-0 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed ${
                        isDark
                          ? 'crimson-noir-gradient text-[#F5EAF0] font-bold shadow-[0_0_18px_rgba(197,3,55,0.3)] hover:shadow-[0_0_24px_rgba(197,3,55,0.5)]'
                          : 'bg-[#69001F] text-[#F5EAF0] hover:bg-[#3B0018]'
                      }`}
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                          <span>{language === 'ar' ? 'جارٍ التسجيل...' : 'Joining...'}</span>
                        </>
                      ) : (
                        <>
                          <span>{t.newsletter.button}</span>
                          <ArrowIcon className="w-4 h-4" aria-hidden="true" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Validation Error Message */}
                {status === 'error' && (
                  <div
                    id="newsletter-error"
                    className="flex items-center gap-2 text-xs text-rose-500 font-medium px-1"
                    role="alert"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Privacy & Frequency Reassurance */}
                <div
                  className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs pt-1 px-1 ${
                    isDark ? 'text-[#F5EAF0]/55' : 'text-[#69001F]/70'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C50337] shrink-0" aria-hidden="true" />
                    <span>
                      {language === 'ar'
                        ? 'بدون رسائل ترويجية مزعجة. يمكنك إلغاء الاشتراك بنقرة واحدة دائماً.'
                        : 'Zero spam. Unsubscribe in 1 click at any time.'}
                    </span>
                  </div>
                  {lastSubscribedEmail && (
                    <span className="font-mono text-[11px] opacity-80">
                      {language === 'ar' ? 'مشترك بالفعل؟ التحديثات ستصلك تلقائياً.' : 'Already subscribed? New updates auto-synced.'}
                    </span>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
