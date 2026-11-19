
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function RegisterPage() {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"error" | "success" | "">("");
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(new Date().toISOString().split("T")[0]);
  }, []);

  function clearMessage() {
    setMessage("");
    setMessageType("");
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const firstName = String(formData.get("first_name") || "").trim();
    const lastName = String(formData.get("last_name") || "").trim();
    const birthDate = String(formData.get("birth_date") || "");
    const phone = String(formData.get("phone") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const role = String(formData.get("role") || "");
    const password = String(formData.get("password") || "");
    const confirmPassword = String(formData.get("confirm_password") || "");

    if (
      !firstName ||
      !lastName ||
      !birthDate ||
      !phone ||
      !email ||
      !role ||
      !password ||
      !confirmPassword
    ) {
      setMessage("Please complete all required fields.");
      setMessageType("error");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Please enter a valid email address.");
      setMessageType("error");
      return;
    }

    if (!/^09\d{9}$/.test(phone)) {
      setMessage(
        "Please enter a valid 11-digit Philippine mobile number starting with 09."
      );
      setMessageType("error");
      return;
    }

    if (password.length < 8) {
      setMessage("Password must contain at least 8 characters.");
      setMessageType("error");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match. Please check your password.");
      setMessageType("error");
      return;
    }

    setMessage(
      "Your registration details passed validation! Account creation will be available once the backend is connected."
    );
    setMessageType("success");
  }

  return (
    <main className="min-h-[80vh] bg-[#FBE8CE] px-6 py-16">
      <div className="mx-auto max-w-2xl rounded-3xl border border-[#E4DFB5] bg-white p-8 shadow-xl sm:p-10">

        {/* Heading */}
        <div className="mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#718653]">
            JOIN CANTEENHUB
          </p>

          <h1 className="mt-4 text-4xl font-semibold text-[#303522]">
            Create Your Account
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#777763]">
            Register to explore campus canteens and enjoy convenient food
            ordering and delivery.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>

          {/* Personal Information */}
          <div>
            <h2 className="mb-4 border-b border-[#E4DFB5] pb-3 text-lg font-semibold text-[#303522]">
              Personal Information
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="mb-2 block text-sm font-semibold text-[#303522]"
                >
                  First Name
                </label>

                <input
                  id="firstName"
                  name="first_name"
                  type="text"
                  placeholder="Enter first name"
                  required
                  autoComplete="given-name"
                  onChange={clearMessage}
                  className="w-full rounded-xl border border-[#C3CC9B] bg-[#F8F7F0] px-4 py-3 text-sm outline-none transition focus:border-[#718653] focus:ring-2 focus:ring-[#9AB17A]/30"
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="mb-2 block text-sm font-semibold text-[#303522]"
                >
                  Last Name
                </label>

                <input
                  id="lastName"
                  name="last_name"
                  type="text"
                  placeholder="Enter last name"
                  required
                  autoComplete="family-name"
                  onChange={clearMessage}
                  className="w-full rounded-xl border border-[#C3CC9B] bg-[#F8F7F0] px-4 py-3 text-sm outline-none transition focus:border-[#718653] focus:ring-2 focus:ring-[#9AB17A]/30"
                />
              </div>

              <div>
                <label
                  htmlFor="birthDate"
                  className="mb-2 block text-sm font-semibold text-[#303522]"
                >
                  Date of Birth
                </label>

                <input
                  id="birthDate"
                  name="birth_date"
                  type="date"
                  required
                  max={today || undefined}
                  onChange={clearMessage}
                  className="w-full rounded-xl border border-[#C3CC9B] bg-[#F8F7F0] px-4 py-3 text-sm outline-none transition focus:border-[#718653] focus:ring-2 focus:ring-[#9AB17A]/30"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-semibold text-[#303522]"
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="e.g. 09XXXXXXXXX"
                  maxLength={11}
                  required
                  autoComplete="tel"
                  onChange={clearMessage}
                  className="w-full rounded-xl border border-[#C3CC9B] bg-[#F8F7F0] px-4 py-3 text-sm outline-none transition focus:border-[#718653] focus:ring-2 focus:ring-[#9AB17A]/30"
                />
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div>
            <h2 className="mb-4 border-b border-[#E4DFB5] pb-3 text-lg font-semibold text-[#303522]">
              Account Information
            </h2>

            <div className="space-y-5">
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
                  onChange={clearMessage}
                  className="w-full rounded-xl border border-[#C3CC9B] bg-[#F8F7F0] px-4 py-3 text-sm outline-none transition focus:border-[#718653] focus:ring-2 focus:ring-[#9AB17A]/30"
                />
              </div>

              <div>
                <label
                  htmlFor="role"
                  className="mb-2 block text-sm font-semibold text-[#303522]"
                >
                  Register As
                </label>

                <select
                  id="role"
                  name="role"
                  required
                  defaultValue=""
                  onChange={clearMessage}
                  className="w-full rounded-xl border border-[#C3CC9B] bg-[#F8F7F0] px-4 py-3 text-sm text-[#303522] outline-none transition focus:border-[#718653] focus:ring-2 focus:ring-[#9AB17A]/30"
                >
                  <option value="" disabled>
                    Select your account role
                  </option>

                  <option value="customer">
                    Customer (Student / Faculty)
                  </option>

                  <option value="vendor">
                    Canteen Vendor
                  </option>

                  <option value="runner">
                    Student Delivery Runner
                  </option>
                </select>

                <p className="mt-2 text-xs leading-5 text-[#777763]">
                  Admin accounts are assigned by an authorized administrator.
                </p>
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
                  minLength={8}
                  placeholder="Create a password (at least 8 characters)"
                  required
                  autoComplete="new-password"
                  onChange={clearMessage}
                  className="w-full rounded-xl border border-[#C3CC9B] bg-[#F8F7F0] px-4 py-3 text-sm outline-none transition focus:border-[#718653] focus:ring-2 focus:ring-[#9AB17A]/30"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold text-[#303522]"
                >
                  Confirm Password
                </label>

                <input
                  id="confirmPassword"
                  name="confirm_password"
                  type="password"
                  minLength={8}
                  placeholder="Re-enter your password"
                  required
                  autoComplete="new-password"
                  onChange={clearMessage}
                  className="w-full rounded-xl border border-[#C3CC9B] bg-[#F8F7F0] px-4 py-3 text-sm outline-none transition focus:border-[#718653] focus:ring-2 focus:ring-[#9AB17A]/30"
                />
              </div>
            </div>
          </div>

          {/* Validation Message */}
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-[#718653] px-6 py-3.5 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#52643D] hover:shadow-lg"
          >
            Create Account
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-8 border-t border-[#E4DFB5] pt-6 text-center">
          <p className="text-sm text-[#777763]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-[#718653] transition hover:text-[#52643D]"
            >
              Sign In
            </Link>
          </p>
        </div>

        {/* Back to Homepage */}
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
