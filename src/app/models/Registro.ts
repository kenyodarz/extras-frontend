import { Persona } from "./Persona";
import { Proyecto } from "./Proyecto";

export class Registro {
  constructor(
    public id: number=null,
    public fecha: Date = null,
    public hora_entrada: Date = null,
    public hora_salida: Date = null,
    public hora_ordinaria: number = null,
    public recargo_nocturno: number = null,
    public hora_extra: number = null,
    public hora_extra_nocturna: number = null,
    public hora_extra_festiva: number = null,
    public hora_extra_festiva_nocturna: number = null,
    public persona: Array<Persona> = null,
    public proyecto: Array<Proyecto> = null,
    public festivo: boolean = false,
    public salario_con_prestaciones: number = null,
    public salario_sin_prestaciones: number= null
  ) {}
}
