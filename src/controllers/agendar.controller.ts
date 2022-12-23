import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Agendar} from '../models';
import {AgendarRepository} from '../repositories';

export class AgendarController {
  constructor(
    @repository(AgendarRepository)
    public agendarRepository: AgendarRepository,
  ) { }

  @post('/agendars')
  @response(200, {
    description: 'Agendar model instance',
    content: {'application/json': {schema: getModelSchemaRef(Agendar)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Agendar, {
            title: 'NewAgendar',
            exclude: ['id'],
          }),
        },
      },
    })
    agendar: Omit<Agendar, 'id'>,
  ): Promise<Agendar> {
    return this.agendarRepository.create(agendar);
  }

  @get('/agendars/count')
  @response(200, {
    description: 'Agendar model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Agendar) where?: Where<Agendar>,
  ): Promise<Count> {
    return this.agendarRepository.count(where);
  }

  @get('/agendars')
  @response(200, {
    description: 'Array of Agendar model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Agendar, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Agendar) filter?: Filter<Agendar>,
  ): Promise<Agendar[]> {
    return this.agendarRepository.find(filter);
  }

  @patch('/agendars')
  @response(200, {
    description: 'Agendar PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Agendar, {partial: true}),
        },
      },
    })
    agendar: Agendar,
    @param.where(Agendar) where?: Where<Agendar>,
  ): Promise<Count> {
    return this.agendarRepository.updateAll(agendar, where);
  }

  @get('/agendars/{id}')
  @response(200, {
    description: 'Agendar model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Agendar, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Agendar, {exclude: 'where'}) filter?: FilterExcludingWhere<Agendar>
  ): Promise<Agendar> {
    return this.agendarRepository.findById(id, filter);
  }

  @patch('/agendars/{id}')
  @response(204, {
    description: 'Agendar PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Agendar, {partial: true}),
        },
      },
    })
    agendar: Agendar,
  ): Promise<void> {
    await this.agendarRepository.updateById(id, agendar);
  }

  @put('/agendars/{id}')
  @response(204, {
    description: 'Agendar PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() agendar: Agendar,
  ): Promise<void> {
    await this.agendarRepository.replaceById(id, agendar);
  }

  @del('/agendars/{id}')
  @response(204, {
    description: 'Agendar DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.agendarRepository.deleteById(id);
  }
}
