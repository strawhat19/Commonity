import appConfig from '../../app.json';
import { Platform } from 'react-native';
import type { PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

export type InformationPageKey = `about` | `terms` | `contact` | `privacy`;
export type AppPage = `home` | InformationPageKey;

type NavigationState = {
    currentPage: AppPage;
    setCurrentPage: (page: AppPage) => void;
};

const NavigationContext = createContext<NavigationState | null>(null);

type RoutingConfig = {
    experiments?: { baseUrl?: string };
};

const configuredBaseUrl = (appConfig.expo as RoutingConfig).experiments?.baseUrl ?? ``;
const deploymentPath = configuredBaseUrl.replace(/^\/+|\/+$/g, ``);
const basePath = !__DEV__ && deploymentPath ? `/${deploymentPath}` : ``;

const pageRoutes: Record<string, AppPage> = {
    [`/`]: `home`,
    [`/about`]: `about`,
    [`/terms`]: `terms`,
    [`/contact`]: `contact`,
    [`/privacy`]: `privacy`,
    [`/index.html`]: `home`,
    [`/about-us`]: `about`,
    [`/contact-us`]: `contact`,
    [`/terms-of-use`]: `terms`,
    [`/terms-of-service`]: `terms`,
    [`/privacy-policy`]: `privacy`,
};

export function getPageHref(page: AppPage) {
    const path = page === `home` ? `/` : `/${page}`;
    return `${basePath}${path}`;
}

function readPage(): AppPage {
    if (Platform.OS !== `web` || typeof window === `undefined`) return `home`;

    const pathname = window.location.pathname;
    const path = basePath && (pathname === basePath || pathname.startsWith(`${basePath}/`))
        ? pathname.slice(basePath.length)
        : pathname;
    const route = path.replace(/\/+$/g, ``).toLowerCase() || `/`;

    return pageRoutes[route] ?? `home`;
}

export function NavigationProvider({ children }: PropsWithChildren) {
    const [currentPage, setPage] = useState<AppPage>(readPage);

    useEffect(() => {
        if (Platform.OS !== `web` || typeof window === `undefined`) return;

        const handleLocationChange = () => {
            const page = readPage();
            const url = `${getPageHref(page)}${window.location.search}`;
            window.history.replaceState(window.history.state, ``, url);
            setPage(page);
        };

        handleLocationChange();
        window.addEventListener(`popstate`, handleLocationChange);
        return () => window.removeEventListener(`popstate`, handleLocationChange);
    }, []);

    useEffect(() => {
        if (Platform.OS !== `web` || typeof document === `undefined`) return;

        const titles = {
            home: `Commonity · Community in Common`,
            about: `About · Commonity`,
            terms: `Terms · Commonity`,
            contact: `Contact · Commonity`,
            privacy: `Privacy Policy · Commonity`,
        };

        document.title = titles[currentPage];
    }, [currentPage]);

    const setCurrentPage = (page: AppPage) => {
        setPage(page);

        if (Platform.OS !== `web` || typeof window === `undefined`) return;

        const path = getPageHref(page);

        if (window.location.pathname !== path) {
            const url = `${path}${window.location.search}`;
            window.history.pushState(window.history.state, ``, url);
        }
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
