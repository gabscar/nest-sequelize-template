export interface IBaseUseCase<I, O> {
  execute(props: I, ...args: unknown[]): Promise<O>;
}
