"use client";
import React from "react";

export default function ProfileCard({ user }) {
  // Safety check if user is undefined
  if (!user) {
    return (
      <div className="text-center p-6 bg-gray-100 rounded-xl shadow-md">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  // Fallbacks for missing data
  const photo = user.photoURL || "/default-avatar.png";
  const name = user.displayName || "Anonymous User";
  const email = user.email || "No email available";

  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-lg">
      <img
        src={photo}
        alt="User Avatar"
        className="w-24 h-24 rounded-full object-cover border border-gray-300"
      />
      <h3 className="text-lg font-semibold mt-3">{name}</h3>
      <p className="text-gray-600 text-sm">{email}</p>
    </div>
  );
}
