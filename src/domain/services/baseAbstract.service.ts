export interface IAbstractService<I, O> {
  execute(props: I, ...args: unknown[]): Promise<O>;
}
