export interface AbstractOperator<I, O> {
  run(props: I, ...args: unknown[]): Promise<O>;
}
