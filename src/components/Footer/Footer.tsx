import FooterView from './Footer.view';
import { Alert, Linking, Platform } from 'react-native';
import { useNavigation } from '../../shared/NavigationContext';
import type { InformationPageKey } from '../../shared/NavigationContext';

export type FooterProps = {
    wide: boolean;
};

const piratechsUrl = `https://piratechs.com/`;

export default function Footer({ wide }: FooterProps) {
    const year = new Date().getFullYear();
    const { setCurrentPage } = useNavigation();

    const linkProps = Platform.OS === `web` ? {
        href: piratechsUrl,
        hrefAttrs: { target: `_blank`, rel: `noopener noreferrer` },
    } : {};

    const openPage = (page: InformationPageKey) => {
        if (Platform.OS !== `web`) setCurrentPage(page);
    };

    const openPiratechs = () => {
        if (Platform.OS === `web`) return;

        Linking.openURL(piratechsUrl).catch(() => {
            Alert.alert(`Unable to open Piratechs`, `Visit ${piratechsUrl} in your browser.`);
        });
    };

    return (
        <FooterView
            wide={wide}
            year={year}
            onOpenPage={openPage}
            linkProps={linkProps}
            onOpenPiratechs={openPiratechs}
        />
    );
}
