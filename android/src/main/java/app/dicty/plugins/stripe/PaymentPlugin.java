package app.dicty.plugins.payment;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.stripe.android.PaymentConfiguration;
import com.stripe.android.googlepaylauncher.GooglePayLauncher;

import org.jetbrains.annotations.NotNull;

@CapacitorPlugin(name = "Payment")
public class PaymentPlugin extends Plugin {
    private GooglePayLauncher googlePayLauncher;
    private boolean isAvailable;
    private String payCallId;

    @Override
    public void load() {
        MetaData metaData = new MetaData(this::getContext);
        PaymentConfiguration.init(getContext(), metaData.publicKey, metaData.stripeAccount);

        googlePayLauncher = new GooglePayLauncher(
                getActivity(),
                new GooglePayLauncher.Config(metaData.env, metaData.countryCode, metaData.displayName),
                (boolean isReady) -> this.isAvailable = isReady,
                this::onGooglePayResult
        );
    }

    private void onGooglePayResult(@NotNull GooglePayLauncher.Result result) {
        PluginCall call = bridge.getSavedCall(payCallId);
        if (result instanceof GooglePayLauncher.Result.Completed) {
            call.resolve(new JSObject().put("result", GooglePayEvents.Completed.toString()));
        } else if (result instanceof GooglePayLauncher.Result.Canceled) {
            call.resolve(new JSObject().put("result", GooglePayEvents.Cancelled.toString()));
        } else if (result instanceof GooglePayLauncher.Result.Failed) {
            call.resolve(new JSObject().put("result", GooglePayEvents.Failed.toString()));
        }
    }

    @PluginMethod
    public void isGooglePayAvailable(final PluginCall call) {
        if (isAvailable) {
            call.resolve();
            return;
        }
        call.unimplemented("Not implemented on Device.");
    }

    @PluginMethod
    public void handleGooglePay(final PluginCall call) {
        String clientSecret = call.getString("clientSecret");

        if (clientSecret == null) {
            call.reject("Call must provide \"clientSecret\"");
            return;
        }

        payCallId = call.getCallbackId();
        bridge.saveCall(call);
        googlePayLauncher.presentForPaymentIntent(clientSecret);
    }

    @PluginMethod
    public void isAppleInAppPurchaseAvailable(final PluginCall call) {
        call.unavailable("Not implemented on Android");
    }

    @PluginMethod
    public void getAppleInAppPurchaseProducts(final PluginCall call) {
        call.unavailable("Not implemented on Android");
    }

    @PluginMethod
    public void buyAppleInAppPurchase(final PluginCall call) {
        call.unavailable("Not implemented on Android");
    }

    @PluginMethod
    public void restoreAppleInAppPurchase(final PluginCall call) {
        call.unavailable("Not implemented on Android");
    }

    @PluginMethod
    public void getAppleInAppPurchaseReceipt(final PluginCall call) {
        call.unavailable("Not implemented on Android");
    }
}
