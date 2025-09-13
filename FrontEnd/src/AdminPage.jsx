import React, { useEffect, useState } from 'react';
import Register from './Register';
import Login from './Login';
import AddProperty from './AddProperty';
import Properties from './Properties';

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">Admin Panel</h2>
        <nav className="space-y-4">
          {!isLoggedIn ? (
            <>
              <a href="#register" className="block text-gray-700 hover:text-blue-600">Register</a>
              <a href="#login" className="block text-gray-700 hover:text-blue-600">Login</a>
            </>
          ) : (
            <>
              <a href="#add-property" className="block text-gray-700 hover:text-blue-600">Add Property</a>
              <a href="#properties" className="block text-gray-700 hover:text-blue-600">View Properties</a>
              <button 
                onClick={handleLogout}
                className="block text-red-500 hover:text-red-700 mt-4"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {!isLoggedIn ? (
          <>
            <section id="register" className="mb-12 bg-white shadow p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Register</h3>
              <Register />
            </section>

            <section id="login" className="mb-12 bg-white shadow p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Login</h3>
              <Login />
            </section>
          </>
        ) : (
          <>
            <section id="add-property" className="mb-12 bg-white shadow p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Add Property</h3>
              <AddProperty />
            </section>

            <section id="properties" className="bg-white shadow p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">All Properties</h3>
              <Properties />
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminPage;
