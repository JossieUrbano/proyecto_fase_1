import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {AgendarCita, AgendarCitaRelations, Usuario} from '../models';
import {UsuarioRepository} from './usuario.repository';

export class AgendarCitaRepository extends DefaultCrudRepository<
  AgendarCita,
  typeof AgendarCita.prototype.id,
  AgendarCitaRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof AgendarCita.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(AgendarCita, dataSource);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
