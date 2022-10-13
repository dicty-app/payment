package app.dicty.plugins.stripe;

import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;

import androidx.core.util.Supplier;

import com.getcapacitor.Logger;
import com.stripe.android.googlepaylauncher.GooglePayEnvironment;

public class MetaData {

    public String publicKey;
    public String countryCode;
    public String displayName;
    public String stripeAccount;
    public GooglePayEnvironment env;

    public MetaData(Supplier<Context> contextSupplier) {
        try {
            ApplicationInfo appInfo = contextSupplier.get()
                    .getPackageManager()
                    .getApplicationInfo(contextSupplier.get().getPackageName(), PackageManager.GET_META_DATA);

            publicKey = appInfo.metaData.getString("app.dicty.plugins.stripe.public_key");
            stripeAccount = appInfo.metaData.getString("app.dicty.plugins.stripe.account");
            countryCode = appInfo.metaData.getString("app.dicty.plugins.stripe.merchant_country_code");
            displayName = appInfo.metaData.getString("app.dicty.plugins.stripe.merchant_display_name");
            env = appInfo.metaData.getBoolean("app.dicty.plugins.stripe.debug")
                    ? GooglePayEnvironment.Test
                    : GooglePayEnvironment.Production;

        } catch (Exception ignored) {
            Logger.info("MetaData didn't be prepare fore Google Pay.");
        }
    }
}
