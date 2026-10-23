'use client';
import { useState } from 'react';
import { Eye, EyeOff, AlertCircle, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

export function Field({ id, label, icon: Icon, type = 'text', value, onChange, required, minLength, autoComplete, inputMode, name, delay = 0 }) {
  const [show, setShow] = useState(false);
  const isPassword = type === 'password';
  return (
    <div className="rk-field rk-fade-up" style={{ animationDelay: `${delay}s` }}>
      <input
        id={id}
        name={name || id}
        type={isPassword && show ? 'text' : type}
        value={value}
        onChange={onChange}
        required={required}
        minLength={minLength}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder=" "
      />
      <label htmlFor={id}>{label}</label>
      {Icon && <Icon className="rk-icon w-[18px] h-[18px]" />}
      {isPassword && (
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setShow((s) => !s)}
          className="rk-trailing p-1.5 rounded-lg text-[#5f6368] hover:text-[#202124] hover:bg-[#f1f3f4] transition-colors"
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      )}
    </div>
  );
}

export function PasswordStrength({ password }) {
  if (!password) return null;
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  const level = Math.min(4, Math.max(1, score - 0));
  const meta = [
    null,
    { label: 'Weak', color: '#ea4335' },
    { label: 'Fair', color: '#fbbc04' },
    { label: 'Good', color: '#4285f4' },
    { label: 'Strong', color: '#34a853' },
  ][level];
  return (
    <div className="flex items-center gap-3 -mt-1 rk-fade-in">
      <div className="flex-1 grid grid-cols-4 gap-1.5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{ background: i <= level ? meta.color : '#e8eaed' }}
          />
        ))}
      </div>
      <span className="text-[11px] font-semibold w-12 text-right" style={{ color: meta.color }}>
        {meta.label}
      </span>
    </div>
  );
}

export function Alert({ type = 'error', children, shakeKey }) {
  if (!children) return null;
  const isError = type === 'error';
  return (
    <div
      key={shakeKey}
      className={`mb-5 p-3.5 rounded-xl text-[13px] font-medium flex items-start gap-2.5 border ${
        isError ? 'bg-[#fce8e6] border-[#fad2cf] text-[#c5221f] rk-shake' : 'bg-[#e6f4ea] border-[#ceead6] text-[#137333] rk-fade-up'
      }`}
    >
      {isError ? <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" /> : <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />}
      <span>{children}</span>
    </div>
  );
}

export function SubmitButton({ loading, disabled, loadingText, children, icon: Icon = ArrowRight, type = 'submit', onClick }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className="rk-btn-shine w-full h-[52px] flex items-center justify-center gap-2 rounded-[14px] text-[15px] font-semibold text-white bg-[#1a73e8] hover:bg-[#1765cc] active:scale-[0.99] shadow-[0_6px_20px_-6px_rgba(26,115,232,0.6)] hover:shadow-[0_10px_28px_-8px_rgba(26,115,232,0.7)] transition-all disabled:opacity-55 disabled:cursor-not-allowed disabled:shadow-none cursor-pointer"
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>{loadingText}</span>
        </>
      ) : (
        <>
          <span>{children}</span>
          {Icon && <Icon className="w-4 h-4" />}
        </>
      )}
    </button>
  );
}

export function DevOtpBanner({ code, onUse }) {
  if (!code) return null;
  return (
    <div className="mb-5 p-3 rounded-xl bg-[#fef7e0] border border-[#feefc3] text-xs text-[#7c4a00] flex items-center justify-between gap-3 rk-fade-up">
      <span>
        Email delivery unavailable — test code:{' '}
        <span className="font-mono font-bold tracking-widest text-[#202124] bg-white px-2 py-0.5 rounded border border-[#dadce0]">{code}</span>
      </span>
      <button
        type="button"
        onClick={onUse}
        className="shrink-0 px-2.5 py-1.5 bg-[#1a73e8] text-white rounded-lg font-semibold hover:bg-[#1557b0] transition-colors"
      >
        Use code
      </button>
    </div>
  );
}

export function useCountdown() {
  const [seconds, setSeconds] = useState(0);
  const start = (s = 45) => {
    setSeconds(s);
    const id = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  return [seconds, start];
}
