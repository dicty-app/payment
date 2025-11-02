export declare type PaymentPlugin = {
    isAppleInAppPurchaseAvailable(): Promise<void>;
    getAppleInAppPurchaseProducts(opts: GetAppleInAppPurchaseProductsOptions): Promise<GetAppleInAppPurchaseProductsResult>;
    buyAppleInAppPurchase(opts: BuyAppleInAppPurchaseOptions): Promise<BuyAppleInAppPurchaseResult>;
    restoreAppleInAppPurchase(): Promise<RestoreAppleInAppPurchaseResult>;
    getAppleInAppPurchaseReceipt(): Promise<GetAppleInAppPurchaseReceiptResult>;
    isGooglePayAvailable(): Promise<void>;
    handleGooglePay(opts: GooglePayOptions): Promise<GooglePayResult>;
};
export declare enum AppleInAppPurchaseStatus {
    Completed = 'completed',
    Restored = 'restored',
    Cancelled = 'cancelled',
    Failed = 'failed',
}
export declare enum AppleSubscriptionPeriodUnit {
    Day = 0,
    Week = 1,
    Month = 2,
    Year = 3,
}

export declare type GetAppleInAppPurchaseProductsOptions = {
    id: string[];
};

export declare type AppleInAppPurchaseProduct = {
    id: string;
    title: string;
    description: string;
    price: number;
    localizedPrice: string;
    subscriptionPeriod?: {
        value: number;
        unit: AppleSubscriptionPeriodUnit;
    };
};

export declare type GetAppleInAppPurchaseProductsResult = {
    products: AppleInAppPurchaseProduct[];
};

export declare type BuyAppleInAppPurchaseOptions = {
    id: string;
};

export declare type BuyAppleInAppPurchaseResult =
    | CompletedAppleInAppPurchaseResult
    | RestoredAppleInAppPurchaseResult
    | FailedAppleInAppPurchaseResult
    | CancelledAppleInAppPurchaseResult;

export declare type CompletedAppleInAppPurchaseResult = {
    status: AppleInAppPurchaseStatus.Completed;
    productIdentifier: string;
    transactionIdentifier: string;
};

export declare type RestoredAppleInAppPurchaseResult = {
    status: AppleInAppPurchaseStatus.Restored;
} & Omit<CompletedAppleInAppPurchaseResult, 'status'>;

export declare type FailedAppleInAppPurchaseResult = {
    status: AppleInAppPurchaseStatus.Failed;
    productIdentifier?: string;
    transactionIdentifier?: string;
};

export declare type CancelledAppleInAppPurchaseResult = {
    status: AppleInAppPurchaseStatus.Cancelled;
} & Omit<FailedAppleInAppPurchaseResult, 'status'>;

export declare type RestoreAppleInAppPurchaseResult = BuyAppleInAppPurchaseResult;

export declare type GetAppleInAppPurchaseReceiptResult = {
    receiptData: string;
};
export declare enum GooglePayResults {
    Completed = 'completed',
    Failed = 'failed',
}
export declare type GooglePayOptions = {
    clientSecret: string;
};
export declare type GooglePayResult = {
    result: GooglePayResults;
};
export declare type PaymentPluginContext = {
    plugin: PaymentPlugin;
    isAppleInAppPurchaseAvailable: boolean;
    isGooglePayAvailable: boolean;
};
