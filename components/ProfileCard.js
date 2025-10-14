import React from 'react';

export default function ProfileCard({ user }) {
  return (
    <div className="bg-red-800 bg-opacity-80 text-white rounded-lg shadow p-4 flex items-center space-x-4 w-full hover:scale-105 transition-transform">
      <img
        src={user.photoURL || '/logo.png'}
        alt={user.name}
        className="w-16 h-16 rounded-full object-cover border-2 border-white"
      />
      <div className="flex-1">
        <h3 className="font-bold text-lg">{user.name}</h3>
        <p className="text-sm">@{user.username}</p>
      </div>
      <div
        className={`w-4 h-4 rounded-full ${
          user.online ? 'bg-green-500' : 'bg-gray-400'
        }`}
        title={user.online ? 'Online' : 'Offline'}
      ></div>
    </div>
  );
}
