import { RetrospectiveFunction } from "../RetrospectiveFunction";

export type RetrospectiveChain<
  F extends (...args: any) => any
> = readonly RetrospectiveFunction<F>[];
