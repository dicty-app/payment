# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Capacitor plugin called `@dicty/payment` that provides payment functionality for mobile applications. It supports:
- Apple In-App Purchases (iOS only)
- Google Pay integration (Android only)
- Cross-platform TypeScript/JavaScript API

## Common Commands

### Build and Development
- `npm run build` - Clean, generate docs, compile TypeScript, and bundle with Rollup
- `npm run clean` - Remove dist directory
- `npm run watch` - Watch TypeScript files for changes
- `npm run docgen` - Generate API documentation (requires JSDoc comments on PaymentPlugin interface)

### Code Quality
- `npm run lint` - Run ESLint, Prettier check, and SwiftLint
- `npm run fmt` - Auto-fix ESLint, format with Prettier, and fix SwiftLint issues
- `npm run eslint` - Run ESLint on TypeScript files
- `npm run prettier` - Check/format CSS, HTML, TS, JS, and Java files
- `npm run swiftlint` - Run SwiftLint on iOS code

### Platform Verification
- `npm run verify` - Run all platform verifications
- `npm run verify:ios` - Build iOS with Xcode (`xcodebuild -scheme DictyPayment`)
- `npm run verify:android` - Build and test Android (`cd android && ./gradlew clean build test`)
- `npm run verify:web` - Verify web build (`npm run build`)

**Note**: Android verification requires Java 21 or lower. With Java 24+ (major versions 68+), you will encounter "Unsupported class file major version" errors despite using updated Gradle versions. 

**Solutions**:
- Install Java 21: `brew install openjdk@21`
- Run with Java 21: `JAVA_HOME=/usr/local/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home npm run verify:android`
- Or use jenv to manage multiple Java versions

The plugin code itself is valid - this is purely a toolchain compatibility issue.

## Architecture

### TypeScript/JavaScript Layer
- **Entry point**: `src/index.ts` - Registers the Capacitor plugin
- **API definitions**: `src/definitions.ts` - TypeScript interfaces and enums for all plugin methods
- **Web implementation**: `src/web.ts` - Web fallback (minimal functionality)
- **React provider**: `src/provider/react/PaymentPluginProvider.tsx` - React context for the plugin

### iOS Implementation (Swift)
- **Main file**: `ios/Sources/PaymentPlugin/PaymentPlugin.swift`
- **Features**: Complete Apple In-App Purchase implementation using StoreKit
- **Key capabilities**: Product fetching, purchasing, restoration, receipt handling
- **Status enum**: `ios/Sources/PaymentPlugin/InAppPurchaseStatus.swift`

### Android Implementation (Java)
- **Main file**: `android/src/main/java/app/dicty/plugins/stripe/PaymentPlugin.java`
- **Features**: Google Pay integration using Stripe Android SDK
- **Dependencies**: Requires Stripe configuration via metadata
- **Key capabilities**: Google Pay availability check and payment processing

### Build Configuration
- **TypeScript**: Targets ES2017, outputs to `dist/esm/`
- **Bundling**: Rollup creates IIFE and CommonJS builds
- **Package exports**: Supports both main plugin and React provider imports
- **Publishing**: Uses `prepublishOnly` hook to ensure fresh build

## Platform-Specific Notes

### iOS Development
- Uses StoreKit framework for in-app purchases
- Requires proper App Store Connect configuration for products
- SwiftLint enforces code style (@ionic/swiftlint-config)
- All Apple Pay methods return "Not implemented on iOS" (legacy from Stripe integration)

### Android Development  
- Uses Stripe Android SDK for Google Pay
- Requires metadata configuration in AndroidManifest.xml
- All Apple In-App Purchase methods return "Not implemented on Android"
- Java code follows Prettier formatting rules

### Plugin Registration
The plugin is registered as "Payment" in Capacitor with platform-specific implementations falling back to web stubs when unavailable.