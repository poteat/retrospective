![retrospective](./logo/retrospective.png)

> A chaining library to work with retrospective functions (_aka next-chain-style_) and types.

---

## Installation

```sh
npm i retrospective
```

### Usage

```ts
import reduceChain, { RetrospectiveChain } from "retrospective-chain"

type MyNumberTransformer = (x: number) => number

const chain: RetrospectiveChain<MyNumberTransformer> = [
  (next: MyNumberTransformer, x: number) => next(x) + 1,
  (next: MyNumberTransformer, x: number) => next(x) ** 2
]

const result = reduceChain(chain, x => x)(5) // 26
```

---

## Introduction

A retrospective function is a function which takes another function with an identical signature as itself (sans the parameter under discussion, i.e. the resultant type is non-recursive) as its first parameter:

```ts
export type RetrospectiveFunction<F extends (...args: any) => any> = (
  next: F,
  ...x: Parameters<F>
) => ReturnType<F>;
```

This pattern is useful in situations where you're expecting to perform a homogeneously typed operation on some set of data multiple times, e.g. a series of transformations, point-free code, etc. As well, this pattern works very well with async promises.

Here's an example of how you might use it to perform a set of sequential transformations on a number:

```ts
type MyNumberTransformer = (x: number) => number

const chain: RetrospectiveChain<MyNumberTransformer> = [
  (next: MyNumberTransformer, x: number) => next(x) + 1,
  (next: MyNumberTransformer, x: number) => next(x) ** 2
]
```

The above sequence roughly corresponds to the function `x ** 2 + 1`, but it divides this operation into component pieces.

This abstraction becomes useful for series of complicated, potentially asynchronous actions where you want higher chain elements to potentially preclude lower chain elements (or run them multiple times, catch errors, etc.).

You can bypass the homogeneous type requirement by having each executor operate on a large pre-typed context space, and then collapse individual results at the end. This corresponds to the pipeline pattern.

### Etymology

Next-chain functions are nothing new - but since there are many conflicting
variants, I'm using "retrospective chain" to specifically refer to the variant
with the following attributes:
* is well typed
* is variadic
* operates only on homogeneously typed functions

---

## Execution

Retrospective chains are executed by first using the `reduceChain` utility - you also need to pass in the identity function corresponding to the type transformation you are using. Essentially, this is just the most internally-executed element and does not take in the `next` parameter:

```ts
type MyNumberTransformer = (x: number) => number

const chain: RetrospectiveChain<MyNumberTransformer> = [
  (next: MyNumberTransformer, x: number) => next(x) + 1,
  (next: MyNumberTransformer, x: number) => next(x) ** 2
]

const result = reduceChain(chain, x => x)(5) // 26
```

---

## Trees of Execution

An interesting use-case is whereby individual executor functions call multiple instances of their `next` function: this creates branching trees of execution, where for the case of N executors calling their `next` functions M times, creates N ^ M unique branches.

This pattern is used for e.g. coordinating parallel asynchronous processing, perform graph search, backtracking methods, etc. If each executor layer memoizes itself, this pattern forms the basis of a very robust algorithmic engine.

---

## Contribution

This library is probably rather feature-complete, but feel free to open a PR if there's anything I missed.