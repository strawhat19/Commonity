import Icon from '../Icon/Icon';
import { createStyles } from './Navigation.styles';
import { Pressable, Text, View } from 'react-native';
import type { NavigationTab } from './Navigation';
import { elementProps } from '../../shared/elementProps';
import { useTheme, useThemedStyles } from '../../shared/ThemeContext';

type NavigationItem = {
    readonly label: string;
    readonly key: NavigationTab;
    readonly icon: `navigate-outline` | `grid-outline` | `bookmark-outline`;
};

type NavigationViewProps = {
    compact: boolean;
    activeTab: NavigationTab;
    tabs: readonly NavigationItem[];
    onSelect: (tab: NavigationTab) => void;
};

export function NavigationView({
    tabs,
    compact,
    onSelect,
    activeTab,
}: NavigationViewProps) {
    const { palette } = useTheme();
    const styles = useThemedStyles(createStyles);
    const scope = compact ? `mobile` : `desktop`;

    return (
        <View
            {...elementProps(`commonity-navigation`, `commonity-navigation-${scope}`)}
            style={[styles.navigation, compact && styles.compactNavigation]}
        >
            {tabs.map(({ key, icon, label }) => {
                const selected = activeTab === key;
                const color = selected ? palette.ink : palette.muted;
                const itemId = `commonity-navigation-tab-${scope}-${key}`;

                return (
                    <Pressable
                        key={key}
                        accessibilityRole={`tab`}
                        accessibilityLabel={label}
                        onPress={() => onSelect(key)}
                        accessibilityState={{ selected }}
                        {...elementProps(`commonity-navigation-tab`, itemId)}
                        style={({ pressed }) => [
                            styles.tab,
                            compact && styles.compactTab,
                            selected && styles.selectedTab,
                            pressed && styles.pressedTab,
                        ]}
                    >
                        <Icon
                            name={icon}
                            size={compact ? 21 : 18}
                            color={color}
                            id={`${itemId}-icon`}
                        />
                        <Text
                            {...elementProps(`commonity-navigation-label`, `${itemId}-label`)}
                            style={[styles.label, compact && styles.compactLabel, { color }]}
                        >
                            {label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}
