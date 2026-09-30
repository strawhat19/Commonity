import type { IconProps } from '../Icon/Icon';
import type { InformationPageKey } from '../../shared/NavigationContext';

type InformationSection = {
    id: string;
    title: string;
    paragraphs: readonly string[];
};

export type InformationContent = {
    title: string;
    eyebrow: string;
    summary: string;
    note: string;
    icon: IconProps[`name`];
    sections: readonly InformationSection[];
};

export const informationPages: Record<InformationPageKey, InformationContent> = {
    about: {
        title: `About Commonity`,
        eyebrow: `COMMUNITY IN COMMON`,
        icon: `people-outline`,
        summary: `A little more connection. A little less distance. Commonity is a place for the conversations that bring a neighborhood together.`,
        note: `Anonymous local conversations, with kindness at the center.`,
        sections: [
            {
                id: `idea`,
                title: `The idea is simple.`,
                paragraphs: [
                    `Sometimes the smallest things make a place feel like home: a kind gesture, a shared question, a story from down the street. Commonity explores a way to give those moments a space of their own.`,
                    `Community in Common means finding what connects us without making a name or a profile the focus of every conversation.`,
                ],
            },
            {
                id: `experience`,
                title: `Take a look around.`,
                paragraphs: [
                    `The home page offers a sample neighborhood conversation. Try the voting and bookmark controls, open the example reply, switch between light and dark themes, or share the sample message using your device’s sharing options.`,
                    `These interactions let you explore how Commonity could feel. Votes, bookmarks, and opened replies stay in this session and reset when the app restarts or the page reloads.`,
                ],
            },
            {
                id: `current-version`,
                title: `A community taking shape.`,
                paragraphs: [
                    `This version is a frontend demo. The post, reply, and neighborhood label are examples. There are no accounts, live community feeds, or tools for publishing your own posts or replies yet, and the app does not request your location.`,
                    `The goal is a welcoming space for everyday local conversation: curious, considerate, and open to different perspectives.`,
                ],
            },
        ],
    },
    terms: {
        title: `Terms of Use`,
        eyebrow: `USING COMMONITY`,
        icon: `document-text-outline`,
        summary: `A few clear expectations for exploring Commonity and treating the people around you with care.`,
        note: `These terms apply to the current Commonity demo.`,
        sections: [
            {
                id: `scope`,
                title: `The current experience`,
                paragraphs: [
                    `Commonity currently provides a frontend demonstration of a local conversation interface. Its post, reply, vote count, and neighborhood label are sample content. The demo does not provide accounts, accept new posts or replies, or connect you to a live neighborhood feed.`,
                    `Use the demo to explore its interface and sample interactions. Sample content should not be treated as verified local information or professional advice.`,
                ],
            },
            {
                id: `respectful-use`,
                title: `Use it with care`,
                paragraphs: [
                    `Use Commonity lawfully. Do not attempt to disrupt the app, introduce harmful code, or access systems or information without permission.`,
                    `When sharing material from the demo, respect other people’s privacy and rights. Do not use it to harass, threaten, impersonate, or mislead others.`,
                ],
            },
            {
                id: `demo-interactions`,
                title: `Your demo interactions`,
                paragraphs: [
                    `Votes, bookmarks, opened replies, and notices are temporary interface state. They do not submit content to a community service or create a permanent record, and they reset when the page reloads or the app restarts.`,
                    `A selected theme may be remembered in your browser. The Privacy Policy explains this local storage and how the sharing control works.`,
                ],
            },
            {
                id: `sharing-links`,
                title: `Sharing and outside links`,
                paragraphs: [
                    `The share control sends the sample message to your device or browser’s sharing interface. You choose whether to share it and where it goes. Any service you choose has its own terms and privacy practices.`,
                    `Links to outside websites, including Piratechs, take you to separate services. Their content, availability, and policies are governed by those services.`,
                ],
            },
            {
                id: `availability`,
                title: `An evolving demo`,
                paragraphs: [
                    `The interface and sample content may change as Commonity develops. Features may be incomplete, unavailable on some devices, or interrupted; do not rely on the demo to store information or deliver time-sensitive messages.`,
                    `These terms describe the current experience. Review the terms and Privacy Policy again when new features become available. Nothing on this page limits rights that applicable law does not allow to be limited.`,
                ],
            },
        ],
    },
    contact: {
        title: `Contact Commonity`,
        eyebrow: `QUESTIONS & FEEDBACK`,
        icon: `mail-outline`,
        summary: `Have a question, an idea, or feedback about Commonity? Start with Piratechs.`,
        note: `Visit Piratechs using the link in the footer.`,
        sections: [
            {
                id: `reach-piratechs`,
                title: `Reach Piratechs`,
                paragraphs: [
                    `Open the Piratechs website using the footer link to learn more and look for its available contact options.`,
                    `This Commonity demo does not include a contact form or send messages from the app.`,
                ],
            },
            {
                id: `report-an-issue`,
                title: `Tell us what happened`,
                paragraphs: [
                    `When sharing feedback about an issue, include the page, what you expected, and what happened. Your browser and device details can help explain the experience.`,
                    `Avoid including private information about yourself or other people when describing the sample conversation.`,
                ],
            },
        ],
    },
    privacy: {
        title: `Privacy Policy`,
        eyebrow: `YOUR PRIVACY`,
        icon: `shield-checkmark-outline`,
        summary: `What the current Commonity demo does with your choices, your device, and the sample conversation.`,
        note: `This policy describes the app features available in the current demo.`,
        sections: [
            {
                id: `accounts-location`,
                title: `Accounts and location`,
                paragraphs: [
                    `The current demo has no signup, login, or forms for submitting posts or replies. The neighborhood label and conversation are examples. The app does not request location permission or use your device’s location to choose a neighborhood.`,
                    `“Anonymous” describes the sample conversation’s presentation. It does not mean that visiting a website makes your network connection anonymous.`,
                ],
            },
            {
                id: `session-state`,
                title: `Choices in this session`,
                paragraphs: [
                    `Votes, bookmark choices, opened replies, and notices are held in the app’s memory to update the interface. These demo interactions are not submitted to a Commonity backend and reset when you reload the page or restart the app.`,
                ],
            },
            {
                id: `theme-storage`,
                title: `Your theme preference`,
                paragraphs: [
                    `On the web, choosing a theme stores “light” or “dark” in your browser’s local storage under the key “commonity-theme”. This lets the app remember your choice on later visits in that browser. If no saved preference is available, the app uses your device’s color scheme.`,
                    `You can change the theme using the theme button. Clearing this site’s browser storage removes the saved preference. On mobile, a selected theme lasts for the current app session.`,
                ],
            },
            {
                id: `sharing`,
                title: `When you choose to share`,
                paragraphs: [
                    `Tapping share passes the sample post message to your device or browser’s sharing interface. Your device determines the options available, and you decide whether to send it to another app or service. The destination’s own privacy practices apply to anything you share there.`,
                ],
            },
            {
                id: `websites`,
                title: `Website requests and external links`,
                paragraphs: [
                    `Loading the web app makes requests to the server that delivers it. A server or hosting provider may process connection information, such as an IP address and browser details; the frontend code does not determine that provider’s logging or retention practices.`,
                    `Opening an external link, including Piratechs, makes a request to that website. Read its privacy policy for information about how it handles your visit.`,
                ],
            },
            {
                id: `changes`,
                title: `As Commonity develops`,
                paragraphs: [
                    `New features can change the information an app uses. Review this policy when the experience changes, particularly before using future account, posting, or location features. This page describes the current demo’s behavior.`,
                ],
            },
        ],
    },
};
