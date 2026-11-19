
import Link from "next/link";

const statistics = [
  {
    title: "Total Users",
    value: "1,248",
    detail: "Registered accounts",
    icon: "👥",
  },
  {
    title: "Total Canteens",
    value: "12",
    detail: "Registered stalls",
    icon: "🏪",
  },
  {
    title: "Active Vendors",
    value: "10",
    detail: "Vendor accounts",
    icon: "🍱",
  },
  {
    title: "Delivery Runners",
    value: "35",
    detail: "Registered runners",
    icon: "🛵",
  },
];

const activities = [
  {
    name: "New customer registered",
    description: "A new customer account was created.",
    time: "Recently",
    status: "User Registration",
  },
  {
    name: "New canteen added",
    description: "A canteen was added to the platform.",
    time: "Recently",
    status: "Canteen Management",
  },
  {
    name: "Vendor account created",
    description: "A new vendor joined CanteenHub.",
    time: "Recently",
    status: "User Registration",
  },
];

const managementItems = [
  {
    title: "User Management",
    description:
      "View, manage, and organize customer, vendor, and runner accounts.",
    href: "/admin/users",
    icon: "👥",
    label: "Manage Users",
  },
  {
    title: "Canteen Management",
    description:
      "Manage registered canteens and their account information.",
    href: "/admin/canteens",
    icon: "🏪",
    label: "Manage Canteens",
  },
  {
    title: "Profile Settings",
    description:
      "Review and update your administrator profile information.",
    href: "/profile",
    icon: "⚙️",
    label: "Manage Profile",
  },
];

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-[#F8F7F0] px-5 py-10 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-7xl">

        {/* Dashboard Heading */}
        <div className="mb-9 flex flex-wrap items-center justify-between gap-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#718653]">
              CANTEENHUB ADMINISTRATION
            </p>

            <h1 className="mt-2 text-4xl font-semibold text-[#303522]">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-sm text-[#777763]">
              Manage users, canteens, and platform activities in one place.
            </p>
          </div>

          <div className="rounded-2xl border border-[#C3CC9B] bg-white px-5 py-3 shadow-sm">
            <p className="text-xs text-[#777763]">Account Role</p>
            <p className="mt-1 text-sm font-bold text-[#52643D]">
              Administrator
            </p>
          </div>
        </div>

        {/* Welcome Banner */}
        <section className="relative mb-9 overflow-hidden rounded-3xl bg-[#718653] p-8 text-white shadow-sm sm:p-10">
          <div className="relative z-10 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#FBE8CE]">
              MANAGEMENT OVERVIEW
            </p>

            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Welcome to CanteenHub Admin
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/85">
              Oversee platform accounts, manage canteen registrations, and
              maintain an organized campus food ordering community.
            </p>

            <Link
              href="/admin/users"
              className="mt-7 inline-flex items-center rounded-xl bg-[#FBE8CE] px-5 py-3 text-sm font-bold text-[#303522] transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg"
            >
              Manage Platform →
            </Link>
          </div>

          <div className="pointer-events-none absolute -right-12 -top-16 h-64 w-64 rounded-full border-[35px] border-white/10" />
          <div className="pointer-events-none absolute -bottom-24 right-28 h-52 w-52 rounded-full bg-white/5" />
        </section>

        {/* Statistics */}
        <section className="mb-10">
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-[#303522]">
              Platform Overview
            </h2>

            <p className="mt-1 text-sm text-[#777763]">
              A summary of registered accounts and canteens.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {statistics.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[#E4DFB5] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#9AB17A] hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-[#777763]">
                    {item.title}
                  </p>

                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F1F3E8] text-xl">
                    {item.icon}
                  </span>
                </div>

                <p className="mt-5 text-3xl font-semibold text-[#303522]">
                  {item.value}
                </p>

                <p className="mt-2 text-xs text-[#81965F]">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Management Center */}
        <section className="mb-10">
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-[#303522]">
              Management Center
            </h2>

            <p className="mt-1 text-sm text-[#777763]">
              Access the main administration features.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {managementItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-2xl border border-[#E4DFB5] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#9AB17A] hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F1F3E8] text-2xl transition duration-300 group-hover:bg-[#E4DFB5]">
                  {item.icon}
                </div>

                <h3 className="mt-5 text-lg font-semibold text-[#303522] transition group-hover:text-[#718653]">
                  {item.title}
                </h3>

                <p className="mt-2 min-h-12 text-sm leading-6 text-[#777763]">
                  {item.description}
                </p>

                <p className="mt-5 text-sm font-bold text-[#718653] transition group-hover:translate-x-1">
                  {item.label} →
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="rounded-3xl border border-[#E4DFB5] bg-white p-7 shadow-sm sm:p-9">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#81965F]">
              PLATFORM UPDATES
            </p>

            <h2 className="mt-2 text-xl font-semibold text-[#303522]">
              Recent Platform Activity
            </h2>

            <p className="mt-1 text-sm text-[#777763]">
              Overview of recent platform activities.
            </p>
          </div>

          <div className="divide-y divide-[#E4DFB5]">
            {activities.map((activity) => (
              <div
                key={activity.name}
                className="flex flex-wrap items-center justify-between gap-4 py-5 first:pt-0 last:pb-0"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F1F3E8] text-[#718653]">
                    <span className="text-sm">✓</span>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-[#303522]">
                      {activity.name}
                    </h3>

                    <p className="mt-1 text-sm text-[#777763]">
                      {activity.description}
                    </p>

                    <p className="mt-2 text-xs text-[#81965F]">
                      {activity.time}
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-[#F1F3E8] px-3 py-2 text-xs font-semibold text-[#52643D]">
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Navigation */}
        <div className="mt-8 flex flex-wrap justify-between gap-4">
          <Link
            href="/"
            className="text-sm font-semibold text-[#718653] transition hover:text-[#52643D]"
          >
            ← Back to Homepage
          </Link>

          <Link
            href="/profile"
            className="text-sm font-semibold text-[#718653] transition hover:text-[#52643D]"
          >
            View My Profile →
          </Link>
        </div>

      </div>
    </main>
  );
}
