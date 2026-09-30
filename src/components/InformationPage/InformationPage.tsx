import InformationPageView from './InformationPage.view';
import { informationPages } from './InformationPage.content';
import type { InformationPageKey } from '../../shared/NavigationContext';

type InformationPageProps = {
    wide: boolean;
    onHome: () => void;
    page: InformationPageKey;
};

export default function InformationPage({ page, wide, onHome }: InformationPageProps) {
    return (
        <InformationPageView
            page={page}
            wide={wide}
            onHome={onHome}
            content={informationPages[page]}
        />
    );
}
