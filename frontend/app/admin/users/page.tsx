
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type UserRole = "Customer" | "Vendor" | "Runner";
type UserStatus = "Active" | "Inactive";

type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  joined: string;
  status: UserStatus;
};

const initialUsers: User[] = [
  {
    id: "USR-001",
    name: "Alexandra Santos",
    email: "alexandra@example.com",
    role: "Customer",
    joined: "November 10, 2026",
    status: "Active",
  },
  {
    id: "USR-002",
    name: "Miguel Reyes",
    email: "miguel@example.com",
    role: "Vendor",
    joined: "November 11, 2026",
    status: "Active",
  },
  {
    id: "USR-003",
    name: "Sofia Garcia",
    email: "sofia@example.com",
    role: "Runner",
    joined: "November 12, 2026",
    status: "Active",
  },
  {
    id: "USR-004",
    name: "Daniel Cruz",
    email: "daniel@example.com",
    role: "Customer",
    joined: "November 13, 2026",
    status: "Inactive",
  },
  {
    id: "USR-005",
    name: "Isabella Flores",
    email: "isabella@example.com",
    role: "Vendor",
    joined: "November 15, 2026",
    status: "Active",
  },
  {
    id: "USR-006",
    name: "Gabriel Mendoza",
    email: "gabriel@example.com",
    role: "Runner",
    joined: "November 17, 2026",
    status: "Active",
  },
];

const roleStyles: Record<UserRole, string> = {
  Customer: "bg-[#F1F3E8] text-[#52643D]",
  Vendor: "bg-[#FBE8CE] text-[#8A6538]",
  Runner: "bg-[#E8EFE1] text-[#52643D]",
};

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const totalUsers = users.length;
  const activeUsers = users.filter(
    (user) => user.status === "Active"
  ).length;
  const inactiveUsers = users.filter(
    (user) => user.status === "Inactive"
  ).length;

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        user.name.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue) ||
        user.id.toLowerCase().includes(searchValue);

      const matchesRole =
        roleFilter === "All" || user.role === roleFilter;

      const matchesStatus =
        statusFilter === "All" || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  function toggleUserStatus(id: string) {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "Active" ? "Inactive" : "Active",
            }
          : user
      )
    );

    setSelectedUser((currentUser) =>
      currentUser?.id === id
        ? {
            ...currentUser,
            status: currentUser.status === "Active" ? "Inactive" : "Active",
          }
        : currentUser
    );
  }

  function resetFilters() {
    setSearch("");
    setRoleFilter("All");
    setStatusFilter("All");
  }

  return (
    <main className="min-h-screen bg-[#F8F7F0] px-5 py-10 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-7xl">

        {/* Page Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#718653]">
              ADMINISTRATION
            </p>

            <h1 className="mt-2 text-4xl font-semibold text-[#303522]">
              User Management
            </h1>

            <p className="mt-2 text-sm text-[#777763]">
              View, search, and manage registered CanteenHub accounts.
            </p>
          </div>

          <Link
            href="/admin"
            className="rounded-xl border border-[#C3CC9B] bg-white px-5 py-3 text-sm font-semibold text-[#52643D] transition hover:bg-[#F1F3E8]"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Statistics */}
        <section className="mb-9 grid gap-5 sm:grid-cols-3">
          {[
            {
              title: "Total Users",
              value: totalUsers,
              detail: "All registered accounts",
              color: "text-[#303522]",
            },
            {
              title: "Active Users",
              value: activeUsers,
              detail: "Currently active accounts",
              color: "text-[#52643D]",
            },
            {
              title: "Inactive Users",
              value: inactiveUsers,
              detail: "Inactive accounts",
              color: "text-[#8A6538]",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-[#E4DFB5] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <p className="text-sm font-medium text-[#777763]">
                {item.title}
              </p>

              <p className={`mt-3 text-3xl font-semibold ${item.color}`}>
                {item.value}
              </p>

              <p className="mt-2 text-xs text-[#81965F]">
                {item.detail}
              </p>
            </div>
          ))}
        </section>

        {/* User Directory */}
        <section className="overflow-hidden rounded-3xl border border-[#E4DFB5] bg-white shadow-sm">

          {/* Directory Heading */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E4DFB5] p-6 sm:p-8">
            <div>
              <h2 className="text-xl font-semibold text-[#303522]">
                Registered Users
              </h2>

              <p className="mt-1 text-sm text-[#777763]">
                Search and manage user accounts and role information.
              </p>
            </div>

            <span className="rounded-full bg-[#F1F3E8] px-4 py-2 text-xs font-semibold text-[#52643D]">
              {filteredUsers.length} of {totalUsers} Users
            </span>
          </div>

          {/* Search and Filters */}
          <div className="grid gap-4 border-b border-[#E4DFB5] bg-[#FCFBF6] p-6 md:grid-cols-3">
            <div className="md:col-span-1">
              <label
                htmlFor="userSearch"
                className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#777763]"
              >
                Search Users
              </label>

              <input
                id="userSearch"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, email, or ID..."
                className="w-full rounded-xl border border-[#C3CC9B] bg-white px-4 py-3 text-sm text-[#303522] outline-none transition focus:border-[#718653] focus:ring-2 focus:ring-[#9AB17A]/30"
              />
            </div>

            <div>
              <label
                htmlFor="roleFilter"
                className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#777763]"
              >
                Filter by Role
              </label>

              <select
                id="roleFilter"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full rounded-xl border border-[#C3CC9B] bg-white px-4 py-3 text-sm text-[#303522] outline-none focus:border-[#718653]"
              >
                <option value="All">All Roles</option>
                <option value="Customer">Customer</option>
                <option value="Vendor">Vendor</option>
                <option value="Runner">Runner</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="statusFilter"
                className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#777763]"
              >
                Filter by Status
              </label>

              <select
                id="statusFilter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full rounded-xl border border-[#C3CC9B] bg-white px-4 py-3 text-sm text-[#303522] outline-none focus:border-[#718653]"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="md:col-span-3">
              <button
                type="button"
                onClick={resetFilters}
                className="text-sm font-semibold text-[#718653] transition hover:text-[#52643D]"
              >
                Clear all filters
              </button>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left">
              <thead className="bg-[#F8F7F0]">
                <tr className="text-xs uppercase tracking-wider text-[#777763]">
                  <th className="px-6 py-4 font-semibold">User</th>
                  <th className="px-6 py-4 font-semibold">User ID</th>
                  <th className="px-6 py-4 font-semibold">Role</th>
                  <th className="px-6 py-4 font-semibold">Date Joined</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#E4DFB5]">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="transition hover:bg-[#FCFBF6]"
                  >
                    <td className="px-6 py-5">
                      <p className="text-sm font-semibold text-[#303522]">
                        {user.name}
                      </p>
                      <p className="mt-1 text-xs text-[#777763]">
                        {user.email}
                      </p>
                    </td>

                    <td className="px-6 py-5 text-sm text-[#777763]">
                      {user.id}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${roleStyles[user.role]}`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-sm text-[#777763]">
                      {user.joined}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex items-center gap-2 text-xs font-semibold ${
                          user.status === "Active"
                            ? "text-[#52643D]"
                            : "text-[#8A6538]"
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${
                            user.status === "Active"
                              ? "bg-[#81965F]"
                              : "bg-[#C69B65]"
                          }`}
                        />
                        {user.status}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setSelectedUser(user)}
                          className="text-xs font-bold text-[#718653] transition hover:text-[#52643D]"
                        >
                          View
                        </button>

                        <button
                          type="button"
                          onClick={() => toggleUserStatus(user.id)}
                          className="text-xs font-bold text-[#8A6538] transition hover:text-[#52643D]"
                        >
                          {user.status === "Active" ? "Deactivate" : "Activate"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile User Cards */}
          <div className="divide-y divide-[#E4DFB5] md:hidden">
            {filteredUsers.map((user) => (
              <div key={user.id} className="space-y-4 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-[#303522]">
                      {user.name}
                    </p>

                    <p className="mt-1 break-all text-xs text-[#777763]">
                      {user.email}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${roleStyles[user.role]}`}
                  >
                    {user.role}
                  </span>
                </div>

                <div className="flex flex-wrap justify-between gap-2 text-xs text-[#777763]">
                  <span>{user.id}</span>
                  <span>{user.joined}</span>
                  <span
                    className={`font-semibold ${
                      user.status === "Active"
                        ? "text-[#52643D]"
                        : "text-[#8A6538]"
                    }`}
                  >
                    {user.status}
                  </span>
                </div>

                <div className="flex gap-4 border-t border-[#E4DFB5] pt-3">
                  <button
                    type="button"
                    onClick={() => setSelectedUser(user)}
                    className="text-xs font-bold text-[#718653]"
                  >
                    View Details
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleUserStatus(user.id)}
                    className="text-xs font-bold text-[#8A6538]"
                  >
                    {user.status === "Active" ? "Deactivate" : "Activate"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty Search Results */}
          {filteredUsers.length === 0 && (
            <div className="px-6 py-14 text-center">
              <p className="text-lg font-semibold text-[#303522]">
                No users found
              </p>

              <p className="mt-2 text-sm text-[#777763]">
                Try changing your search or filter selections.
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 text-sm font-bold text-[#718653] hover:text-[#52643D]"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Table Footer */}
          <div className="border-t border-[#E4DFB5] bg-[#FCFBF6] px-6 py-4">
            <p className="text-xs text-[#777763]">
              Showing {filteredUsers.length} of {totalUsers} sample user
              records.
            </p>
          </div>
        </section>

        {/* User Details Modal */}
        {selectedUser && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-[#303522]/50 p-4"
            onClick={() => setSelectedUser(null)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="userDetailsTitle"
              className="w-full max-w-md rounded-3xl border border-[#E4DFB5] bg-white p-7 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#718653]">
                    ACCOUNT INFORMATION
                  </p>

                  <h2
                    id="userDetailsTitle"
                    className="mt-2 text-2xl font-semibold text-[#303522]"
                  >
                    User Details
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedUser(null)}
                  aria-label="Close user details"
                  className="text-2xl leading-none text-[#777763] transition hover:text-[#303522]"
                >
                  ×
                </button>
              </div>

              <div className="mt-7 space-y-5">
                <div>
                  <p className="text-xs text-[#777763]">Full Name</p>
                  <p className="mt-1 font-semibold text-[#303522]">
                    {selectedUser.name}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#777763]">Email Address</p>
                  <p className="mt-1 break-all text-sm font-medium text-[#303522]">
                    {selectedUser.email}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#777763]">User ID</p>
                  <p className="mt-1 text-sm font-medium text-[#303522]">
                    {selectedUser.id}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#777763]">Account Role</p>
                  <span
                    className={`mt-2 inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${roleStyles[selectedUser.role]}`}
                  >
                    {selectedUser.role}
                  </span>
                </div>

                <div>
                  <p className="text-xs text-[#777763]">Date Joined</p>
                  <p className="mt-1 text-sm font-medium text-[#303522]">
                    {selectedUser.joined}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#777763]">Account Status</p>
                  <p
                    className={`mt-1 text-sm font-semibold ${
                      selectedUser.status === "Active"
                        ? "text-[#52643D]"
                        : "text-[#8A6538]"
                    }`}
                  >
                    {selectedUser.status}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => toggleUserStatus(selectedUser.id)}
                  className="flex-1 rounded-xl bg-[#718653] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#52643D]"
                >
                  {selectedUser.status === "Active"
                    ? "Deactivate Account"
                    : "Activate Account"}
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedUser(null)}
                  className="rounded-xl border border-[#C3CC9B] px-5 py-3 text-sm font-semibold text-[#52643D] transition hover:bg-[#F1F3E8]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Note */}
        <p className="mt-5 text-xs leading-5 text-[#777763]">
          Note: These are sample accounts for frontend development. Search,
          filtering, viewing, and status changes currently operate on
          temporary frontend data. Actual user records and administrative
          actions will be connected to the Laravel API and database.
        </p>

      </div>
    </main>
  );
}
