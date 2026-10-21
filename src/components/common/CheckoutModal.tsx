import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, CheckCircle2, CreditCard, Lock, Sparkles, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '../../store/useStore';

export const CheckoutModal: React.FC = () => {
  const {
    checkoutModalOpen,
    closeCheckoutModal,
    checkoutWebinarId,
    checkoutSeats,
    webinars,
    user,
    openAuthModal,
    claimSeats,
  } = useStore();

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'vault'>('card');
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);

  if (!checkoutModalOpen || !checkoutWebinarId) return null;

  const webinar = webinars.find((w) => w.id === checkoutWebinarId);
  if (!webinar) return null;

  const totalPrice = checkoutSeats.length * webinar.pricePerSeat;

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C9A227', '#E5383B', '#F4D068', '#FFFFFF'],
    });
  };

  const handleConfirmOrder = () => {
    if (!user) {
      closeCheckoutModal();
      openAuthModal(checkoutWebinarId);
      return;
    }

    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setCompleted(true);
      claimSeats(checkoutWebinarId, checkoutSeats);
      triggerConfetti();

      setTimeout(() => {
        setCompleted(false);
        closeCheckoutModal();
      }, 2200);
    }, 1000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg bg-[#14161A] border border-[#23262C] rounded-lg shadow-2xl p-6 sm:p-8 overflow-hidden"
        >
          {/* Top Gold Accent */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#C9A227] to-transparent" />

          {/* Close button */}
          {!processing && !completed && (
            <button
              onClick={closeCheckoutModal}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {completed ? (
            /* Success confirmation screen */
            <div className="text-center py-8 space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 15 }}
                className="w-16 h-16 rounded-full bg-[#1C1F26] border-2 border-[#C9A227] text-[#C9A227] flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(201,162,39,0.4)]"
              >
                <CheckCircle2 className="w-9 h-9" />
              </motion.div>

              <h3 className="font-heading text-3xl font-bold tracking-wider text-white uppercase">
                SEATS LOCKED &amp; REGISTERED
              </h3>

              <p className="text-zinc-300 text-sm max-w-sm mx-auto font-mono">
                Seat{checkoutSeats.length > 1 ? 's' : ''}{' '}
                <span className="text-[#C9A227] font-bold">#{checkoutSeats.join(', #')}</span>{' '}
                successfully claimed for{' '}
                <span className="text-white underline">{user?.email}</span>.
              </p>

              <div className="p-3 bg-[#0E1013] border border-[#23262C] rounded text-xs font-mono text-zinc-400 max-w-xs mx-auto">
                Automatic on-air draw entry active. Replay access guaranteed.
              </div>
            </div>
          ) : (
            /* Order review & checkout form */
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#C9A227] uppercase">
                  Order Summary
                </span>
                <h3 className="font-heading text-2xl font-bold tracking-wider text-white uppercase">
                  Claim Reserved Seats
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5 truncate">
                  {webinar.title}
                </p>
              </div>

              {/* Items Breakdown Card */}
              <div className="p-4 bg-[#0E1013] border border-[#23262C] rounded space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#1C1F26]">
                  <span className="text-zinc-400">Selected Numbered Seats</span>
                  <div className="flex flex-wrap gap-1 justify-end max-w-[200px]">
                    {checkoutSeats.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded bg-[#C9A227]/20 border border-[#C9A227]/50 text-[#C9A227] font-bold"
                      >
                        #{s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-zinc-400">
                  <span>Price Per Seat</span>
                  <span className="text-white">${webinar.pricePerSeat}.00 USD</span>
                </div>

                <div className="flex items-center justify-between text-zinc-400">
                  <span>Seat Quantity</span>
                  <span className="text-white">{checkoutSeats.length}</span>
                </div>

                <div className="flex items-center justify-between text-zinc-400">
                  <span>Draw Verification Fee</span>
                  <span className="text-emerald-400">$0.00 (Waived)</span>
                </div>

                <div className="pt-2 border-t border-[#1C1F26] flex items-center justify-between text-sm font-bold">
                  <span className="text-white font-sans uppercase tracking-wider">Total Due</span>
                  <span className="text-xl text-[#C9A227] font-mono">${totalPrice}.00 USD</span>
                </div>
              </div>

              {/* Member Auth check notification if guest */}
              {!user ? (
                <div className="p-3 rounded bg-amber-950/40 border border-[#C9A227]/50 text-amber-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-[#C9A227]" />
                  <span>You must enter your email to finalize these seats.</span>
                </div>
              ) : (
                <div className="text-xs font-mono text-zinc-400 flex items-center justify-between px-1">
                  <span>Account Email:</span>
                  <span className="text-white font-semibold">{user.email}</span>
                </div>
              )}

              {/* Mock Payment method */}
              <div className="space-y-2">
                <label className="block text-[11px] font-mono tracking-wider text-zinc-400 uppercase">
                  Payment Method (Mock)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded border text-left flex items-center gap-2.5 transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-[#1C1F26] border-[#C9A227] text-white shadow-sm'
                        : 'bg-[#0E1013] border-[#23262C] text-zinc-400 hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-[#C9A227]" />
                    <div className="text-xs font-mono">
                      <div className="font-bold">Instant Card</div>
                      <div className="text-[10px] text-zinc-500">4242 &bull;&bull;&bull;&bull; 8821</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('vault')}
                    className={`p-3 rounded border text-left flex items-center gap-2.5 transition-all ${
                      paymentMethod === 'vault'
                        ? 'bg-[#1C1F26] border-[#C9A227] text-white shadow-sm'
                        : 'bg-[#0E1013] border-[#23262C] text-zinc-400 hover:text-white'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <div className="text-xs font-mono">
                      <div className="font-bold">Member Vault</div>
                      <div className="text-[10px] text-zinc-500">Fast 1-Click Pay</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="button"
                  disabled={processing}
                  onClick={handleConfirmOrder}
                  className="w-full py-3.5 px-4 rounded bg-gradient-to-r from-[#C9A227] via-[#DDB735] to-[#C9A227] hover:brightness-110 active:scale-[0.98] text-black font-heading font-bold text-lg tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(201,162,39,0.35)]"
                >
                  {processing ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Locking Seats &amp; Generating Seed...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Confirm &amp; Lock Seats (${totalPrice}.00)</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-zinc-500">
                <Lock className="w-3 h-3 text-[#C9A227]" />
                <span>AES-256 Encrypted &bull; Non-refundable allocation once draw begins</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
