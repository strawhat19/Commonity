import React from 'react';
import { Share, Platform, LayoutAnimation } from 'react-native';

import { PostCardView } from './PostCard.view';
import { useCommunity } from '../../shared/CommunityContext';

const postMessage = `To whoever keeps leaving little flowers at the bus stop: you’ve made my morning three days in a row. Please never stop. 🌼 — Commonity`;

export function PostCard() {
    const {
        vote,
        saved,
        setVote,
        setNotice,
        toggleSaved,
        repliesOpen,
        toggleReplies,
    } = useCommunity();

    const handleVote = (nextVote: -1 | 1) => {
        setVote(vote === nextVote ? 0 : nextVote);
    };

    const handleReplies = () => {
        if (Platform.OS !== `web`) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        }

        toggleReplies();
    };

    const handleShare = async () => {
        try {
            await Share.share({ message: postMessage });
        } catch {
            setNotice(`Sharing isn’t available on this device yet.`);
        }
    };

    return (
        <PostCardView
            vote={vote}
            saved={saved}
            score={128 + vote}
            onVote={handleVote}
            onSave={toggleSaved}
            onShare={handleShare}
            repliesOpen={repliesOpen}
            onReplies={handleReplies}
        />
    );
}
