/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef } from "react";
import {
  useUserInfoQuery,
  useUpdateProfileMutation,
} from "@/redux/features/auth/auth.api";

export default function Profile() {
  // API returns { data: {...}, message: "...", success: true }
  // RTK Query gives us that whole object as `rawUser`
  // so the actual user lives at rawUser?.data
  const { data: rawUser, isLoading } = useUserInfoQuery(undefined);
  const user = rawUser?.data;

  const [updateProfile, { isLoading: updating }] = useUpdateProfileMutation();

  const [editing, setEditing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: "",
    contactNumber: "",
    address: "",
    profileImage: null as File | null,
    previewImage: "",
  });

  const startEditing = () => {
    setForm({
      name: user?.customer?.name ?? user?.name ?? "",
      contactNumber: user?.customer?.contactNumber ?? "",
      address: user?.customer?.address ?? "",
      profileImage: null,
      previewImage: user?.customer?.profileImage ?? "",
    });
    setSuccess(false);
    setError("");
    setEditing(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm((f) => ({
      ...f,
      profileImage: file,
      previewImage: URL.createObjectURL(file),
    }));
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      setError("Name is required.");
      return;
    }
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", form.name.trim());
      formData.append("contactNumber", form.contactNumber.trim());
      formData.append("address", form.address.trim());
      if (form.profileImage) {
        formData.append("profileImage", form.profileImage);
      }

      await updateProfile({
        id: user?.customer?.id,
        userData: formData,
      }).unwrap();

      setSuccess(true);
      setEditing(false);
    } catch (err: any) {
      setError(err?.data?.message ?? "Update failed. Please try again.");
    }
  };

  const avatarSrc = editing ? form.previewImage : user?.customer?.profileImage;

  const initials = (user?.customer?.name ?? user?.name ?? "?")
    .split(" ")
    .slice(0, 2)
    .map((w: string) => w[0])
    .join("")
    .toUpperCase();

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'DM Sans', sans-serif",
          background: "#FAF9F6",
        }}
      >
        <div style={{ color: "#CCC", fontSize: 14 }}>Loading profile...</div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FAF9F6",
        fontFamily: "'DM Sans', sans-serif",
        padding: "2rem 1.5rem",
      }}
    >
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "1.75rem" }}>
          <div
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 32,
              fontWeight: 500,
              color: "#1A1A1A",
              lineHeight: 1.1,
            }}
          >
            My Profile
          </div>
          <div style={{ fontSize: 13, color: "#999", marginTop: 4 }}>
            Manage your personal information
          </div>
        </div>

        {/* Success toast */}
        {success && (
          <div
            style={{
              background: "#EAF3DE",
              border: "0.5px solid #B5D98A",
              borderRadius: 10,
              padding: "10px 16px",
              fontSize: 13,
              color: "#3B6D11",
              marginBottom: "1.25rem",
              display: "flex",
              alignItems: "center",
              gap: 8,
              animation: "fadeIn 0.25s ease both",
            }}
          >
            <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(-6px) } to { opacity:1; transform:translateY(0) } }`}</style>
            ✓ Profile updated successfully
          </div>
        )}

        {/* Profile Card */}
        <div
          style={{
            background: "#fff",
            border: "0.5px solid #E8E6DF",
            borderRadius: 18,
            overflow: "hidden",
          }}
        >
          {/* Top banner */}
          <div
            style={{
              height: 80,
              background: "linear-gradient(135deg, #C84B31 0%, #E8835C 100%)",
            }}
          />

          <div style={{ padding: "0 1.75rem 1.5rem", marginTop: -44 }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                marginBottom: "1.5rem",
              }}
            >
              {/* Avatar */}
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    border: "3px solid #fff",
                    background: avatarSrc ? "transparent" : "#FAECE7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
                  }}
                >
                  {avatarSrc ? (
                    <img
                      src={avatarSrc}
                      alt="Profile"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <span
                      style={{
                        fontFamily: "'Fraunces', serif",
                        fontSize: 26,
                        fontWeight: 500,
                        color: "#C84B31",
                      }}
                    >
                      {initials}
                    </span>
                  )}
                </div>
                {editing && (
                  <>
                    <button
                      onClick={() => fileRef.current?.click()}
                      style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        background: "#C84B31",
                        border: "2px solid #fff",
                        color: "#fff",
                        fontSize: 12,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      ✎
                    </button>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />
                  </>
                )}
              </div>

              {/* Edit / Save buttons */}
              <div style={{ display: "flex", gap: 8 }}>
                {editing ? (
                  <>
                    <button
                      onClick={() => setEditing(false)}
                      style={{
                        padding: "8px 16px",
                        background: "transparent",
                        border: "0.5px solid #D8D5CC",
                        borderRadius: 9,
                        fontSize: 13,
                        color: "#888",
                        cursor: "pointer",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={updating}
                      style={{
                        padding: "8px 20px",
                        background: updating ? "#DDD" : "#C84B31",
                        border: "none",
                        borderRadius: 9,
                        fontSize: 13,
                        fontWeight: 500,
                        color: "#fff",
                        cursor: updating ? "not-allowed" : "pointer",
                        fontFamily: "'DM Sans', sans-serif",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        if (!updating)
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.background = "#993C1D";
                      }}
                      onMouseLeave={(e) => {
                        if (!updating)
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.background = "#C84B31";
                      }}
                    >
                      {updating ? "Saving..." : "Save changes"}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={startEditing}
                    style={{
                      padding: "8px 20px",
                      background: "transparent",
                      border: "0.5px solid #D8D5CC",
                      borderRadius: 9,
                      fontSize: 13,
                      fontWeight: 500,
                      color: "#555",
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        "#C84B31";
                      (e.currentTarget as HTMLButtonElement).style.color =
                        "#C84B31";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        "#D8D5CC";
                      (e.currentTarget as HTMLButtonElement).style.color =
                        "#555";
                    }}
                  >
                    ✎ Edit profile
                  </button>
                )}
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                style={{
                  background: "#FEE2E2",
                  borderRadius: 8,
                  padding: "8px 12px",
                  fontSize: 12,
                  color: "#991B1B",
                  marginBottom: "1rem",
                }}
              >
                ⚠ {error}
              </div>
            )}

            {/* Fields */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <Field
                label="Full Name"
                required
                editing={editing}
                value={
                  editing
                    ? form.name
                    : (user?.customer?.name ?? user?.name ?? "—")
                }
                onChange={(v) => setForm((f) => ({ ...f, name: v }))}
              />

              <Field
                label="Email"
                value={user?.email ?? "—"}
                editing={false}
                readOnly
                hint="Email cannot be changed"
              />

              {/* Role — read only */}
              <div>
                <div style={labelStyle}>Role</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      padding: "3px 12px",
                      borderRadius: 20,
                      background: "#EDE9FE",
                      color: "#4C1D95",
                    }}
                  >
                    {user?.role}
                  </span>
                  <span style={{ fontSize: 11, color: "#BBB" }}>
                    Cannot be changed
                  </span>
                </div>
              </div>

              <Field
                label="Contact Number"
                editing={editing}
                value={
                  editing
                    ? form.contactNumber
                    : (user?.customer?.contactNumber ?? "—")
                }
                placeholder="+880 1XXX XXXXXX"
                onChange={(v) => setForm((f) => ({ ...f, contactNumber: v }))}
              />

              <Field
                label="Address"
                editing={editing}
                value={
                  editing ? form.address : (user?.customer?.address ?? "—")
                }
                placeholder="House, road, area, city..."
                multiline
                onChange={(v) => setForm((f) => ({ ...f, address: v }))}
              />
            </div>

            {/* Account meta */}
            <div
              style={{
                marginTop: "1.75rem",
                paddingTop: "1.25rem",
                borderTop: "0.5px solid #EAE8E1",
                display: "flex",
                flexWrap: "wrap",
                gap: "1.25rem",
              }}
            >
              <MetaChip
                label="Member since"
                value={
                  user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "—"
                }
              />
              <MetaChip
                label="Account status"
                value={
                  user?.status === "ACTIVATE" ? "Active" : (user?.status ?? "—")
                }
                valueColor={user?.status === "ACTIVATE" ? "#3B6D11" : "#991B1B"}
              />
              <MetaChip
                label="Email verified"
                value={user?.emailVerified ? "Verified" : "Not verified"}
                valueColor={user?.emailVerified ? "#3B6D11" : "#B45309"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Helpers ──

const labelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 500,
  color: "#AAA",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  marginBottom: 5,
};

function Field({
  label,
  value,
  editing,
  readOnly = false,
  required = false,
  hint,
  placeholder,
  multiline = false,
  onChange,
}: {
  label: string;
  value: string;
  editing: boolean;
  readOnly?: boolean;
  required?: boolean;
  hint?: string;
  placeholder?: string;
  multiline?: boolean;
  onChange?: (v: string) => void;
}) {
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "9px 13px",
    border: "0.5px solid #D8D5CC",
    borderRadius: 9,
    fontSize: 14,
    fontFamily: "'DM Sans', sans-serif",
    color: "#1A1A1A",
    background: "#FAFAF8",
    outline: "none",
    boxSizing: "border-box",
    resize: multiline ? "vertical" : "none",
  };

  return (
    <div>
      <div style={labelStyle}>
        {label}
        {required && <span style={{ color: "#C84B31", marginLeft: 2 }}>*</span>}
      </div>

      {editing && !readOnly ? (
        multiline ? (
          <textarea
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            rows={2}
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#C84B31")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#D8D5CC")}
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#C84B31")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#D8D5CC")}
          />
        )
      ) : (
        <div>
          <div
            style={{
              fontSize: 14,
              color: value === "—" ? "#CCC" : "#1A1A1A",
            }}
          >
            {value}
          </div>
          {hint && (
            <div style={{ fontSize: 11, color: "#BBB", marginTop: 2 }}>
              {hint}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function MetaChip({
  label,
  value,
  valueColor = "#555",
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <div>
      <div
        style={{
          fontSize: 10,
          color: "#BBB",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          marginBottom: 2,
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 12, fontWeight: 500, color: valueColor }}>
        {value}
      </div>
    </div>
  );
}
