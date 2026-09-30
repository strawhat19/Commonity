import { NavigationView } from './Navigation.view';
import { useCommunity } from '../../shared/CommunityContext';
import { useNavigation } from '../../shared/NavigationContext';

export type NavigationProps = {
    compact?: boolean;
};

export type NavigationTab = `nearby` | `communities` | `saved`;

const tabs = [
    { key: `nearby`, label: `Nearby`, icon: `navigate-outline` },
    { key: `communities`, label: `Communities`, icon: `grid-outline` },
    { key: `saved`, label: `Saved`, icon: `bookmark-outline` },
] as const;

export function Navigation({ compact = false }: NavigationProps) {
    const { activeTab, setActiveTab } = useCommunity();
    const { currentPage, setCurrentPage } = useNavigation();

    const handleSelect = (tab: NavigationTab) => {
        setActiveTab(tab);
        setCurrentPage(`home`);
    };

    return (
        <NavigationView
            tabs={tabs}
            compact={compact}
            activeTab={activeTab}
            onSelect={handleSelect}
            currentPage={currentPage}
        />
    );
}
