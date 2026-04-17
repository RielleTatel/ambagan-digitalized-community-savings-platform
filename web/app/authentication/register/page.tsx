"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthLeftPanel } from "@/components/auth/AuthLeftPanel";

type FormErrors = {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

type FormData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}; 

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

async function registerRequest(payload: RegisterPayload) {
  const response = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }
);

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Unable to create account. Please try again.");
  }

  return response.json();
}

function Spinner() {
  return (
    <svg
      className="animate-spin w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8H4z"
      />
    </svg>
  );
}

function PasswordStrength({ password }: { password: string }) {
  if (!password) return null;

  const checks = [
    { label: "8+ characters", pass: password.length >= 8 },
    { label: "Uppercase", pass: /[A-Z]/.test(password) },
    { label: "Number", pass: /\d/.test(password) },
  ];
  const passed = checks.filter((c) => c.pass).length;
  const levels = ["Weak", "Fair", "Strong"];
  const colors = ["bg-red-400", "bg-amber-400", "bg-[#488D9F]"];

  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              i < passed ? colors[passed - 1] : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          {checks.map(({ label, pass }) => (
            <span
              key={label}
              className={`text-[10px] flex items-center gap-0.5 ${
                pass ? "text-[#488D9F]" : "text-gray-400"
              }`}
            >
              <CheckCircle className="w-2.5 h-2.5" />
              {label}
            </span>
          ))}
        </div>
        {passed > 0 && (
          <span className={`text-[10px] font-semibold ${
            passed === 3 ? "text-[#488D9F]" : passed === 2 ? "text-amber-500" : "text-red-500"
          }`}>
            {levels[passed - 1]}
          </span>
        )}
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const [form, setForm] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  const registerMutation = useMutation({
    mutationFn: registerRequest,
    onSuccess: () => {
      setSuccess(true);
      setApiError(null);
    },
    onError: (error: Error) => {
      setApiError(error.message);
    },
  });

  const setField = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    if (apiError) setApiError(null);
  };

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!form.fullName.trim()) errs.fullName = "Full name is required.";
    else if (form.fullName.trim().length < 2)
      errs.fullName = "Name must be at least 2 characters.";
    if (!form.email) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Enter a valid email address.";
    if (!form.password) errs.password = "Password is required.";
    else if (form.password.length < 8)
      errs.password = "Password must be at least 8 characters.";
    if (!form.confirmPassword)
      errs.confirmPassword = "Please confirm your password.";
    else if (form.password !== form.confirmPassword)
      errs.confirmPassword = "Passwords do not match.";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setApiError(null);
    await registerMutation.mutateAsync({
      name: form.fullName.trim(),
      email: form.email.trim(),
      password: form.password,
    });
  };

  if (success) {
    return (
      <div className="min-h-screen lg:grid lg:grid-cols-2">
        <AuthLeftPanel />
        <div className="flex flex-col items-center justify-center min-h-screen p-6 sm:p-10 bg-gray-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md text-center"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10">
              <div className="w-16 h-16 rounded-full bg-[#E4F1F4] flex items-center justify-center mx-auto mb-5">
                <CheckCircle className="w-8 h-8 text-[#488D9F]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Account created!</h2>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                Welcome to Ambagan. Your account is ready — start saving with
                your community today.
              </p>
              <Link
                href="/authentication/login"
                className="mt-7 inline-flex items-center gap-2 bg-linear-to-r from-[#488D9F] to-[#3E7C8C] text-white font-semibold text-sm rounded-lg h-11 px-6 hover:from-[#3E7C8C] hover:to-[#2D5F70] transition-all duration-200 shadow-sm"
              >
                Go to Login
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2">
      <AuthLeftPanel />

      {/* Form side */}
      <div className="flex flex-col items-center justify-center min-h-screen p-6 sm:p-10 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Mobile-only logo */}
          <div className="lg:hidden mb-8 text-center">
            <span className="text-2xl font-extrabold text-[#12303A]">
              Ambagan
            </span>
            <p className="mt-1 text-sm text-gray-500">
              Save together. Grow together.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="mb-7">
              <h1 className="text-2xl font-bold text-gray-900">
                Create your account
              </h1>
              <p className="mt-1.5 text-sm text-gray-500 leading-relaxed">
                Start saving and growing your money with your community.
              </p>
            </div>

            {apiError && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-5 flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm"
              >
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{apiError}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Full Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="fullName"
                  className="text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Maria Santos"
                  value={form.fullName}
                  onChange={setField("fullName")}
                  aria-invalid={!!errors.fullName}
                  className="h-11 px-3.5 text-sm"
                />
                {errors.fullName && (
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={setField("email")}
                  aria-invalid={!!errors.email}
                  className="h-11 px-3.5 text-sm"
                />
                {errors.email && (
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    value={form.password}
                    onChange={setField("password")}
                    aria-invalid={!!errors.password}
                    className="h-11 px-3.5 pr-11 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <PasswordStrength password={form.password} />
                {errors.password && (
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Re-enter your password"
                    value={form.confirmPassword}
                    onChange={setField("confirmPassword")}
                    aria-invalid={!!errors.confirmPassword}
                    className="h-11 px-3.5 pr-11 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                  >
                    {showConfirm ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    {errors.confirmPassword}
                  </p>
                )}
                {!errors.confirmPassword &&
                  form.confirmPassword &&
                  form.password === form.confirmPassword && (
                    <p className="text-xs text-[#488D9F] flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 shrink-0" />
                      Passwords match
                    </p>
                  )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={registerMutation.isPending}
                className="w-full h-11 bg-linear-to-r from-[#488D9F] to-[#3E7C8C] hover:from-[#3E7C8C] hover:to-[#2D5F70] text-white font-semibold rounded-lg text-sm shadow-sm transition-all duration-200 mt-1"
              >
                {registerMutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <Spinner /> Creating account…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Create Account
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                href="/authentication/login"
                className="text-[#488D9F] hover:text-[#3E7C8C] font-medium hover:underline transition-colors"
              >
                Log in
              </Link>
            </p>
          </div>

          {/* Trust badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-gray-400">
            <span>🔒 Secure &amp; private</span>
            <span>✦ No hidden fees</span>
            <span>🤝 Trusted communities</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
