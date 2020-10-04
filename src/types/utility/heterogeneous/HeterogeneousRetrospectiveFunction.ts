import { L } from "ts-toolbelt";

import { RetrospectiveFunction } from "../../RetrospectiveFunction";

export type HeterogeneousRetrospectiveFunction<
  F extends (...args: any) => any,
  PF extends RetrospectiveFunction<(...args: any) => any>
> = (
  next: (...x: L.Tail<Parameters<PF>>) => ReturnType<PF>,
  ...x: Parameters<F>
) => ReturnType<F>;
