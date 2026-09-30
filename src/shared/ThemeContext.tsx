import { palettes } from './theme';
import type { Palette, ThemeMode } from './theme';
import type { PropsWithChildren } from 'react';
import { Platform, useColorScheme } from 'react-native';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type ThemeState = {
    mode: ThemeMode;
    palette: Palette;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeState | null>(null);

function readPreference(): ThemeMode | null {
    if (Platform.OS !== `web` || typeof window === `undefined`) return null;

    try {
        const preference = window.localStorage.getItem(`commonity-theme`);
        return preference === `light` || preference === `dark` ? preference : null;
    } catch {
        return null;
    }
}

export function ThemeProvider({ children }: PropsWithChildren) {
    const systemScheme = useColorScheme();
    const [preference, setPreference] = useState<ThemeMode | null>(readPreference);
    const mode = preference ?? (systemScheme === `dark` ? `dark` : `light`);
    const palette = palettes[mode];

    useEffect(() => {
        if (Platform.OS !== `web` || typeof document === `undefined`) return;

        const root = document.documentElement;
        root.dataset.theme = mode;
        root.style.colorScheme = mode;

        Object.entries(palette).forEach(([key, value]) => {
            const name = key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
            root.style.setProperty(`--commonity-${name}`, value);
        });

        if (preference) {
            try {
                window.localStorage.setItem(`commonity-theme`, preference);
            } catch {
                // The toggle still works when browser storage is unavailable.
            }
        }
    }, [mode, palette, preference]);

    return (
        <ThemeContext.Provider
            value={{
                mode,
                palette,
                toggleTheme: () => setPreference(mode === `dark` ? `light` : `dark`),
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error(`useTheme must be used within ThemeProvider.`);
    }

    return context;
}

export function useThemedStyles<T>(createStyles: (palette: Palette) => T) {
    const { palette } = useTheme();
    return useMemo(() => createStyles(palette), [createStyles, palette]);
}
