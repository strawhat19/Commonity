import { Platform } from 'react-native';

export const palette = {
    ink: `#19362d`,
    mint: `#0DD5B2`,
    paper: `#ffffff`,
    line: `#e3e9e4`,
    border: `#e3e9e4`,
    muted: `#7a8980`,
    softMint: `#e8f7ef`,
    paleMint: `#e8f7ef`,
    mintInk: `#19362d`,
    hover: `#f0f6f1`,
    selectedHover: `#e2f3e9`,
    background: `#f5f6f1`,
    shadow: `rgba(25, 54, 45, 0.035)`,
};

export type Palette = { [Key in keyof typeof palette]: string };
export type ThemeMode = `light` | `dark`;

export const palettes: Record<ThemeMode, Palette> = {
    light: palette,
    dark: {
        ink: `#e9f4f7`,
        mint: `#0DD5B2`,
        paper: `#082b3c`,
        line: `#1c4354`,
        border: `#1c4354`,
        muted: `#91b0be`,
        mintInk: `#19362d`,
        hover: `#0e3546`,
        softMint: `#073e43`,
        paleMint: `#073e43`,
        background: `#001e2d`,
        selectedHover: `#0c4b50`,
        shadow: `rgba(0, 0, 0, 0.22)`,
    },
};

export const typography = {
    body: Platform.OS === `web` ? `Inter, ui-sans-serif, system-ui, sans-serif` : undefined,
    display: Platform.OS === `web` ? `Inter, ui-sans-serif, system-ui, sans-serif` : undefined,
};
