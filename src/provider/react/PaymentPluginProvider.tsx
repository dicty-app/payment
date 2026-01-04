import type { FC, PropsWithChildren, ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

import type { PaymentPlugin, PaymentPluginContext as PaymentPluginContextType } from '../../definitions';
import { Payment } from '../../index';

const PaymentPluginContext = createContext<PaymentPluginContextType>({
  plugin: undefined as any,
  isAppleInAppPurchaseAvailable: false,
  isGooglePayAvailable: false,
});

export const usePaymentPlugin = (): PaymentPluginContextType => {
  return useContext(PaymentPluginContext);
};

export type PaymentPluginProviderType = PropsWithChildren<{
  fallback?: ReactNode;
}>;

export const PaymentPluginProvider: FC<PaymentPluginProviderType> = ({ fallback, children }) => {
  const [isAppleInAppPurchaseAvailable, setAppleInAppPurchaseAvailable] = useState<boolean>(false);
  const [isGooglePayAvailable, setGooglePayAvailableStatus] = useState<boolean>(false);
  const [plugin, setPlugin] = useState<PaymentPlugin>();
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    async function initialize() {
      let appleInAppPurchasesAvailable;
      let googlePayAvailable;
      try {
        await Payment.isAppleInAppPurchaseAvailable();
        appleInAppPurchasesAvailable = true;
      } catch (e) {
        appleInAppPurchasesAvailable = false;
      }
      try {
        await Payment.isGooglePayAvailable();
        googlePayAvailable = true;
      } catch (e) {
        googlePayAvailable = false;
      }
      setAppleInAppPurchaseAvailable(appleInAppPurchasesAvailable);
      setGooglePayAvailableStatus(googlePayAvailable);
      setPlugin(Payment);
    }
    if (!initialized) {
      setInitialized(true);
      initialize();
    }
  }, [initialized]);

  if (!plugin) {
    return <>{fallback}</>;
  }
  return (
    <PaymentPluginContext.Provider
      value={{
        plugin,
        isGooglePayAvailable,
        isAppleInAppPurchaseAvailable,
      }}
    >
      {children}
    </PaymentPluginContext.Provider>
  );
};
