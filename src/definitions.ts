export interface PaymentPlugin {
    /**
     * Check if Apple In-App Purchases are available on this device
     */
    isAppleInAppPurchaseAvailable(): Promise<void>;
    
    /**
     * Get Apple In-App Purchase products by their identifiers
     */
    getAppleInAppPurchaseProducts(opts: GetAppleInAppPurchaseProductsOptions): Promise<GetAppleInAppPurchaseProductsResult>;
    
    /**
     * Purchase an Apple In-App Purchase product
     */
    buyAppleInAppPurchase(opts: BuyAppleInAppPurchaseOptions): Promise<BuyAppleInAppPurchaseResult>;
    
    /**
     * Restore Apple In-App Purchase transactions
     */
    restoreAppleInAppPurchase(): Promise<RestoreAppleInAppPurchaseResult>;
    
    /**
     * Get Apple In-App Purchase receipt data
     */
    getAppleInAppPurchaseReceipt(): Promise<GetAppleInAppPurchaseReceiptResult>;
    
    /**
     * Check if Google Pay is available on this device
     */
    isGooglePayAvailable(): Promise<void>;
    
    /**
     * Handle Google Pay payment flow
     */
    handleGooglePay(opts: GooglePayOptions): Promise<GooglePayResult>;
}
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
