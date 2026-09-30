# Commonity

A frontend-only Expo app for iOS, Android, and web. One anonymous neighborhood sample post, voting, bookmarks, a sample reply, and sharing. Nearby, Communities, and Saved buttons navigate the feed; About, Terms, and Privacy Policy are linked in the footer. The header location label reads Local, and the logo returns to the nearby feed. Web pages use `/about`, `/terms`, and `/privacy` links with browser history navigation. Post interactions stay in memory and reset on reload; the web theme preference is saved locally in the browser.

The shared footer displays the current copyright year, About, Terms, and Privacy Policy links, and a link to [Piratechs](https://piratechs.com/). The information pages describe the current demo behavior.

The header logo uses `assets/concepts/logos/v9/03-c-brackets.svg`, the mint C and brackets without a map pin. The four bracket strokes match the C's visible 4.4-unit weight, and interface icons use the same `#0DD5B2` mint. The app icon and web favicon use `assets/icons/commonity-rounded.png`, a 1024px C-and-brackets mark on a rounded navy tile with transparent corners. The app icon foreground is scaled to 82%, with the C centered inside the brackets, giving the mark more space within its tile. iOS uses the opaque `assets/icons/commonity.png` C-and-brackets icon and applies its own icon corners. Matching editable SVG sources live beside both PNGs. Each component keeps its logic, view, and native styles in its own folder; SCSS adds web transitions. Shared state lives in `src/shared/CommunityContext.tsx`. Rendered elements have descriptive inspection classes and IDs.

Use Node.js 22.13 or newer, then run:

```sh
npm install
npm run web
```

For mobile, use `npm start` with Expo Go, or `npm run ios` / `npm run android` with a local simulator. `npm run export:web` creates a static web export for your domain. `eas.json` includes preview and production profiles for native builds; configure your own app identifiers and Expo account before publishing.

Deploy the contents of `dist` as the website. The app uses Expo's `single` web output, so the host must serve `index.html` for page paths when visitors open a link directly or refresh. Expo copies `public` files into `dist` during export. The included `public/.htaccess` provides that fallback on Apache 2.4 while leaving existing files and directories untouched; upload the hidden `.htaccess` file too and enable `mod_rewrite` and `AllowOverride FileInfo` for the deployed directory. `public/_redirects` provides the fallback on Netlify when deployed at the domain root. Both redirect `/about-us` to `/about`, `/terms-of-use` and `/terms-of-service` to `/terms`, and `/privacy-policy` to `/privacy`. Other hosts need the equivalent fallback. See the [Expo publishing guide](https://docs.expo.dev/guides/publishing-websites/) and [Apache rewrite documentation](https://httpd.apache.org/docs/2.4/mod/mod_rewrite.html).

For an Apache deployment in a subfolder, such as `/commonity`, set `expo.experiments.baseUrl` to `/commonity` in `app.json` before exporting, then deploy the contents of `dist` into that folder. The app's page links use that prefix, and the relative Apache rewrite rules stay within the deployed directory. Leave `baseUrl` unset when using the domain root. The configured prefix applies to production exports; see [Expo's subpath hosting documentation](https://docs.expo.dev/more/expo-cli/#hosting-with-sub-paths).

No build, tests, or verification have been run, per AGENTS.md.
