export interface IEmpleadosListar {
  id: string;
  nombreCompleto: string;
  nombre: string;
  apellidos: string;
  tipoDocumento: string;
  numeroDocumento: string;
  fechaNacimiento: Date;
  edad: number;
  genero: string;
  estadoCivil: string;
  correo: string;
  telefonoMovil: string;
  direccion: string;
  fotoUrl: null;
  codigoEmpleado: string;
  cargoActual: string;
  salarioActual: number;
  fechaIngresoActual: Date;
  tipoContrato: string;
  tipoJornada: string;
  isActive: boolean;
  createdAt: Date;
}

export interface ITipoDocumentoListar {
  id: number;
  nombre: string;
}
