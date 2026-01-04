import { WebPlugin } from '@capacitor/core';

import type {
  BuyAppleInAppPurchaseOptions,
  BuyAppleInAppPurchaseResult,
  GetAppleInAppPurchaseProductsOptions,
  GetAppleInAppPurchaseProductsResult,
  GetAppleInAppPurchaseReceiptResult,
  GooglePayOptions,
  GooglePayResult,
  PaymentPlugin,
  RestoreAppleInAppPurchaseResult,
} from './definitions';

export class PaymentWeb extends WebPlugin implements PaymentPlugin {
  /**
   * Apple
   */
  isAppleInAppPurchaseAvailable(): Promise<void> {
    return Promise.reject('Not supported');
  }
  getAppleInAppPurchaseProducts(
    _opts: GetAppleInAppPurchaseProductsOptions,
  ): Promise<GetAppleInAppPurchaseProductsResult> {
    return Promise.reject('Not supported');
  }
  buyAppleInAppPurchase(_opts: BuyAppleInAppPurchaseOptions): Promise<BuyAppleInAppPurchaseResult> {
    return Promise.reject('Not supported');
  }
  restoreAppleInAppPurchase(): Promise<RestoreAppleInAppPurchaseResult> {
    return Promise.reject('Not supported');
  }
  getAppleInAppPurchaseReceipt(): Promise<GetAppleInAppPurchaseReceiptResult> {
    return Promise.reject('Not supported');
  }
  /**
   * Google
   */
  isGooglePayAvailable(): Promise<void> {
    return Promise.reject('Not supported');
  }
  handleGooglePay(_opts: GooglePayOptions): Promise<GooglePayResult> {
    return Promise.reject('Not supported');
  }
}
