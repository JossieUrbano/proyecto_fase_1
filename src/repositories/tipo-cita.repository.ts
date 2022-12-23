import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {TipoCita, TipoCitaRelations, Usuario} from '../models';
import {UsuarioRepository} from './usuario.repository';

export class TipoCitaRepository extends DefaultCrudRepository<
  TipoCita,
  typeof TipoCita.prototype.id,
  TipoCitaRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof TipoCita.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(TipoCita, dataSource);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
