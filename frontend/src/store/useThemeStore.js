import { create } from "zustand";

const STORAGE_KEY = "streamify-theme";

export const useThemeStore = create((set) => {
  // get saved theme OR fallback
  const savedTheme = localStorage.getItem(STORAGE_KEY) || "dark";

  // apply theme immediately on app load
  document.documentElement.setAttribute("data-theme", savedTheme);

  return {
    theme: savedTheme,

    setTheme: (theme) => {
      localStorage.setItem(STORAGE_KEY, theme);
      document.documentElement.setAttribute("data-theme", theme);
      set({ theme });
    },
  };
});
