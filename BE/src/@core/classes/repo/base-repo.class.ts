import { Repository, SelectQueryBuilder } from 'typeorm';

export abstract class BaseRepo<T> {
  protected tableName: string;
  constructor(private repo: Repository<T>) {
    this.tableName = repo.metadata.name.toLowerCase();
  }

  protected getByFieldQuery(
    fieldName: string,
    value: any,
  ): SelectQueryBuilder<T> {
    return this.repo
      .createQueryBuilder(this.tableName)
      .where(`${fieldName} = '${value}'`);
  }

  create(data: any): Promise<T> {
    const newData = this.repo.create(data) as T;

    return this.repo.save(newData);
  }

  protected findOneByField(fieldName: string, value: any): Promise<T> {
    return this.getByFieldQuery(fieldName, value).getRawOne();
  }

  protected findManyByField(fieldName: string, value: any): Promise<T[]> {
    return this.getByFieldQuery(fieldName, value).getRawMany();
  }

  getAll(): Promise<T[]> {
    return this.repo.createQueryBuilder().select('*').getRawMany();
  }
}
