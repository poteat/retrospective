import { ReduceChainType } from "../../types/core/ReduceChainType";
import { RetrospectiveFunction } from "../../types/RetrospectiveFunction";

/**
 * Given a retrospective chain, and optionally the base nullary implementor,
 * return the reduced / curried function.
 *
 * The retrospective chain is resolved in right-to-left order, so that the
 * beginning of the chain corresponds to the highest-level execution. The right-
 * most portion of the chain corresponds to the lowest-level execution, and the
 * rightmost element is the nullary implementor, which does nothing.
 *
 * The purpose of the nullary implementor is to fill an "execution hole", and is
 * the `next` function associated with the otherwise lowest executor function.
 */
export const reduceChain = (<
  ChainTypeBaseParameters extends any[],
  ChainTypeReturnType extends any,
  ChainType extends RetrospectiveFunction<
    (...x: ChainTypeBaseParameters) => ChainTypeReturnType
  >
>(
  chain: readonly ChainType[],
  identity: (...x: ChainTypeBaseParameters) => ChainTypeReturnType
) => (...parameters: ChainTypeBaseParameters) =>
  chain.reduceRight(
    (previousCallback, callback) =>
      (<ChainType extends (...x: any[]) => any>(
        f: (_f: ChainType, ...x: Parameters<ChainType>) => ReturnType<ChainType>
      ) => (_f: ChainType) => (...x: Parameters<ChainType>) => f(_f, ...x))(
        callback
      )(previousCallback),
    identity ?? (<T>(x: T) => x)
  )(...parameters)) as ReduceChainType;
