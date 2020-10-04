import { HeterogeneousRetrospectiveFunction } from "../../utility/heterogeneous/HeterogeneousRetrospectiveFunction";
import { GenericFunction } from "../function/GenericFunction";
import { GenericRetrospectiveFunction } from "../retrospective/GenericRetrospectiveFunction";

export type GenericHeterogeneousRetrospectiveFunction<
  FN extends GenericRetrospectiveFunction
> = HeterogeneousRetrospectiveFunction<GenericFunction, FN>;
