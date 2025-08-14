import React from 'react';
import { User } from 'lucide-react';

const Header = ({ profile, userId, API_BASE_URL }) => (
  <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-800 rounded-2xl shadow-xl mb-8">
    <div className="flex items-center space-x-4 mb-4 sm:mb-0">
      {profile ? (
        <>
          <img src={profile.imageUrl} alt="Profile" className="w-16 h-16 rounded-full border-2 border-indigo-400" />
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">{profile.name}</h1>
            <p className="text-sm text-gray-400">{profile.title || 'Profile title not set.'}</p>
          </div>
        </>
      ) : (
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full border-2 border-gray-500 animate-pulse bg-gray-700"></div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-400">Not Connected</h1>
            <p className="text-sm text-gray-500">Please connect to LinkedIn</p>
          </div>
        </div>
      )}
    </div>
    {profile ? (
      <div className="flex space-x-4 text-center">
        <div className="bg-gray-700 p-3 rounded-xl shadow-inner">
          <p className="text-lg font-bold text-indigo-300">N/A</p>
          <p className="text-xs text-gray-400">Connections</p>
        </div>
        <div className="bg-gray-700 p-3 rounded-xl shadow-inner">
          <p className="text-lg font-bold text-indigo-300">N/A</p>
          <p className="text-xs text-gray-400">Recent Posts</p>
        </div>
      </div>
    ) : (
      <a href={`${API_BASE_URL}/linkedin-auth`} className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105">
        Connect to LinkedIn
      </a>
    )}
  </div>
);

export default Header;