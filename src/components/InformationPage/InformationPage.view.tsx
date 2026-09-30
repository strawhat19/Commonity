import Icon from '../Icon/Icon';
import { createStyles } from './InformationPage.styles';
import { Pressable, Text, View } from 'react-native';
import { elementProps } from '../../shared/elementProps';
import type { InformationContent } from './InformationPage.content';
import { useThemedStyles } from '../../shared/ThemeContext';
import type { InformationPageKey } from '../../shared/NavigationContext';

type InformationPageViewProps = {
    wide: boolean;
    onHome: () => void;
    page: InformationPageKey;
    content: InformationContent;
};

export default function InformationPageView({
    page,
    wide,
    onHome,
    content,
}: InformationPageViewProps) {
    const styles = useThemedStyles(createStyles);
    const pageId = `commonity-information-${page}`;

    return (
        <View
            key={page}
            style={styles.page}
            {...elementProps(`commonity-information-page`, pageId)}
        >
            <Pressable
                onPress={onHome}
                accessibilityRole={`button`}
                accessibilityLabel={`Back to Commonity home`}
                {...elementProps(`commonity-information-home`, `${pageId}-home`)}
                style={({ pressed }) => [styles.home, pressed && styles.pressed]}
            >
                <Icon
                    size={17}
                    name={`arrow-back-outline`}
                    id={`${pageId}-home-icon`}
                />
                <Text
                    style={styles.homeLabel}
                    {...elementProps(`commonity-information-home-label`, `${pageId}-home-label`)}
                >
                    {`Back to home`}
                </Text>
            </Pressable>

            <View
                style={styles.introduction}
                {...elementProps(`commonity-information-introduction`, `${pageId}-introduction`)}
            >
                <View
                    style={styles.iconFrame}
                    {...elementProps(`commonity-information-icon-frame`, `${pageId}-icon-frame`)}
                >
                    <Icon
                        size={29}
                        name={content.icon}
                        id={`${pageId}-icon`}
                    />
                </View>
                <Text
                    style={styles.eyebrow}
                    {...elementProps(`commonity-information-eyebrow`, `${pageId}-eyebrow`)}
                >
                    {content.eyebrow}
                </Text>
                <Text
                    accessibilityRole={`header`}
                    {...elementProps(`commonity-information-title`, `${pageId}-title`)}
                    style={[styles.title, wide && styles.titleWide]}
                >
                    {content.title}
                </Text>
                <Text
                    style={styles.summary}
                    {...elementProps(`commonity-information-summary`, `${pageId}-summary`)}
                >
                    {content.summary}
                </Text>
            </View>

            <View
                style={[styles.card, wide && styles.cardWide]}
                {...elementProps(`commonity-information-card`, `${pageId}-card`)}
            >
                <View
                    style={styles.note}
                    {...elementProps(`commonity-information-note`, `${pageId}-note`)}
                >
                    <View
                        style={styles.noteDot}
                        {...elementProps(`commonity-information-note-dot`, `${pageId}-note-dot`)}
                    />
                    <Text
                        style={styles.noteLabel}
                        {...elementProps(`commonity-information-note-label`, `${pageId}-note-label`)}
                    >
                        {content.note}
                    </Text>
                </View>

                {content.sections.map(({ id, title, paragraphs }, sectionIndex) => {
                    const sectionId = `${pageId}-${id}`;

                    return (
                        <View
                            key={id}
                            {...elementProps(`commonity-information-section`, sectionId)}
                            style={[styles.section, sectionIndex > 0 && styles.sectionBorder]}
                        >
                            <Text
                                style={styles.sectionTitle}
                                accessibilityRole={`header`}
                                {...elementProps(`commonity-information-section-title`, `${sectionId}-title`)}
                            >
                                {title}
                            </Text>
                            {paragraphs.map((paragraph, paragraphIndex) => (
                                <Text
                                    key={`${id}-${paragraphIndex}`}
                                    style={styles.paragraph}
                                    {...elementProps(`commonity-information-paragraph`, `${sectionId}-paragraph-${paragraphIndex}`)}
                                >
                                    {paragraph}
                                </Text>
                            ))}
                        </View>
                    );
                })}
            </View>
        </View>
    );
}
