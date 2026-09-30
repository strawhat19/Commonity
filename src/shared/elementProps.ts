import { Platform } from 'react-native';

type InspectableElement = {
    classList?: { add: (...tokens: string[]) => void };
};

export function elementProps(className: string, id = className) {
    return {
        nativeID: id,
        testID: id,
        className,
        // React Native Web creates its own classes, so keep our descriptive class too.
        ...(Platform.OS === `web` ? {
            ref: (node: unknown) => {
                const element = node as InspectableElement | null;
                element?.classList?.add(...className.split(` `).filter(Boolean));
            },
        } : {}),
    };
}
