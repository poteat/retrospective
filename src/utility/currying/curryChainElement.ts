/**
 * Curry the retrospective function such that it takes in first the next
 * executor, and then the parameters associated with the base function type.
 *
 * @param f Retrospective function to be curried.
 */
export const curryChainElement = <ChainType extends (...x: any[]) => any>(
  f: (_f: ChainType, ...x: Parameters<ChainType>) => ReturnType<ChainType>
) => (_f: ChainType) => (...x: Parameters<ChainType>) => f(_f, ...x);
