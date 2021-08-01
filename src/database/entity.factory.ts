export interface EntityFactory<TEntity> {
  create(...args: any): TEntity | Promise<TEntity>;
}
