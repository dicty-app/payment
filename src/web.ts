import { WebPlugin } from '@capacitor/core';

import type { StripePlugin } from './definitions';

export class StripeWeb extends WebPlugin implements StripePlugin {
    async initialize(): Promise<void> {
        return Promise.resolve(undefined);
    }

    handleApplePay(): Promise<void> {
        return Promise.resolve(undefined);
    }

    handleGooglePay(): Promise<void> {
        return Promise.resolve(undefined);
    }

    isApplePayAvailable(): Promise<boolean> {
        return Promise.resolve(false);
    }

    isGooglePayAvailable(): Promise<boolean> {
        return Promise.resolve(false);
    }
}
