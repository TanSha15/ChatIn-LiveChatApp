import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api.js";
import { 
  User, 
  MapPin, 
  Globe, 
  FileText, 
  Loader2, 
  Camera, 
  Languages 
} from "lucide-react";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Something went wrong");
    },
  });

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  return (
    <div className="min-h-screen bg-base-300 flex items-center justify-center p-4">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-base-100 rounded-3xl overflow-hidden shadow-2xl border border-base-content/5">
        
        {/* --- LEFT SIDE: VISUALS (Hidden on mobile) --- */}
        <div className="hidden lg:flex w-1/2 bg-[#388f49]/5 relative justify-center items-center p-8">
           {/* Background Blobs */}
           <div className="absolute top-10 left-10 w-32 h-32 bg-[#388f49]/20 rounded-full blur-3xl"></div>
           <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#388f49]/20 rounded-full blur-3xl"></div>
           
           <div className="flex flex-col items-center text-center relative z-10">
             <img 
              src="/Onboarding-bro.png" 
              alt="Onboarding Illustration" 
              className="w-full max-w-sm drop-shadow-xl"
             />
             <h2 className="text-3xl font-bold mt-6 text-base-content">Welcome to ChatIn!</h2>
             <p className="text-base-content/60 mt-2 max-w-xs">
               Let's set up your profile so you can start connecting with the world.
             </p>
           </div>
        </div>

        {/* --- RIGHT SIDE: FORM --- */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 overflow-y-auto max-h-screen lg:max-h-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-base-content">Complete Profile</h1>
            <p className="text-sm text-base-content/60">Tell us a bit more about yourself</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            
            {/* Profile Picture Section */}
            <div className="flex justify-center mb-4">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#388f49]/20 shadow-lg bg-base-200 flex items-center justify-center">
                  {formState.profilePic ? (
                    <img 
                      src={formState.profilePic} 
                      alt="Profile" 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <User className="w-12 h-12 text-base-content/30" />
                  )}
                </div>
                {/* Decorative camera icon (functionality would require file upload logic) */}
                <div className="absolute bottom-2 right-2 bg-[#388f49] p-2 rounded-full text-white shadow-md cursor-pointer hover:bg-[#2f7a3d] transition-colors">
                  <Camera className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Full Name */}
            <div className="form-control w-full">
              <label className="label pt-0 pb-1">
                <span className="label-text font-medium text-base-content/70">Full Name</span>
              </label>
              <label className="input input-bordered flex items-center gap-3 bg-base-200/50 focus-within:border-[#388f49] focus-within:bg-base-100 transition-all">
                <User className="w-5 h-5 text-base-content/40" />
                <input
                  type="text"
                  name="fullName"
                  className="grow placeholder:text-base-content/30"
                  placeholder="Your Name"
                  value={formState.fullName}
                  onChange={handleChange}
                />
              </label>
            </div>

            {/* Bio */}
            <div className="form-control w-full">
              <label className="label pt-0 pb-1">
                <span className="label-text font-medium text-base-content/70">Bio</span>
              </label>
              <div className="relative">
                <textarea
                  name="bio"
                  className="textarea textarea-bordered w-full h-24 bg-base-200/50 focus:border-[#388f49] focus:bg-base-100 transition-all pl-10 pt-3 resize-none"
                  placeholder="Tell us about yourself..."
                  value={formState.bio}
                  onChange={handleChange}
                ></textarea>
                <FileText className="w-5 h-5 text-base-content/40 absolute top-3 left-3" />
              </div>
            </div>

            {/* Native & Learning Language (Side by Side) */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="form-control w-full">
                <label className="label pt-0 pb-1">
                  <span className="label-text font-medium text-base-content/70">Native Language</span>
                </label>
                <div className="relative">
                  <Globe className="w-5 h-5 text-base-content/40 absolute top-1/2 -translate-y-1/2 left-3 z-10" />
                  <select
                    name="nativeLanguage"
                    className="select select-bordered w-full pl-10 bg-base-200/50 focus:border-[#388f49] focus:bg-base-100 transition-all"
                    value={formState.nativeLanguage}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Select</option>
                    <option value="Hindi">Hindi</option>
                    <option value="English">English</option>
                    <option value="Mandarin">Mandarin</option>
                    <option value="French">French</option>
                    <option value="Spanish">Spanish</option>
                  </select>
                </div>
              </div>

              <div className="form-control w-full">
                <label className="label pt-0 pb-1">
                  <span className="label-text font-medium text-base-content/70">Learning</span>
                </label>
                <div className="relative">
                  <Languages className="w-5 h-5 text-base-content/40 absolute top-1/2 -translate-y-1/2 left-3 z-10" />
                  <select
                    name="learningLanguage"
                    className="select select-bordered w-full pl-10 bg-base-200/50 focus:border-[#388f49] focus:bg-base-100 transition-all"
                    value={formState.learningLanguage}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Select</option>
                    <option value="Hindi">Hindi</option>
                    <option value="English">English</option>
                    <option value="Mandarin">Mandarin</option>
                    <option value="French">French</option>
                    <option value="Spanish">Spanish</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="form-control w-full">
              <label className="label pt-0 pb-1">
                <span className="label-text font-medium text-base-content/70">Location</span>
              </label>
              <label className="input input-bordered flex items-center gap-3 bg-base-200/50 focus-within:border-[#388f49] focus-within:bg-base-100 transition-all">
                <MapPin className="w-5 h-5 text-base-content/40" />
                <input
                  type="text"
                  name="location"
                  className="grow placeholder:text-base-content/30"
                  placeholder="City, Country"
                  value={formState.location}
                  onChange={handleChange}
                />
              </label>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isPending}
              className="btn btn-primary mt-4 bg-[#388f49] hover:bg-[#2f7a3d] border-none text-white text-lg font-medium shadow-lg shadow-[#388f49]/20 w-full disabled:bg-[#388f49]/70"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving Profile...
                </>
              ) : (
                "Complete Onboarding"
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;