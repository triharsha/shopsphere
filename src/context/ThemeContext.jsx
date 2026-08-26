/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const THEME_KEY =
  "shopsphere_theme";

const ThemeContext =
  createContext(null);

/* ========================================
   Initial Theme
======================================== */

const getInitialTheme = () => {
  try {
    const savedTheme =
      localStorage.getItem(
        THEME_KEY
      );

    if (
      savedTheme === "light" ||
      savedTheme === "dark"
    ) {
      return savedTheme;
    }
  } catch (error) {
    console.error(
      "Unable to read theme:",
      error
    );
  }

  return "light";
};

/* ========================================
   Provider
======================================== */

export const ThemeProvider = ({
  children,
}) => {
  const [
    theme,
    setTheme,
  ] = useState(
    getInitialTheme
  );

  useEffect(() => {
    const root =
      document.documentElement;

    if (theme === "dark") {
      root.classList.add(
        "dark"
      );
    } else {
      root.classList.remove(
        "dark"
      );
    }

    root.style.colorScheme =
      theme;

    try {
      localStorage.setItem(
        THEME_KEY,
        theme
      );
    } catch (error) {
      console.error(
        "Unable to save theme:",
        error
      );
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(
      (currentTheme) =>
        currentTheme ===
        "dark"
          ? "light"
          : "dark"
    );
  };

  const isDark =
    theme === "dark";

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark,
        toggleTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

/* ========================================
   Hook
======================================== */

export const useTheme = () => {
  const context =
    useContext(
      ThemeContext
    );

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
};
