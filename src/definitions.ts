export interface StripePlugin {
    initialize(opts: InitializeOptions): Promise<void>;

    isApplePayAvailable(): Promise<boolean>;

    handleApplePay(opts: ApplePayOptions): Promise<void>;

    isGooglePayAvailable(): Promise<boolean>;

    handleGooglePay(opts: GooglePayOptions): Promise<void>;
}

export interface InitializeOptions {
    publicKey: string;
}

export interface ApplePayOptions {
    clientSecret: string;
    merchantIdentifier: string;
    label: string;
    description: string;
    currency: string;
    amount: number;
    billingPeriod: number;
    managementURL: string;
    billingAgreement: string;
}

export interface GooglePayOptions {
    clientSecret: string;
    merchantIdentifier: string;
    label: string;
    description: string;
    currency: string;
    amount: number;
    billingPeriod: number;
    managementURL: string;
    billingAgreement: string;
}

export interface StripePluginContext {
    plugin: StripePlugin;
    isApplePayAvailable: boolean;
    isGooglePayAvailable: boolean;
}
