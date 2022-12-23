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
import {TipoCita} from '../models';
import {TipoCitaRepository} from '../repositories';

export class TipoCitaController {
  constructor(
    @repository(TipoCitaRepository)
    public tipoCitaRepository : TipoCitaRepository,
  ) {}

  @post('/tipo-citas')
  @response(200, {
    description: 'TipoCita model instance',
    content: {'application/json': {schema: getModelSchemaRef(TipoCita)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoCita, {
            title: 'NewTipoCita',
            exclude: ['id'],
          }),
        },
      },
    })
    tipoCita: Omit<TipoCita, 'id'>,
  ): Promise<TipoCita> {
    return this.tipoCitaRepository.create(tipoCita);
  }

  @get('/tipo-citas/count')
  @response(200, {
    description: 'TipoCita model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TipoCita) where?: Where<TipoCita>,
  ): Promise<Count> {
    return this.tipoCitaRepository.count(where);
  }

  @get('/tipo-citas')
  @response(200, {
    description: 'Array of TipoCita model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TipoCita, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TipoCita) filter?: Filter<TipoCita>,
  ): Promise<TipoCita[]> {
    return this.tipoCitaRepository.find(filter);
  }

  @patch('/tipo-citas')
  @response(200, {
    description: 'TipoCita PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoCita, {partial: true}),
        },
      },
    })
    tipoCita: TipoCita,
    @param.where(TipoCita) where?: Where<TipoCita>,
  ): Promise<Count> {
    return this.tipoCitaRepository.updateAll(tipoCita, where);
  }

  @get('/tipo-citas/{id}')
  @response(200, {
    description: 'TipoCita model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TipoCita, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(TipoCita, {exclude: 'where'}) filter?: FilterExcludingWhere<TipoCita>
  ): Promise<TipoCita> {
    return this.tipoCitaRepository.findById(id, filter);
  }

  @patch('/tipo-citas/{id}')
  @response(204, {
    description: 'TipoCita PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoCita, {partial: true}),
        },
      },
    })
    tipoCita: TipoCita,
  ): Promise<void> {
    await this.tipoCitaRepository.updateById(id, tipoCita);
  }

  @put('/tipo-citas/{id}')
  @response(204, {
    description: 'TipoCita PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tipoCita: TipoCita,
  ): Promise<void> {
    await this.tipoCitaRepository.replaceById(id, tipoCita);
  }

  @del('/tipo-citas/{id}')
  @response(204, {
    description: 'TipoCita DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tipoCitaRepository.deleteById(id);
  }
}
