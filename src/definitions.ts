export interface StripePlugin {
    initialize(opts: InitializeOptions): Promise<void>;

    isApplePayAvailable(): Promise<void>;

    handleApplePay(opts: ApplePayOptions): Promise<ApplePayResult>;

    isGooglePayAvailable(): Promise<void>;

    handleGooglePay(opts: GooglePayOptions): Promise<void>;
}

export enum ApplePayResults {
    Completed = 'completed',
    Cancelled = 'cancelled',
    Failed = 'failed',
}

export interface InitializeOptions {
    publicKey: string;
}

export interface ApplePayResult {
    result: ApplePayResults;
}

export interface ApplePayOptions {
    clientSecret: string;
    merchantIdentifier: string;
    label: string;
    countryCode: string;
    currency: string;
    amount: number;
    billingPeriod: number;
    description: string;
    managementURL: string;
    billingAgreement: string;
}

export interface GooglePayOptions {
    clientSecret: string;
    merchantIdentifier: string;
    label: string;
    currency: string;
    amount: number;
    billingPeriod: number;
}

export interface StripePluginContext {
    plugin: StripePlugin;
    isApplePayAvailable: boolean;
    isGooglePayAvailable: boolean;
}
