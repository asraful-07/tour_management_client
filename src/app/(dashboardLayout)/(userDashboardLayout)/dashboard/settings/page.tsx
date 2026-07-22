"use client";

import React, { useState } from "react";

interface ProfileData {
  name: string;
  email: string;
  bio: string;
}

export default function Settings() {
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    email: "",
    bio: "",
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushAlerts: false,
    weeklyDigest: true,
  });

  const [saved, setSaved] = useState(false);

  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    // Replace with your API call, e.g. PUT /api/users/me
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your profile, notifications, and account preferences.
        </p>

        {/* Profile section */}
        <section className="mt-8 rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="text-base font-medium text-gray-900">Profile</h2>
          <p className="mt-1 text-sm text-gray-500">
            This information is visible to other users.
          </p>

          <div className="mt-5 space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={profile.name}
                onChange={handleProfileChange}
                placeholder="Jane Doe"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={profile.email}
                onChange={handleProfileChange}
                placeholder="jane@example.com"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700"
              >
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={3}
                value={profile.bio}
                onChange={handleProfileChange}
                placeholder="Tell us a bit about yourself"
                className="mt-1 w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>
          </div>
        </section>

        {/* Notifications section */}
        <section className="mt-6 rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="text-base font-medium text-gray-900">Notifications</h2>
          <p className="mt-1 text-sm text-gray-500">
            Choose how you want to be notified.
          </p>

          <div className="mt-5 space-y-4">
            <ToggleRow
              label="Email alerts"
              description="Get notified by email about account activity."
              checked={notifications.emailAlerts}
              onChange={() => toggleNotification("emailAlerts")}
            />
            <ToggleRow
              label="Push notifications"
              description="Get real-time alerts on your device."
              checked={notifications.pushAlerts}
              onChange={() => toggleNotification("pushAlerts")}
            />
            <ToggleRow
              label="Weekly digest"
              description="A summary of your activity, sent every Monday."
              checked={notifications.weeklyDigest}
              onChange={() => toggleNotification("weeklyDigest")}
            />
          </div>
        </section>

        {/* Security section */}
        <section className="mt-6 rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="text-base font-medium text-gray-900">Security</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your password and account access.
          </p>

          <div className="mt-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Password</p>
              <p className="text-sm text-gray-500">Last changed 3 months ago</p>
            </div>
            <button
              type="button"
              className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Change password
            </button>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
            <div>
              <p className="text-sm font-medium text-red-600">Delete account</p>
              <p className="text-sm text-gray-500">
                Permanently remove your account and all data.
              </p>
            </div>
            <button
              type="button"
              className="rounded-md border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Delete
            </button>
          </div>
        </section>

        {/* Save bar */}
        <div className="mt-6 flex items-center justify-end gap-3">
          {saved && (
            <span className="text-sm text-green-600">Settings saved</span>
          )}
          <button
            type="button"
            onClick={handleSave}
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        className={`relative h-6 w-11 flex-shrink-0 rounded-full transition-colors ${
          checked ? "bg-gray-900" : "bg-gray-200"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}
