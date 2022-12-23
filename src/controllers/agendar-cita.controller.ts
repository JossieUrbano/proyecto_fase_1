import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {AgendarCita} from '../models';
import {AgendarCitaRepository} from '../repositories';

export class AgendarCitaController {
  constructor(
    @repository(AgendarCitaRepository)
    public agendarCitaRepository : AgendarCitaRepository,
  ) {}

  @post('/agendar-citas')
  @response(200, {
    description: 'AgendarCita model instance',
    content: {'application/json': {schema: getModelSchemaRef(AgendarCita)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AgendarCita, {
            title: 'NewAgendarCita',
            exclude: ['id'],
          }),
        },
      },
    })
    agendarCita: Omit<AgendarCita, 'id'>,
  ): Promise<AgendarCita> {
    return this.agendarCitaRepository.create(agendarCita);
  }

  @get('/agendar-citas/count')
  @response(200, {
    description: 'AgendarCita model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(AgendarCita) where?: Where<AgendarCita>,
  ): Promise<Count> {
    return this.agendarCitaRepository.count(where);
  }

  @get('/agendar-citas')
  @response(200, {
    description: 'Array of AgendarCita model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AgendarCita, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(AgendarCita) filter?: Filter<AgendarCita>,
  ): Promise<AgendarCita[]> {
    return this.agendarCitaRepository.find(filter);
  }

  @patch('/agendar-citas')
  @response(200, {
    description: 'AgendarCita PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AgendarCita, {partial: true}),
        },
      },
    })
    agendarCita: AgendarCita,
    @param.where(AgendarCita) where?: Where<AgendarCita>,
  ): Promise<Count> {
    return this.agendarCitaRepository.updateAll(agendarCita, where);
  }

  @get('/agendar-citas/{id}')
  @response(200, {
    description: 'AgendarCita model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AgendarCita, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(AgendarCita, {exclude: 'where'}) filter?: FilterExcludingWhere<AgendarCita>
  ): Promise<AgendarCita> {
    return this.agendarCitaRepository.findById(id, filter);
  }

  @patch('/agendar-citas/{id}')
  @response(204, {
    description: 'AgendarCita PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AgendarCita, {partial: true}),
        },
      },
    })
    agendarCita: AgendarCita,
  ): Promise<void> {
    await this.agendarCitaRepository.updateById(id, agendarCita);
  }

  @put('/agendar-citas/{id}')
  @response(204, {
    description: 'AgendarCita PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() agendarCita: AgendarCita,
  ): Promise<void> {
    await this.agendarCitaRepository.replaceById(id, agendarCita);
  }

  @del('/agendar-citas/{id}')
  @response(204, {
    description: 'AgendarCita DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.agendarCitaRepository.deleteById(id);
  }
}
