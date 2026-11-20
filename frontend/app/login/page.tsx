
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiRequest } from "@/lib/api";

type LoginResponse = {
  message: string;
  token: string;
  token_type: string;
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
    roles: {
      name: string;
    }[];
  };
};

export default function LoginPage() {
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"error" | "success" | "">("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = String(formData.get("username") || "").trim();
    const password = String(formData.get("password") || "");

    if (!username || !password) {
      setMessage("Please complete all required fields.");
      setMessageType("error");
      return;
    }

    const usernamePattern = /^[a-zA-Z0-9_]{4,20}$/;

    if (!usernamePattern.test(username)) {
      setMessage(
        "Username must be 4–20 characters and contain only letters, numbers, or underscores."
      );
      setMessageType("error");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const data = await apiRequest<LoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      localStorage.setItem("canteenhub_token", data.token);
      localStorage.setItem("canteenhub_user", JSON.stringify(data.user));

      const role = data.user.roles?.[0]?.name?.toLowerCase();

      if (role === "admin") {
        router.push("/admin");
      } else {
        router.push("/profile");
      }
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to connect to the server. Please try again."
      );
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  }

  function clearMessage() {
    setMessage("");
    setMessageType("");
  }

  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[#FBE8CE] px-6 py-16">
      <div className="w-full max-w-md rounded-3xl border border-[#E4DFB5] bg-white p-8 shadow-xl sm:p-10">
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

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-semibold text-[#303522]"
            >
              Username
            </label>

            <input
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username"
              required
              autoComplete="username"
              minLength={4}
              maxLength={20}
              pattern="[A-Za-z0-9_]{4,20}"
              className="w-full rounded-xl border border-[#C3CC9B] bg-[#F8F7F0] px-4 py-3 text-sm text-[#303522] outline-none transition placeholder:text-[#999987] focus:border-[#718653] focus:ring-2 focus:ring-[#9AB17A]/30"
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

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                className="w-full rounded-xl border border-[#C3CC9B] bg-[#F8F7F0] px-4 py-3 pr-16 text-sm text-[#303522] outline-none transition placeholder:text-[#999987] focus:border-[#718653] focus:ring-2 focus:ring-[#9AB17A]/30"
                onChange={clearMessage}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#718653] transition hover:text-[#52643D]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
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
                  : "border-[#9AB17A] bg-[#F0F5E9] text-[#52643D]"
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-[#718653] px-6 py-3.5 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#52643D] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

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
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
