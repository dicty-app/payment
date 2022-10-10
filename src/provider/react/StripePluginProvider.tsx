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

    useEffect(() => {
        async function init() {
            await Stripe.initialize(initializeOptions);
            const isApplePayAvailable = await Stripe.isApplePayAvailable();
            const isGooglePayAvailable = await Stripe.isGooglePayAvailable();
            setApplePayAvailableStatus(isApplePayAvailable);
            setGooglePayAvailableStatus(isGooglePayAvailable);
            setPlugin(Stripe);
        }

        init();
    });

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
