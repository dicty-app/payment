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
isApplePayAvailable() => Promise<boolean>
```

**Returns:** <code>Promise&lt;boolean&gt;</code>

--------------------


### handleApplePay(...)

```typescript
handleApplePay(opts: ApplePayOptions) => Promise<void>
```

| Param      | Type                                                        |
| ---------- | ----------------------------------------------------------- |
| **`opts`** | <code><a href="#applepayoptions">ApplePayOptions</a></code> |

--------------------


### isGooglePayAvailable()

```typescript
isGooglePayAvailable() => Promise<boolean>
```

**Returns:** <code>Promise&lt;boolean&gt;</code>

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


#### ApplePayOptions

| Prop                     | Type                |
| ------------------------ | ------------------- |
| **`clientSecret`**       | <code>string</code> |
| **`merchantIdentifier`** | <code>string</code> |
| **`label`**              | <code>string</code> |
| **`description`**        | <code>string</code> |
| **`currency`**           | <code>string</code> |
| **`amount`**             | <code>number</code> |
| **`billingPeriod`**      | <code>number</code> |
| **`managementURL`**      | <code>string</code> |
| **`billingAgreement`**   | <code>string</code> |


#### GooglePayOptions

| Prop                     | Type                |
| ------------------------ | ------------------- |
| **`clientSecret`**       | <code>string</code> |
| **`merchantIdentifier`** | <code>string</code> |
| **`label`**              | <code>string</code> |
| **`description`**        | <code>string</code> |
| **`currency`**           | <code>string</code> |
| **`amount`**             | <code>number</code> |
| **`billingPeriod`**      | <code>number</code> |
| **`managementURL`**      | <code>string</code> |
| **`billingAgreement`**   | <code>string</code> |

</docgen-api>
