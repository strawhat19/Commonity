import { createContext, useContext, useState } from 'react';
import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';

export type CommunityTab = `nearby` | `communities` | `saved`;
export type PostVote = -1 | 0 | 1;

type CommunityState = {
    vote: PostVote;
    saved: boolean;
    toggleSaved: () => void;
    repliesOpen: boolean;
    toggleReplies: () => void;
    activeTab: CommunityTab;
    notice: string | null;
    setVote: Dispatch<SetStateAction<PostVote>>;
    setNotice: Dispatch<SetStateAction<string | null>>;
    setActiveTab: Dispatch<SetStateAction<CommunityTab>>;
};

const CommunityContext = createContext<CommunityState | null>(null);

export function CommunityProvider({ children }: PropsWithChildren) {
    const [vote, setVote] = useState<PostVote>(0);
    const [saved, setSaved] = useState(false);
    const [repliesOpen, setRepliesOpen] = useState(false);
    const [notice, setNotice] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<CommunityTab>(`nearby`);

    return (
        <CommunityContext.Provider
            value={{
                vote,
                saved,
                notice,
                setVote,
                activeTab,
                setNotice,
                repliesOpen,
                setActiveTab,
                toggleSaved: () => setSaved((current) => !current),
                toggleReplies: () => setRepliesOpen((current) => !current),
            }}
        >
            {children}
        </CommunityContext.Provider>
    );
}

export function useCommunity() {
    const context = useContext(CommunityContext);

    if (!context) {
        throw new Error(`useCommunity must be used within CommunityProvider.`);
    }

    return context;
}
