import { RetrospectiveChain } from "../../../src";
import { reduceChain } from "../../../src/utility/reduction/reduceChain";

type NumberTransform = (x: number) => number;
type VoidTransform = (s: string) => void;

describe("basic arithmetic cases", () => {
  it("empty tuple with identity is just identity", () => {
    const chain: RetrospectiveChain<NumberTransform> = [];
    const reduced = reduceChain(chain, (x) => x);

    expect(reduced(100)).toStrictEqual(100);
  });

  it("can do single-element arithmetic", () => {
    const chain: RetrospectiveChain<NumberTransform> = [(_next, x) => x + 4];
    const reduced = reduceChain(chain, (x) => x);

    expect(reduced(1)).toStrictEqual(5);
  });

  it("can do multi-element arithmetic", () => {
    const chain: RetrospectiveChain<NumberTransform> = [
      (next, x) => next(x) + 4,
      (next, x) => next(x) ** 2,
    ];
    const reduced = reduceChain(chain);

    expect(reduced(5)).toStrictEqual(29);
  });

  it("can do tree arithmetic", () => {
    const chain: RetrospectiveChain<NumberTransform> = [
      (next, x) => next(x) + next(x),
      (next, x) => next(x) * next(x),
    ];
    const reduced = reduceChain(chain);

    expect(reduced(5)).toStrictEqual(50);
  });
});

describe("void cases", () => {
  it("can handle void return", () => {
    const chain: RetrospectiveChain<VoidTransform> = []
    const reduced = reduceChain(chain, () => {})

    expect(reduced("foob")).toBe(undefined)
  })
})