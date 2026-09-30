# Commonity

A frontend-only Expo app for iOS, Android, and web. One anonymous neighborhood sample post, voting, bookmarks, a sample reply, and sharing. Nearby, Communities, and Saved buttons navigate the feed; About, Terms, and Privacy Policy are linked in the footer. The header location label reads Local, and the logo returns to the nearby feed. Web pages use `#/about`, `#/terms`, and `#/privacy` links. Post interactions stay in memory and reset on reload; the web theme preference is saved locally in the browser.

The shared footer displays the current copyright year, About, Terms, and Privacy Policy links, and a link to [Piratechs](https://piratechs.com/). The information pages describe the current demo behavior.

The header logo uses `assets/concepts/logos/v9/03-c-brackets.svg`, the mint C and brackets without a map pin. The four bracket strokes match the C's visible 4.4-unit weight, and interface icons use the same `#0DD5B2` mint. The app icon and web favicon use `assets/icons/commonity-rounded.png`, a 1024px C-and-brackets mark on a rounded navy tile with transparent corners. iOS uses the opaque `assets/icons/commonity.png` C-and-brackets icon and applies its own icon corners. Matching editable SVG sources live beside both PNGs. Each component keeps its logic, view, and native styles in its own folder; SCSS adds web transitions. Shared state lives in `src/shared/CommunityContext.tsx`. Rendered elements have descriptive inspection classes and IDs.

Use Node.js 22.13 or newer, then run:

```sh
npm install
npm run web
```

For mobile, use `npm start` with Expo Go, or `npm run ios` / `npm run android` with a local simulator. `npm run export:web` creates a static web export for your domain. `eas.json` includes preview and production profiles for native builds; configure your own app identifiers and Expo account before publishing.

No build, tests, or verification have been run, per AGENTS.md.
