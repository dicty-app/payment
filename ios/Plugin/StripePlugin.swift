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
    private var appleClientSecret: String?

    @objc func initialize(_ call: CAPPluginCall) {
        guard let publicKey = call.options["publicKey"] as? String, !publicKey.isEmpty else {
            call.reject("Call must provide \"publicKey\"")
            return
        }
        StripeAPI.defaultPublishableKey = publicKey
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
        guard let appleClientSecret = call.options["clientSecret"] as? String, !appleClientSecret.isEmpty else {
            call.reject("Call must provide \"clientSecret\"")
            return
        }
        guard let merchantIdentifier = call.options["merchantIdentifier"] as? String, !merchantIdentifier.isEmpty else {
            call.reject("Call must provide \"merchantIdentifier\"")
            return
        }
        guard let label = call.options["label"] as? String, !label.isEmpty else {
            call.reject("Call must provide \"label\"")
            return
        }
        guard let countryCode = call.options["countryCode"] as? String, !countryCode.isEmpty else {
            call.reject("Call must provide \"countryCode\"")
            return
        }
        guard let currency = call.options["currency"] as? String, !currency.isEmpty else {
            call.reject("Call must provide \"currency\"")
            return
        }
        guard let amount = call.options["amount"] as? Double, !amount.isLessThanOrEqualTo(0) else {
            call.reject("Call must provide \"amount\"")
            return
        }
        guard let billingPeriod = call.options["billingPeriod"] as? Double, !billingPeriod.isLessThanOrEqualTo(0) else {
            call.reject("Call must provide \"billingPeriod\"")
            return
        }
        guard let description = call.options["description"] as? String, !description.isEmpty else {
            call.reject("Call must provide \"description\"")
            return
        }
        guard let managementURL = call.options["managementURL"] as? String, !managementURL.isEmpty else {
            call.reject("Call must provide \"managementURL\"")
            return
        }
        guard let billingAgreement = call.options["billingAgreement"] as? String, !billingAgreement.isEmpty else {
            call.reject("Call must provide \"billingAgreement\"")
            return
        }

        self.appleClientSecret = appleClientSecret
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

    @objc func isGooglePayAvailable(_ call: CAPPluginCall) {
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
                call.resolve(["result": ApplePayEvents.Cancelled.rawValue])
                break
            }
        }
    }
}