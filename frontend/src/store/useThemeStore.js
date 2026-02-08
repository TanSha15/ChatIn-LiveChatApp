import { create } from "zustand";

const STORAGE_KEY = "streamify-theme";

export const useThemeStore = create((set) => {
  const savedTheme =
    typeof window !== "undefined"
      ? localStorage.getItem(STORAGE_KEY) ?? "dark"
      : "dark";

  // Apply only once
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-theme", savedTheme);
  }

  return {
    theme: savedTheme,

    setTheme: (theme) => {
      localStorage.setItem(STORAGE_KEY, theme);
      document.documentElement.setAttribute("data-theme", theme);
      set({ theme });
    },
  };
});
