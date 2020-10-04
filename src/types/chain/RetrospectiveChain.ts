import { RetrospectiveFunction } from "../RetrospectiveFunction";

export type RetrospectiveChain<
  F extends (...args: any) => any
> = RetrospectiveFunction<F>[];
