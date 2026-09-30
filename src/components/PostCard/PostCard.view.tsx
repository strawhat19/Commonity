import React from 'react';
import { View, Text, Pressable } from 'react-native';

import Icon from '../Icon/Icon';
import { createStyles } from './PostCard.styles';
import { elementProps } from '../../shared/elementProps';
import { useTheme, useThemedStyles } from '../../shared/ThemeContext';

type PostCardViewProps = {
    score: number;
    saved: boolean;
    vote: -1 | 0 | 1;
    repliesOpen: boolean;
    onSave: () => void;
    onShare: () => void;
    onReplies: () => void;
    onVote: (vote: -1 | 1) => void;
};

export function PostCardView({
    vote,
    score,
    saved,
    onVote,
    onSave,
    onShare,
    onReplies,
    repliesOpen,
}: PostCardViewProps) {
    const { palette } = useTheme();
    const styles = useThemedStyles(createStyles);

    return (
        <View
            {...elementProps(`commonity-post-card`)}
            style={styles.card}
        >
            <View
                {...elementProps(`commonity-post-header`)}
                style={styles.header}
            >
                <View
                    {...elementProps(`commonity-post-community`)}
                    style={styles.community}
                >
                    <View
                        {...elementProps(`commonity-post-community-icon`)}
                        style={styles.communityIcon}
                    >
                        <Icon
                            size={23}
                            color={palette.ink}
                            name={`leaf-outline`}
                            id={`commonity-post-leaf`}
                        />
                    </View>

                    <View
                        {...elementProps(`commonity-post-community-details`)}
                        style={styles.communityDetails}
                    >
                        <Text
                            {...elementProps(`commonity-post-community-name`)}
                            style={styles.communityName}
                        >
                            {`c/nearby`}
                        </Text>

                        <Text
                            {...elementProps(`commonity-post-meta`)}
                            style={styles.meta}
                        >
                            {`Anonymous · 12 min ago`}
                        </Text>
                    </View>
                </View>

                <View
                    {...elementProps(`commonity-post-header-actions`)}
                    style={styles.headerActions}
                >
                    <Pressable
                        {...elementProps(`commonity-post-save-button`)}
                        onPress={onSave}
                        accessibilityRole={`button`}
                        accessibilityState={{ selected: saved }}
                        accessibilityLabel={saved ? `Unsave post` : `Save post`}
                        style={({ pressed }) => [
                            styles.iconButton,
                            saved && styles.savedButton,
                            pressed && styles.pressed,
                        ]}
                    >
                        <Icon
                            size={22}
                            color={palette.ink}
                            id={`commonity-post-bookmark`}
                            name={saved ? `bookmark` : `bookmark-outline`}
                        />
                    </Pressable>

                    <Pressable
                        {...elementProps(`commonity-post-share-button`)}
                        onPress={onShare}
                        accessibilityRole={`button`}
                        accessibilityLabel={`Share post`}
                        style={({ pressed }) => [
                            styles.iconButton,
                            pressed && styles.pressed,
                        ]}
                    >
                        <Icon
                            size={21}
                            color={palette.muted}
                            name={`share-outline`}
                            id={`commonity-post-share-icon`}
                        />
                    </Pressable>
                </View>
            </View>

            <View
                {...elementProps(`commonity-post-tag`)}
                style={styles.tag}
            >
                <View
                    {...elementProps(`commonity-post-tag-dot`)}
                    style={styles.tagDot}
                />

                <Text
                    {...elementProps(`commonity-post-tag-label`)}
                    style={styles.tagLabel}
                >
                    {`Small joys`}
                </Text>
            </View>

            <View
                {...elementProps(`commonity-post-body`)}
                style={styles.body}
            >
                <Text
                    {...elementProps(`commonity-post-paragraph`, `commonity-post-paragraph-1`)}
                    style={styles.paragraph}
                >
                    {`To whoever keeps leaving little flowers at the bus stop: you’ve made my morning three days in a row.`}
                </Text>

                <Text
                    {...elementProps(`commonity-post-paragraph`, `commonity-post-paragraph-2`)}
                    style={styles.paragraph}
                >
                    {`Please never stop. 🌼`}
                </Text>
            </View>

            <View
                {...elementProps(`commonity-post-footer`)}
                style={styles.footer}
            >
                <Pressable
                    {...elementProps(`commonity-post-replies-button`)}
                    onPress={onReplies}
                    accessibilityRole={`button`}
                    accessibilityState={{ expanded: repliesOpen }}
                    accessibilityLabel={repliesOpen ? `Hide replies` : `Show 8 replies`}
                    style={({ pressed }) => [
                        styles.repliesButton,
                        pressed && styles.pressed,
                    ]}
                >
                    <Icon
                        size={20}
                        color={palette.muted}
                        name={`chatbubble-outline`}
                        id={`commonity-post-replies-icon`}
                    />

                    <Text
                        {...elementProps(`commonity-post-replies-label`)}
                        style={styles.repliesLabel}
                    >
                        {`8 replies`}
                    </Text>
                </Pressable>

                <View
                    {...elementProps(`commonity-post-vote-controls`)}
                    style={styles.voteControls}
                >
                    <Pressable
                        {...elementProps(`commonity-post-upvote-button`)}
                        onPress={() => onVote(1)}
                        accessibilityLabel={`Upvote post`}
                        accessibilityRole={`button`}
                        accessibilityState={{ selected: vote === 1 }}
                        style={({ pressed }) => [
                            styles.voteButton,
                            vote === 1 && styles.selectedVote,
                            pressed && styles.pressed,
                        ]}
                    >
                        <Icon
                            size={20}
                            name={`arrow-up`}
                            color={vote === 1 ? palette.mintInk : palette.ink}
                            id={`commonity-post-upvote-icon`}
                        />
                    </Pressable>

                    <Text
                        {...elementProps(`commonity-post-vote-score`)}
                        style={styles.voteScore}
                        accessibilityLiveRegion={`polite`}
                    >
                        {score}
                    </Text>

                    <Pressable
                        {...elementProps(`commonity-post-downvote-button`)}
                        onPress={() => onVote(-1)}
                        accessibilityRole={`button`}
                        accessibilityLabel={`Downvote post`}
                        accessibilityState={{ selected: vote === -1 }}
                        style={({ pressed }) => [
                            styles.voteButton,
                            vote === -1 && styles.selectedVote,
                            pressed && styles.pressed,
                        ]}
                    >
                        <Icon
                            size={20}
                            name={`arrow-down`}
                            color={vote === -1 ? palette.mintInk : palette.muted}
                            id={`commonity-post-downvote-icon`}
                        />
                    </Pressable>
                </View>

            </View>

            {repliesOpen && (
                <View
                    {...elementProps(`commonity-post-demo-reply`)}
                    style={styles.reply}
                >
                    <Text
                        {...elementProps(`commonity-post-reply-author`)}
                        style={styles.replyAuthor}
                    >
                        {`Anonymous neighbor`}
                    </Text>

                    <Text
                        {...elementProps(`commonity-post-reply-content`)}
                        style={styles.replyContent}
                    >
                        {`This is exactly the kind of energy we need around here. 🌼`}
                    </Text>

                    <Text
                        {...elementProps(`commonity-post-reply-demo-label`)}
                        style={styles.replyDemo}
                    >
                        {`A little preview of the conversation`}
                    </Text>
                </View>
            )}
        </View>
    );
}
