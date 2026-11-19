
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isAdminPage = pathname.startsWith("/admin");

  const isAuthPage = [
    "/login",
    "/register",
    "/forgot-password",
  ].includes(pathname);

  const isProfilePage = pathname === "/profile";

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
        scrolled
          ? "bg-[#9AB17A] shadow-md"
          : "bg-[#FBE8CE]"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Brand */}
        <Link
          href="/"
          className="font-[var(--font-heading)] text-3xl font-semibold text-[#303522]"
        >
          CanteenHub<span className="text-[#718653]">.</span>
        </Link>

        {/* Admin Navigation */}
        {isAdminPage && (
          <nav className="flex items-center gap-5 text-sm font-medium text-[#303522] sm:gap-7">
            <Link
              href="/admin"
              className="transition-colors duration-200 hover:text-white"
            >
              Dashboard
            </Link>

            <Link
              href="/admin/users"
              className="transition-colors duration-200 hover:text-white"
            >
              Users
            </Link>

            <Link
              href="/admin/canteens"
              className="transition-colors duration-200 hover:text-white"
            >
              Canteens
            </Link>

            <Link
              href="/profile"
              className="transition-colors duration-200 hover:text-white"
            >
              Profile
            </Link>
          </nav>
        )}

        {/* Profile Navigation */}
        {isProfilePage && (
          <nav className="flex items-center gap-6 text-sm font-medium text-[#303522]">
            <Link
              href="/"
              className="transition-colors duration-200 hover:text-white"
            >
              Home
            </Link>

            <Link
              href="/profile"
              className="transition-colors duration-200 hover:text-white"
            >
              My Profile
            </Link>
          </nav>
        )}

        {/* Homepage Navigation */}
        {pathname === "/" && (
          <>
            <nav className="hidden items-center gap-7 text-sm font-medium text-[#303522] md:flex">
              <Link
                className="transition-colors duration-200 hover:text-white"
                href="/"
              >
                Home
              </Link>

              <Link
                className="transition-colors duration-200 hover:text-white"
                href="/#canteens"
              >
                Canteens
              </Link>

              <Link
                className="transition-colors duration-200 hover:text-white"
                href="/#how-it-works"
              >
                How It Works
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="rounded-full px-5 py-2 text-sm font-semibold text-[#303522] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/40"
              >
                Sign In
              </Link>

              <Link
                href="/register"
                className="rounded-full bg-[#303522] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#52643D] hover:shadow-md"
              >
                Get Started
              </Link>
            </div>
          </>
        )}

        {/* Authentication Pages */}
        {isAuthPage && (
          <Link
            href="/"
            className="rounded-full px-5 py-2 text-sm font-semibold text-[#303522] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/40"
          >
            Back to Home
          </Link>
        )}

      </div>
    </header>
  );
}
