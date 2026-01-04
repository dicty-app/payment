import { registerPlugin } from '@capacitor/core';

import type { PaymentPlugin } from './definitions';

const Payment = registerPlugin<PaymentPlugin>('Payment', {
  web: () => import('./web').then((m) => new m.PaymentWeb()),
});

export * from './definitions';
export { Payment };
