import { elementProps } from './shared/elementProps';
import { ThemeProvider } from './shared/ThemeContext';
import { CommunityProvider } from './shared/CommunityContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LandingPage from './components/LandingPage/LandingPage';

export default function CommonityApp() {
    return (
        <SafeAreaProvider
            {...elementProps(`commonity-safe-area`)}
        >
            <ThemeProvider>
                <CommunityProvider>
                    <LandingPage />
                </CommunityProvider>
            </ThemeProvider>
        </SafeAreaProvider>
    );
}
