import { WebPlugin } from '@capacitor/core';

import type { PaymentPlugin } from './definitions';

export class PaymentWeb extends WebPlugin implements PaymentPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
