'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Simple mock authentication
    if (email === "admin@admin.com" && password === "admin123") {
      localStorage.setItem("isAdmin", "true");
      setMessage("✅ Login successful!");

      setTimeout(() => {
        router.push("/admin");
      }, 1000);
    } else if (email && password) {
      localStorage.setItem("isAdmin", "false");
      setMessage("✅ Login successful!");

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } else {
      setMessage("❌ Please enter valid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        
        <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-4 text-sm">
          <p className="font-semibold">Demo Credentials:</p>
          <p>Admin: admin@admin.com / admin123</p>
          <p>User: Any other email/password</p>
        </div>
        
        {message && (
          <div className={`p-2 mb-4 rounded ${
            message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full mb-3"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full mb-4"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
