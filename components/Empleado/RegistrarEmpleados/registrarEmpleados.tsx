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
  Accordion,
  AccordionItem,
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

export default function RegistrarEmpleados({
  onBack,
}: RegistrarEmpleadosProps) {
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

  //! Manejo de cambios en selects dependientes (Departamento → Provincia → Distrito)
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

  //! Manejo genérico de inputs (texto, número, email, etc.)
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value || 0) : value,
    }));
  };

  const setField = (field: keyof IRegistarEmpleado, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  //? Convierte la fecha del DatePicker a formato ISO compatible con .NET
  const toDotNetDateTime = (value: any): string => {
    if (!value) return "";

    if (
      typeof value.year === "number" &&
      typeof value.month === "number" &&
      typeof value.day === "number"
    ) {
      const year = String(value.year).padStart(4, "0");
      const month = String(value.month).padStart(2, "0");
      const day = String(value.day).padStart(2, "0");
      return `${year}-${month}-${day}T00:00:00`;
    }

    const raw = value?.toString?.();
    if (typeof raw === "string") {
      if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
        return `${raw}T00:00:00`;
      }

      const parsed = new Date(raw);
      if (!Number.isNaN(parsed.getTime())) {
        return parsed.toISOString();
      }
    }

    return "";
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
      <Accordion  defaultExpandedKeys={["1"]}>
        {/* Datos personales obligatorios */}
        <AccordionItem
          key="1"
          aria-label="Accordion 1"
          title="Registro de Nuevo Empleado"
          startContent={<User size={20} className="text-blue-900" />}
          classNames={{ title: "font-bold text-blue-900" }}
        >
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
                required
                name="nombre"
                value={form.nombre}
                onChange={handleInputChange}
              />
              <Input
                label="Apellidos"
                placeholder="Ej. Pérez García"
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
                maxLength={8}
                value={
                  form.numeroDocumento
                    ? Number(form.numeroDocumento)
                    : undefined
                }
                onValueChange={(value) =>
                  setField(
                    "numeroDocumento",
                    Number.isNaN(value) ? "" : String(value),
                  )
                }
                isRequired
              />
              <DatePicker
                showMonthAndYearPickers
                className="w-full"
                label="Fecha Nacimiento"
                isRequired
                onChange={(val: any) =>
                  setField("fechaNacimiento", toDotNetDateTime(val))
                }
              />

              <Select
                label="Género"
                placeholder="Seleccione"
                isLoading={loading}
                items={catalogos.Generos}
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
              <NumberInput
                label="Salario"
                isRequired
                placeholder="0.00"
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">S/</span>
                  </div>
                }
                value={form.salario ? Number(form.salario) : undefined}
                onValueChange={(value) =>
                  setField("salario", Number.isNaN(value) ? "" : String(value))
                }
              />
              <Select
                label="Cargo"
                isRequired
                placeholder="Seleccione"
                isLoading={loading}
                items={cargos}
                selectedKeys={[String(form.cargoId)]}
                onSelectionChange={(keys) =>
                  setField("cargoId", Number(Array.from(keys)[0]))
                }
              >
                {(item: any) => (
                  <SelectItem key={item.id}>{item.nombre}</SelectItem>
                )}
              </Select>
              <DatePicker
                showMonthAndYearPickers
                isRequired
                className="w-full"
                label="Fecha Ingreso"
                onChange={(val: any) =>
                  setField("fechaIngreso", toDotNetDateTime(val))
                }
              />
            </div>
          </div>
          <Divider className="my-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Correo Electrónico"
              type="email"
              placeholder="ejemplo@correo.com"
              startContent={<Mail size={18} />}
              name="correo"
              value={form.correo ?? ""}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Teléfono Móvil"
              placeholder="987654321"
              startContent={<Phone size={18} />}
              name="telefonoMovil"
              value={form.telefonoMovil ?? ""}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Nacionalidad"
              placeholder="Peruana"
              name="nacionalidad"
              value={form.nacionalidad ?? ""}
              onChange={handleInputChange}
            />
            <Input
              label="Dirección"
              placeholder="Av. Principal 123"
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
        </AccordionItem>
        {/* Contacto de emergencia */}
        <AccordionItem
          key="2"
          aria-label="Accordion 2"
          title="Contacto de Emergencia"
          startContent={<Phone size={20} className="text-blue-900" />}
          classNames={{ title: "font-bold text-blue-900" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Nombre"
              placeholder="Ej. María Pérez"
              name="contactoEmergenciaNombre"
              value={form.contactoEmergenciaNombre ?? ""}
              onChange={handleInputChange}
            />
            <Select
              label="Parentesco"
              placeholder="Seleccione"
              isLoading={loading}
              items={catalogos.TiposParentesco}
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
              name="contactoEmergenciaTelefono"
              value={form.contactoEmergenciaTelefono ?? ""}
              onChange={handleInputChange}
            />
          </div>
        </AccordionItem>
        {/* Datos laborales */}
        <AccordionItem
          key="3"
          aria-label="Accordion 3"
          title="Datos Laborales"
          startContent={<Briefcase size={20} className="text-blue-900" />}
          classNames={{ title: "font-bold text-blue-900" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Profesión/Oficio"
              placeholder="Ingeniero de Sistemas"
              name="profesionOficio"
              value={form.profesionOficio ?? ""}
              onChange={handleInputChange}
            />
            <Select
              label="Nivel Educativo"
              placeholder="Seleccione"
              isLoading={loading}
              items={catalogos.NivelesEducativos}
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
              selectedKeys={[String(form.tipoJornada)]}
              onSelectionChange={(keys) =>
                setField("tipoJornada", Number(Array.from(keys)[0]))
              }
            >
              {(item) => <SelectItem key={item.id}>{item.nombre}</SelectItem>}
            </Select>

            <Input
              label="RUC (Opcional)"
              name="ruc"
              value={form.ruc ?? ""}
              onChange={handleInputChange}
            />
            <Input
              label="Observaciones"
              name="observaciones"
              value={form.observaciones ?? ""}
              onChange={handleInputChange}
              className="md:col-span-3"
            />
          </div>
        </AccordionItem>
        <AccordionItem
          key="4"
          aria-label="Accordion 4"
          title="Financiero y Seguros"
          startContent={<Landmark size={20} className="text-blue-900" />}
          classNames={{ title: "font-bold text-blue-900" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Banco"
              startContent={<CreditCard size={18} />}
              name="bancoNombre"
              value={form.bancoNombre ?? ""}
              onChange={handleInputChange}
            />
            <Select
              label="Tipo de Cuenta"
              placeholder="Seleccione"
              items={catalogos.TiposCuentaBancaria}
              selectedKeys={[String(form.tipoCuenta)]}
              onSelectionChange={(keys) =>
                setField("tipoCuenta", Number(Array.from(keys)[0]))
              }
            >
              {(item) => <SelectItem key={item.id}>{item.nombre}</SelectItem>}
            </Select>
            <Input
              label="Número de Cuenta"
              startContent={<CreditCard size={18} />}
              name="numeroCuentaBancaria"
              value={form.numeroCuentaBancaria ?? ""}
              onChange={handleInputChange}
            />
            <Input
              label="CCI"
              name="cci"
              value={form.cci ?? ""}
              onChange={handleInputChange}
            />
            <Select
              label="Sistema de Pensiones"
              placeholder="Seleccione"
              isLoading={loading}
              items={catalogos.SistemasPensiones}
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
              name="cuspp"
              value={form.cuspp ?? ""}
              onChange={handleInputChange}
            />
            <Input
              label="Número ESSalud"
              startContent={<HeartPulse size={18} />}
              name="numeroESSalud"
              value={form.numeroESSalud ?? ""}
              onChange={handleInputChange}
            />
          </div>
        </AccordionItem>
      </Accordion>
      <div className="mt-10 flex justify-end gap-3">
        <Button
          color="default"
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
    </form>
  );
}
