import type { FC, PropsWithChildren, ReactNode } from 'react';
import React, { createContext, useContext, useEffect, useState } from 'react';

import type { InitializeOptions, StripePlugin, StripePluginContext as StripePluginContextType } from '../../definitions';
import { Stripe } from '../../index';

const StripePluginContext = createContext<StripePluginContextType>({
    plugin: undefined as any,
    isApplePayAvailable: false,
    isGooglePayAvailable: false,
});

export const useStripePlugin = (): StripePluginContextType => {
    return useContext(StripePluginContext);
};

export type StripePluginProviderType = PropsWithChildren<
    InitializeOptions & {
        fallback?: ReactNode;
    }
>;

export const StripePluginProvider: FC<StripePluginProviderType> = ({ fallback, children, ...initializeOptions }) => {
    const [isApplePayAvailable, setApplePayAvailableStatus] = useState(false);
    const [isGooglePayAvailable, setGooglePayAvailableStatus] = useState(false);
    const [plugin, setPlugin] = useState<StripePlugin>();
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        async function initialize() {
            await Stripe.initialize(initializeOptions);
            let applePayAvailable = false;
            let googlePayAvailable = false;
            try {
                await Stripe.isApplePayAvailable();
                applePayAvailable = true;
            } catch (e) {
                applePayAvailable = false;
            }
            try {
                await Stripe.isGooglePayAvailable();
                googlePayAvailable = true;
            } catch (e) {
                googlePayAvailable = false;
            }
            setApplePayAvailableStatus(applePayAvailable);
            setGooglePayAvailableStatus(googlePayAvailable);
            setPlugin(Stripe);
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
        <StripePluginContext.Provider
            value={{
                plugin,
                isGooglePayAvailable,
                isApplePayAvailable,
            }}
        >
            {children}
        </StripePluginContext.Provider>
    );
};
