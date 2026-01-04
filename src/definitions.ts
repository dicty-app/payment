export interface PaymentPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
