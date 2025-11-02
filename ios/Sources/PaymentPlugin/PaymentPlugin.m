#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(PaymentPlugin, "Payment",
        CAP_PLUGIN_METHOD(isAppleInAppPurchaseAvailable, CAPPluginReturnPromise);
        CAP_PLUGIN_METHOD(getAppleInAppPurchaseProducts, CAPPluginReturnPromise);
        CAP_PLUGIN_METHOD(buyAppleInAppPurchase, CAPPluginReturnPromise);
        CAP_PLUGIN_METHOD(restoreAppleInAppPurchase, CAPPluginReturnPromise);
        CAP_PLUGIN_METHOD(getAppleInAppPurchaseReceipt, CAPPluginReturnPromise);
        CAP_PLUGIN_METHOD(isGooglePayAvailable, CAPPluginReturnPromise);
        CAP_PLUGIN_METHOD(handleGooglePay, CAPPluginReturnPromise);
)
