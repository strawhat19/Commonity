import { Platform } from 'react-native';
import type { PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

export type InformationPageKey = `about` | `terms` | `privacy`;
export type AppPage = `home` | InformationPageKey;

type NavigationState = {
    currentPage: AppPage;
    setCurrentPage: (page: AppPage) => void;
};

const NavigationContext = createContext<NavigationState | null>(null);

function readPage(): AppPage {
    if (Platform.OS !== `web` || typeof window === `undefined`) return `home`;

    const page = window.location.hash.replace(/^#\/?/, ``);
    return page === `about` || page === `terms` || page === `privacy` ? page : `home`;
}

export function NavigationProvider({ children }: PropsWithChildren) {
    const [currentPage, setPage] = useState<AppPage>(readPage);

    useEffect(() => {
        if (Platform.OS !== `web` || typeof window === `undefined`) return;

        const handleHashChange = () => setPage(readPage());
        window.addEventListener(`hashchange`, handleHashChange);
        return () => window.removeEventListener(`hashchange`, handleHashChange);
    }, []);

    useEffect(() => {
        if (Platform.OS !== `web` || typeof document === `undefined`) return;

        const titles = {
            home: `Commonity · Community in Common`,
            about: `About · Commonity`,
            terms: `Terms · Commonity`,
            privacy: `Privacy Policy · Commonity`,
        };

        document.title = titles[currentPage];
    }, [currentPage]);

    const setCurrentPage = (page: AppPage) => {
        setPage(page);

        if (Platform.OS !== `web` || typeof window === `undefined`) return;

        const hash = page === `home` ? `#/` : `#/${page}`;
        if (window.location.hash !== hash) window.location.hash = hash;
    };

    return (
        <NavigationContext.Provider value={{ currentPage, setCurrentPage }}>
            {children}
        </NavigationContext.Provider>
    );
}

export function useNavigation() {
    const context = useContext(NavigationContext);

    if (!context) {
        throw new Error(`useNavigation must be used within NavigationProvider.`);
    }

    return context;
}
