import React from 'react';

export default function Profile() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg">
        <div className="flex items-center space-x-5">
          <img className="block mx-auto h-24 rounded-full" src="https://place-hold.it/100x100" alt="User Profile" />
          <div className="block pl-2">
            <h2 className="text-lg font-bold">Username</h2>
            <p className="text-sm text-gray-500">user@example.com</p>
          </div>
        </div>
        <div className="mt-5">
          <p className="text-sm text-gray-500">This is a brief description of the user. It could include things like interests, location, or other relevant details.</p>
          <button className="mt-5 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  )
}
