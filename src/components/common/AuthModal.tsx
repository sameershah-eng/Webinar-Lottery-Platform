import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, ShieldCheck, ArrowRight, KeyRound, Sparkles, AlertCircle } from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brand';
import { useStore } from '../../store/useStore';

export const AuthModal: React.FC = () => {
  const { authModalOpen, closeAuthModal, loginWithEmail } = useStore();
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const DEMO_CODE = '736846';

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please provide a valid member email address.');
      return;
    }
    setError('');
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('code');
    }, 600);
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || code.length < 4) {
      setError('Please enter the 6-digit verification code.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      loginWithEmail(email);
      handleClose();
    }, 500);
  };

  const handleClose = () => {
    setStep('email');
    setEmail('');
    setCode('');
    setError('');
    closeAuthModal();
  };

  const fillDemoCode = () => {
    setCode(DEMO_CODE);
    setError('');
  };

  if (!authModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md bg-[#14161A] border border-[#23262C] rounded-lg shadow-2xl p-6 sm:p-8 overflow-hidden"
        >
          {/* Top Gold Hairline */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#C9A227] to-transparent" />

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-full bg-[#1C1F26] border border-[#C9A227]/40 text-[#C9A227] flex items-center justify-center mx-auto mb-3 shadow-lg">
              {step === 'email' ? (
                <Mail className="w-6 h-6" />
              ) : (
                <KeyRound className="w-6 h-6 text-[#C9A227]" />
              )}
            </div>

            <h3 className="font-heading text-2xl font-bold tracking-wider text-white uppercase">
              {step === 'email' ? 'Member Access' : 'Check Your Inbox'}
            </h3>
            <p className="text-xs text-zinc-400 mt-1 max-w-xs mx-auto">
              {step === 'email'
                ? `Enter your email to claim seats, watch live reviews, and receive verified draw alerts.`
                : `We dispatched a one-time access passcode to ${email}`}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded bg-red-950/40 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {step === 'email' ? (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono tracking-wider text-zinc-400 uppercase mb-1.5">
                  Member Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    autoFocus
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    placeholder="e.g. operator@domain.com"
                    className="w-full bg-[#0E1013] border border-[#2B303A] focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] rounded px-4 py-3 text-sm text-white placeholder-zinc-600 font-mono transition-colors"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded bg-gradient-to-r from-[#C9A227] to-[#DBB22E] hover:brightness-110 active:scale-[0.98] text-black font-heading font-bold text-base tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(201,162,39,0.25)]"
                >
                  {isSubmitting ? (
                    <span className="inline-block w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Continue With Email</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="text-center pt-2">
                <span className="text-[11px] text-zinc-500 font-mono">
                  No password required &bull; Instant 1-click verification
                </span>
              </div>
            </form>
          ) : (
            <form onSubmit={handleCodeSubmit} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[11px] font-mono tracking-wider text-zinc-400 uppercase">
                    6-Digit Passcode
                  </label>
                  <button
                    type="button"
                    onClick={fillDemoCode}
                    className="text-[10px] font-mono text-[#C9A227] hover:underline flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Auto-fill Demo Code ({DEMO_CODE})</span>
                  </button>
                </div>
                <input
                  type="text"
                  maxLength={6}
                  autoFocus
                  required
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value.replace(/\D/g, ''));
                    setError('');
                  }}
                  placeholder="736846"
                  className="w-full tracking-[0.4em] text-center text-xl font-mono bg-[#0E1013] border border-[#2B303A] focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] rounded px-4 py-3 text-white transition-colors"
                />
              </div>

              {/* Demo Hint Banner */}
              <div className="p-2.5 rounded bg-[#1A1D24] border border-[#2E333C] text-[11px] text-zinc-400 flex items-center justify-between font-mono">
                <span>Demo environment: Any 6 digits accepted</span>
                <span className="text-[#C9A227] font-bold">736-846</span>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded bg-[#C9A227] hover:bg-[#DBB22E] active:scale-[0.98] text-black font-heading font-bold text-base tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(201,162,39,0.25)]"
                >
                  {isSubmitting ? (
                    <span className="inline-block w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
                      <span>Verify & Enter</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setStep('email')}
                  className="text-xs text-zinc-500 hover:text-zinc-300 font-mono py-1"
                >
                  &larr; Use a different email
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
