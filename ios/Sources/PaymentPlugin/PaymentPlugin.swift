import Foundation
import Capacitor
import PassKit
import StoreKit

@objc(PaymentPlugin)
public class PaymentPlugin: CAPPlugin, CAPBridgedPlugin, SKProductsRequestDelegate {
    public let identifier = "PaymentPlugin"
    public let jsName = "Payment"
    private var delayedCallId: String?
    private var productsRequest: SKProductsRequest?

    public let pluginMethods: [CAPPluginMethod] = [
           CAPPluginMethod(name: "isAppleInAppPurchaseAvailable", returnType: CAPPluginReturnPromise),
           CAPPluginMethod(name: "getAppleInAppPurchaseProducts", returnType: CAPPluginReturnPromise),
           CAPPluginMethod(name: "buyAppleInAppPurchase", returnType: CAPPluginReturnPromise),
           CAPPluginMethod(name: "restoreAppleInAppPurchase", returnType: CAPPluginReturnPromise),
           CAPPluginMethod(name: "getAppleInAppPurchaseReceipt", returnType: CAPPluginReturnPromise),
           CAPPluginMethod(name: "isGooglePayAvailable", returnType: CAPPluginReturnPromise),
           CAPPluginMethod(name: "handleGooglePay", returnType: CAPPluginReturnPromise)
    ]

    override public func load() {
        super.load()
        SKPaymentQueue.default().add(self);
    }

    @objc func isAppleInAppPurchaseAvailable(_ call: CAPPluginCall) {
        if (!SKPaymentQueue.canMakePayments()) {
            print("In App purchased are not available")
            call.reject("Can not use on this Device.")
        }
        print("In App purchased are available")
        call.resolve()
    }

    @objc func getAppleInAppPurchaseProducts(_ call: CAPPluginCall) {
        guard let productIdentifiers = call.options["id"] as? [String], !productIdentifiers.isEmpty else {
            call.reject("Call must provide \"id\" array")
            return
        }

        print("Start loading in app purchase products \(productIdentifiers)")
        // save call for processing
        bridge?.saveCall(call)
        delayedCallId = call.callbackId;

        productsRequest?.cancel()
        productsRequest = SKProductsRequest(productIdentifiers: Set(productIdentifiers))
        productsRequest!.delegate = self
        productsRequest!.start()
    }

    @objc func buyAppleInAppPurchase(_ call: CAPPluginCall) {
        if (!SKPaymentQueue.canMakePayments()) {
            call.reject("Can not use on this Device.")
        }

        guard let productIdentifier = call.options["id"] as? String, !productIdentifier.isEmpty else {
            call.reject("Call must provide \"id\"")
            return
        }

        print("Start buying in app purchase \(productIdentifier)")

        bridge?.saveCall(call)
        delayedCallId = call.callbackId;

        let request = SKMutablePayment();
        request.productIdentifier = productIdentifier;
        SKPaymentQueue.default().add(request);
    }

    @objc func restoreAppleInAppPurchase(_ call: CAPPluginCall) {
        print("Start restoring in app purchases")
        bridge?.saveCall(call)
        delayedCallId = call.callbackId;
        SKPaymentQueue.default().restoreCompletedTransactions()
    }

    @objc func getAppleInAppPurchaseReceipt(_ call: CAPPluginCall) {
        if let appStoreReceiptURL = Bundle.main.appStoreReceiptURL, FileManager.default.fileExists(atPath: appStoreReceiptURL.path) {
            do {
                let receiptData = try Data(contentsOf: appStoreReceiptURL, options: .alwaysMapped)
                print("Retrieved receipt data")
                print(receiptData)
                let receiptString = receiptData.base64EncodedString(options: [])
                call.resolve(["receiptData": receiptString])
                return
            } catch {
                print("Couldn't read receipt data with error: \(error.localizedDescription)")
                call.reject("Couldn't read receipt data")
                return
            }
        }
        call.reject("Couldn't get a valid receipt")
    }

    public func productsRequest(_ request: SKProductsRequest, didReceive response: SKProductsResponse) {

        if let callId = delayedCallId, let call = bridge?.savedCall(withID: callId) {
            delayedCallId = nil
            productsRequest = nil

            if response.products.isEmpty {
                print("No products are available")
                call.reject("No products are available")
                return;
            }

            print("Retrieved products")
            print(response.products)

            var productsData: [Any] = []
            for product in response.products {
                let productData: [String: Any?] = [
                    "id": product.productIdentifier,
                    "title": product.localizedTitle,
                    "description": product.localizedDescription,
                    "price": product.price,
                    "localizedPrice": product.localizedPrice,
                    "subscriptionPeriod": product.subscriptionPeriod !== nil ? [
                        "value": product.subscriptionPeriod?.numberOfUnits ?? nil,
                        "unit": product.subscriptionPeriod?.unit.rawValue ?? nil,
                    ] : nil,
                ];
                productsData.append(productData)
            }

            call.resolve(["products": productsData])
            bridge?.releaseCall(withID: callId)
        }
    }


    @objc func isGooglePayAvailable(_ call: CAPPluginCall) {
        call.unavailable("Not implemented on iOS")
    }

    @objc func handleGooglePay(_ call: CAPPluginCall) {
        call.unavailable("Not implemented on iOS")
    }
}

extension PaymentPlugin: SKPaymentTransactionObserver {
    public func paymentQueue(_ queue: SKPaymentQueue, updatedTransactions transactions: [SKPaymentTransaction]) {
        for transaction in transactions {
            switch transaction.transactionState {
            case .purchased:
                print("Product purchased, \(transaction.payment.productIdentifier), \(String(describing: transaction.transactionIdentifier))")
                resolve(
                        transaction: transaction,
                        status: .Completed,
                        productIdentifier: transaction.payment.productIdentifier,
                        transactionIdentifier: transaction.transactionIdentifier
                )
                return
            case .failed:
                let productIdentifier = transaction.original?.payment.productIdentifier ?? transaction.payment.productIdentifier;
                if let transactionError = transaction.error as NSError? {
                    if (transactionError.code == SKError.paymentCancelled.rawValue) {
                        print("Purchasing cancelled, \(productIdentifier)")
                        resolve(
                                transaction: transaction,
                                status: .Cancelled,
                                productIdentifier: productIdentifier,
                                transactionIdentifier: nil
                        )
                        return
                    }
                    print("Purchasing failed with an error: \(transactionError.code), \(productIdentifier)")
                    print("Transaction error: \(transactionError.localizedDescription)")
                    resolve(
                            transaction: transaction,
                            status: .Failed,
                            productIdentifier: productIdentifier,
                            transactionIdentifier: nil
                    )
                    return;

                }
                print("Purchasing failed - no error, \(productIdentifier)")
                resolve(
                        transaction: transaction,
                        status: .Failed,
                        productIdentifier: productIdentifier,
                        transactionIdentifier: nil
                )
                return
            case .restored:
                guard let productIdentifier = transaction.original?.payment.productIdentifier else {
                    print("Restoring failed - no product identifier")
                    resolve(
                            transaction: transaction,
                            status: .Failed,
                            productIdentifier: nil,
                            transactionIdentifier: nil
                    )
                    return
                }
                print("Product restored, \(productIdentifier), \(String(describing: transaction.transactionIdentifier))")
                resolve(
                        transaction: transaction,
                        status: .Restored,
                        productIdentifier: productIdentifier,
                        transactionIdentifier: transaction.transactionIdentifier
                )
                return
            case .purchasing:
                break
            case .deferred:
                break
            @unknown default:
                print("Unexpected transaction state: \(transaction.transactionState), \(transaction.payment.productIdentifier)")
                break
            }
        }
    }

    private func resolve(transaction: SKPaymentTransaction, status: AppleInAppPurchaseStatus, productIdentifier: String?, transactionIdentifier: String?) {
        if let callId = delayedCallId, let call = bridge?.savedCall(withID: callId) {
            call.resolve([
                "status": status.rawValue,
                "transactionIdentifier": transactionIdentifier,
                "productIdentifier": productIdentifier
            ])
            bridge?.releaseCall(withID: callId)
        }
        SKPaymentQueue.default().finishTransaction(transaction)
        delayedCallId = nil;
    }
}

extension SKProduct {
    private static let formatter: NumberFormatter = {
        let formatter = NumberFormatter()
        formatter.numberStyle = .currency
        return formatter
    }()

    var isFree: Bool {
        price == 0.00
    }

    var localizedPrice: String? {
        guard !isFree else {
            return nil
        }

        let formatter = SKProduct.formatter
        formatter.locale = priceLocale

        return formatter.string(from: price)
    }

}
