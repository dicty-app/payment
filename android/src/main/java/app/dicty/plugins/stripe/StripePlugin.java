package app.dicty.plugins.stripe;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.stripe.android.PaymentConfiguration;
import com.stripe.android.googlepaylauncher.GooglePayLauncher;

import org.jetbrains.annotations.NotNull;

@CapacitorPlugin(name = "Stripe")
public class StripePlugin extends Plugin {
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

    @PluginMethod
    public void initialize(final PluginCall call) {
        call.resolve();
    }

    private void onGooglePayResult(@NotNull GooglePayLauncher.Result result) {
        PluginCall call = bridge.getSavedCall(payCallId);
        payCallId = null;
        if (result instanceof GooglePayLauncher.Result.Completed) {
            // Payment succeeded, show a receipt view
            call.resolve(new JSObject().put("result", GooglePayEvents.Completed.getWebEventName()));
        } else if (result instanceof GooglePayLauncher.Result.Canceled) {
            call.resolve(new JSObject().put("result", GooglePayEvents.Cancelled.getWebEventName()));
        } else if (result instanceof GooglePayLauncher.Result.Failed) {
            call.resolve(new JSObject().put("result", GooglePayEvents.Failed.getWebEventName()));
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
        call.resolve();
    }

    @PluginMethod
    public void isApplePayAvailable(final PluginCall call) {
        call.unavailable("Not implemented on Android");
    }

    @PluginMethod
    public void handleApplePay(final PluginCall call) {
        call.unavailable("Not implemented on Android");
    }
}
