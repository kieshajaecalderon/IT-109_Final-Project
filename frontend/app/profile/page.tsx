
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";

type LocationOption = {
  code: string;
  name: string;
};

type ProfileForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  role: string;
  photo: string;
  street: string;
  region: string;
  province: string;
  city: string;
  barangay: string;
};

type ProfileResponse = {
  message: string;
  user: {
    email: string;
    phone: string | null;
    roles: { name: string }[];
    profile?: {
      first_name?: string;
      last_name?: string;
      birth_date?: string | null;
      profile_photo?: string | null;
    };
  };
};

const initialProfile: ProfileForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: "",
  role: "customer",
  photo: "",
  street: "",
  region: "",
  province: "",
  city: "",
  barangay: "",
};

const API_BASE = "https://psgc.cloud/api/v2";

const inputClass =
  "w-full rounded-xl border border-[#C3CC9B] bg-[#F8F7F0] px-4 py-3 text-sm text-[#303522] outline-none transition placeholder:text-[#999987] focus:border-[#718653] focus:ring-2 focus:ring-[#9AB17A]/30 disabled:cursor-not-allowed disabled:opacity-60";

const labelClass = "mb-2 block text-sm font-semibold text-[#303522]";

async function fetchLocations(
  url: string,
  signal: AbortSignal
): Promise<LocationOption[]> {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error("Unable to load address information.");
  }

  const result = await response.json();
  const locations = Array.isArray(result) ? result : result.data;

  if (!Array.isArray(locations)) {
    throw new Error("Invalid address information received.");
  }

  return locations.map((item: { code: string; name: string }) => ({
    code: item.code,
    name: item.name,
  }));
}

export default function ProfilePage() {
  const router = useRouter();

  const [profile, setProfile] = useState<ProfileForm>(initialProfile);
  const [savedProfile, setSavedProfile] =
    useState<ProfileForm>(initialProfile);

  const [regions, setRegions] = useState<LocationOption[]>([]);
  const [provinces, setProvinces] = useState<LocationOption[]>([]);
  const [cities, setCities] = useState<LocationOption[]>([]);
  const [barangays, setBarangays] = useState<LocationOption[]>([]);

  const [loadingRegions, setLoadingRegions] = useState(false);
  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingBarangays, setLoadingBarangays] = useState(false);
  const [locationError, setLocationError] = useState("");

  const [today, setToday] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );
  const [isEditing, setIsEditing] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Load saved profile information from Laravel.
  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      const token = localStorage.getItem("canteenhub_token");

      if (!token) {
        setMessageType("error");
        setMessage("Please log in to view your profile.");
        setIsLoadingProfile(false);
        return;
      }

      try {
        const response = await apiRequest<ProfileResponse>("/profile", {
          token,
        });

        if (cancelled) return;

        const user = response.user;

        const loadedProfile: ProfileForm = {
          ...initialProfile,
          firstName: user.profile?.first_name || "",
          lastName: user.profile?.last_name || "",
          email: user.email || "",
          phone: user.phone || "",
          birthDate: user.profile?.birth_date
            ? user.profile.birth_date.substring(0, 10)
            : "",
          role: user.roles?.[0]?.name?.toLowerCase() || "customer",
          photo: user.profile?.profile_photo || "",
        };

        setProfile(loadedProfile);
        setSavedProfile(loadedProfile);
        setIsEditing(false);
      } catch (error) {
        if (!cancelled) {
          setMessageType("error");
          setMessage(
            error instanceof Error
              ? error.message
              : "Unable to load your profile."
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoadingProfile(false);
        }
      }
    }

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, []);

  // Get today's date.
  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    setToday(`${year}-${month}-${day}`);
  }, []);

  // Load regions.
  useEffect(() => {
    const controller = new AbortController();

    async function loadRegions() {
      setLoadingRegions(true);
      setLocationError("");

      try {
        const data = await fetchLocations(
          `${API_BASE}/regions`,
          controller.signal
        );

        setRegions(data);
      } catch (error) {
        if (!controller.signal.aborted) {
          setLocationError(
            error instanceof Error
              ? error.message
              : "Unable to load regions."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingRegions(false);
        }
      }
    }

    loadRegions();

    return () => controller.abort();
  }, []);

  // Load provinces when a region is selected.
  useEffect(() => {
    if (!profile.region) {
      setProvinces([]);
      return;
    }

    const controller = new AbortController();

    async function loadProvinces() {
      setLoadingProvinces(true);
      setLocationError("");
      setProvinces([]);

      try {
        const data = await fetchLocations(
          `${API_BASE}/regions/${profile.region}/provinces`,
          controller.signal
        );

        setProvinces(data);
      } catch (error) {
        if (!controller.signal.aborted) {
          setLocationError(
            error instanceof Error
              ? error.message
              : "Unable to load provinces."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingProvinces(false);
        }
      }
    }

    loadProvinces();

    return () => controller.abort();
  }, [profile.region]);

  // Load cities or municipalities when a province is selected.
  useEffect(() => {
    if (!profile.province) {
      setCities([]);
      return;
    }

    const controller = new AbortController();

    async function loadCities() {
      setLoadingCities(true);
      setLocationError("");
      setCities([]);

      try {
        const data = await fetchLocations(
          `${API_BASE}/provinces/${profile.province}/cities-municipalities`,
          controller.signal
        );

        setCities(data);
      } catch (error) {
        if (!controller.signal.aborted) {
          setLocationError(
            error instanceof Error
              ? error.message
              : "Unable to load cities and municipalities."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingCities(false);
        }
      }
    }

    loadCities();

    return () => controller.abort();
  }, [profile.province]);

  // Load barangays when a city or municipality is selected.
  useEffect(() => {
    if (!profile.city) {
      setBarangays([]);
      return;
    }

    const controller = new AbortController();

    async function loadBarangays() {
      setLoadingBarangays(true);
      setLocationError("");
      setBarangays([]);

      try {
        const data = await fetchLocations(
          `${API_BASE}/cities-municipalities/${profile.city}/barangays`,
          controller.signal
        );

        setBarangays(data);
      } catch (error) {
        if (!controller.signal.aborted) {
          setLocationError(
            error instanceof Error
              ? error.message
              : "Unable to load barangays."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingBarangays(false);
        }
      }
    }

    loadBarangays();

    return () => controller.abort();
  }, [profile.city]);

  const fullName =
    `${savedProfile.firstName} ${savedProfile.lastName}`.trim() ||
    "Your Name";

  const roleLabel =
    savedProfile.role === "vendor"
      ? "Canteen Vendor"
      : savedProfile.role === "runner"
        ? "Student Delivery Runner"
        : savedProfile.role === "admin"
          ? "Administrator"
          : "Customer";

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
  }

  // Handle cascading address selections.
  function handleLocationChange(
    name: "region" | "province" | "city" | "barangay",
    value: string
  ) {
    setProfile((previous) => {
      if (name === "region") {
        return {
          ...previous,
          region: value,
          province: "",
          city: "",
          barangay: "",
        };
      }

      if (name === "province") {
        return {
          ...previous,
          province: value,
          city: "",
          barangay: "",
        };
      }

      if (name === "city") {
        return {
          ...previous,
          city: value,
          barangay: "",
        };
      }

      return {
        ...previous,
        barangay: value,
      };
    });

    setMessage("");
    setLocationError("");
  }

  function handlePhotoChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessageType("error");
      setMessage("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setMessageType("error");
      setMessage("Profile picture must be 2 MB or smaller.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setProfile((previous) => ({
        ...previous,
        photo: String(reader.result),
      }));

      setMessage("");
    };

    reader.onerror = () => {
      setMessageType("error");
      setMessage("Unable to read the selected image.");
    };

    reader.readAsDataURL(file);
  }

  // Log out through Laravel and clear local session data.
  async function handleLogout() {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    const token = localStorage.getItem("canteenhub_token");

    try {
      if (token) {
        await apiRequest("/auth/logout", {
          method: "POST",
          token,
        });
      }
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      localStorage.removeItem("canteenhub_token");
      localStorage.removeItem("canteenhub_user");

      router.replace("/login");
    }
  }

  // Save profile information through Laravel.
  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !profile.firstName.trim() ||
      !profile.lastName.trim() ||
      !profile.email.trim() ||
      !profile.phone.trim()
    ) {
      setMessageType("error");
      setMessage("Please complete all required personal information.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(profile.email.trim())) {
      setMessageType("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    const phonePattern = /^09\d{9}$/;

    if (!phonePattern.test(profile.phone.trim())) {
      setMessageType("error");
      setMessage("Enter a valid Philippine mobile number (09XXXXXXXXX).");
      return;
    }

    if (profile.birthDate && today && profile.birthDate > today) {
      setMessageType("error");
      setMessage("Date of birth cannot be in the future.");
      return;
    }

    const token = localStorage.getItem("canteenhub_token");

    if (!token) {
      setMessageType("error");
      setMessage("Please log in again to save your profile.");
      return;
    }

    setIsSaving(true);
    setMessage("");

    try {
      const response = await apiRequest<ProfileResponse>("/profile", {
        method: "PUT",
        token,
        body: JSON.stringify({
          first_name: profile.firstName.trim(),
          last_name: profile.lastName.trim(),
          birth_date: profile.birthDate || null,
          phone: profile.phone.trim(),
        }),
      });

      const user = response.user;

      const updatedProfile: ProfileForm = {
        ...profile,
        firstName: user.profile?.first_name || "",
        lastName: user.profile?.last_name || "",
        email: user.email || "",
        phone: user.phone || "",
        birthDate: user.profile?.birth_date
          ? user.profile.birth_date.substring(0, 10)
          : "",
        role: user.roles?.[0]?.name?.toLowerCase() || "customer",
      };

      setProfile(updatedProfile);
      setSavedProfile(updatedProfile);
      setIsEditing(false);
      setMessageType("success");
      setMessage(response.message || "Profile updated successfully.");
    } catch (error) {
      setMessageType("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to save your profile."
      );
    } finally {
      setIsSaving(false);
    }
  }

  function handleEdit() {
    setProfile({ ...savedProfile });
    setIsEditing(true);
    setMessage("");
  }

  function handleCancel() {
    setProfile({ ...savedProfile });
    setIsEditing(false);
    setMessage("");
  }

  function handleClear() {
    setProfile({
      ...savedProfile,
      firstName: "",
      lastName: "",
      phone: "",
      birthDate: "",
      photo: "",
      street: "",
      region: "",
      province: "",
      city: "",
      barangay: "",
    });

    setMessage("");
    setIsEditing(true);
  }

  return (
    <main className="min-h-screen bg-[#F8F7F0] px-4 py-10 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-5xl">
        {/* Page Heading */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
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

          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="rounded-xl border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoggingOut ? "Logging Out..." : "Log Out"}
          </button>
        </div>

        {isLoadingProfile ? (
          <div className="rounded-3xl border border-[#E4DFB5] bg-white p-8 text-center text-sm text-[#777763]">
            Loading your profile...
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[280px_1fr] lg:gap-8">
            {/* Profile Summary */}
            <section className="h-fit rounded-3xl border border-[#E4DFB5] bg-white p-7 text-center shadow-sm">
              <div className="mx-auto flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-[#E4DFB5] bg-[#F0F5E9]">
                {savedProfile.photo ? (
                  <img
                    src={savedProfile.photo}
                    alt="Profile picture"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-4xl font-semibold text-[#52643D]">
                    {savedProfile.firstName
                      ? savedProfile.firstName.charAt(0).toUpperCase()
                      : "?"}
                  </span>
                )}
              </div>

              <h2 className="mt-5 break-words text-xl font-semibold text-[#303522]">
                {fullName}
              </h2>

              <p className="mt-1 text-sm text-[#777763]">{roleLabel}</p>

              <div className="mt-6 border-t border-[#E4DFB5] pt-5 text-left">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#718653]">
                  Account Status
                </p>

                <p className="mt-2 flex items-center gap-2 text-sm font-medium text-[#52643D]">
                  <span className="h-2 w-2 rounded-full bg-[#718653]" />
                  Active
                </p>
              </div>

              <div className="mt-5 border-t border-[#E4DFB5] pt-5 text-left">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#718653]">
                  Email Address
                </p>

                <p className="mt-2 break-all text-sm text-[#777763]">
                  {savedProfile.email || "Not provided"}
                </p>
              </div>
            </section>

            {/* Profile Form */}
            <section className="rounded-3xl border border-[#E4DFB5] bg-white p-6 shadow-sm sm:p-9">
              <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-[#303522]">
                    Personal Information
                  </h2>

                  <p className="mt-1 text-sm text-[#777763]">
                    Update your account details.
                  </p>
                </div>

                {!isEditing && (
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="rounded-xl bg-[#E4DFB5] px-5 py-2.5 text-sm font-semibold text-[#52643D] transition hover:bg-[#C3CC9B]"
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              {message && (
                <div
                  role="alert"
                  aria-live="polite"
                  className={`mb-6 rounded-xl border px-4 py-3 text-sm leading-6 ${
                    messageType === "success"
                      ? "border-[#9AB17A] bg-[#F0F5E9] text-[#52643D]"
                      : "border-red-200 bg-red-50 text-red-700"
                  }`}
                >
                  {message}
                </div>
              )}

              {locationError && (
                <div
                  role="alert"
                  className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {locationError} Please check your internet connection and try
                  again.
                </div>
              )}

              <form onSubmit={handleSave} className="space-y-6">
                {/* Profile Picture */}
                <div className="border-b border-[#E4DFB5] pb-6">
                  <h3 className="mb-4 text-lg font-semibold text-[#303522]">
                    Profile Picture
                  </h3>

                  <div className="flex flex-wrap items-center gap-5">
                    <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-[#F0F5E9]">
                      {profile.photo ? (
                        <img
                          src={profile.photo}
                          alt="Selected profile picture"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-3xl text-[#52643D]">?</span>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="photo"
                        className={`inline-block rounded-xl border border-[#C3CC9B] px-4 py-2.5 text-sm font-semibold text-[#52643D] transition ${
                          isEditing
                            ? "cursor-pointer hover:bg-[#F8F7F0]"
                            : "cursor-not-allowed opacity-50"
                        }`}
                      >
                        Choose Photo
                      </label>

                      <input
                        id="photo"
                        type="file"
                        accept="image/*"
                        disabled={!isEditing}
                        onChange={handlePhotoChange}
                        className="sr-only"
                      />

                      <p className="mt-2 text-xs text-[#777763]">
                        JPG, PNG, or WEBP. Maximum size: 2 MB.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Basic Information */}
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-[#303522]">
                    Basic Information
                  </h3>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className={labelClass}>
                        First Name *
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={profile.firstName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="Enter first name"
                        className={inputClass}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="lastName" className={labelClass}>
                        Last Name *
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={profile.lastName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="Enter last name"
                        className={inputClass}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className={labelClass}>
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={profile.email}
                        disabled
                        className={inputClass}
                      />
                      <p className="mt-2 text-xs text-[#777763]">
                        Your registered email address cannot be changed here.
                      </p>
                    </div>

                    <div>
                      <label htmlFor="phone" className={labelClass}>
                        Phone Number *
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={profile.phone}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="09XXXXXXXXX"
                        maxLength={11}
                        className={inputClass}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="birthDate" className={labelClass}>
                        Date of Birth
                      </label>
                      <input
                        id="birthDate"
                        name="birthDate"
                        type="date"
                        value={profile.birthDate}
                        onChange={handleChange}
                        disabled={!isEditing}
                        max={today || undefined}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label htmlFor="role" className={labelClass}>
                        Account Role
                      </label>
                      <select
                        id="role"
                        name="role"
                        value={profile.role}
                        disabled
                        className={inputClass}
                      >
                        <option value="customer">Customer</option>
                        <option value="vendor">Canteen Vendor</option>
                        <option value="runner">Student Delivery Runner</option>
                        <option value="admin">Administrator</option>
                      </select>
                      <p className="mt-2 text-xs text-[#777763]">
                        Account roles can only be changed by an authorized
                        administrator.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div className="border-t border-[#E4DFB5] pt-6">
                  <h3 className="mb-2 text-lg font-semibold text-[#303522]">
                    Address Information
                  </h3>

                  <p className="mb-5 text-sm text-[#777763]">
                    Select your current residential address.
                  </p>

                  <div className="space-y-5">
                    <div>
                      <label htmlFor="street" className={labelClass}>
                        Street / House Number
                      </label>
                      <input
                        id="street"
                        name="street"
                        type="text"
                        value={profile.street}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="Enter street or house number"
                        className={inputClass}
                      />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      {/* Region */}
                      <div>
                        <label htmlFor="region" className={labelClass}>
                          Region
                        </label>
                        <select
                          id="region"
                          name="region"
                          value={profile.region}
                          onChange={(event) =>
                            handleLocationChange("region", event.target.value)
                          }
                          disabled={!isEditing || loadingRegions}
                          className={inputClass}
                        >
                          <option value="">
                            {loadingRegions
                              ? "Loading regions..."
                              : "Select region"}
                          </option>

                          {regions.map((region) => (
                            <option key={region.code} value={region.code}>
                              {region.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Province */}
                      <div>
                        <label htmlFor="province" className={labelClass}>
                          Province
                        </label>
                        <select
                          id="province"
                          name="province"
                          value={profile.province}
                          onChange={(event) =>
                            handleLocationChange(
                              "province",
                              event.target.value
                            )
                          }
                          disabled={
                            !isEditing ||
                            !profile.region ||
                            loadingProvinces
                          }
                          className={inputClass}
                        >
                          <option value="">
                            {!profile.region
                              ? "Select a region first"
                              : loadingProvinces
                                ? "Loading provinces..."
                                : "Select province"}
                          </option>

                          {provinces.map((province) => (
                            <option key={province.code} value={province.code}>
                              {province.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* City / Municipality */}
                      <div>
                        <label htmlFor="city" className={labelClass}>
                          City / Municipality
                        </label>
                        <select
                          id="city"
                          name="city"
                          value={profile.city}
                          onChange={(event) =>
                            handleLocationChange("city", event.target.value)
                          }
                          disabled={
                            !isEditing ||
                            !profile.province ||
                            loadingCities
                          }
                          className={inputClass}
                        >
                          <option value="">
                            {!profile.province
                              ? "Select a province first"
                              : loadingCities
                                ? "Loading cities..."
                                : "Select city / municipality"}
                          </option>

                          {cities.map((city) => (
                            <option key={city.code} value={city.code}>
                              {city.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Barangay */}
                      <div>
                        <label htmlFor="barangay" className={labelClass}>
                          Barangay
                        </label>
                        <select
                          id="barangay"
                          name="barangay"
                          value={profile.barangay}
                          onChange={(event) =>
                            handleLocationChange(
                              "barangay",
                              event.target.value
                            )
                          }
                          disabled={
                            !isEditing ||
                            !profile.city ||
                            loadingBarangays
                          }
                          className={inputClass}
                        >
                          <option value="">
                            {!profile.city
                              ? "Select a city first"
                              : loadingBarangays
                                ? "Loading barangays..."
                                : "Select barangay"}
                          </option>

                          {barangays.map((barangay) => (
                            <option key={barangay.code} value={barangay.code}>
                              {barangay.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <p className="text-xs text-[#777763]">
                      Address selections are loaded from Philippine
                      Statistics Authority PSGC data. Address saving still
                      needs integration with the addresses API.
                    </p>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex flex-wrap justify-end gap-3 border-t border-[#E4DFB5] pt-6">
                  {isEditing ? (
                    <>
                      <button
                        type="button"
                        onClick={handleClear}
                        disabled={isSaving}
                        className="rounded-xl border border-[#C3CC9B] px-5 py-3 text-sm font-semibold text-[#52643D] transition hover:bg-[#F8F7F0] disabled:opacity-50"
                      >
                        Clear Form
                      </button>

                      <button
                        type="button"
                        onClick={handleCancel}
                        disabled={isSaving}
                        className="rounded-xl border border-[#C3CC9B] px-5 py-3 text-sm font-semibold text-[#52643D] transition hover:bg-[#F8F7F0] disabled:opacity-50"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        disabled={isSaving}
                        className="rounded-xl bg-[#718653] px-7 py-3 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#52643D] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isSaving ? "Saving..." : "Save Changes"}
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/"
                      className="rounded-xl border border-[#C3CC9B] px-6 py-3 text-sm font-semibold text-[#52643D] transition hover:bg-[#F8F7F0]"
                    >
                      Back to Home
                    </Link>
                  )}
                </div>
              </form>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
