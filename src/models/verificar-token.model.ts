import {Model, model, property} from '@loopback/repository';

@model()
export class VerificarToken extends Model {
  @property({
    type: 'string',
    required: true,
  })
  token: string;


  constructor(data?: Partial<VerificarToken>) {
    super(data);
  }
}

export interface VerificarTokenRelations {
  // describe navigational properties here
}

export type VerificarTokenWithRelations = VerificarToken & VerificarTokenRelations;
