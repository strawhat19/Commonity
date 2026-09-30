import Icon from '../Icon/Icon';
import { StatusBar } from 'expo-status-bar';
import { PostCard } from '../PostCard/PostCard';
import { createStyles } from './LandingPage.styles';
import { Navigation } from '../Navigation/Navigation';
import { elementProps } from '../../shared/elementProps';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useTheme, useThemedStyles } from '../../shared/ThemeContext';
import Logo from '../../../assets/concepts/logos/v9/03-c-brackets.svg';

type LandingPageViewProps = {
    wide: boolean;
    topInset: number;
    emptySaved: boolean;
    bottomInset: number;
    notice: string | null;
    onNearby: () => void;
    section: { label: string; title: string; subtitle: string };
};

export default function LandingPageView({
    wide,
    notice,
    section,
    topInset,
    onNearby,
    emptySaved,
    bottomInset,
}: LandingPageViewProps) {
    const { mode, palette, toggleTheme } = useTheme();
    const styles = useThemedStyles(createStyles);

    return (
        <View
            {...elementProps(`commonity-page`)}
            style={[styles.page, { paddingTop: topInset }]}
        >
            <StatusBar style={mode === `dark` ? `light` : `dark`} />
            <View
                {...elementProps(`commonity-header`)}
                style={[styles.header, wide && styles.headerWide]}
            >
                <Pressable
                    onPress={onNearby}
                    accessibilityRole={`button`}
                    accessibilityLabel={`Commonity, go to nearby`}
                    {...elementProps(`commonity-brand`)}
                    style={({ pressed }) => [styles.brand, pressed && styles.pressed]}
                >
                    <View
                        style={styles.logoFrame}
                        {...elementProps(`commonity-logo-frame`)}
                    >
                        <Logo
                            width={42}
                            height={42}
                            aria-hidden={true}
                            {...elementProps(`commonity-logo`)}
                        />
                    </View>
                    <View
                        style={styles.brandText}
                        {...elementProps(`commonity-brand-text`)}
                    >
                        <Text
                            style={styles.wordmark}
                            {...elementProps(`commonity-wordmark`)}
                        >
                            {`Commonity`}
                        </Text>
                        <Text
                            style={styles.brandTagline}
                            {...elementProps(`commonity-brand-tagline`)}
                        >
                            {`Community in Common`}
                        </Text>
                    </View>
                </Pressable>

                {wide && <Navigation />}

                <View
                    style={styles.headerActions}
                    {...elementProps(`commonity-header-actions`)}
                >
                    {wide && (
                        <View
                            style={styles.location}
                            {...elementProps(`commonity-location`)}
                        >
                            <Icon
                                size={16}
                                color={palette.muted}
                                name={`location-outline`}
                                id={`commonity-location-icon`}
                            />
                            <Text
                                style={styles.locationText}
                                {...elementProps(`commonity-location-text`)}
                            >
                                {`Demo neighborhood`}
                            </Text>
                        </View>
                    )}
                    <Pressable
                        onPress={toggleTheme}
                        accessibilityRole={`button`}
                        accessibilityLabel={mode === `dark` ? `Switch to light mode` : `Switch to dark mode`}
                        {...elementProps(`commonity-theme-toggle`)}
                        style={({ pressed }) => [styles.themeToggle, pressed && styles.pressed]}
                    >
                        <Icon
                            size={19}
                            color={palette.ink}
                            id={`commonity-theme-toggle-icon`}
                            name={mode === `dark` ? `sunny-outline` : `moon-outline`}
                        />
                    </Pressable>
                </View>
            </View>

            <ScrollView
                style={styles.scroll}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                {...elementProps(`commonity-main`)}
            >
                <View
                    style={styles.stage}
                    {...elementProps(`commonity-stage`)}
                >
                    <View
                        style={styles.introduction}
                        {...elementProps(`commonity-introduction`)}
                    >
                        <View
                            style={styles.eyebrowRow}
                            {...elementProps(`commonity-eyebrow-row`)}
                        >
                            <View
                                style={styles.localDot}
                                {...elementProps(`commonity-local-dot`)}
                            />
                            <Text
                                style={styles.eyebrow}
                                {...elementProps(`commonity-eyebrow`)}
                            >
                                {section.label}
                            </Text>
                        </View>
                        <Text
                            accessibilityRole={`header`}
                            {...elementProps(`commonity-heading`)}
                            style={[styles.heading, wide && styles.headingWide]}
                        >
                            {section.title}
                        </Text>
                        <Text
                            style={styles.subtitle}
                            {...elementProps(`commonity-subtitle`)}
                        >
                            {section.subtitle}
                        </Text>
                    </View>

                    {emptySaved ? (
                        <View
                            style={styles.emptyCard}
                            {...elementProps(`commonity-saved-empty`)}
                        >
                            <View
                                style={styles.emptyIcon}
                                {...elementProps(`commonity-saved-empty-icon-frame`)}
                            >
                                <Icon
                                    size={28}
                                    name={`bookmark-outline`}
                                    id={`commonity-saved-empty-icon`}
                                />
                            </View>
                            <Text
                                style={styles.emptyTitle}
                                {...elementProps(`commonity-saved-empty-title`)}
                            >
                                {`Something worth keeping.`}
                            </Text>
                            <Text
                                style={styles.emptyDescription}
                                {...elementProps(`commonity-saved-empty-description`)}
                            >
                                {`Tap the bookmark on a post to find it here.`}
                            </Text>
                            <Pressable
                                onPress={onNearby}
                                accessibilityRole={`button`}
                                {...elementProps(`commonity-saved-empty-action`)}
                                style={({ pressed }) => [styles.emptyAction, pressed && styles.pressed]}
                            >
                                <Icon
                                    size={18}
                                    name={`navigate-outline`}
                                    id={`commonity-saved-empty-action-icon`}
                                />
                                <Text
                                    style={styles.emptyActionText}
                                    {...elementProps(`commonity-saved-empty-action-text`)}
                                >
                                    {`Explore nearby`}
                                </Text>
                            </Pressable>
                        </View>
                    ) : <PostCard />}

                    <View
                        style={styles.privacy}
                        {...elementProps(`commonity-privacy`)}
                    >
                        <Icon
                            size={13}
                            color={palette.muted}
                            name={`shield-checkmark-outline`}
                            id={`commonity-privacy-icon`}
                        />
                        <Text
                            style={styles.privacyText}
                            {...elementProps(`commonity-privacy-text`)}
                        >
                            {`A demo community. Anonymous by default.`}
                        </Text>
                    </View>

                    {notice && (
                        <Text
                            style={styles.notice}
                            accessibilityLiveRegion={`polite`}
                            {...elementProps(`commonity-notice`)}
                        >
                            {notice}
                        </Text>
                    )}
                </View>
            </ScrollView>

            {!wide && (
                <View
                    {...elementProps(`commonity-bottom-navigation`)}
                    style={[styles.bottomNavigation, { paddingBottom: Math.max(14, bottomInset) }]}
                >
                    <Navigation compact />
                </View>
            )}
        </View>
    );
}
