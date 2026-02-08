import { Link, useLocation } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import { 
  BellIcon, 
  HomeIcon, 
  UsersIcon, 
  BotMessageSquareIcon, 
  User 
} from "lucide-react";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  // Helper for active styling
  const getLinkClass = (path) => {
    const isActive = currentPath === path;
    return `btn btn-ghost justify-start w-full gap-4 px-4 text-base font-medium transition-all duration-200 ${
      isActive 
        ? "bg-[#388f49]/10 text-[#388f49] hover:bg-[#388f49]/20" 
        : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
    }`;
  };

  return (
    <aside className="w-72 bg-base-100 border-r border-base-content/5 hidden lg:flex flex-col h-screen sticky top-0 shadow-xl z-50">
      
      {/* --- HEADER / LOGO --- */}
      <div className="p-6 mb-4">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-[#388f49]/10 p-2.5 rounded-xl group-hover:bg-[#388f49]/20 transition-colors">
            <BotMessageSquareIcon className="size-7 text-[#388f49]" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-base-content group-hover:text-[#388f49] transition-colors">
            ChatIn
          </span>
        </Link>
      </div>

      {/* --- NAVIGATION --- */}
      <nav className="flex-1 px-4 space-y-2">
        <Link to="/" className={getLinkClass("/")}>
          <HomeIcon className="size-5" />
          <span>Home</span>
        </Link>

        <Link to="/friends" className={getLinkClass("/friends")}>
          <UsersIcon className="size-5" />
          <span>Friends</span>
        </Link>

        <Link to="/notifications" className={getLinkClass("/notifications")}>
          <div className="relative">
            <BellIcon className="size-5" />
            {/* Optional: Notification Dot Example */}
            <span className="absolute -top-1 -right-0.5 size-2.5 bg-red-500 rounded-full border-2 border-base-100"></span>
          </div>
          <span>Notifications</span>
        </Link>
      </nav>

      {/* --- USER PROFILE SECTION --- */}
      <div className="p-4 mt-auto">
        <div className="p-3 bg-base-200/50 rounded-2xl border border-base-content/5 hover:bg-base-200 transition-colors cursor-pointer group">
          <div className="flex items-center gap-3">
            
            {/* Avatar with Fallback */}
            <div className="avatar online placeholder">
              <div className="bg-[#388f49]/10 text-[#388f49] rounded-full w-10 ring ring-base-100 ring-offset-2 ring-offset-base-100">
                {authUser?.profilePic ? (
                  <img src={authUser.profilePic} alt="User Avatar" />
                ) : (
                  <User className="size-5" />
                )}
              </div>
            </div>

            {/* Text Info */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate group-hover:text-[#388f49] transition-colors">
                {authUser?.fullName || "User"}
              </p>
              <p className="text-xs text-base-content/50 truncate">
                {authUser?.email || "Online"}
              </p>
            </div>

          </div>
        </div>
        
        {/* Footer Copyright/Version */}
        <div className="mt-4 text-center">
            <p className="text-[10px] text-base-content/30 uppercase tracking-widest font-semibold">
                ChatIn v1.0
            </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;