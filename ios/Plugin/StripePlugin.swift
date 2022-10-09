import Foundation
import Capacitor
import StripeApplePay
import PassKit

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(StripePlugin)
public class StripePlugin: CAPPlugin, ApplePayContextDelegate {
    private var payCallId: String?
    private var appleClientSecret: String? = ""

    @objc func initialize(_ call: CAPPluginCall) {
        StripeAPI.defaultPublishableKey = call.getString("publicKey")
        STPAPIClient.shared.appInfo = STPAppInfo(name: "@dicty/stripe", partnerId: nil, version: nil, url: nil)
        call.resolve()
    }

    @objc func isApplePayAvailable(_ call: CAPPluginCall) {
        if (!StripeAPI.deviceSupportsApplePay()) {
            call.reject("Can not use on this Device.")
            return
        }

        call.resolve()
    }

    @objc func handleApplePay(_ call: CAPPluginCall) {
        appleClientSecret = call.getString("clientSecret", "")
        let merchantIdentifier = call.getString("merchantIdentifier", "")
        let label = call.getString("label", "")
        let description = call.getString("description", "")
        let countryCode = call.getString("countryCode", "US")
        let currency = call.getString("currency", "USD")
        let amount = call.getDouble("amount", 0)
        let billingPeriod = call.getDouble("billingPeriod", 0)
        let managementURL = call.getString("managementURL", "")
        let billingAgreement = call.getString("billingAgreement", "")

        let request = StripeAPI.paymentRequest(withMerchantIdentifier: merchantIdentifier, country: countryCode, currency: currency)

        let billing = PKRecurringPaymentSummaryItem(label: label, amount: NSDecimalNumber(floatLiteral: amount))
        billing.startDate = Date()
        billing.endDate = Date().addingTimeInterval(billingPeriod)
        billing.intervalUnit = .month

        if #available(iOS 16.0, *) {
            request.recurringPaymentRequest = PKRecurringPaymentRequest(
                    paymentDescription: description,
                    regularBilling: billing,
                    managementURL: URL(string: managementURL)!
            )
            request.recurringPaymentRequest?.billingAgreement = billingAgreement
        } else {
            // Fallback on earlier versions
        }

        request.paymentSummaryItems = [billing]

        if let applePayContext = STPApplePayContext(paymentRequest: request, delegate: self) {
            DispatchQueue.main.async {
                self.bridge?.saveCall(call)
                self.payCallId = call.callbackId;
                applePayContext.presentApplePay()
            }
        } else {
            call.reject("STPApplePayContext is failed")
        }
    }

    @objc func isGooglePay(_ call: CAPPluginCall) {
        call.unavailable("Not implemented on iOS")
    }

    @objc func handleGooglePay(_ call: CAPPluginCall) {
        call.unavailable("Not implemented on iOS")
    }
}


extension StripePlugin {
    public func applePayContext(_ context: STPApplePayContext, didCreatePaymentMethod paymentMethod: StripeAPI.PaymentMethod, paymentInformation: PKPayment, completion: @escaping STPIntentClientSecretCompletionBlock) {
        let clientSecret = appleClientSecret;
        completion(clientSecret, nil);
    }

    public func applePayContext(_ context: STPApplePayContext, didCompleteWith status: STPApplePayContext.PaymentStatus, error: Error?) {
        if let callId = payCallId, let call = bridge?.savedCall(withID: callId) {
            payCallId = nil;
            appleClientSecret = nil;
            switch status {
            case .success:
                call.resolve(["result": ApplePayEvents.Completed.rawValue])
                break
            case .error:
                call.resolve(["result": ApplePayEvents.Failed.rawValue])
                break
            case .userCancellation:
                call.resolve(["result": ApplePayEvents.Canceled.rawValue])
                break
            }
        }
    }
}