import type { Palette } from '../../shared/theme';
import { typography } from '../../shared/theme';
import { StyleSheet } from 'react-native';

export const createStyles = (palette: Palette) => StyleSheet.create({
    navigation: {
        gap: 5,
        padding: 5,
        borderWidth: 1,
        borderRadius: 24,
        flexDirection: `row`,
        borderColor: palette.line,
        backgroundColor: palette.paper,
    },
    compactNavigation: {
        gap: 5,
        padding: 7,
        width: `100%`,
        borderRadius: 26,
    },
    tab: {
        gap: 8,
        minHeight: 40,
        borderRadius: 19,
        alignItems: `center`,
        flexDirection: `row`,
        paddingVertical: 10,
        paddingHorizontal: 17,
        justifyContent: `center`,
    },
    compactTab: {
        gap: 5,
        flex: 1,
        minHeight: 58,
        borderRadius: 20,
        paddingVertical: 9,
        flexDirection: `column`,
        paddingHorizontal: 6,
    },
    selectedTab: {
        backgroundColor: palette.softMint,
    },
    pressedTab: {
        opacity: 0.78,
        transform: [{ scale: 0.97 }],
    },
    label: {
        fontSize: 13,
        lineHeight: 18,
        fontWeight: `600`,
        fontFamily: typography.body,
    },
    compactLabel: {
        fontSize: 10,
        lineHeight: 14,
        letterSpacing: 0.15,
    },
});
