import { repeat, times } from "lodash";

// F1 extends GenericHeterogeneousRetrospectiveFunction<F2>,
// F2 extends GenericHeterogeneousRetrospectiveFunction<F3>,
// F3 extends GenericRetrospectiveFunction
// >(
// chain: readonly [F1, F2, F3],
// identity?: ReturnType<Parameters<F3>[0]> extends void
//   ? never
//   : Parameters<F3>[0]
// ): Parameters<F3>[0];
//
// <
// F1 extends GenericRetrospectiveFunction,
// F2 extends GenericRetrospectiveFunction,
// F3 extends GenericRetrospectiveFunction
// >(
// chain: readonly [F1, F2, F3],
// identity?: any
// ): TypeErrorMetaLiterals["typeMismatch"];

export function generateHetergeneousTypeLine(ws: number, n: number) {
  const spaces = repeat(" ", ws);
  return `${spaces}F${
    n + 1
  } extends GenericHeterogeneousRetrospectiveFunction<F${n + 2}>`;
}

export function generateRetrospectiveTypeLine(ws: number, n: number) {
  const spaces = repeat(" ", ws);
  return `${spaces}F${n + 1} extends GenericRetrospectiveFunction`;
}

export function generateHeaderType(ws: number, n: number) {
  return `<
${times(n, (i) =>
  i === n - 1
    ? generateRetrospectiveTypeLine(ws, i)
    : generateHetergeneousTypeLine(ws, i)
).join(",\n")}
>(`;
}

export function generateChainLine(ws: number, n: number) {
  const spaces = repeat(" ", ws);
  return `${spaces}chain: readonly [${times(n, (i) => `F${i + 1}`).join(
    ", "
  )}],`;
}

export function generateIdentityAndParametersLine(ws: number, n: number) {
  const spaces = repeat(" ", ws);
  return `${spaces}identity?: ReturnType<Parameters<F${n}>[0]> extends void
${spaces}? never
${spaces}: Parameters<F${n}>[0]
): Parameters<F${n}>[0];
`;
}

export function generateErrorRetrospectiveCatcher(ws: number, n: number) {
  return `<
${times(n, (i) => generateRetrospectiveTypeLine(ws, i)).join(",\n")}
>(`;
}

export function generateTypeMismatchThrower(ws: number, n: number) {
  const spaces = repeat(" ", ws);
  return `${spaces}identity?: any
): TypeErrorMetaLiterals["typeMismatch"];`;
}

export function generateTypeOverloads(ws: number, n: number) {
  return [
    generateHeaderType,
    generateChainLine,
    generateIdentityAndParametersLine,
    generateErrorRetrospectiveCatcher,
    generateChainLine,
    generateTypeMismatchThrower,
  ]
    .map((x) => x(ws, n))
    .join("\n");
}

export function generateSpecialCases() {
  return `\n<F1 extends GenericRetrospectiveFunction>(
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
    : TypeErrorMetaLiterals["needIdentityFunction"]
): Parameters<ChainType[number]>[0];

<ChainType extends GenericRetrospectiveChain>(
  chain: ChainType,
  identity: ReturnType<Parameters<ChainType[number]>[0]> extends void
    ? never
    : Parameters<ChainType[number]>[0]
): typeof identity;`;
}

export function generateAllTypeOverloadsUntil(ws: number, n: number) {
  return [
    ...times(n - 1, (i) => generateTypeOverloads(ws, i + 2)).reverse(),
    generateSpecialCases(),
  ].join("\n");
}

console.log(generateAllTypeOverloadsUntil(2, 7));
