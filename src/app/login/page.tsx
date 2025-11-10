 'use client';

import React, { useState } from 'react';

// =========================================================================
// This is the full import for all the icons
// Make sure you have run 'npm install react-icons' in your project
// =========================================================================
import { FiMail, FiLock } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

export default function LoginPage() {
  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Form submission handler
  const handleLogin = (e) => {
    e.preventDefault();
    // Your API call to the Laravel backend for login goes here
    console.log('Logging in with:', { email });
  };

  const handleSocialLogin = (provider) => {
    // Your social login logic would go here
    console.log(`Attempting to login with ${provider}`);
  }

  return (
    <div
  className="min-h-screen w-full font-sans text-white p-4 flex items-center justify-center"
  style={{
    // This now points to your local image in the /public folder
    background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1937&auto=format&fit=crop)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
      <div className="relative w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-16">
        
        {/* Left Side: Text Content */}
        <div className="w-full md:w-1/2 lg:w-2/5 text-center md:text-left">
            <h1 className="text-5xl lg:text-6xl font-black text-white mb-4">
                One Origin,
                <br/>
                Infinite Moments.
            </h1>
            <p className="text-gray-300 max-w-md mx-auto md:mx-0">
                Welcome back to your daily ritual. The finest Sri Lankan coffee is just a sip away.
            </p>
        </div>

        {/* Right Side: Glassmorphism Form */}
        <div className="w-full md:w-1/2 lg:w-2/5">
          <div className="bg-black/50 backdrop-blur-xl p-8 lg:p-12 rounded-3xl shadow-2xl w-full border border-white/20">
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-300 mb-8">Sign in to continue.</p>
            
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Email</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-12 pr-3 py-3 border border-gray-600 rounded-lg shadow-sm bg-black/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c9a566] focus:border-[#c9a566] sm:text-sm"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                 <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-200">Password</label>
                    <a href="#" className="text-sm font-medium" style={{color: '#c9a566'}}>
                        Forgot password?
                    </a>
                 </div>
                <div className="relative">
                   <span className="absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </span>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-12 pr-3 py-3 border border-gray-600 rounded-lg shadow-sm bg-black/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c9a566] focus:border-[#c9a566] sm:text-sm"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-medium text-black bg-[#c9a566] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-[#c9a566] transition-all transform hover:scale-105">
                  Sign In
                </button>
              </div>
            </form>

            {/* Social Login Divider */}
            <div className="my-6 flex items-center justify-center">
              <div className="border-t border-gray-600 flex-grow"></div>
              <span className="mx-4 text-sm text-gray-400">OR</span>
              <div className="border-t border-gray-600 flex-grow"></div>
            </div>

            {/* Social Login Buttons */}
            <div className="flex gap-4">
                <button onClick={() => handleSocialLogin('Google')} className="w-full flex items-center justify-center py-2.5 px-4 border border-gray-600 rounded-lg shadow-sm bg-black/50 text-sm font-medium text-white hover:bg-white/10 transition-all">
                    <FcGoogle className="mr-3 text-2xl" />
                    Google
                </button>
                <button onClick={() => handleSocialLogin('Facebook')} className="w-full flex items-center justify-center py-2.5 px-4 border border-[#1877F2] rounded-lg shadow-sm bg-[#1877F2] text-sm font-medium text-white hover:bg-opacity-90 transition-all">
                    <FaFacebook className="mr-3 text-2xl"/>
                    Facebook
                </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}