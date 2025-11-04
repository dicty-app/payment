# @dicty/payment

Dicty Payment Plugin for Capacitor apps

## Overview

`@dicty/payment` bridges Capacitor projects to native Apple in-app purchases and Google Pay flows. It ships with TypeScript definitions, a React context provider, and native shims for iOS, Android, and the web fallback.

## Installation

```bash
npm install @dicty/payment
npx cap sync
```

After syncing, open Android Studio/Xcode to let Gradle/CocoaPods refresh native dependencies.

## Usage

```ts
import { Payment } from '@dicty/payment';

const available = await Payment.isAppleInAppPurchaseAvailable();
if (available) {
  const { products } = await Payment.getAppleInAppPurchaseProducts({ id: ['premium_monthly'] });
  await Payment.buyAppleInAppPurchase({ id: products[0].id });
}
```

For React apps, wrap your tree with the provider:

```tsx
import { PaymentPluginProvider } from '@dicty/payment/react';

<PaymentPluginProvider>{children}</PaymentPluginProvider>;
```

## Development

- `npm run build` cleans, regenerates docs, compiles TypeScript, and bundles output via Rollup.
- `npm run verify` runs iOS, Android, and web checks; execute before publishing changes.
- `npm run fmt` formats TypeScript, Java, and Swift sources; `npm run lint` performs the read-only equivalent.

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
* [Enums](#enums)

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


#### GetAppleInAppPurchaseProductsOptions

<code>{ id: string[]; }</code>


#### BuyAppleInAppPurchaseResult

<code><a href="#completedappleinapppurchaseresult">CompletedAppleInAppPurchaseResult</a> | <a href="#restoredappleinapppurchaseresult">RestoredAppleInAppPurchaseResult</a> | <a href="#failedappleinapppurchaseresult">FailedAppleInAppPurchaseResult</a> | <a href="#cancelledappleinapppurchaseresult">CancelledAppleInAppPurchaseResult</a></code>


#### CompletedAppleInAppPurchaseResult

<code>{ status: <a href="#appleinapppurchasestatus">AppleInAppPurchaseStatus.Completed</a>; productIdentifier: string; transactionIdentifier: string; }</code>


#### RestoredAppleInAppPurchaseResult

<code>{ status: <a href="#appleinapppurchasestatus">AppleInAppPurchaseStatus.Restored</a>; } & <a href="#omit">Omit</a>&lt;<a href="#completedappleinapppurchaseresult">CompletedAppleInAppPurchaseResult</a>, 'status'&gt;</code>


#### Omit

Construct a type with the properties of T except for those in type K.

<code><a href="#pick">Pick</a>&lt;T, <a href="#exclude">Exclude</a>&lt;keyof T, K&gt;&gt;</code>


#### Pick

From T, pick a set of properties whose keys are in the union K

<code>{
 [P in K]: T[P];
 }</code>


#### Exclude

<a href="#exclude">Exclude</a> from T those types that are assignable to U

<code>T extends U ? never : T</code>


#### FailedAppleInAppPurchaseResult

<code>{ status: <a href="#appleinapppurchasestatus">AppleInAppPurchaseStatus.Failed</a>; productIdentifier?: string; transactionIdentifier?: string; }</code>


#### CancelledAppleInAppPurchaseResult

<code>{ status: <a href="#appleinapppurchasestatus">AppleInAppPurchaseStatus.Cancelled</a>; } & <a href="#omit">Omit</a>&lt;<a href="#failedappleinapppurchaseresult">FailedAppleInAppPurchaseResult</a>, 'status'&gt;</code>


#### BuyAppleInAppPurchaseOptions

<code>{ id: string; }</code>


#### RestoreAppleInAppPurchaseResult

<code><a href="#buyappleinapppurchaseresult">BuyAppleInAppPurchaseResult</a></code>


#### GetAppleInAppPurchaseReceiptResult

<code>{ receiptData: string; }</code>


#### GooglePayResult

<code>{ result: <a href="#googlepayresults">GooglePayResults</a>; }</code>


#### GooglePayOptions

<code>{ clientSecret: string; }</code>


### Enums


#### AppleSubscriptionPeriodUnit

| Members     | Value          |
| ----------- | -------------- |
| **`Day`**   | <code>0</code> |
| **`Week`**  | <code>1</code> |
| **`Month`** | <code>2</code> |
| **`Year`**  | <code>3</code> |


#### AppleInAppPurchaseStatus

| Members         | Value                    |
| --------------- | ------------------------ |
| **`Completed`** | <code>'completed'</code> |
| **`Restored`**  | <code>'restored'</code>  |
| **`Cancelled`** | <code>'cancelled'</code> |
| **`Failed`**    | <code>'failed'</code>    |


#### GooglePayResults

| Members         | Value                    |
| --------------- | ------------------------ |
| **`Completed`** | <code>'completed'</code> |
| **`Failed`**    | <code>'failed'</code>    |

</docgen-api>
