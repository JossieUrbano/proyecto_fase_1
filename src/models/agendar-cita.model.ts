import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Usuario} from './usuario.model';

@model()
export class AgendarCita extends Entity {
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

  @belongsTo(() => Usuario)
  usuarioId: string;

  constructor(data?: Partial<AgendarCita>) {
    super(data);
  }
}

export interface AgendarCitaRelations {
  // describe navigational properties here
}

export type AgendarCitaWithRelations = AgendarCita & AgendarCitaRelations;
