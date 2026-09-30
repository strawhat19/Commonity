import { useEffect } from 'react';
import LandingPageView from './LandingPage.view';
import { useWindowDimensions } from 'react-native';
import { useCommunity } from '../../shared/CommunityContext';
import { useNavigation } from '../../shared/NavigationContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const sections = {
    nearby: {
        label: `YOUR NEIGHBORHOOD`,
        title: `Anonymous. Together.`,
        subtitle: `Real people. Local conversations. No names needed.`,
    },
    communities: {
        label: `C / NEARBY`,
        title: `Find your people.`,
        subtitle: `Your local community. Open to every perspective.`,
    },
    saved: {
        label: `YOUR SAVED POSTS`,
        title: `Keep the good stuff.`,
        subtitle: `A little corner for conversations worth coming back to.`,
    },
};

export default function LandingPage() {
    const insets = useSafeAreaInsets();
    const { width } = useWindowDimensions();
    const { currentPage, setCurrentPage } = useNavigation();
    const { saved, notice, activeTab, setNotice, setActiveTab } = useCommunity();

    useEffect(() => {
        if (!notice) return;

        const timeout = setTimeout(() => setNotice(null), 4000);
        return () => clearTimeout(timeout);
    }, [notice, setNotice]);

    const handleNearby = () => {
        setActiveTab(`nearby`);
        setCurrentPage(`home`);
    };

    return (
        <LandingPageView
            wide={width >= 768}
            notice={notice}
            currentPage={currentPage}
            topInset={insets.top}
            onNearby={handleNearby}
            section={sections[activeTab]}
            bottomInset={insets.bottom}
            emptySaved={activeTab === `saved` && !saved}
        />
    );
}
