# @dicty/stripe

Dicty Stripe plugin

## Install

```bash
npm install @dicty/stripe
npx cap sync
```

## API

<docgen-index>

* [`initialize(...)`](#initialize)
* [`isApplePayAvailable()`](#isapplepayavailable)
* [`handleApplePay(...)`](#handleapplepay)
* [`isGooglePayAvailable()`](#isgooglepayavailable)
* [`handleGooglePay(...)`](#handlegooglepay)
* [Interfaces](#interfaces)
* [Enums](#enums)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### initialize(...)

```typescript
initialize(opts: InitializeOptions) => Promise<void>
```

| Param      | Type                                                            |
| ---------- | --------------------------------------------------------------- |
| **`opts`** | <code><a href="#initializeoptions">InitializeOptions</a></code> |

--------------------


### isApplePayAvailable()

```typescript
isApplePayAvailable() => Promise<void>
```

--------------------


### handleApplePay(...)

```typescript
handleApplePay(opts: ApplePayOptions) => Promise<ApplePayResult>
```

| Param      | Type                                                        |
| ---------- | ----------------------------------------------------------- |
| **`opts`** | <code><a href="#applepayoptions">ApplePayOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#applepayresult">ApplePayResult</a>&gt;</code>

--------------------


### isGooglePayAvailable()

```typescript
isGooglePayAvailable() => Promise<void>
```

--------------------


### handleGooglePay(...)

```typescript
handleGooglePay(opts: GooglePayOptions) => Promise<void>
```

| Param      | Type                                                          |
| ---------- | ------------------------------------------------------------- |
| **`opts`** | <code><a href="#googlepayoptions">GooglePayOptions</a></code> |

--------------------


### Interfaces


#### InitializeOptions

| Prop            | Type                |
| --------------- | ------------------- |
| **`publicKey`** | <code>string</code> |


#### ApplePayResult

| Prop         | Type                                                        |
| ------------ | ----------------------------------------------------------- |
| **`result`** | <code><a href="#applepayresults">ApplePayResults</a></code> |


#### ApplePayOptions

| Prop                     | Type                | Description       |
| ------------------------ | ------------------- | ----------------- |
| **`clientSecret`**       | <code>string</code> |                   |
| **`merchantIdentifier`** | <code>string</code> |                   |
| **`label`**              | <code>string</code> |                   |
| **`currency`**           | <code>string</code> |                   |
| **`amount`**             | <code>number</code> |                   |
| **`billingPeriod`**      | <code>number</code> |                   |
| **`description`**        | <code>string</code> | not supported yet |
| **`managementURL`**      | <code>string</code> | not supported yet |
| **`billingAgreement`**   | <code>string</code> | not supported yet |


#### GooglePayOptions

| Prop                     | Type                |
| ------------------------ | ------------------- |
| **`clientSecret`**       | <code>string</code> |
| **`merchantIdentifier`** | <code>string</code> |
| **`label`**              | <code>string</code> |
| **`currency`**           | <code>string</code> |
| **`amount`**             | <code>number</code> |
| **`billingPeriod`**      | <code>number</code> |


### Enums


#### ApplePayResults

| Members         | Value                    |
| --------------- | ------------------------ |
| **`Completed`** | <code>'completed'</code> |
| **`Canceled`**  | <code>'canceled'</code>  |
| **`Failed`**    | <code>'failed'</code>    |

</docgen-api>
