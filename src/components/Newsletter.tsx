import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight, ArrowLeft, Loader2, AlertCircle, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [lastSubscribedEmail, setLastSubscribedEmail] = useState<string | null>(null);

  const { language, isRTL, t } = useLanguage();
  const { theme } = useTheme();
  const toast = useToast();
  const isDark = theme === 'dark';
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const validateEmail = (val: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();

    if (!cleanEmail) {
      setStatus('error');
      const msg =
        language === 'ar'
          ? 'يرجى إدخال عنوان بريدك الإلكتروني.'
          : 'Please enter your work email address.';
      setErrorMessage(msg);
      toast.error(language === 'ar' ? 'حقل البريد مطلوب' : 'Email Required', msg);
      return;
    }

    if (!validateEmail(cleanEmail)) {
      setStatus('error');
      const msg =
        language === 'ar'
          ? 'يرجى إدخال عنوان بريد إلكتروني صالح (مثال: name@company.com).'
          : 'Please enter a valid work email (e.g. name@company.com).';
      setErrorMessage(msg);
      toast.error(language === 'ar' ? 'صيغة بريد غير صحيحة' : 'Invalid Email Format', msg);
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    // Simulate reliable dispatch
    setTimeout(() => {
      try {
        const stored = localStorage.getItem('syene_newsletter_subscribers');
        const list: string[] = stored ? JSON.parse(stored) : [];
        if (!list.includes(cleanEmail)) {
          list.push(cleanEmail);
          localStorage.setItem('syene_newsletter_subscribers', JSON.stringify(list));
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
          ? `تم اشتراكك في رادار سايين سوليوشنز التقني (${cleanEmail}). سنوافيك بآخر الإصدارات المعمارية والبرمجية.`
          : `You've been subscribed to Syene Solutions Dispatches (${cleanEmail}). The next architectural release note is on its way.`,
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
            ? 'bg-gradient-to-br from-[#143C5A]/30 via-[#0E2336]/60 to-[#D9A441]/15'
            : 'bg-gradient-to-br from-[#143C5A]/10 via-[#FAF6EE]/80 to-[#D9A441]/10'
        }`}
        aria-hidden="true"
      />

      {/* Main glass-panel-3d card container */}
      <div
        className={`glass-panel-3d relative rounded-2xl md:rounded-3xl p-8 sm:p-10 md:p-12 overflow-hidden border ${
          isDark
            ? 'border-[#D9A441]/25 text-[#FAF6EE]'
            : 'border-[#143C5A]/20 text-[#1D2733]'
        }`}
      >
        {/* Subtle decorative grid overlay inside glass */}
        <div
          className="absolute inset-0 tech-grid-bg opacity-20 pointer-events-none"
          aria-hidden="true"
        />

        {/* Decorative corner light accent in Gold */}
        <div
          className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none ${
            isDark ? 'bg-[#D9A441]/10' : 'bg-[#143C5A]/10'
          }`}
          aria-hidden="true"
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Header & Value Proposition */}
          <div className="lg:col-span-7 space-y-4">
            {/* Tech Radar Editorial Kicker */}
            <div
              className={`flex items-center gap-2 text-xs font-mono tracking-wider uppercase ${
                isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'
              }`}
            >
              <span className="font-semibold">
                {language === 'ar' ? 'رادار سايين المعماري' : 'Syene Technical Radar'}
              </span>
              <span aria-hidden="true" className={isDark ? 'text-[#8FA4BC]/40' : 'text-[#6E87A0]/40'}>·</span>
              <span className={isDark ? 'text-[#8FA4BC]' : 'text-[#6E87A0]'}>
                {language === 'ar' ? 'نشرة برمجية دورية' : 'Bi-Weekly Dispatch'}
              </span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-balance">
              {t.newsletter.title}
            </h2>

            <p
              className={`text-sm sm:text-base leading-relaxed max-w-xl ${
                isDark ? 'text-[#8FA4BC]' : 'text-[#1D2733]/80'
              }`}
            >
              {t.newsletter.subtitle}
            </p>

            {/* Topic Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono">
              <span
                className={`px-2.5 py-1 rounded-md border ${
                  isDark
                    ? 'bg-[#0E2336]/80 border-[#6E87A0]/30 text-[#FAF6EE]/85'
                    : 'bg-white/90 border-[#143C5A]/15 text-[#143C5A]'
                }`}
              >
                {language === 'ar' ? 'نماذج الذكاء الاصطناعي للإنتاج' : 'Production LLMs'}
              </span>
              <span
                className={`px-2.5 py-1 rounded-md border ${
                  isDark
                    ? 'bg-[#0E2336]/80 border-[#6E87A0]/30 text-[#FAF6EE]/85'
                    : 'bg-white/90 border-[#143C5A]/15 text-[#143C5A]'
                }`}
              >
                {language === 'ar' ? 'معماريات الأنظمة الموزعة' : 'Distributed Systems'}
              </span>
              <span
                className={`px-2.5 py-1 rounded-md border ${
                  isDark
                    ? 'bg-[#0E2336]/80 border-[#6E87A0]/30 text-[#FAF6EE]/85'
                    : 'bg-white/90 border-[#143C5A]/15 text-[#143C5A]'
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
                className={`p-6 sm:p-7 rounded-xl border backdrop-blur-md transition-all ${
                  isDark
                    ? 'bg-[#0E2336]/95 border-[#D9A441]/40 shadow-lg shadow-[#D9A441]/10'
                    : 'bg-white/95 border-[#143C5A]/30 shadow-lg shadow-[#143C5A]/10'
                }`}
                role="status"
                aria-live="polite"
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`p-2 rounded-lg shrink-0 ${
                      isDark
                        ? 'bg-[#D9A441]/20 text-[#D9A441]'
                        : 'bg-[#143C5A]/15 text-[#143C5A]'
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
                        isDark ? 'text-[#8FA4BC]' : 'text-[#1D2733]/80'
                      }`}
                    >
                      {t.newsletter.success}
                    </p>
                    <p
                      className={`font-mono text-xs font-semibold truncate ${
                        isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'
                      }`}
                    >
                      {lastSubscribedEmail}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-dashed flex items-center justify-between text-xs border-current/15">
                  <span className={isDark ? 'text-[#8FA4BC]/70' : 'text-[#6E87A0]'}>
                    {language === 'ar' ? 'تصدر النشرة دورياً لبريدك' : 'Dispatches sent directly to your inbox'}
                  </span>
                  <button
                    type="button"
                    onClick={handleReset}
                    className={`font-medium underline transition-colors cursor-pointer ${
                      isDark
                        ? 'text-[#FAF6EE]/80 hover:text-[#D9A441]'
                        : 'text-[#143C5A] hover:text-[#0E2336]'
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
                      <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-sky-400/60">
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
                            ? 'bg-[#0E2336]/90 border border-[#6E87A0]/35 text-[#FAF6EE] placeholder-[#8FA4BC]/50 focus:border-[#D9A441] focus:ring-2 focus:ring-[#D9A441]/25'
                            : 'bg-white/95 border border-[#143C5A]/25 text-[#1D2733] placeholder-slate-400 focus:border-[#143C5A] focus:ring-2 focus:ring-[#143C5A]/20'
                        } ${status === 'error' ? '!border-rose-500 !ring-rose-500/20' : ''}`}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer shadow-md shrink-0 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed ${
                        isDark
                          ? 'syene-gold-gradient text-[#0A1622] font-bold shadow-[0_0_18px_rgba(217,164,65,0.28)] hover:shadow-[0_0_24px_rgba(217,164,65,0.45)]'
                          : 'bg-[#143C5A] text-[#FAF6EE] hover:bg-[#0E2336]'
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
                    isDark ? 'text-[#8FA4BC]/70' : 'text-[#6E87A0]'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D9A441] shrink-0" aria-hidden="true" />
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
