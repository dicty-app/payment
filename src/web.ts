import { WebPlugin } from '@capacitor/core';

import type { ApplePayResult, StripePlugin } from './definitions';

export class StripeWeb extends WebPlugin implements StripePlugin {
    async initialize(): Promise<void> {
        return Promise.resolve(undefined);
    }

    handleApplePay(): Promise<ApplePayResult> {
        return Promise.reject('Not supported');
    }

    handleGooglePay(): Promise<void> {
        return Promise.reject('Not supported');
    }

    isApplePayAvailable(): Promise<boolean> {
        return Promise.reject('Not supported');
    }

    isGooglePayAvailable(): Promise<boolean> {
        return Promise.reject('Not supported');
    }
}
