"use client";

import { useState, useEffect } from "react";

const WHATSAPP = "https://wa.me/27629558559";
const DEFER_MS = 10 * 1000;

export function LandingPopup() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const timer = setTimeout(() => setOpen(true), DEFER_MS);
    return () => clearTimeout(timer);
  }, [dismissed]);

  const handleConsultant = () => {
    window.location.href = WHATSAPP;
  };

  if (!open || dismissed) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => setDismissed(true)}
      />
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border border-gray-100 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-navy/5">
          <span className="text-2xl">🛡️</span>
        </div>
        <h3 className="text-2xl font-black text-brand-navy tracking-tight">
          Want a security expert to review your property?
        </h3>
        <p className="mt-2 text-sm text-brand-slate">
          Get a fast, no-obligation callback from our Cape Town team.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={handleConsultant}
            className="flex-1 rounded-2xl bg-brand-electric px-5 py-4 text-sm font-bold text-brand-navy hover:bg-brand-navy hover:text-brand-electric transition-colors"
          >
            Speak to a Consultant
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="flex-1 rounded-2xl bg-brand-navy/5 px-5 py-4 text-sm font-bold text-brand-navy hover:bg-brand-navy hover:text-white transition-colors"
          >
            Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
}
