
"use client";

import Link from "next/link";
import { useState } from "react";

type Canteen = {
  id: number;
  name: string;
  location: string;
  vendor: string;
  status: "Active" | "Inactive";
};

const initialCanteens: Canteen[] = [
  {
    id: 1,
    name: "Campus Food Hub",
    location: "Main Campus",
    vendor: "Maria Santos",
    status: "Active",
  },
  {
    id: 2,
    name: "The Daily Plate",
    location: "North Wing",
    vendor: "Juan Reyes",
    status: "Active",
  },
  {
    id: 3,
    name: "Green Bowl Kitchen",
    location: "South Campus",
    vendor: "Angela Cruz",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Snack Corner",
    location: "Student Center",
    vendor: "Pedro Garcia",
    status: "Active",
  },
];

export default function CanteenManagementPage() {
  const [canteens, setCanteens] = useState(initialCanteens);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    vendor: "",
    status: "Active" as "Active" | "Inactive",
  });

  const activeCount = canteens.filter(
    (canteen) => canteen.status === "Active"
  ).length;

  const inactiveCount = canteens.filter(
    (canteen) => canteen.status === "Inactive"
  ).length;

  const filteredCanteens = canteens.filter((canteen) =>
    `${canteen.name} ${canteen.location} ${canteen.vendor}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function openAddForm() {
    setEditingId(null);
    setFormData({
      name: "",
      location: "",
      vendor: "",
      status: "Active",
    });
    setShowForm(true);
  }

  function openEditForm(canteen: Canteen) {
    setEditingId(canteen.id);
    setFormData({
      name: canteen.name,
      location: canteen.location,
      vendor: canteen.vendor,
      status: canteen.status,
    });
    setShowForm(true);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (editingId !== null) {
      setCanteens((previous) =>
        previous.map((canteen) =>
          canteen.id === editingId
            ? { ...canteen, ...formData }
            : canteen
        )
      );
    } else {
      const newCanteen: Canteen = {
        id: Date.now(),
        ...formData,
      };

      setCanteens((previous) => [...previous, newCanteen]);
    }

    setShowForm(false);
    setEditingId(null);
  }

  function deleteCanteen(id: number) {
    setCanteens((previous) =>
      previous.filter((canteen) => canteen.id !== id)
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F7F0] px-6 py-12">
      <div className="mx-auto max-w-7xl">

        {/* Page Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#718653]">
              ADMINISTRATION
            </p>

            <h1 className="mt-2 text-4xl font-semibold text-[#303522]">
              Canteen Management
            </h1>

            <p className="mt-2 text-sm text-[#777763]">
              Manage registered campus canteens and their information.
            </p>
          </div>

          <Link
            href="/admin"
            className="rounded-xl border border-[#C3CC9B] bg-white px-5 py-3 text-sm font-semibold text-[#52643D] transition hover:bg-[#F1F3E8]"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Overview Cards */}
        <section className="mb-9 grid gap-5 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#E4DFB5] bg-white p-6 shadow-sm">
            <p className="text-sm text-[#777763]">Total Canteens</p>
            <p className="mt-3 text-3xl font-semibold text-[#303522]">
              {canteens.length}
            </p>
            <p className="mt-2 text-xs text-[#81965F]">
              Registered campus stalls
            </p>
          </div>

          <div className="rounded-2xl border border-[#E4DFB5] bg-white p-6 shadow-sm">
            <p className="text-sm text-[#777763]">Active Canteens</p>
            <p className="mt-3 text-3xl font-semibold text-[#52643D]">
              {activeCount}
            </p>
            <p className="mt-2 text-xs text-[#81965F]">
              Currently active
            </p>
          </div>

          <div className="rounded-2xl border border-[#E4DFB5] bg-white p-6 shadow-sm">
            <p className="text-sm text-[#777763]">Inactive Canteens</p>
            <p className="mt-3 text-3xl font-semibold text-[#8A6538]">
              {inactiveCount}
            </p>
            <p className="mt-2 text-xs text-[#81965F]">
              Currently inactive
            </p>
          </div>
        </section>

        {/* Canteen Directory */}
        <section className="overflow-hidden rounded-3xl border border-[#E4DFB5] bg-white shadow-sm">

          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E4DFB5] p-6 sm:p-8">
            <div>
              <h2 className="text-xl font-semibold text-[#303522]">
                Registered Canteens
              </h2>
              <p className="mt-1 text-sm text-[#777763]">
                View and manage canteen information.
              </p>
            </div>

            <button
              type="button"
              onClick={openAddForm}
              className="rounded-xl bg-[#718653] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#52643D] hover:shadow-md"
            >
              + Add Canteen
            </button>
          </div>

          {/* Search */}
          <div className="border-b border-[#E4DFB5] p-6">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by canteen name, location, or vendor..."
              className="w-full rounded-xl border border-[#C3CC9B] bg-[#F8F7F0] px-4 py-3 text-sm text-[#303522] outline-none transition focus:border-[#718653] focus:ring-2 focus:ring-[#9AB17A]/30"
            />
          </div>

          {/* Add / Edit Form */}
          {showForm && (
            <div className="border-b border-[#E4DFB5] bg-[#FCFBF6] p-6 sm:p-8">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-[#303522]">
                  {editingId !== null ? "Edit Canteen" : "Add New Canteen"}
                </h3>
                <p className="mt-1 text-sm text-[#777763]">
                  Enter the canteen details below.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="canteenName" className="mb-2 block text-sm font-semibold text-[#303522]">
                      Canteen Name
                    </label>
                    <input
                      id="canteenName"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Enter canteen name"
                      className="w-full rounded-xl border border-[#C3CC9B] bg-white px-4 py-3 text-sm outline-none focus:border-[#718653] focus:ring-2 focus:ring-[#9AB17A]/30"
                    />
                  </div>

                  <div>
                    <label htmlFor="location" className="mb-2 block text-sm font-semibold text-[#303522]">
                      Location
                    </label>
                    <input
                      id="location"
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      placeholder="Enter canteen location"
                      className="w-full rounded-xl border border-[#C3CC9B] bg-white px-4 py-3 text-sm outline-none focus:border-[#718653] focus:ring-2 focus:ring-[#9AB17A]/30"
                    />
                  </div>

                  <div>
                    <label htmlFor="vendor" className="mb-2 block text-sm font-semibold text-[#303522]">
                      Vendor Name
                    </label>
                    <input
                      id="vendor"
                      type="text"
                      required
                      value={formData.vendor}
                      onChange={(e) =>
                        setFormData({ ...formData, vendor: e.target.value })
                      }
                      placeholder="Enter vendor name"
                      className="w-full rounded-xl border border-[#C3CC9B] bg-white px-4 py-3 text-sm outline-none focus:border-[#718653] focus:ring-2 focus:ring-[#9AB17A]/30"
                    />
                  </div>

                  <div>
                    <label htmlFor="status" className="mb-2 block text-sm font-semibold text-[#303522]">
                      Canteen Status
                    </label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          status: e.target.value as "Active" | "Inactive",
                        })
                      }
                      className="w-full rounded-xl border border-[#C3CC9B] bg-white px-4 py-3 text-sm outline-none focus:border-[#718653] focus:ring-2 focus:ring-[#9AB17A]/30"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-wrap justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="rounded-xl border border-[#C3CC9B] px-6 py-3 text-sm font-semibold text-[#52643D] transition hover:bg-[#F1F3E8]"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="rounded-xl bg-[#718653] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#52643D]"
                  >
                    {editingId !== null ? "Save Changes" : "Add Canteen"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left">
              <thead className="bg-[#F8F7F0]">
                <tr className="text-xs uppercase tracking-wider text-[#777763]">
                  <th className="px-6 py-4 font-semibold">Canteen</th>
                  <th className="px-6 py-4 font-semibold">Location</th>
                  <th className="px-6 py-4 font-semibold">Vendor</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#E4DFB5]">
                {filteredCanteens.map((canteen) => (
                  <tr key={canteen.id} className="transition hover:bg-[#FCFBF6]">
                    <td className="px-6 py-5">
                      <p className="text-sm font-semibold text-[#303522]">
                        {canteen.name}
                      </p>
                      <p className="mt-1 text-xs text-[#777763]">
                        CAN-{canteen.id}
                      </p>
                    </td>

                    <td className="px-6 py-5 text-sm text-[#777763]">
                      {canteen.location}
                    </td>

                    <td className="px-6 py-5 text-sm text-[#777763]">
                      {canteen.vendor}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                          canteen.status === "Active"
                            ? "bg-[#F1F3E8] text-[#52643D]"
                            : "bg-[#FBE8CE] text-[#8A6538]"
                        }`}
                      >
                        {canteen.status}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => openEditForm(canteen)}
                          className="text-xs font-bold text-[#718653] transition hover:text-[#303522]"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteCanteen(canteen.id)}
                          className="text-xs font-bold text-[#A65B4B] transition hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredCanteens.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-sm text-[#777763]">
                      No canteens found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="divide-y divide-[#E4DFB5] md:hidden">
            {filteredCanteens.map((canteen) => (
              <div key={canteen.id} className="space-y-4 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-[#303522]">
                      {canteen.name}
                    </h3>
                    <p className="mt-1 text-xs text-[#777763]">
                      {canteen.location}
                    </p>
                  </div>

                  <span className="text-xs font-semibold text-[#52643D]">
                    {canteen.status}
                  </span>
                </div>

                <p className="text-sm text-[#777763]">
                  Vendor: {canteen.vendor}
                </p>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => openEditForm(canteen)}
                    className="text-xs font-bold text-[#718653]"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteCanteen(canteen.id)}
                    className="text-xs font-bold text-[#A65B4B]"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {filteredCanteens.length === 0 && (
              <p className="px-6 py-12 text-center text-sm text-[#777763]">
                No canteens found.
              </p>
            )}
          </div>

          {/* Table Footer */}
          <div className="border-t border-[#E4DFB5] bg-[#FCFBF6] px-6 py-4">
            <p className="text-xs text-[#777763]">
              Showing {filteredCanteens.length} of {canteens.length} canteens.
            </p>
          </div>
        </section>

        <p className="mt-5 text-xs leading-5 text-[#777763]">
          Note: Canteen records are temporary frontend data. Permanent
          storage, vendor account linking, and database operations will be
          implemented through the Laravel API.
        </p>

      </div>
    </main>
  );
}
