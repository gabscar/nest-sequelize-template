export class PrismaUtils {
  static convertCountArgsToFindManyArgs<C extends { select?: any }, T>(
    countArgs: C,
    extraArgs?: Partial<T>,
  ): T {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { select, ...findManyArgs } = countArgs;

    return {
      ...findManyArgs,
      ...extraArgs,
    } as T;
  }

  static connectOrDisconnetHelper(data: string) {
    if (data === undefined) return undefined;

    return data === null
      ? { disconnect: true }
      : {
          connect: { id: data },
        };
  }

  static defaultAutoindexInclude(includeParentIndex?: boolean) {
    return includeParentIndex
      ? {
          where: {
            parentIndex: null,
            deletedAt: null,
          },
          include: {
            subIndexes: { where: { deletedAt: null } },
          },
        }
      : false;
  }
}
