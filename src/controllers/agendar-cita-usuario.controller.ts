import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  AgendarCita,
  Usuario,
} from '../models';
import {AgendarCitaRepository} from '../repositories';

export class AgendarCitaUsuarioController {
  constructor(
    @repository(AgendarCitaRepository)
    public agendarCitaRepository: AgendarCitaRepository,
  ) { }

  @get('/agendar-citas/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to AgendarCita',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.string('id') id: typeof AgendarCita.prototype.id,
  ): Promise<Usuario> {
    return this.agendarCitaRepository.usuario(id);
  }
}
