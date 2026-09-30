import Icon from '../Icon/Icon';
import { createStyles } from './Footer.styles';
import { elementProps } from '../../shared/elementProps';
import { Platform, Pressable, Text, View } from 'react-native';
import type { InformationPageKey } from '../../shared/NavigationContext';
import { useThemedStyles } from '../../shared/ThemeContext';

const policyLinks = [
    { key: `about`, label: `About`, icon: `information-circle-outline` },
    { key: `terms`, label: `Terms`, icon: `document-text-outline` },
    { key: `privacy`, label: `Privacy`, icon: `shield-checkmark-outline` },
] as const;

type FooterViewProps = {
    wide: boolean;
    year: number;
    onOpenPiratechs: () => void;
    onOpenPage: (page: InformationPageKey) => void;
    linkProps: {
        href?: string;
        hrefAttrs?: { target: string; rel: string };
    };
};

export default function FooterView({
    wide,
    year,
    linkProps,
    onOpenPage,
    onOpenPiratechs,
}: FooterViewProps) {
    const styles = useThemedStyles(createStyles);

    return (
        <View
            {...elementProps(`commonity-footer`)}
            style={[styles.footer, wide && styles.footerWide]}
        >
            <Text
                style={styles.copyright}
                {...elementProps(`commonity-footer-copyright`)}
            >
                {`© ${year} Commonity.`}
            </Text>
            <View
                style={styles.policyLinks}
                {...elementProps(`commonity-footer-policy-links`)}
            >
                {policyLinks.map(({ key, label, icon }) => {
                    const id = `commonity-footer-${key}-link`;
                    const pageLinkProps = Platform.OS === `web` ? { href: `#/${key}` } : {};

                    return (
                        <Pressable
                            key={key}
                            {...pageLinkProps}
                            accessibilityRole={`link`}
                            accessibilityLabel={label}
                            onPress={() => onOpenPage(key)}
                            {...elementProps(`commonity-footer-link commonity-footer-policy-link`, id)}
                            style={({ pressed }) => [styles.link, pressed && styles.pressed]}
                        >
                            <Icon
                                size={15}
                                name={icon}
                                id={`${id}-icon`}
                            />
                            <Text
                                style={styles.linkText}
                                {...elementProps(`commonity-footer-link-label`, `${id}-label`)}
                            >
                                {label}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
            <Pressable
                {...linkProps}
                accessibilityRole={`link`}
                onPress={onOpenPiratechs}
                accessibilityLabel={`Visit Piratechs (opens in your browser)`}
                {...elementProps(`commonity-footer-link commonity-footer-piratechs-link`, `commonity-footer-piratechs-link`)}
                style={({ pressed }) => [styles.link, pressed && styles.pressed]}
            >
                <Icon
                    size={15}
                    name={`open-outline`}
                    id={`commonity-footer-piratechs-icon`}
                />
                <Text
                    style={styles.linkText}
                    {...elementProps(`commonity-footer-link-label commonity-footer-piratechs-label`, `commonity-footer-piratechs-label`)}
                >
                    {`Piratechs`}
                </Text>
            </Pressable>
        </View>
    );
}
