import React, { useState } from 'react';
import { BotMessageSquareIcon, User, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {useNavigate } from 'react-router-dom';


import { signupData as signupUser } from '../lib/api.js'; 

const SignUpPage = () => {

  const navigate = useNavigate();


  const [showPassword, setShowPassword] = useState(false);
  

  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({

    mutationFn: signupUser, 
    
    onSuccess: () => {
      toast.success("Account created successfully!");
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
      navigate("/onboarding");


    },
    onError: (err) => {
       toast.error(err.response?.data?.message || "Something went wrong");
    }
  });

  const handleChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!signupData.fullName || !signupData.email || !signupData.password) {
        return toast.error("Please fill in all fields");
    }
    mutate(signupData);
  };

  return (
    <div className="min-h-screen bg-base-300 flex items-center justify-center p-4">
      
      <div className="bg-base-100 w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden border border-base-content/5 flex flex-col lg:flex-row">
        
        {/* --- LEFT SIDE: FORM --- */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 md:p-12 flex flex-col justify-center">
          
          <div className="flex flex-col items-center lg:items-start mb-8 text-center lg:text-left">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-[#388f49]/10 p-3 rounded-xl">
                <BotMessageSquareIcon className="w-8 h-8 text-[#388f49]" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-base-content tracking-tight">ChatIn</h1>
            </div>
            
            {/* Error Message Display */}
            {error && (
                <div className='alert alert-error mb-4 rounded-lg p-3 text-sm font-medium'> 
                <span>{error.response?.data?.message || "An error occurred"}</span>
                </div>
            )}

            <h2 className="text-xl font-semibold text-base-content/90">Create your account</h2>
            <p className="text-sm text-base-content/60">Join and connect with communities worldwide</p>
          </div>

          <form className="flex flex-col gap-4 w-full" onSubmit={handleSignup}>
            
            {/* Full Name */}
            <div className="form-control w-full">
              <label className="label pt-0">
                <span className="label-text font-medium text-base-content/70">Full Name</span>
              </label>
              <label className="input input-bordered flex items-center gap-3 bg-base-200/50 focus-within:border-[#388f49] focus-within:bg-base-100 transition-all h-12">
                <User className="w-5 h-5 text-base-content/40" />
                <input 
                  type="text" 
                  name="fullName"
                  className="grow placeholder:text-base-content/30" 
                  placeholder="Full Name..." 
                  value={signupData.fullName} 
                  onChange={handleChange} 
                />
              </label>
            </div>

            {/* Email */}
            <div className="form-control w-full">
              <label className="label pt-0">
                <span className="label-text font-medium text-base-content/70">Email</span>
              </label>
              <label className="input input-bordered flex items-center gap-3 bg-base-200/50 focus-within:border-[#388f49] focus-within:bg-base-100 transition-all h-12">
                <Mail className="w-5 h-5 text-base-content/40" />
                <input 
                  type="email" 
                  name="email"
                  className="grow placeholder:text-base-content/30" 
                  placeholder="you@example.com" 
                  value={signupData.email} 
                  onChange={handleChange}
                />
              </label>
            </div>

            {/* Password */}
            <div className="form-control w-full">
              <label className="label pt-0">
                <span className="label-text font-medium text-base-content/70">Password</span>
              </label>
              <label className="input input-bordered flex items-center gap-3 bg-base-200/50 focus-within:border-[#388f49] focus-within:bg-base-100 transition-all h-12">
                <Lock className="w-5 h-5 text-base-content/40" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  className="grow placeholder:text-base-content/30" 
                  placeholder="••••••••" 
                  value={signupData.password}
                  onChange={handleChange}
                />
                
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-base-content/40 hover:text-[#388f49] transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
                </button>
              </label>
            </div>

            {/* Terms Checkbox */}
            <div className="form-control mt-2">
              <label className="label cursor-pointer justify-start gap-3">
                <input 
                  type="checkbox" 
                  className="checkbox checkbox-sm border-base-content/30 checked:border-[#388f49] [--chkbg:#388f49] [--chkfg:white]" 
                />
                <span className="label-text text-xs sm:text-sm text-base-content/60 text-left">
                  I agree to the <a href="#" className="text-[#388f49] hover:underline">Terms of Service</a> and <a href="#" className="text-[#388f49] hover:underline">Privacy Policy</a>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isPending}
              className="btn btn-primary mt-4 bg-[#388f49] hover:bg-[#2f7a3d] border-none text-white text-lg font-medium shadow-lg shadow-[#388f49]/20 w-full disabled:bg-[#388f49]/70 disabled:text-white/70"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-base-content/60 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-[#388f49] font-medium hover:underline hover:text-[#2f7a3d]">
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* --- RIGHT SIDE: VISUALS --- */}
        <div className="hidden lg:flex w-1/2 bg-[#388f49]/5 relative justify-center items-center overflow-hidden">
           <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-[#388f49]/20 rounded-full blur-3xl"></div>
           <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-[#388f49]/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex flex-col items-center text-center p-12">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-[#388f49] blur-2xl opacity-20 rounded-full"></div>
              <img 
                src="/SignUp.png" 
                alt="Community" 
                className="relative w-full max-w-[280px] rounded-2xl shadow-2xl border border-white/10 mask mask-squircle object-cover" 
              />
            </div>
            
            <h3 className="text-2xl font-bold text-base-content mb-2">Join the Conversation</h3>
            <p className="text-base-content/60 max-w-sm">
              Connect with friends from different parts of the globe worldwide.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default SignUpPage;