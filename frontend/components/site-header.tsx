
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isAdminPage = pathname.startsWith("/admin");
  const isProfilePage = pathname === "/profile";

  const isAuthPage = [
    "/login",
    "/register",
    "/forgot-password",
  ].includes(pathname);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-[#9AB17A] shadow-md" : "bg-[#FBE8CE]"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">

        {/* Brand */}
        <Link
          href="/"
          className="shrink-0 font-[var(--font-heading)] text-3xl font-semibold text-[#303522]"
        >
          CanteenHub<span className="text-[#718653]">.</span>
        </Link>

        {/* Admin Navigation */}
        {isAdminPage && (
          <nav className="flex flex-wrap items-center gap-5 text-sm font-medium text-[#303522]">
            <Link href="/admin">Dashboard</Link>
            <Link href="/admin/users">Users</Link>
            <Link href="/admin/canteens">Canteens</Link>
            <Link href="/profile">Profile</Link>
          </nav>
        )}

        {/* Profile Navigation */}
        {isProfilePage && (
          <nav className="flex items-center gap-6 text-sm font-medium text-[#303522]">
            <Link href="/">Home</Link>
            <Link href="/profile">My Profile</Link>
          </nav>
        )}

        {/* Homepage Navigation */}
        {!isAdminPage && !isProfilePage && !isAuthPage && (
          <>
            <nav className="hidden items-center gap-7 text-sm font-medium text-[#303522] md:flex">
              <Link
                href="/"
                className="transition-colors hover:text-white"
              >
                Home
              </Link>

              <Link
                href="/#features"
                className="transition-colors hover:text-white"
              >
                Features
              </Link>

              <Link
                href="/#how-it-works"
                className="transition-colors hover:text-white"
              >
                How It Works
              </Link>
            </nav>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <Link
                href="/login"
                className="rounded-full px-3 py-2 text-sm font-semibold text-[#303522] transition-all hover:bg-white/40 sm:px-5"
              >
                Sign In
              </Link>

              <Link
                href="/register"
                className="rounded-full bg-[#303522] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#52643D] hover:shadow-md sm:px-5"
              >
                Sign Up
              </Link>
            </div>
          </>
        )}

        {/* Authentication Pages */}
        {isAuthPage && (
          <Link
            href="/"
            className="rounded-full px-5 py-2 text-sm font-semibold text-[#303522] transition-all hover:bg-white/40"
          >
            Back to Home
          </Link>
        )}
      </div>
    </header>
  );
}
