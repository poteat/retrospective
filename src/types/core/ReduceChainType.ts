import { GenericFunction } from "../generic/function/GenericFunction";
import { GenericHeterogeneousRetrospectiveFunction } from "../generic/heterogeneous/GenericHeterogeneousRetrospectiveFunction";
import { GenericRetrospectiveChain } from "../generic/retrospective/chain/GenericRetrospectiveChain";
import { GenericRetrospectiveFunction } from "../generic/retrospective/GenericRetrospectiveFunction";
import { TypeErrorMetaLiterals } from "../safety/TypeErrorMetaLiterals";

export interface ReduceChainType {
  <
    F1 extends GenericHeterogeneousRetrospectiveFunction<F2>,
    F2 extends GenericHeterogeneousRetrospectiveFunction<F3>,
    F3 extends GenericHeterogeneousRetrospectiveFunction<F4>,
    F4 extends GenericHeterogeneousRetrospectiveFunction<F5>,
    F5 extends GenericHeterogeneousRetrospectiveFunction<F6>,
    F6 extends GenericHeterogeneousRetrospectiveFunction<F7>,
    F7 extends GenericRetrospectiveFunction
  >(
    chain: readonly [F1, F2, F3, F4, F5, F6, F7],
    identity?: ReturnType<Parameters<F7>[0]> extends void
      ? never
      : Parameters<F7>[0]
  ): Parameters<F7>[0];

  <
    F1 extends GenericRetrospectiveFunction,
    F2 extends GenericRetrospectiveFunction,
    F3 extends GenericRetrospectiveFunction,
    F4 extends GenericRetrospectiveFunction,
    F5 extends GenericRetrospectiveFunction,
    F6 extends GenericRetrospectiveFunction,
    F7 extends GenericRetrospectiveFunction
  >(
    chain: readonly [F1, F2, F3, F4, F5, F6, F7],
    identity?: any
  ): TypeErrorMetaLiterals["typeMismatch"];
  <
    F1 extends GenericHeterogeneousRetrospectiveFunction<F2>,
    F2 extends GenericHeterogeneousRetrospectiveFunction<F3>,
    F3 extends GenericHeterogeneousRetrospectiveFunction<F4>,
    F4 extends GenericHeterogeneousRetrospectiveFunction<F5>,
    F5 extends GenericHeterogeneousRetrospectiveFunction<F6>,
    F6 extends GenericRetrospectiveFunction
  >(
    chain: readonly [F1, F2, F3, F4, F5, F6],
    identity?: ReturnType<Parameters<F6>[0]> extends void
      ? never
      : Parameters<F6>[0]
  ): Parameters<F6>[0];

  <
    F1 extends GenericRetrospectiveFunction,
    F2 extends GenericRetrospectiveFunction,
    F3 extends GenericRetrospectiveFunction,
    F4 extends GenericRetrospectiveFunction,
    F5 extends GenericRetrospectiveFunction,
    F6 extends GenericRetrospectiveFunction
  >(
    chain: readonly [F1, F2, F3, F4, F5, F6],
    identity?: any
  ): TypeErrorMetaLiterals["typeMismatch"];
  <
    F1 extends GenericHeterogeneousRetrospectiveFunction<F2>,
    F2 extends GenericHeterogeneousRetrospectiveFunction<F3>,
    F3 extends GenericHeterogeneousRetrospectiveFunction<F4>,
    F4 extends GenericHeterogeneousRetrospectiveFunction<F5>,
    F5 extends GenericRetrospectiveFunction
  >(
    chain: readonly [F1, F2, F3, F4, F5],
    identity?: ReturnType<Parameters<F5>[0]> extends void
      ? never
      : Parameters<F5>[0]
  ): Parameters<F5>[0];

  <
    F1 extends GenericRetrospectiveFunction,
    F2 extends GenericRetrospectiveFunction,
    F3 extends GenericRetrospectiveFunction,
    F4 extends GenericRetrospectiveFunction,
    F5 extends GenericRetrospectiveFunction
  >(
    chain: readonly [F1, F2, F3, F4, F5],
    identity?: any
  ): TypeErrorMetaLiterals["typeMismatch"];
  <
    F1 extends GenericHeterogeneousRetrospectiveFunction<F2>,
    F2 extends GenericHeterogeneousRetrospectiveFunction<F3>,
    F3 extends GenericHeterogeneousRetrospectiveFunction<F4>,
    F4 extends GenericRetrospectiveFunction
  >(
    chain: readonly [F1, F2, F3, F4],
    identity?: ReturnType<Parameters<F4>[0]> extends void
      ? never
      : Parameters<F4>[0]
  ): Parameters<F4>[0];

  <
    F1 extends GenericRetrospectiveFunction,
    F2 extends GenericRetrospectiveFunction,
    F3 extends GenericRetrospectiveFunction,
    F4 extends GenericRetrospectiveFunction
  >(
    chain: readonly [F1, F2, F3, F4],
    identity?: any
  ): TypeErrorMetaLiterals["typeMismatch"];
  <
    F1 extends GenericHeterogeneousRetrospectiveFunction<F2>,
    F2 extends GenericHeterogeneousRetrospectiveFunction<F3>,
    F3 extends GenericRetrospectiveFunction
  >(
    chain: readonly [F1, F2, F3],
    identity?: ReturnType<Parameters<F3>[0]> extends void
      ? never
      : Parameters<F3>[0]
  ): Parameters<F3>[0];

  <
    F1 extends GenericRetrospectiveFunction,
    F2 extends GenericRetrospectiveFunction,
    F3 extends GenericRetrospectiveFunction
  >(
    chain: readonly [F1, F2, F3],
    identity?: any
  ): TypeErrorMetaLiterals["typeMismatch"];
  <
    F1 extends GenericHeterogeneousRetrospectiveFunction<F2>,
    F2 extends GenericRetrospectiveFunction
  >(
    chain: readonly [F1, F2],
    identity?: ReturnType<Parameters<F2>[0]> extends void
      ? never
      : Parameters<F2>[0]
  ): Parameters<F2>[0];

  <
    F1 extends GenericRetrospectiveFunction,
    F2 extends GenericRetrospectiveFunction
  >(
    chain: readonly [F1, F2],
    identity?: any
  ): TypeErrorMetaLiterals["typeMismatch"];

  <F1 extends GenericRetrospectiveFunction>(
    chain: readonly [F1],
    identity: ReturnType<Parameters<F1>[0]> extends void
      ? never
      : Parameters<F1>[0]
  ): typeof identity;

  <ChainType extends readonly [], IdentityType extends GenericFunction>(
    chain: ChainType,
    identity: IdentityType
  ): typeof identity;

  <ChainType extends GenericRetrospectiveChain>(
    chain: Parameters<Parameters<ChainType[number]>[0]>[0] extends ReturnType<
      Parameters<ChainType[number]>[0]
    >
      ? ChainType
      : ReturnType<
      Parameters<ChainType[number]>[0]
    > extends void ? ChainType : TypeErrorMetaLiterals["needIdentityFunction"]
  ): Parameters<ChainType[number]>[0];

  <ChainType extends GenericRetrospectiveChain>(
    chain: ChainType,
    identity: Parameters<ChainType[number]>[0]
  ): typeof identity;
}
