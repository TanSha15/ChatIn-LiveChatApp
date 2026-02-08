import React from 'react';
import { BotMessageSquareIcon } from 'lucide-react';

const PageLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-300 relative overflow-hidden">
      
      {/* Background Decorative Blobs (Same as SignUp) */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#388f49]/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#388f49]/10 rounded-full blur-3xl animate-pulse delay-700"></div>

      <div className="flex flex-col items-center gap-4 relative z-10">
        {/* Logo Container with Animation */}
        <div className="relative">
          {/* Pulsing Glow behind logo */}
          <div className="absolute inset-0 bg-[#388f49]/40 blur-xl rounded-full animate-ping duration-[3000ms]"></div>
          
          {/* The Logo */}
          <div className="bg-base-100 p-4 rounded-2xl border border-[#388f49]/20 shadow-xl shadow-[#388f49]/10 relative z-10">
            <BotMessageSquareIcon className="w-12 h-12 text-[#388f49] animate-bounce" />
          </div>
        </div>

        {/* Loading Text/Spinner */}
        <div className="flex flex-col items-center gap-2 mt-4">
          <h1 className="text-2xl font-bold text-base-content tracking-tight">ChatIn</h1>
          
          {/* DaisyUI Loading Spinner */}
          <span className="loading loading-dots loading-md text-[#388f49]"></span>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;