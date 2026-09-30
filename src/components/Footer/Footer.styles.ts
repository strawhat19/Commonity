import { StyleSheet } from 'react-native';
import { typography } from '../../shared/theme';
import type { Palette } from '../../shared/theme';

export const createStyles = (palette: Palette) => StyleSheet.create({
    footer: {
        gap: 12,
        width: `100%`,
        maxWidth: 1200,
        marginTop: 32,
        paddingTop: 20,
        borderTopWidth: 1,
        paddingBottom: 4,
        alignItems: `center`,
        borderColor: palette.line,
    },
    footerWide: {
        gap: 18,
        flexWrap: `wrap`,
        flexDirection: `row`,
        justifyContent: `space-between`,
    },
    copyright: {
        fontSize: 11,
        lineHeight: 18,
        textAlign: `center`,
        color: palette.muted,
        fontFamily: typography.body,
    },
    policyLinks: {
        gap: 8,
        flexWrap: `wrap`,
        alignItems: `center`,
        flexDirection: `row`,
        justifyContent: `center`,
    },
    link: {
        gap: 7,
        minHeight: 36,
        borderRadius: 10,
        paddingHorizontal: 8,
        alignItems: `center`,
        flexDirection: `row`,
    },
    linkText: {
        fontSize: 11,
        lineHeight: 18,
        color: palette.ink,
        fontWeight: `600`,
        fontFamily: typography.body,
    },
    pressed: {
        opacity: 0.75,
    },
});
