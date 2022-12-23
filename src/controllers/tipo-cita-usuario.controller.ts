import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  TipoCita,
  Usuario,
} from '../models';
import {TipoCitaRepository} from '../repositories';

export class TipoCitaUsuarioController {
  constructor(
    @repository(TipoCitaRepository)
    public tipoCitaRepository: TipoCitaRepository,
  ) { }

  @get('/tipo-citas/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to TipoCita',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.string('id') id: typeof TipoCita.prototype.id,
  ): Promise<Usuario> {
    return this.tipoCitaRepository.usuario(id);
  }
}
