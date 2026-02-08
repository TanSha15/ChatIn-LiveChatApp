import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { login } from "../lib/api.js";
import { Link, useNavigate } from "react-router-dom";
import { 
  BotMessageSquareIcon, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Loader2 
} from "lucide-react";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: loginMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success("Logged in successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Login failed");
    },
  });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      return toast.error("Please fill all fields");
    }

    loginMutation(loginData);
  };

  return (
    <div className="min-h-screen bg-base-300 flex items-center justify-center p-4">
      <div className="bg-base-100 w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden border border-base-content/5 flex flex-col lg:flex-row">
        
        {/* --- LEFT SIDE: FORM --- */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 md:p-12 flex flex-col justify-center">
          
          {/* Header */}
          <div className="flex flex-col items-center lg:items-start mb-8 text-center lg:text-left">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-[#388f49]/10 p-3 rounded-xl">
                <BotMessageSquareIcon className="w-8 h-8 text-[#388f49]" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-base-content tracking-tight">ChatIn</h1>
            </div>
            
            {/* Error Alert */}
            {error && (
               <div className='alert alert-error mb-4 rounded-lg p-3 text-sm font-medium w-full mt-4'> 
                 <span>{error.response?.data?.message || "Something went wrong"}</span>
               </div>
            )}

            <h2 className="text-xl font-semibold text-base-content/90 mt-2">Welcome Back</h2>
            <p className="text-sm text-base-content/60">Sign in to continue your language journey</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full">

            {/* Email Input */}
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
                  placeholder="hello@example.com"
                  value={loginData.email}
                  onChange={handleChange}
                />
              </label>
            </div>

            {/* Password Input */}
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
                  value={loginData.password}
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

            {/* Forgot Password Link (Optional UX addition) */}
            <div className="text-right">
              <a href="#" className="text-xs text-base-content/60 hover:text-[#388f49] hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isPending}
              className="btn btn-primary bg-[#388f49] hover:bg-[#2f7a3d] border-none text-white text-lg font-medium shadow-lg shadow-[#388f49]/20 w-full disabled:bg-[#388f49]/70"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-base-content/60 text-sm mt-4">
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#388f49] font-medium hover:underline hover:text-[#2f7a3d]">
                Create one
              </Link>
            </p>
          </form>
        </div>

        {/* --- RIGHT SIDE: VISUALS --- */}
        <div className="hidden lg:flex w-1/2 bg-[#388f49]/5 relative justify-center items-center overflow-hidden">
           {/* Background Atmosphere */}
           <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-[#388f49]/20 rounded-full blur-3xl"></div>
           <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-[#388f49]/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex flex-col items-center text-center p-12">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-[#388f49] blur-2xl opacity-20 rounded-full"></div>
              <img 
                src="/Login-bro.png" 
                alt="Login illustration" 
                className="relative w-full max-w-[320px] drop-shadow-2xl" 
              />
            </div>
            
            <h3 className="text-2xl font-bold text-base-content mb-2">Connect Worldwide</h3>
            <p className="text-base-content/60 max-w-sm">
              Connect with language partners and make new friends around the globe.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;