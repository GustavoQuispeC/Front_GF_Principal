"use client";

import React, { useEffect, useState, ChangeEvent } from "react";
import {
  Input,
  Button,
  Select,
  SelectItem,
  Card,
  CardBody,
  Divider,
  Avatar,
  DatePicker,
} from "@heroui/react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Landmark,
  CreditCard,
  HeartPulse,
  Image as ImageIcon,
  Save,
  ArrowLeft,
} from "lucide-react";

import {
  BancosListar,
  EstadoCivilListar,
  GenerosListar,
  NivelesEducativosListar,
  SistemaPensionesListar,
  TipoDocumentoListar,
  TiposContratoListar,
  TiposJornadaListar,
  TiposParentescoListar,
} from "@/helpers/empleado.helper";
import { IListarCargos } from "@/types/IListarCargos";
import { listarCargos } from "@/helpers/cargo.helper";
import { IRegistarEmpleado } from "@/types/IRegistrarEmpleado";

export default function RegistrarEmpleados() {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<IRegistarEmpleado>({
    nombre: "",
    apellidos: "",
    tipoDocumento: 0, 
    numeroDocumento: "",
    fechaNacimiento: "",
    genero: 0, 
    estadoCivil: 0, 
    nacionalidad: null,
    correo: null,
    telefonoMovil: null,
    direccion: null,
    distrito: null,
    provincia: null,
    departamento: null,
    contactoEmergenciaNombre: null,
    contactoEmergenciaParentesco: 0,
    contactoEmergenciaTelefono: null,
    numeroCuentaBancaria: null,
    bancoNombre: null,
    tipoCuenta: 0,
    cci: null,
    ruc: null,
    numeroESSalud: null,
    sistemaPensiones: 0,
    cuspp: null,
    nivelEducativo: 0,
    profesionOficio: null,
    fotoUrl: null,
    cargoId: 0,
    salario: 0.0,
    tipoContrato: 0,
    tipoJornada: 0,
    fechaIngreso: "",
    observaciones: null,
  });

  const [catalogos, setCatalogos] = useState({
    TiposDocumentos: [] as any[],
    Generos: [] as any[],
    EstadosCiviles: [] as any[],
    TiposCuentaBancaria: [] as any[],
    SistemasPensiones: [] as any[],
    NivelesEducativos: [] as any[],
    TiposParentesco: [] as any[],
    TiposContrato: [] as any[],
    TiposJornada: [] as any[],
  });

  const [cargos, setCargos] = useState<IListarCargos[]>([]);
  //! Cargar catálogos al montar el componente
  useEffect(() => {
    async function cargarCatalogos() {
      try {
        setLoading(true);
        const [
          tiposDocumentos,
          generos,
          estadoCivil,
          tiposCuentaBancaria,
          sistemaPensiones,
          nivelesEducativos,
          tiposParentesco,
          tiposContrato,
          tiposJornada,
        ] = await Promise.all([
          TipoDocumentoListar(),
          GenerosListar(),
          EstadoCivilListar(),
          BancosListar(),
          SistemaPensionesListar(),
          NivelesEducativosListar(),
          TiposParentescoListar(),
          TiposContratoListar(),
          TiposJornadaListar(),
        ]);

        setCatalogos({
          TiposDocumentos: tiposDocumentos || [],
          Generos: generos || [],
          EstadosCiviles: estadoCivil || [],
          TiposCuentaBancaria: tiposCuentaBancaria || [],
          SistemasPensiones: sistemaPensiones || [],
          NivelesEducativos: nivelesEducativos || [],
          TiposParentesco: tiposParentesco || [],
          TiposContrato: tiposContrato || [],
          TiposJornada: tiposJornada || [],
        });
      } catch (error) {
        console.error("Error en la carga masiva de catálogos:", error);
      } finally {
        setLoading(false);
      }
    }
    cargarCatalogos();
  }, []);

  //! Cargar cargos para el select
  useEffect(() => {
    const cargarCargos = async () => {
      try {
        const response = await listarCargos();
        setCargos(response || []);
      } catch (error) {
        console.error("Error al cargar cargos:", error);
      }
    };
    cargarCargos();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "number"
          ? value === ""
            ? 0
            : Number(value)
          : value === ""
            ? null
            : value,
    }));
  };

  //! Función genérica para actualizar campos del formulario
  const setField = (field: keyof IRegistarEmpleado, value: any) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  //! Manejo de imagen con preview
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        // si quieres guardar fotoUrl temporal:
        // setField("fotoUrl", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  //! Manejo de submit
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Payload:", form);
    // aquí llamas tu API POST
  };

  return (
    <form className="max-w-5xl mx-auto p-4 space-y-8" onSubmit={onSubmit}>
      <Card shadow="sm">
        <CardBody className="p-6">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-6 text-blue-900">
            <User size={24} /> Registro de Nuevo Empleado
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Foto */}
            <div className="flex flex-col items-center justify-center space-y-4 border-r pr-6">
              <span className="text-sm font-medium text-default-600">
                Fotografía
              </span>
              <Avatar
                isBordered
                radius="sm"
                src={preview || undefined}
                className="w-32 h-40 text-large"
                fallback={<ImageIcon className="w-10 h-10 text-default-400" />}
              />
              <input
                type="file"
                id="foto-input"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <Button
                as="label"
                htmlFor="foto-input"
                variant="flat"
                size="sm"
                startContent={<ImageIcon size={16} />}
              >
                Subir Foto
              </Button>
            </div>

            {/* DATOS PERSONALES */}
            <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Nombres"
                placeholder="Ej. Juan Carlos"
                variant="bordered"
                name="nombre"
                value={form.nombre}
                onChange={handleInputChange}
              />
              <Input
                label="Apellidos"
                placeholder="Ej. Pérez García"
                variant="bordered"
                name="apellidos"
                value={form.apellidos}
                onChange={handleInputChange}
              />

              <Select
                label="Tipo Documento"
                placeholder="Seleccione"
                isLoading={loading}
                items={catalogos.TiposDocumentos}
                variant="bordered"
                selectedKeys={[String(form.tipoDocumento)]}
                onSelectionChange={(keys) => {
                  const v = Number(Array.from(keys)[0]);
                  setField("tipoDocumento", Number.isFinite(v) ? v : 1);
                }}
              >
                {(item: any) => (
                  <SelectItem key={item.id}>{item.nombre}</SelectItem>
                )}
              </Select>

              <Input
                label="Número Documento"
                placeholder="12345678"
                variant="bordered"
                name="numeroDocumento"
                value={form.numeroDocumento}
                onChange={handleInputChange}
              />

              <DatePicker
                className="w-full"
                label="Fecha Nacimiento"
                variant="bordered"
                onChange={(val: any) => {
                  const iso = val?.toString?.() ?? "";
                  setField("fechaNacimiento", iso);
                }}
              />

              <Select
                label="Género"
                placeholder="Seleccione"
                isLoading={loading}
                items={catalogos.Generos}
                variant="bordered"
                selectedKeys={[String(form.genero)]}
                onSelectionChange={(keys) => {
                  const v = Number(Array.from(keys)[0]);
                  setField("genero", Number.isFinite(v) ? v : 1);
                }}
              >
                {(item: any) => (
                  <SelectItem key={item.id}>{item.nombre}</SelectItem>
                )}
              </Select>

              <Select
                label="Estado Civil"
                placeholder="Seleccione"
                isLoading={loading}
                items={catalogos.EstadosCiviles}
                variant="bordered"
                selectedKeys={[String(form.estadoCivil)]}
                onSelectionChange={(keys) => {
                  const v = Number(Array.from(keys)[0]);
                  setField("estadoCivil", Number.isFinite(v) ? v : 1);
                }}
              >
                {(item: any) => (
                  <SelectItem key={item.id}>{item.nombre}</SelectItem>
                )}
              </Select>
            </div>
          </div>

          <Divider className="my-8" />

          {/* CONTACTO Y UBICACION */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Correo Electrónico"
              type="email"
              placeholder="ejemplo@correo.com"
              variant="bordered"
              startContent={<Mail size={18} />}
              name="correo"
              value={form.correo ?? ""}
              onChange={handleInputChange}
            />
            <Input
              label="Teléfono Móvil"
              placeholder="987654321"
              variant="bordered"
              startContent={<Phone size={18} />}
              name="telefonoMovil"
              value={form.telefonoMovil ?? ""}
              onChange={handleInputChange}
            />
            <Input
              label="Nacionalidad"
              placeholder="Peruana"
              variant="bordered"
              name="nacionalidad"
              value={form.nacionalidad ?? ""}
              onChange={handleInputChange}
            />
            <Input
              label="Dirección"
              placeholder="Av. Principal 123"
              variant="bordered"
              className="md:col-span-2"
              startContent={<MapPin size={18} />}
              name="direccion"
              value={form.direccion ?? ""}
              onChange={handleInputChange}
            />
            <Input
              label="Distrito"
              variant="bordered"
              name="distrito"
              value={form.distrito ?? ""}
              onChange={handleInputChange}
            />
            <Input
              label="Provincia"
              placeholder="Lima"
              variant="bordered"
              name="provincia"
              value={form.provincia ?? ""}
              onChange={handleInputChange}
            />
            <Input
              label="Departamento"
              placeholder="Lima"
              variant="bordered"
              name="departamento"
              value={form.departamento ?? ""}
              onChange={handleInputChange}
            />
          </div>

          <Divider className="my-8" />

          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <Phone size={20} /> Contacto de Emergencia
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Nombre"
              placeholder="Ej. María Pérez"
              variant="bordered"
              name="contactoEmergenciaNombre"
              value={form.contactoEmergenciaNombre ?? ""}
              onChange={handleInputChange}
            />
            <Select
              label="Parentesco"
              placeholder="Seleccione"
              isLoading={loading}
              items={catalogos.TiposParentesco}
              variant="bordered"
              selectedKeys={[String(form.contactoEmergenciaParentesco)]}
              onSelectionChange={(keys) => {
                const v = Number(Array.from(keys)[0]);
                setField(
                  "contactoEmergenciaParentesco",
                  Number.isFinite(v) ? v : 1,
                );
              }}
            >
              {(item: any) => (
                <SelectItem key={item.id}>{item.nombre}</SelectItem>
              )}
            </Select>
            <Input
              label="Teléfono"
              placeholder="999888777"
              variant="bordered"
              name="contactoEmergenciaTelefono"
              value={form.contactoEmergenciaTelefono ?? ""}
              onChange={handleInputChange}
            />
          </div>

          <Divider className="my-8" />

          {/* Información Laboral */}
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <Briefcase size={20} /> Datos Laborales
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Cargo"
              placeholder="Seleccione"
              isLoading={loading}
              items={cargos}
              variant="bordered"
              selectedKeys={[String(form.cargoId)]}
              onSelectionChange={(keys) => {
                const v = Number(Array.from(keys)[0]);
                setField("cargoId", Number.isFinite(v) ? v : 1);
              }}
            >
              {(item: any) => (
                <SelectItem key={item.id}>{item.nombre}</SelectItem>
              )}
            </Select>

            <Input
              label="Salario"
              placeholder="0.00"
              startContent={
                <span className="text-default-400 text-small">S/</span>
              }
              type="number"
              variant="bordered"
              name="salario"
              value={String(form.salario)}
              onChange={handleInputChange}
            />

            <Input
              label="Profesión/Oficio"
              placeholder="Ingeniero de Sistemas"
              variant="bordered"
              name="profesionOficio"
              value={form.profesionOficio ?? ""}
              onChange={handleInputChange}
            />

            <Select
              label="Nivel Educativo"
              placeholder="Seleccione"
              isLoading={loading}
              items={catalogos.NivelesEducativos}
              variant="bordered"
              selectedKeys={[String(form.nivelEducativo)]}
              onSelectionChange={(keys) => {
                const v = Number(Array.from(keys)[0]);
                setField("nivelEducativo", Number.isFinite(v) ? v : 1);
              }}
            >
              {(item: any) => (
                <SelectItem key={item.id}>{item.nombre}</SelectItem>
              )}
            </Select>

            <Select
              label="Tipo Contrato"
              placeholder="Seleccione"
              items={catalogos.TiposContrato}
              variant="bordered"
              selectedKeys={[String(form.tipoContrato)]}
              onSelectionChange={(keys) => {
                const v = Number(Array.from(keys)[0]);
                setField("tipoContrato", Number.isFinite(v) ? v : 1);
              }}
            >
              {(item) => <SelectItem key={item.id}>{item.nombre}</SelectItem>}
            </Select>

            <Select
              label="Tipo Jornada"
              placeholder="Seleccione"
              items={catalogos.TiposJornada}
              variant="bordered"
              selectedKeys={[String(form.tipoJornada)]}
              onSelectionChange={(keys) => {
                const v = Number(Array.from(keys)[0]);
                setField("tipoJornada", Number.isFinite(v) ? v : 1);
              }}
            >
              {(item) => <SelectItem key={item.id}>{item.nombre}</SelectItem>}
            </Select>

            <DatePicker
              className="w-full"
              label="Fecha Ingreso"
              variant="bordered"
              onChange={(val: any) => {
                const iso = val?.toString?.() ?? "";
                setField("fechaIngreso", iso);
              }}
            />

            <Input
              label="RUC (Opcional)"
              variant="bordered"
              name="ruc"
              value={form.ruc ?? ""}
              onChange={handleInputChange}
            />

            <Input
              label="Observaciones"
              variant="bordered"
              name="observaciones"
              value={form.observaciones ?? ""}
              onChange={handleInputChange}
              className="md:col-span-3"
            />
          </div>

          <Divider className="my-8" />

          {/* FINANCIERO Y SEGURO*/}
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <Landmark size={20} /> Financiero y Seguros
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Banco"
              variant="bordered"
              startContent={<CreditCard size={18} />}
              name="bancoNombre"
              value={form.bancoNombre ?? ""}
              onChange={handleInputChange}
            />

            <Select
              label="Tipo de Cuenta"
              placeholder="Seleccione"
              items={catalogos.TiposCuentaBancaria}
              variant="bordered"
              selectedKeys={[String(form.tipoCuenta)]}
              onSelectionChange={(keys) => {
                const v = Number(Array.from(keys)[0]);
                setField("tipoCuenta", Number.isFinite(v) ? v : 1);
              }}
            >
              {(item) => <SelectItem key={item.id}>{item.nombre}</SelectItem>}
            </Select>

            <Input
              label="Número de Cuenta"
              variant="bordered"
              startContent={<CreditCard size={18} />}
              name="numeroCuentaBancaria"
              value={form.numeroCuentaBancaria ?? ""}
              onChange={handleInputChange}
            />

            <Input
              label="CCI"
              variant="bordered"
              name="cci"
              value={form.cci ?? ""}
              onChange={handleInputChange}
            />

            <Select
              label="Sistema de Pensiones"
              placeholder="Seleccione"
              isLoading={loading}
              items={catalogos.SistemasPensiones}
              variant="bordered"
              selectedKeys={[String(form.sistemaPensiones)]}
              onSelectionChange={(keys) => {
                const v = Number(Array.from(keys)[0]);
                setField("sistemaPensiones", Number.isFinite(v) ? v : 1);
              }}
            >
              {(item: any) => (
                <SelectItem key={item.id}>{item.nombre}</SelectItem>
              )}
            </Select>

            <Input
              label="CUSPP-Cod.único de ident. del SPP "
              placeholder="1234567890AB"
              variant="bordered"
              name="cuspp"
              value={form.cuspp ?? ""}
              onChange={handleInputChange}
            />

            <Input
              label="Número ESSalud"
              variant="bordered"
              startContent={<HeartPulse size={18} />}
              name="numeroESSalud"
              value={form.numeroESSalud ?? ""}
              onChange={handleInputChange}
            />
          </div>

        
           <div className="mt-10 flex justify-end gap-3">
            <Button 
              color="default" 
              variant="flat"
              className="min-w-[150px]" // Ancho fijo para ambos
              startContent={<ArrowLeft size={18} />}
            >
              Volver
            </Button>
            <Button
              color="primary"
              className="min-w-[150px]" // Mismo ancho que el botón volver
              startContent={<Save size={18} />}
              type="submit"
            >
              Guardar
            </Button>
          </div>
        </CardBody>
      </Card>
    </form>
  );
}
