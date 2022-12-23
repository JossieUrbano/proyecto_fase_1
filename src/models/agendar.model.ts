import {Entity, model, property} from '@loopback/repository';

@model()
export class Agendar extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  tipoCita: string;

  @property({
    type: 'string',
    required: true,
  })
  fecha: string;


  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  constructor(data?: Partial<Agendar>) {
    super(data);
  }
}

export interface AgendarRelations {
  // describe navigational properties here
}

export type AgendarWithRelations = Agendar & AgendarRelations;
