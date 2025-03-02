import { useMediaQuery, useLocalStorage } from '@uidotdev/usehooks';
import {useEffect} from "react";

export const THEME_SYSTEM = "0";
export const THEME_LIGHT = "1";
export const THEME_DARK = "2";

export function useTheme() {
  const [theme, setTheme] = useLocalStorage('THEME', THEME_SYSTEM);
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

  const isSystem = theme === THEME_SYSTEM;

  const isDark = isSystem ? prefersDark : theme === THEME_DARK;

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      isDark,
    );
  }, [isDark]);

  return {
    isDark,
    theme,
    setTheme,
  }
}
