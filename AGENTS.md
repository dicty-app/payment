# Repository Guidelines

## Project Structure & Modules
- `src/` holds the TypeScript source; `index.ts` exports the Capacitor plugin API, `definitions.ts` captures shared types, and `src/provider/react/` provides the React context wrapper.
- `ios/` and `android/` contain the native bridge implementations that must stay in sync with TypeScript definitions.
- `dist/` is generated output (CJS/ESM bundles and typings); never edit it directly.
- Configuration lives alongside the source: `rollup.config.mjs`, `tsconfig.json`, `eslint.config.js`, `Package.swift`, and `DictyPayment.podspec`.

## Build, Test & Development Commands
- `npm run build` cleans, regenerates docs, compiles TypeScript, and produces Rollup bundles.
- `npm run verify` runs `verify:ios`, `verify:android`, and `verify:web`; execute it before publishing or merging major work.
- `npm run watch` keeps the TypeScript compiler in watch mode for iterative development.
- `npm run docgen` refreshes the README API section after updating JSDoc on plugin methods.

## Coding Style & Naming Conventions
- TypeScript/TSX use ESLint (@ionic config) and Prettier; run `npm run lint` for checks or `npm run fmt` to auto-fix.
- Default to 2-space indentation, trailing commas, and single quotes as enforced by Prettier.
- Public classes/components use PascalCase (`PaymentPluginProvider`); functions, hooks, and variables use camelCase; enums stay in SCREAMING_SNAKE_CASE.
- Native Swift and Kotlin/Java code follow SwiftLint and Android Gradle conventions; use `npm run swiftlint -- lint` and Android Studio inspections.

## Testing & Verification
- `verify:ios` builds the `DictyPayment` Xcode scheme against a generic iOS device to catch signing or API regressions.
- `verify:android` runs `./gradlew clean build test` inside `android`; place JVM tests under `android/src/test`.
- `verify:web` ensures the web shim compiles; add browser-based checks if extending web functionality.
- When you change plugin contracts, update `src/provider/react/` samples and regenerate docs so consumers stay aligned.

## Commit & Pull Request Guidelines
- Follow the concise, imperative commit style already in history (`fixed build`, `updated version`); keep subjects under 72 characters and include scope prefixes when useful.
- Reference related issues in commit bodies or PR descriptions, and document behaviour changes or release impacts.
- PRs should describe the change, list the commands you ran (e.g., `npm run verify`), and attach relevant screenshots or logs for native UX updates.
