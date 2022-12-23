import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Agendar, AgendarRelations} from '../models';

export class AgendarRepository extends DefaultCrudRepository<
  Agendar,
  typeof Agendar.prototype.id,
  AgendarRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Agendar, dataSource);
  }
}
