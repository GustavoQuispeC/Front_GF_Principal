"use client";

import React, { useState, ChangeEvent } from "react";
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
  Progress,
  NumberInput,
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

import { IRegistarEmpleado } from "@/types/IRegistrarEmpleado";
import { useUbigeo } from "@/hooks/useUbigeo";
import { useCatalogos } from "@/hooks/useCatalogos";
import { useCargos } from "@/hooks/useCargos";

import { registrarEmpleado } from "@/helpers/empleado.helper";
import { useFirebaseStorage } from "@/hooks/useFirebaseStorage";

interface RegistrarEmpleadosProps {
  onBack?: () => void; // Función opcional para manejar el regreso al listado
}


export default function RegistrarEmpleados({ onBack }: RegistrarEmpleadosProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // 👈 guardamos el File

  const { ubigeoData, loadingUbigeo } = useUbigeo();
  const { catalogos, loading } = useCatalogos();
  const { cargos } = useCargos();
  const {
    uploading,
    progress,
    error: uploadError,
    uploadFile,
  } = useFirebaseStorage();

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
    distrito: "",
    provincia: "",
    departamento: "",
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

  const handleDeptChange = (keys: any) => {
    const valor = Array.from(keys)[0] as string;
    setForm((prev) => ({
      ...prev,
      departamento: valor,
      provincia: "",
      distrito: "",
    }));
  };

  const handleProvChange = (keys: any) => {
    const valor = Array.from(keys)[0] as string;
    setForm((prev) => ({ ...prev, provincia: valor, distrito: "" }));
  };

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

  const setField = (field: keyof IRegistarEmpleado, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  //! Solo genera preview local, no sube aún
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  //! Al guardar: sube foto a Firebase → obtiene URL → envía todo al backend
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let fotoUrl: string | null = form.fotoUrl;

    if (selectedFile) {
      const result = await uploadFile(selectedFile, "empleados");
      if (!result) return; // si falla la subida, detiene el submit
      fotoUrl = result.url;
    }

    const payload: IRegistarEmpleado = { ...form, fotoUrl };
    console.log("Payload final hacia backend:", payload);
    const response = await registrarEmpleado(payload);
    console.log("Respuesta del backend:", response);
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

              {/* Progreso de subida */}
              {uploading && (
                <div className="w-full space-y-1">
                  <Progress value={progress} size="sm" color="primary" />
                  <p className="text-xs text-center text-default-500">
                    {progress}%
                  </p>
                </div>
              )}
              {uploadError && (
                <p className="text-xs text-danger text-center">{uploadError}</p>
              )}
            </div>

            {/* Datos Personales */}
            <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Nombres"
                placeholder="Ej. Juan Carlos"
                variant="bordered"
                required
                name="nombre"
                value={form.nombre}
                onChange={handleInputChange}
              />
              <Input
                label="Apellidos"
                placeholder="Ej. Pérez García"
                variant="bordered"
                name="apellidos"
                required
                value={form.apellidos}
                onChange={handleInputChange}
              />
              <Select
                label="Tipo Documento"
                placeholder="Seleccione"
                isLoading={loading}
                items={catalogos.TiposDocumentos}
                isRequired
                variant="bordered"
                selectedKeys={[String(form.tipoDocumento)]}
                onSelectionChange={(keys) =>
                  setField("tipoDocumento", Number(Array.from(keys)[0]))
                }
              >
                {(item: any) => (
                  <SelectItem key={item.id}>{item.nombre}</SelectItem>
                )}
              </Select>
              <NumberInput
                hideStepper
                formatOptions={{ useGrouping: false }}
                label="Número Documento"
                placeholder="12345678"
                variant="bordered"
                maxLength={8}
                value={form.numeroDocumento ? Number(form.numeroDocumento) : undefined}
                onValueChange={(value) =>
                  setField("numeroDocumento", Number.isNaN(value) ? "" : String(value))
                }
                isRequired
              />
              <DatePicker
              showMonthAndYearPickers
                className="w-full"
                label="Fecha Nacimiento"
                variant="bordered"
                isRequired
                onChange={(val: any) =>
                  setField("fechaNacimiento", val?.toString?.() ?? "")
                }
              />
             
              <Select
                label="Género"
                placeholder="Seleccione"
                isLoading={loading}
                items={catalogos.Generos}
                variant="bordered"
                isRequired
                selectedKeys={[String(form.genero)]}
                onSelectionChange={(keys) =>
                  setField("genero", Number(Array.from(keys)[0]))
                }
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
                isRequired
                selectedKeys={[String(form.estadoCivil)]}
                onSelectionChange={(keys) =>
                  setField("estadoCivil", Number(Array.from(keys)[0]))
                }
              >
                {(item: any) => (
                  <SelectItem key={item.id}>{item.nombre}</SelectItem>
                )}
              </Select>
            </div>
          </div>

          <Divider className="my-8" />

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
              required
            />
            <Input
              label="Teléfono Móvil"
              placeholder="987654321"
              variant="bordered"
              startContent={<Phone size={18} />}
              name="telefonoMovil"
              value={form.telefonoMovil ?? ""}
              onChange={handleInputChange}
              required
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
            <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select
                label="Departamento"
                placeholder="Seleccione"
                variant="bordered"
                isLoading={loadingUbigeo}
                selectedKeys={form.departamento ? [form.departamento] : []}
                onSelectionChange={handleDeptChange}
              >
                {ubigeoData
                  ? Object.keys(ubigeoData).map((d) => (
                      <SelectItem key={d} textValue={d}>
                        {d}
                      </SelectItem>
                    ))
                  : []}
              </Select>
              <Select
                label="Provincia"
                placeholder="Seleccione"
                variant="bordered"
                isDisabled={!form.departamento}
                selectedKeys={form.provincia ? [form.provincia] : []}
                onSelectionChange={handleProvChange}
              >
                {form.departamento && ubigeoData?.[form.departamento]
                  ? Object.keys(ubigeoData[form.departamento]).map((p) => (
                      <SelectItem key={p} textValue={p}>
                        {p}
                      </SelectItem>
                    ))
                  : []}
              </Select>
              <Select
                label="Distrito"
                placeholder="Seleccione"
                variant="bordered"
                isDisabled={!form.provincia}
                selectedKeys={form.distrito ? [form.distrito] : []}
                onSelectionChange={(k) =>
                  setField("distrito", Array.from(k)[0])
                }
              >
                {form.provincia &&
                ubigeoData?.[form.departamento]?.[form.provincia]
                  ? Object.keys(
                      ubigeoData[form.departamento][form.provincia],
                    ).map((dist) => (
                      <SelectItem key={dist} textValue={dist}>
                        {dist}
                      </SelectItem>
                    ))
                  : []}
              </Select>
            </div>
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
              onSelectionChange={(keys) =>
                setField(
                  "contactoEmergenciaParentesco",
                  Number(Array.from(keys)[0]),
                )
              }
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
              onSelectionChange={(keys) =>
                setField("cargoId", Number(Array.from(keys)[0]))
              }
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
              onSelectionChange={(keys) =>
                setField("nivelEducativo", Number(Array.from(keys)[0]))
              }
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
              onSelectionChange={(keys) =>
                setField("tipoContrato", Number(Array.from(keys)[0]))
              }
            >
              {(item) => <SelectItem key={item.id}>{item.nombre}</SelectItem>}
            </Select>
            <Select
              label="Tipo Jornada"
              placeholder="Seleccione"
              items={catalogos.TiposJornada}
              variant="bordered"
              selectedKeys={[String(form.tipoJornada)]}
              onSelectionChange={(keys) =>
                setField("tipoJornada", Number(Array.from(keys)[0]))
              }
            >
              {(item) => <SelectItem key={item.id}>{item.nombre}</SelectItem>}
            </Select>
            <DatePicker
              className="w-full"
              label="Fecha Ingreso"
              variant="bordered"
              onChange={(val: any) =>
                setField("fechaIngreso", val?.toString?.() ?? "")
              }
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
              onSelectionChange={(keys) =>
                setField("tipoCuenta", Number(Array.from(keys)[0]))
              }
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
              onSelectionChange={(keys) =>
                setField("sistemaPensiones", Number(Array.from(keys)[0]))
              }
            >
              {(item: any) => (
                <SelectItem key={item.id}>{item.nombre}</SelectItem>
              )}
            </Select>
            <Input
              label="CUSPP"
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
              className="min-w-[150px]"
              startContent={<ArrowLeft size={18} />}
              onPress={onBack}
            >
              Volver
            </Button>
            <Button
              color="primary"
              className="min-w-[150px]"
              startContent={<Save size={18} />}
              type="submit"
              isLoading={uploading}
            >
              {uploading ? "Subiendo..." : "Guardar"}
            </Button>
          </div>
        </CardBody>
      </Card>
    </form>
  );
}
