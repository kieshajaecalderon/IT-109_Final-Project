
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="bg-[#303522] text-[#FBE8CE]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 sm:flex-row">
        <p className="text-sm font-semibold tracking-wide">
          CanteenHub<span className="text-[#9AB17A]">.</span>
        </p>

        <p className="text-xs text-[#E4DFB5]/70">
          ┬⌐ 2026 CanteenHub. All rights reserved.
        </p>

        <div className="flex gap-5 text-xs text-[#E4DFB5]/80">
          <Link href="/login" className="transition-colors hover:text-white">
            Sign In
          </Link>

          <Link href="/register" className="transition-colors hover:text-white">
            Register
          </Link>
        </div>
      </div>
    </footer>
  );
}
