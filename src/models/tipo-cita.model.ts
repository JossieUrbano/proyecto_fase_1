import {Entity, model, property} from '@loopback/repository';

@model()
export class TipoCita extends Entity {
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
  tipo: string;

}

export interface TipoCitaRelations {
  // describe navigational properties here
}

export type TipoCitaWithRelations = TipoCita & TipoCitaRelations;
