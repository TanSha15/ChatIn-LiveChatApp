import { useState, useRef, useEffect } from "react";
import { PaletteIcon } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
import { THEMES } from "../constants";

const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // close when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* TRIGGER */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="btn btn-ghost btn-circle"
      >
        <PaletteIcon className="size-5" />
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-3 p-2 w-56 rounded-2xl shadow-2xl bg-base-200 border border-base-content/10 max-h-80 overflow-y-auto z-50">
          <div className="space-y-1">
            {THEMES.map((themeOption) => (
              <button
                type="button"
                key={themeOption.name}
                className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors
                  ${
                    theme === themeOption.name
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-base-content/5"
                  }`}
                onClick={() => {
                  setTheme(themeOption.name);
                  setOpen(false);
                }}
              >
                <PaletteIcon className="size-4" />
                <span className="text-sm font-medium">
                  {themeOption.label}
                </span>

                <div className="ml-auto flex gap-1">
                  {themeOption.colors.map((color, i) => (
                    <span
                      key={i}
                      className="size-2 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;