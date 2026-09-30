# Commonity

A single-page, frontend-only Expo app for iOS, Android, and web. One anonymous neighborhood post, nearby/community/saved navigation, voting, bookmarks, a sample reply, and sharing. All state is in memory and resets when the app reloads.

The header logo uses `assets/concepts/logos/v9/03-c-brackets.svg`, the mint C and brackets without a map pin. The app icon and web favicon use `assets/icons/commonity-rounded.png`, a 1024px C-and-brackets mark on a rounded navy tile with transparent corners. iOS uses the opaque `assets/icons/commonity.png` source and applies its own icon corners. Each component keeps its logic, view, and native styles in its own folder; SCSS adds web transitions. Shared state lives in `src/shared/CommunityContext.tsx`. Rendered elements have descriptive inspection classes and IDs.

Use Node.js 22.13 or newer, then run:

```sh
npm install
npm run web
```

For mobile, use `npm start` with Expo Go, or `npm run ios` / `npm run android` with a local simulator. `npm run export:web` creates a static web export for your domain. `eas.json` includes preview and production profiles for native builds; configure your own app identifiers and Expo account before publishing.

No build, tests, or verification have been run, per AGENTS.md.
