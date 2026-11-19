
"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"error" | "success" | "">("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    if (!email || !password) {
      setMessage("Please complete all required fields.");
      setMessageType("error");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Please enter a valid email address.");
      setMessageType("error");
      return;
    }

    setMessage(
      "Your login details passed validation. Account sign-in will be available once the backend is connected."
    );
    setMessageType("success");
  }

  function clearMessage() {
    setMessage("");
    setMessageType("");
  }

  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[#FBE8CE] px-6 py-16">
      <div className="w-full max-w-md rounded-3xl border border-[#E4DFB5] bg-white p-8 shadow-xl sm:p-10">

        {/* Heading */}
        <div className="mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#718653]">
            WELCOME BACK
          </p>

          <h1 className="mt-4 text-4xl font-semibold text-[#303522]">
            Sign In
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#777763]">
            Access your CanteenHub account and enjoy a convenient campus food
            experience.
          </p>
        </div>

        {/* Login Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-[#303522]"
            >
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              required
              autoComplete="email"
              className="w-full rounded-xl border border-[#C3CC9B] bg-[#F8F7F0] px-4 py-3 text-sm outline-none transition focus:border-[#718653] focus:ring-2 focus:ring-[#9AB17A]/30"
              onChange={clearMessage}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-[#303522]"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              required
              autoComplete="current-password"
              className="w-full rounded-xl border border-[#C3CC9B] bg-[#F8F7F0] px-4 py-3 text-sm outline-none transition focus:border-[#718653] focus:ring-2 focus:ring-[#9AB17A]/30"
              onChange={clearMessage}
            />
          </div>

          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-xs font-semibold text-[#718653] transition hover:text-[#52643D]"
            >
              Forgot Password?
            </Link>
          </div>

          {message && (
            <div
              role="alert"
              className={`rounded-xl border px-4 py-3 text-sm leading-6 ${
                messageType === "error"
                  ? "border-red-200 bg-red-50 text-red-700"
                  : "border-green-200 bg-green-50 text-green-700"
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-[#718653] px-6 py-3.5 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#52643D] hover:shadow-lg"
          >
            Sign In
          </button>
        </form>

        {/* Registration Link */}
        <div className="mt-8 border-t border-[#E4DFB5] pt-6 text-center">
          <p className="text-sm text-[#777763]">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-bold text-[#718653] transition hover:text-[#52643D]"
            >
              Create Account
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-xs font-medium text-[#777763] transition hover:text-[#718653]"
          >
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
