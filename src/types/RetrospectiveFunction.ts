/**
 * Transform a function type 'F' e.g. "(x: number, y: string) => b: boolean" to
 * in this example "(next: F, x: number, y: string) => b: boolean".
 *
 * Essentially, we add an additional prepended parameter which is the type of
 * the input function we started with.
 */
export type RetrospectiveFunction<F extends (...args: any) => any> = (
  next: F,
  ...x: Parameters<F>
) => ReturnType<F>;
