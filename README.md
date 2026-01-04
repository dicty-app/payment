# @dicty/payment

Dicty Payment Plugin for Capacitor apps

## Install

```bash
npm install @dicty/payment
npx cap sync
```

## API

<docgen-index>

* [`isAppleInAppPurchaseAvailable()`](#isappleinapppurchaseavailable)
* [`getAppleInAppPurchaseProducts(...)`](#getappleinapppurchaseproducts)
* [`buyAppleInAppPurchase(...)`](#buyappleinapppurchase)
* [`restoreAppleInAppPurchase()`](#restoreappleinapppurchase)
* [`getAppleInAppPurchaseReceipt()`](#getappleinapppurchasereceipt)
* [`isGooglePayAvailable()`](#isgooglepayavailable)
* [`handleGooglePay(...)`](#handlegooglepay)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### isAppleInAppPurchaseAvailable()

```typescript
isAppleInAppPurchaseAvailable() => Promise<void>
```

Check if Apple In-App Purchases are available on this device

--------------------


### getAppleInAppPurchaseProducts(...)

```typescript
getAppleInAppPurchaseProducts(opts: GetAppleInAppPurchaseProductsOptions) => Promise<GetAppleInAppPurchaseProductsResult>
```

Get Apple In-App Purchase products by their identifiers

| Param      | Type                                                                                                  |
| ---------- | ----------------------------------------------------------------------------------------------------- |
| **`opts`** | <code><a href="#getappleinapppurchaseproductsoptions">GetAppleInAppPurchaseProductsOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#getappleinapppurchaseproductsresult">GetAppleInAppPurchaseProductsResult</a>&gt;</code>

--------------------


### buyAppleInAppPurchase(...)

```typescript
buyAppleInAppPurchase(opts: BuyAppleInAppPurchaseOptions) => Promise<BuyAppleInAppPurchaseResult>
```

Purchase an Apple In-App Purchase product

| Param      | Type                                                                                  |
| ---------- | ------------------------------------------------------------------------------------- |
| **`opts`** | <code><a href="#buyappleinapppurchaseoptions">BuyAppleInAppPurchaseOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#buyappleinapppurchaseresult">BuyAppleInAppPurchaseResult</a>&gt;</code>

--------------------


### restoreAppleInAppPurchase()

```typescript
restoreAppleInAppPurchase() => Promise<RestoreAppleInAppPurchaseResult>
```

Restore Apple In-App Purchase transactions

**Returns:** <code>Promise&lt;<a href="#buyappleinapppurchaseresult">BuyAppleInAppPurchaseResult</a>&gt;</code>

--------------------


### getAppleInAppPurchaseReceipt()

```typescript
getAppleInAppPurchaseReceipt() => Promise<GetAppleInAppPurchaseReceiptResult>
```

Get Apple In-App Purchase receipt data

**Returns:** <code>Promise&lt;<a href="#getappleinapppurchasereceiptresult">GetAppleInAppPurchaseReceiptResult</a>&gt;</code>

--------------------


### isGooglePayAvailable()

```typescript
isGooglePayAvailable() => Promise<void>
```

Check if Google Pay is available on this device

--------------------


### handleGooglePay(...)

```typescript
handleGooglePay(opts: GooglePayOptions) => Promise<GooglePayResult>
```

Handle Google Pay payment flow

| Param      | Type                                                          |
| ---------- | ------------------------------------------------------------- |
| **`opts`** | <code><a href="#googlepayoptions">GooglePayOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#googlepayresult">GooglePayResult</a>&gt;</code>

--------------------


### Type Aliases


#### GetAppleInAppPurchaseProductsResult

<code>{ products: AppleInAppPurchaseProduct[]; }</code>


#### AppleInAppPurchaseProduct

<code>{ id: string; title: string; description: string; price: number; localizedPrice: string; subscriptionPeriod?: { value: number; unit: <a href="#applesubscriptionperiodunit">AppleSubscriptionPeriodUnit</a>; }; }</code>


#### AppleSubscriptionPeriodUnit

<code>(typeof <a href="#applesubscriptionperiodunit">AppleSubscriptionPeriodUnit</a>)[keyof typeof AppleSubscriptionPeriodUnit]</code>


#### GetAppleInAppPurchaseProductsOptions

<code>{ id: string[]; }</code>


#### BuyAppleInAppPurchaseResult

<code><a href="#completedappleinapppurchaseresult">CompletedAppleInAppPurchaseResult</a> | <a href="#restoredappleinapppurchaseresult">RestoredAppleInAppPurchaseResult</a> | <a href="#failedappleinapppurchaseresult">FailedAppleInAppPurchaseResult</a> | <a href="#cancelledappleinapppurchaseresult">CancelledAppleInAppPurchaseResult</a></code>


#### CompletedAppleInAppPurchaseResult

<code>{ status: typeof AppleInAppPurchaseStatus.Completed; productIdentifier: string; transactionIdentifier: string; }</code>


#### RestoredAppleInAppPurchaseResult

<code>{ status: typeof AppleInAppPurchaseStatus.Restored; } & <a href="#omit">Omit</a>&lt;<a href="#completedappleinapppurchaseresult">CompletedAppleInAppPurchaseResult</a>, 'status'&gt;</code>


#### Omit

Construct a type with the properties of T except for those in type K.

<code><a href="#pick">Pick</a>&lt;T, <a href="#exclude">Exclude</a>&lt;keyof T, K&gt;&gt;</code>


#### Pick

From T, pick a set of properties whose keys are in the union K

<code>{ [P in K]: T[P]; }</code>


#### Exclude

<a href="#exclude">Exclude</a> from T those types that are assignable to U

<code>T extends U ? never : T</code>


#### FailedAppleInAppPurchaseResult

<code>{ status: typeof AppleInAppPurchaseStatus.Failed; productIdentifier?: string; transactionIdentifier?: string; }</code>


#### CancelledAppleInAppPurchaseResult

<code>{ status: typeof AppleInAppPurchaseStatus.Cancelled; } & <a href="#omit">Omit</a>&lt;<a href="#failedappleinapppurchaseresult">FailedAppleInAppPurchaseResult</a>, 'status'&gt;</code>


#### BuyAppleInAppPurchaseOptions

<code>{ id: string; }</code>


#### RestoreAppleInAppPurchaseResult

<code><a href="#buyappleinapppurchaseresult">BuyAppleInAppPurchaseResult</a></code>


#### GetAppleInAppPurchaseReceiptResult

<code>{ receiptData: string; }</code>


#### GooglePayResult

<code>{ result: <a href="#googlepayresults">GooglePayResults</a>; }</code>


#### GooglePayResults

<code>(typeof <a href="#googlepayresults">GooglePayResults</a>)[keyof typeof GooglePayResults]</code>


#### GooglePayOptions

<code>{ clientSecret: string; }</code>

</docgen-api>
