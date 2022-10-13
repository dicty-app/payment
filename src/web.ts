import { WebPlugin } from '@capacitor/core';

import type { ApplePayResult, GooglePayResult, StripePlugin } from './definitions';

export class StripeWeb extends WebPlugin implements StripePlugin {
    async initialize(): Promise<void> {
        return Promise.resolve(undefined);
    }

    handleApplePay(): Promise<ApplePayResult> {
        return Promise.reject('Not supported');
    }

    handleGooglePay(): Promise<GooglePayResult> {
        return Promise.reject('Not supported');
    }

    isApplePayAvailable(): Promise<void> {
        return Promise.reject('Not supported');
    }

    isGooglePayAvailable(): Promise<void> {
        return Promise.reject('Not supported');
    }
}
