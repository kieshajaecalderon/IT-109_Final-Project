
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";

type LocationOption = {
  code: string;
  name: string;
};

type RegisterResponse = {
  message: string;
  token: string;
  user: unknown;
};

const PSGC_API = "https://psgc.cloud/api/v2";

async function fetchLocations(url: string): Promise<LocationOption[]> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to load location data.");
  }

  const result = await response.json();
  const items = Array.isArray(result) ? result : result.data;

  if (!Array.isArray(items)) {
    throw new Error("Invalid location data received.");
  }

  return items.map((item: LocationOption) => ({
    code: item.code,
    name: item.name,
  }));
}

export default function RegisterPage() {
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"error" | "success" | "">("");
  const [today, setToday] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // PSGC location states
  const [regions, setRegions] = useState<LocationOption[]>([]);
  const [provinces, setProvinces] = useState<LocationOption[]>([]);
  const [cities, setCities] = useState<LocationOption[]>([]);
  const [barangays, setBarangays] = useState<LocationOption[]>([]);

  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedBarangay, setSelectedBarangay] = useState("");

  const [loadingRegions, setLoadingRegions] = useState(false);
  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingBarangays, setLoadingBarangays] = useState(false);
  const [locationError, setLocationError] = useState("");

  useEffect(() => {
    const localDate = new Date();
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, "0");
    const day = String(localDate.getDate()).padStart(2, "0");

    setToday(`${year}-${month}-${day}`);
  }, []);

  // Load all regions when the page opens.
  useEffect(() => {
    let cancelled = false;

    async function loadRegions() {
      setLoadingRegions(true);
      setLocationError("");

      try {
        const data = await fetchLocations(`${PSGC_API}/regions`);

        if (!cancelled) {
          setRegions(data);
        }
      } catch {
        if (!cancelled) {
          setLocationError(
            "Unable to load regions. Please refresh the page and try again."
          );
        }
      } finally {
        if (!cancelled) {
          setLoadingRegions(false);
        }
      }
    }

    loadRegions();

    return () => {
      cancelled = true;
    };
  }, []);

  // Load provinces whenever the selected region changes.
  useEffect(() => {
    if (!selectedRegion) {
      setProvinces([]);
      return;
    }

    let cancelled = false;

    async function loadProvinces() {
      setLoadingProvinces(true);
      setLocationError("");

      try {
        const data = await fetchLocations(
          `${PSGC_API}/regions/${encodeURIComponent(selectedRegion)}/provinces`
        );

        if (!cancelled) {
          setProvinces(data);
        }
      } catch {
        if (!cancelled) {
          setLocationError("Unable to load provinces. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setLoadingProvinces(false);
        }
      }
    }

    loadProvinces();

    return () => {
      cancelled = true;
    };
  }, [selectedRegion]);

  // Load cities and municipalities whenever the province changes.
  useEffect(() => {
    if (!selectedProvince) {
      setCities([]);
      return;
    }

    let cancelled = false;

    async function loadCities() {
      setLoadingCities(true);
      setLocationError("");

      try {
        const data = await fetchLocations(
          `${PSGC_API}/provinces/${encodeURIComponent(selectedProvince)}/cities-municipalities`
        );

        if (!cancelled) {
          setCities(data);
        }
      } catch {
        if (!cancelled) {
          setLocationError(
            "Unable to load cities and municipalities. Please try again."
          );
        }
      } finally {
        if (!cancelled) {
          setLoadingCities(false);
        }
      }
    }

    loadCities();

    return () => {
      cancelled = true;
    };
  }, [selectedProvince]);

  // Load barangays whenever the city or municipality changes.
  useEffect(() => {
    if (!selectedCity) {
      setBarangays([]);
      return;
    }

    let cancelled = false;

    async function loadBarangays() {
      setLoadingBarangays(true);
      setLocationError("");

      try {
        const data = await fetchLocations(
          `${PSGC_API}/cities-municipalities/${encodeURIComponent(selectedCity)}/barangays`
        );

        if (!cancelled) {
          setBarangays(data);
        }
      } catch {
        if (!cancelled) {
          setLocationError("Unable to load barangays. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setLoadingBarangays(false);
        }
      }
    }

    loadBarangays();

    return () => {
      cancelled = true;
    };
  }, [selectedCity]);

  function clearMessage() {
    setMessage("");
    setMessageType("");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    clearMessage();

    const formData = new FormData(e.currentTarget);

    const firstName = String(formData.get("first_name") || "").trim();
    const lastName = String(formData.get("last_name") || "").trim();
    const username = String(formData.get("username") || "")
      .trim()
      .toLowerCase();
    const birthDate = String(formData.get("birth_date") || "");
    const phone = String(formData.get("phone") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const role = String(formData.get("role") || "");
    const password = String(formData.get("password") || "");
    const confirmPassword = String(formData.get("confirm_password") || "");
    const street = String(formData.get("street") || "").trim();

    if (
      !firstName ||
      !lastName ||
      !username ||
      !birthDate ||
      !phone ||
      !email ||
      !role ||
      !password ||
      !confirmPassword ||
      !street ||
      !selectedRegion ||
      !selectedProvince ||
      !selectedCity ||
      !selectedBarangay
    ) {
      setMessage(
        "Please complete all required fields, including your address."
      );
      setMessageType("error");
      return;
    }

    const usernamePattern = /^[a-zA-Z0-9_]{4,20}$/;

    if (!usernamePattern.test(username)) {
      setMessage(
        "Username must contain 4–20 characters using only letters, numbers, or underscores."
      );
      setMessageType("error");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setMessage("Please enter a valid email address.");
      setMessageType("error");
      return;
    }

    if (today && birthDate > today) {
      setMessage("Date of birth cannot be in the future.");
      setMessageType("error");
      return;
    }

    const phonePattern = /^09\d{9}$/;

    if (!phonePattern.test(phone)) {
      setMessage(
        "Please enter a valid 11-digit Philippine mobile number starting with 09."
      );
      setMessageType("error");
      return;
    }

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

    if (!passwordPattern.test(password)) {
      setMessage(
        "Password must have at least 8 characters, including an uppercase letter, lowercase letter, number, and special character."
      );
      setMessageType("error");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match. Please check your password.");
      setMessageType("error");
      return;
    }

    // Convert PSGC codes into readable location names.
    const regionName = regions.find(
      (item) => item.code === selectedRegion
    )?.name;

    const provinceName = provinces.find(
      (item) => item.code === selectedProvince
    )?.name;

    const cityName = cities.find(
      (item) => item.code === selectedCity
    )?.name;

    const barangayName = barangays.find(
      (item) => item.code === selectedBarangay
    )?.name;

    if (!regionName || !provinceName || !cityName || !barangayName) {
      setMessage("Please select a valid complete address.");
      setMessageType("error");
      return;
    }

    const payload = {
      first_name: firstName,
      last_name: lastName,
      username,
      birth_date: birthDate,
      phone,
      email,
      role,
      password,
      password_confirmation: confirmPassword,
      region: regionName,
      province: provinceName,
      city: cityName,
      barangay: barangayName,
      street_address: street,
    };

    setIsSubmitting(true);

    try {
      const result = await apiRequest<RegisterResponse>("/auth/register", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      // Save the authentication details returned by Laravel.
      localStorage.setItem("canteenhub_token", result.token);
      localStorage.setItem("canteenhub_user", JSON.stringify(result.user));

      setMessage(result.message || "Registration successful!");
      setMessageType("success");

      router.push("/profile");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again."
      );
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-[#C3CC9B] bg-[#F8F7F0] px-4 py-3 text-sm text-[#303522] outline-none transition placeholder:text-[#999987] focus:border-[#718653] focus:ring-2 focus:ring-[#9AB17A]/30";

  const labelClass = "mb-2 block text-sm font-semibold text-[#303522]";

  return (
    <main className="min-h-[80vh] bg-[#FBE8CE] px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-2xl rounded-3xl border border-[#E4DFB5] bg-white p-6 shadow-xl sm:p-10">
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
                <label htmlFor="firstName" className={labelClass}>
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
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="lastName" className={labelClass}>
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
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="birthDate" className={labelClass}>
                  Date of Birth
                </label>
                <input
                  id="birthDate"
                  name="birth_date"
                  type="date"
                  required
                  max={today || undefined}
                  onChange={clearMessage}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="phone" className={labelClass}>
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
                  className={inputClass}
                />
                <p className="mt-2 text-xs text-[#777763]">
                  Enter an 11-digit Philippine mobile number.
                </p>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div>
            <h2 className="mb-4 border-b border-[#E4DFB5] pb-3 text-lg font-semibold text-[#303522]">
              Address Information
            </h2>

            <div className="space-y-5">
              <div>
                <label htmlFor="street" className={labelClass}>
                  House No., Street, or Building
                </label>
                <input
                  id="street"
                  name="street"
                  type="text"
                  placeholder="Enter house number, street, or building"
                  required
                  autoComplete="street-address"
                  onChange={clearMessage}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="region" className={labelClass}>
                  Region
                </label>
                <select
                  id="region"
                  name="region_code"
                  required
                  value={selectedRegion}
                  onChange={(e) => {
                    setSelectedRegion(e.target.value);
                    setSelectedProvince("");
                    setSelectedCity("");
                    setSelectedBarangay("");
                    setProvinces([]);
                    setCities([]);
                    setBarangays([]);
                    clearMessage();
                  }}
                  className={inputClass}
                >
                  <option value="">
                    {loadingRegions ? "Loading regions..." : "Select region"}
                  </option>

                  {regions.map((region) => (
                    <option key={region.code} value={region.code}>
                      {region.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="province" className={labelClass}>
                  Province
                </label>
                <select
                  id="province"
                  name="province_code"
                  required
                  value={selectedProvince}
                  disabled={!selectedRegion || loadingProvinces}
                  onChange={(e) => {
                    setSelectedProvince(e.target.value);
                    setSelectedCity("");
                    setSelectedBarangay("");
                    setCities([]);
                    setBarangays([]);
                    clearMessage();
                  }}
                  className={`${inputClass} disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  <option value="">
                    {!selectedRegion
                      ? "Select a region first"
                      : loadingProvinces
                        ? "Loading provinces..."
                        : provinces.length === 0
                          ? "No provinces available"
                          : "Select province"}
                  </option>

                  {provinces.map((province) => (
                    <option key={province.code} value={province.code}>
                      {province.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="city" className={labelClass}>
                  City / Municipality
                </label>
                <select
                  id="city"
                  name="city_municipality_code"
                  required
                  value={selectedCity}
                  disabled={!selectedProvince || loadingCities}
                  onChange={(e) => {
                    setSelectedCity(e.target.value);
                    setSelectedBarangay("");
                    setBarangays([]);
                    clearMessage();
                  }}
                  className={`${inputClass} disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  <option value="">
                    {!selectedProvince
                      ? "Select a province first"
                      : loadingCities
                        ? "Loading cities and municipalities..."
                        : cities.length === 0
                          ? "No cities or municipalities available"
                          : "Select city or municipality"}
                  </option>

                  {cities.map((city) => (
                    <option key={city.code} value={city.code}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="barangay" className={labelClass}>
                  Barangay
                </label>
                <select
                  id="barangay"
                  name="barangay_code"
                  required
                  value={selectedBarangay}
                  disabled={!selectedCity || loadingBarangays}
                  onChange={(e) => {
                    setSelectedBarangay(e.target.value);
                    clearMessage();
                  }}
                  className={`${inputClass} disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  <option value="">
                    {!selectedCity
                      ? "Select a city or municipality first"
                      : loadingBarangays
                        ? "Loading barangays..."
                        : barangays.length === 0
                          ? "No barangays available"
                          : "Select barangay"}
                  </option>

                  {barangays.map((barangay) => (
                    <option key={barangay.code} value={barangay.code}>
                      {barangay.name}
                    </option>
                  ))}
                </select>
              </div>

              {locationError && (
                <p role="alert" className="text-sm text-red-600">
                  {locationError}
                </p>
              )}

              <p className="text-xs leading-5 text-[#777763]">
                Select your location in order: Region, Province,
                City/Municipality, and Barangay.
              </p>
            </div>
          </div>

          {/* Account Information */}
          <div>
            <h2 className="mb-4 border-b border-[#E4DFB5] pb-3 text-lg font-semibold text-[#303522]">
              Account Information
            </h2>

            <div className="space-y-5">
              <div>
                <label htmlFor="username" className={labelClass}>
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  minLength={4}
                  maxLength={20}
                  pattern="[A-Za-z0-9_]{4,20}"
                  placeholder="Choose a username (4–20 characters)"
                  required
                  autoComplete="username"
                  onChange={clearMessage}
                  className={inputClass}
                />
                <p className="mt-2 text-xs text-[#777763]">
                  Use 4–20 letters, numbers, or underscores.
                </p>
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>
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
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="role" className={labelClass}>
                  Register As
                </label>
                <select
                  id="role"
                  name="role"
                  required
                  defaultValue=""
                  onChange={clearMessage}
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select your account role
                  </option>
                  <option value="Customer">
                    Customer (Student / Faculty)
                  </option>
                  <option value="Vendor">Canteen Vendor</option>
                  <option value="Runner">Student Delivery Runner</option>
                </select>

                <p className="mt-2 text-xs leading-5 text-[#777763]">
                  Admin accounts are assigned by an authorized administrator.
                </p>
              </div>

              <div>
                <label htmlFor="password" className={labelClass}>
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    minLength={8}
                    pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}"
                    title="Use at least 8 characters with an uppercase letter, lowercase letter, number, and special character."
                    placeholder="Create a strong password"
                    required
                    autoComplete="new-password"
                    onChange={clearMessage}
                    className={`${inputClass} pr-16`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#718653] transition hover:text-[#52643D]"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                <p className="mt-2 text-xs leading-5 text-[#777763]">
                  At least 8 characters, including uppercase, lowercase,
                  number, and special character.
                </p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className={labelClass}>
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirm_password"
                    type={showConfirmPassword ? "text" : "password"}
                    minLength={8}
                    placeholder="Re-enter your password"
                    required
                    autoComplete="new-password"
                    onChange={clearMessage}
                    className={`${inputClass} pr-16`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#718653] transition hover:text-[#52643D]"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Validation Message */}
          {message && (
            <div
              role="alert"
              aria-live="polite"
              className={`rounded-xl border px-4 py-3 text-sm leading-6 ${
                messageType === "error"
                  ? "border-red-200 bg-red-50 text-red-700"
                  : "border-[#9AB17A] bg-[#F0F5E9] text-[#52643D]"
              }`}
            >
              {message}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-[#718653] px-6 py-3.5 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#52643D] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
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
