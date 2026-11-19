
import Link from "next/link";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-[#F8F7F0] px-6 py-12">
      <div className="mx-auto max-w-5xl">

        {/* Page Heading */}
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#718653]">
            ACCOUNT SETTINGS
          </p>
          <h1 className="mt-2 text-4xl font-semibold text-[#303522]">
            My Profile
          </h1>
          <p className="mt-2 text-sm text-[#777763]">
            View and manage your personal information.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">

          {/* Profile Summary */}
          <section className="h-fit rounded-3xl border border-[#E4DFB5] bg-white p-7 text-center shadow-sm">
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-[#E4DFB5] text-4xl text-[#52643D]">
              👤
            </div>

            <h2 className="mt-5 text-xl font-semibold text-[#303522]">
              Your Name
            </h2>
            <p className="mt-1 text-sm text-[#777763]">
              Customer Account
            </p>

            <div className="mt-6 border-t border-[#E4DFB5] pt-5 text-left">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#718653]">
                Account Status
              </p>
              <p className="mt-2 text-sm font-medium text-[#52643D]">
                Active
              </p>
            </div>
          </section>

          {/* Personal Information */}
          <section className="rounded-3xl border border-[#E4DFB5] bg-white p-7 shadow-sm sm:p-9">
            <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-[#303522]">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm text-[#777763]">
                  Update your account details.
                </p>
              </div>

              <span className="rounded-full bg-[#E4DFB5] px-4 py-2 text-xs font-semibold text-[#52643D]">
                Profile Details
              </span>
            </div>

            <form className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="mb-2 block text-sm font-semibold text-[#303522]">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="first_name"
                    type="text"
                    placeholder="Enter first name"
                    className="w-full rounded-xl border border-[#C3CC9B] bg-[#F8F7F0] px-4 py-3 text-sm outline-none transition focus:border-[#718653] focus:ring-2 focus:ring-[#9AB17A]/30"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="mb-2 block text-sm font-semibold text-[#303522]">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="last_name"
                    type="text"
                    placeholder="Enter last name"
                    className="w-full rounded-xl border border-[#C3CC9B] bg-[#F8F7F0] px-4 py-3 text-sm outline-none transition focus:border-[#718653] focus:ring-2 focus:ring-[#9AB17A]/30"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#303522]">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter email address"
                    className="w-full rounded-xl border border-[#C3CC9B] bg-[#F8F7F0] px-4 py-3 text-sm outline-none transition focus:border-[#718653] focus:ring-2 focus:ring-[#9AB17A]/30"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-[#303522]">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter phone number"
                    className="w-full rounded-xl border border-[#C3CC9B] bg-[#F8F7F0] px-4 py-3 text-sm outline-none transition focus:border-[#718653] focus:ring-2 focus:ring-[#9AB17A]/30"
                  />
                </div>

                <div>
                  <label htmlFor="birthDate" className="mb-2 block text-sm font-semibold text-[#303522]">
                    Date of Birth
                  </label>
                  <input
                    id="birthDate"
                    name="birth_date"
                    type="date"
                    className="w-full rounded-xl border border-[#C3CC9B] bg-[#F8F7F0] px-4 py-3 text-sm outline-none transition focus:border-[#718653] focus:ring-2 focus:ring-[#9AB17A]/30"
                  />
                </div>
              </div>

              {/* Address Information */}
              <div className="border-t border-[#E4DFB5] pt-6">
                <h3 className="mb-5 text-lg font-semibold text-[#303522]">
                  Address Information
                </h3>

                <div className="space-y-5">
                  <div>
                    <label htmlFor="street" className="mb-2 block text-sm font-semibold text-[#303522]">
                      Street / House Number
                    </label>
                    <input
                      id="street"
                      name="street"
                      type="text"
                      placeholder="Enter street or house number"
                      className="w-full rounded-xl border border-[#C3CC9B] bg-[#F8F7F0] px-4 py-3 text-sm outline-none transition focus:border-[#718653] focus:ring-2 focus:ring-[#9AB17A]/30"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="region" className="mb-2 block text-sm font-semibold text-[#303522]">
                        Region
                      </label>
                      <input
                        id="region"
                        name="region"
                        type="text"
                        placeholder="Select region"
                        className="w-full rounded-xl border border-[#C3CC9B] bg-[#F8F7F0] px-4 py-3 text-sm outline-none transition focus:border-[#718653] focus:ring-2 focus:ring-[#9AB17A]/30"
                      />
                    </div>

                    <div>
                      <label htmlFor="province" className="mb-2 block text-sm font-semibold text-[#303522]">
                        Province
                      </label>
                      <input
                        id="province"
                        name="province"
                        type="text"
                        placeholder="Select province"
                        className="w-full rounded-xl border border-[#C3CC9B] bg-[#F8F7F0] px-4 py-3 text-sm outline-none transition focus:border-[#718653] focus:ring-2 focus:ring-[#9AB17A]/30"
                      />
                    </div>

                    <div>
                      <label htmlFor="city" className="mb-2 block text-sm font-semibold text-[#303522]">
                        City / Municipality
                      </label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        placeholder="Select city or municipality"
                        className="w-full rounded-xl border border-[#C3CC9B] bg-[#F8F7F0] px-4 py-3 text-sm outline-none transition focus:border-[#718653] focus:ring-2 focus:ring-[#9AB17A]/30"
                      />
                    </div>

                    <div>
                      <label htmlFor="barangay" className="mb-2 block text-sm font-semibold text-[#303522]">
                        Barangay
                      </label>
                      <input
                        id="barangay"
                        name="barangay"
                        type="text"
                        placeholder="Select barangay"
                        className="w-full rounded-xl border border-[#C3CC9B] bg-[#F8F7F0] px-4 py-3 text-sm outline-none transition focus:border-[#718653] focus:ring-2 focus:ring-[#9AB17A]/30"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap justify-end gap-3 border-t border-[#E4DFB5] pt-6">
                <Link
                  href="/"
                  className="rounded-xl border border-[#C3CC9B] px-6 py-3 text-sm font-semibold text-[#52643D] transition hover:bg-[#F8F7F0]"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  className="rounded-xl bg-[#718653] px-7 py-3 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#52643D] hover:shadow-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
