"use client";

import { useCargos } from "@/features/cargo/hooks/useCargos";
import { mapCatalogToId, useCatalogos } from "@/features/catalogo";
import { EmpleadoForm, empleadoSchema, useEmpleado } from "@/features/empleado";
import { Button, Card, CardBody, CardHeader, Chip, Divider, Input, Select, SelectItem, Skeleton } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  Save,
  User,
  Mail,
  MapPin,
  Briefcase,
  Landmark,
  HeartPulse,
  Phone,
  IdCard,
  BadgeCheck,
  GraduationCap,
  Camera,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const defaultValues: EmpleadoForm = {
  nombre: "",
  apellidos: "",
  tipoDocumento: 0,
  numeroDocumento: "",
  fechaNacimiento: "",
  genero: 0,
  estadoCivil: 0,
  nacionalidad: null,
  correo: "",
  telefonoMovil: "",
  direccion: null,
  distrito: "",
  provincia: "",
  departamento: "",
  contactoEmergenciaNombre: null,
  contactoEmergenciaParentesco: 0,
  contactoEmergenciaTelefono: null,
  numeroCuentaBancaria: null,
  bancoNombre: null,
  tiposCuentaBancaria: 0,
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
};

const AvatarUpload = ({
  currentUrl,
  nombre,
  isActive,
  onChange,
}: {
  currentUrl?: string | null;
  nombre: string;
  isActive: boolean;
  onChange: (file: File, previewUrl: string) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    onChange(file, url);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const clearPreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const src = preview ?? currentUrl ?? "/avatar.png";

  return (
    <div className="relative shrink-0 group">
      {/* Input oculto */}
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleInputChange} />

      {/* Foto */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="relative w-26 h-26 rounded-xl overflow-hidden border-2 border-default-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-400"
      >
        <img
          src={src}
          alt={nombre}
          className="w-full h-full object-cover transition-opacity duration-200 group-hover:opacity-60"
        />

        {/* Overlay con ícono de cámara */}
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/30">
          <Camera className="w-5 h-5 text-white" />
          <span className="text-white text-[10px] font-medium mt-1 leading-tight text-center px-1">Cambiar foto</span>
        </div>
      </div>

      {/* Badge de estado */}
      <span
        className={`absolute -bottom-1.5 -right-1.5 w-4 h-4 rounded-full border-2 border-white ${
          isActive ? "bg-success-500" : "bg-danger-500"
        }`}
      />

      {/* Botón para limpiar la nueva foto (solo si hay preview) */}
      {preview && (
        <button
          onClick={clearPreview}
          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-danger-500 border-2 border-white flex items-center justify-center z-10 hover:bg-danger-600 transition-colors"
          title="Cancelar cambio de foto"
        >
          <X className="w-2.5 h-2.5 text-white" />
        </button>
      )}

      {/* Etiqueta "Nueva" si hay preview */}
      {preview && (
        <span className="absolute -bottom-5 left-0 right-0 text-center text-[10px] text-primary-600 font-medium">
          Nueva foto
        </span>
      )}
    </div>
  );
};

interface Props {
  id: string;
}

// ── Subcomponentes ────────────────────────────────────────────────────────────

const SectionCard = ({
  title,
  icon: Icon,
  children,
  className = "",
}: {
  title: string;
  icon: any;
  children: React.ReactNode;
  className?: string;
}) => (
  <Card className={`border border-default-100 shadow-none rounded-xl ${className}`} radius="lg">
    <CardHeader className="px-4 pt-4 pb-0 gap-2">
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-primary-50 rounded-lg">
          <Icon className="w-4 h-4 text-primary-600" />
        </div>
        <h2 className="text-sm font-semibold text-default-700 uppercase tracking-wide">{title}</h2>
      </div>
    </CardHeader>
    <Divider className="mt-3" />
    <CardBody className="px-4 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">{children}</div>
    </CardBody>
  </Card>
);

// ── Skeleton de carga ─────────────────────────────────────────────────────────

const LoadingSkeleton = () => (
  <div className="p-4 md:p-6 space-y-4 max-w-6xl mx-auto">
    <Card className="shadow-none border border-default-100 rounded-2xl">
      <CardBody className="p-4 md:p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <Skeleton className="w-20 h-24 rounded-xl" />
          <div className="flex flex-col gap-2 flex-1">
            <Skeleton className="h-6 w-48 rounded-lg" />
            <Skeleton className="h-4 w-32 rounded-lg" />
            <Skeleton className="h-5 w-20 rounded-full mt-1" />
          </div>
        </div>
      </CardBody>
    </Card>
    {[1, 2, 3, 4].map((i) => (
      <Card key={i} className="shadow-none border border-default-100 rounded-xl">
        <CardBody className="p-4 space-y-3">
          <Skeleton className="h-4 w-36 rounded-lg" />
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((j) => (
              <Skeleton key={j} className="h-10 rounded-lg" />
            ))}
          </div>
        </CardBody>
      </Card>
    ))}
  </div>
);

// ── Componente principal ──────────────────────────────────────────────────────

export default function EditarEmpleado({ id }: Props) {
  const router = useRouter();
  const { empleado, loading, error } = useEmpleado(id);
  const [nuevaFoto, setNuevaFoto] = useState<File | null>(null);
  const { catalogos, loading: loadingCatalogos } = useCatalogos();
  const [cargoId, setCargoId] = useState<string>("");
  const { cargos } = useCargos();
  const [resetKey, setResetKey] = useState(0);
  const [form, setForm] = useState({
    genero: "",
    estadoCivil: "",
    tipoDocumento: "",
    tipoContrato: "",
    tipoJornada: "",
    sistemaPensiones: "",
    tiposCuentaBancaria: "",
    nivelesEducativos: "",
  });

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitted },
  } = useForm<EmpleadoForm>({
    resolver: zodResolver(empleadoSchema),
    defaultValues,
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  //! Sincronizar el formulario con los datos del empleado una vez que ambos, empleado y catálogos, estén disponibles
  useEffect(() => {
    if (!empleado) return;

    setForm({
      genero: mapCatalogToId(catalogos.generos, empleado.genero),
      estadoCivil: mapCatalogToId(catalogos.estadosCiviles, empleado.estadoCivil),
      tipoDocumento: mapCatalogToId(catalogos.tiposDocumentos, empleado.tipoDocumento),
      tipoContrato: mapCatalogToId(catalogos.tiposContrato, empleado.tipoContrato ?? ""),
      tipoJornada: mapCatalogToId(catalogos.tiposJornada, empleado.tipoJornada ?? ""),
      sistemaPensiones: mapCatalogToId(catalogos.sistemasPensiones, empleado.sistemaPensiones ?? ""),
      tiposCuentaBancaria: mapCatalogToId(catalogos.tiposCuentaBancaria, empleado.tiposCuentaBancaria ?? ""),
      nivelesEducativos: mapCatalogToId(catalogos.nivelesEducativos, empleado.nivelEducativo ?? ""),
    });
  }, [empleado, catalogos]);

  //! Mostrar loading mientras se cargan los datos del empleado o los catálogos
  if (loading) return <LoadingSkeleton />;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <p className="text-danger text-sm">{error}</p>
        <Button
          size="sm"
          variant="flat"
          startContent={<ArrowLeft size={14} />}
          onPress={() => router.push("/dashboard/empleados/listar")}
        >
          Volver
        </Button>
      </div>
    );
  }

  if (!empleado) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <User className="w-10 h-10 text-default-300" />
        <p className="text-default-500 text-sm">No se encontró el empleado</p>
        <Button
          size="sm"
          variant="flat"
          startContent={<ArrowLeft size={14} />}
          onPress={() => router.push("/dashboard/empleados/listar")}
        >
          Volver
        </Button>
      </div>
    );
  }

  const handleSelectChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-4">
      {/* ── Header Card ── */}
      <Card className="shadow-none border border-default-100 rounded-2xl">
        <CardBody className="p-4 md:p-5">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            {/* Foto + info */}
            <div className="flex items-start gap-4">
              <div className="relative shrink-0">
                <AvatarUpload
                  currentUrl={empleado.fotoUrl}
                  nombre={empleado.nombreCompleto}
                  isActive={empleado.isActive}
                  onChange={(file, _previewUrl) => setNuevaFoto(file)}
                />
                <span
                  className={`absolute -bottom-1.5 -right-1.5 w-4 h-4 rounded-full border-2 border-white ${
                    empleado.isActive ? "bg-success-500" : "bg-danger-500"
                  }`}
                />
              </div>

              <div className="flex flex-col gap-1">
                <h1 className="text-lg md:text-xl font-bold text-default-900 leading-tight">
                  {empleado.nombreCompleto}
                </h1>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-default-500">
                  <span className="flex items-center gap-1">
                    <IdCard size={12} />
                    {empleado.codigoEmpleado}
                  </span>
                  <span className="text-default-300">•</span>
                  <span className="flex items-center gap-1">
                    <Briefcase size={12} />
                    {empleado.cargoActual ?? "Sin cargo"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-1">
                  <Chip
                    size="sm"
                    variant="flat"
                    color={empleado.isActive ? "success" : "danger"}
                    startContent={<BadgeCheck size={12} />}
                  >
                    {empleado.isActive ? "Activo" : "Inactivo"}
                  </Chip>
                  {empleado.tipoContrato && (
                    <Chip size="sm" variant="flat" color="default">
                      {empleado.tipoContrato}
                    </Chip>
                  )}
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-2 sm:self-start flex-wrap">
              <Button
                size="sm"
                variant="flat"
                startContent={<ArrowLeft size={14} />}
                onPress={() => router.push("/dashboard/empleados/listar")}
                className="text-xs"
              >
                Volver
              </Button>
              <Button size="sm" variant="flat" color={empleado.isActive ? "danger" : "success"} className="text-xs">
                {empleado.isActive ? "Desactivar" : "Activar"}
              </Button>
              <Button size="sm" color="primary" startContent={<Save size={14} />} className="text-xs">
                Guardar cambios
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* ── Grid de secciones ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Datos personales */}
        <SectionCard title="Datos personales" icon={User}>
          <Input label="Nombres" size="sm" defaultValue={empleado.nombre} />
          <Input label="Apellidos" size="sm" defaultValue={empleado.apellidos} />
          <Controller
            name="genero"
            control={control}
            render={({ field }) => (
              <Select
                label="Género"
                selectedKeys={form.genero ? [form.genero] : []}
                onSelectionChange={(keys) => handleSelectChange("genero", Array.from(keys)[0] as string)}
              >
                {catalogos.generos.map((g: any) => (
                  <SelectItem key={String(g.id)}>{g.nombre}</SelectItem>
                ))}
              </Select>
            )}
          />

          <Controller
            name="estadoCivil"
            control={control}
            render={({ field }) => (
              <Select
                label="Estado civil"
                selectedKeys={form.estadoCivil ? [form.estadoCivil] : []}
                onSelectionChange={(keys) => {
                  handleSelectChange("estadoCivil", Array.from(keys)[0] as string);
                }}
              >
                {catalogos.estadosCiviles.map((e: any) => (
                  <SelectItem key={String(e.id)}>{e.nombre}</SelectItem>
                ))}
              </Select>
            )}
          />
          <Controller
            name="tipoDocumento"
            control={control}
            render={({ field }) => (
              <Select
                label="Tipo de documento "
                selectedKeys={form.tipoDocumento ? [form.tipoDocumento] : []}
                onSelectionChange={(keys) => {
                  handleSelectChange("tipoDocumento", Array.from(keys)[0] as string);
                }}
              >
                {catalogos.tiposDocumentos.map((e: any) => (
                  <SelectItem key={String(e.id)}>{e.nombre}</SelectItem>
                ))}
              </Select>
            )}
          />
          <Input label="N° documento" size="sm" defaultValue={empleado.numeroDocumento} />
          <Input label="Fecha de nacimiento" size="sm" defaultValue={empleado.fechaNacimiento?.split("T")[0]} />
          <Input label="Edad" size="sm" defaultValue={empleado.edad ? String(empleado.edad) : ""} isReadOnly />
          <Input label="Nacionalidad" size="sm" defaultValue={empleado.nacionalidad} className="sm:col-span-2" />
        </SectionCard>

        {/* Contacto + Ubicación apilados */}
        <div className="flex flex-col gap-4">
          <SectionCard title="Contacto" icon={Mail}>
            <Input label="Correo electrónico" size="sm" defaultValue={empleado.correo} className="sm:col-span-2" />
            <Input label="Teléfono móvil" size="sm" defaultValue={empleado.telefonoMovil} className="sm:col-span-2" />
          </SectionCard>

          <SectionCard title="Ubicación" icon={MapPin}>
            <Input label="Dirección" size="sm" defaultValue={empleado.direccion ?? ""} className="sm:col-span-2" />
            <Input label="Departamento" size="sm" defaultValue={empleado.departamento ?? ""} />
            <Input label="Provincia" size="sm" defaultValue={empleado.provincia ?? ""} />
            <Input label="Distrito" size="sm" defaultValue={empleado.distrito ?? ""} className="sm:col-span-2" />
          </SectionCard>
        </div>

        {/* Contacto de emergencia */}
        <SectionCard title="Contacto de emergencia" icon={Phone}>
          <Input label="Nombre" size="sm" defaultValue={empleado.contactoEmergenciaNombre ?? ""} />
          <Input label="Teléfono" size="sm" defaultValue={empleado.contactoEmergenciaTelefono ?? ""} />
          <Input
            label="Parentesco"
            size="sm"
            defaultValue={empleado.contactoEmergenciaParentesco ?? ""}
            className="sm:col-span-2"
          />
        </SectionCard>

        {/* Educación */}
        <SectionCard title="Educación" icon={GraduationCap}>
          <Controller
            name="nivelEducativo"
            control={control}
            render={({ field }) => (
              <Select
                label="Nivel educativo"
                selectedKeys={form.nivelesEducativos ? [form.nivelesEducativos] : []}
                onSelectionChange={(keys) => handleSelectChange("nivelesEducativos", Array.from(keys)[0] as string)}
              >
                {catalogos.nivelesEducativos.map((n: any) => (
                  <SelectItem key={String(n.id)}>{n.nombre}</SelectItem>
                ))}
              </Select>
            )}
          />
          <Input label="Profesión / oficio" size="sm" defaultValue={empleado.profesionOficio ?? ""} />
        </SectionCard>

        {/* Información laboral — ancho completo */}
        <SectionCard title="Información laboral" icon={Briefcase} className="lg:col-span-2">
          <Controller
            name="cargoId"
            control={control}
            render={({ field }) => (
              <Select
                label="Cargo"
                selectedKeys={cargoId ? [cargoId] : []}
                onSelectionChange={(keys) => {
                  setCargoId(Array.from(keys)[0] as string);
                }}
              >
                {cargos.map((e: any) => (
                  <SelectItem key={String(e.id)}>{e.nombre}</SelectItem>
                ))}
              </Select>
            )}
          />
          <Input
            label="Salario (S/)"
            size="sm"
            defaultValue={empleado.salarioActual ? String(empleado.salarioActual) : ""}
          />
          <Controller
            name="tipoContrato"
            control={control}
            render={({ field }) => (
              <Select
                label="Tipo de contrato"
                selectedKeys={form.tipoContrato ? [form.tipoContrato] : []}
                onSelectionChange={(keys) => handleSelectChange("tipoContrato", Array.from(keys)[0] as string)}
              >
                {catalogos.tiposContrato.map((tc: any) => (
                  <SelectItem key={String(tc.id)}>{tc.nombre}</SelectItem>
                ))}
              </Select>
            )}
          />
          <Controller
            name="tipoJornada"
            control={control}
            render={({ field }) => (
              <Select
                label="Tipo de jornada"
                selectedKeys={form.tipoJornada ? [form.tipoJornada] : []}
                onSelectionChange={(keys) => handleSelectChange("tipoJornada", Array.from(keys)[0] as string)}
              >
                {catalogos.tiposJornada.map((tj: any) => (
                  <SelectItem key={String(tj.id)}>{tj.nombre}</SelectItem>
                ))}
              </Select>
            )}
          />
          <Input label="Fecha de ingreso" size="sm" defaultValue={empleado.fechaIngresoActual?.split("T")[0]} />
          <Input label="Fecha de egreso" size="sm" defaultValue={empleado.fechaEgreso ?? ""} />
          <Input
            label="Observaciones"
            size="sm"
            defaultValue={empleado.observaciones ?? ""}
            className="sm:col-span-2"
          />
        </SectionCard>

        {/* Datos bancarios */}
        <SectionCard title="Datos bancarios" icon={Landmark}>
          <Input label="Banco" size="sm" defaultValue={empleado.bancoNombre ?? ""} />
          <Input label="N° de cuenta" size="sm" defaultValue={empleado.numeroCuentaBancaria ?? ""} />
          <Input label="CCI" size="sm" defaultValue={empleado.cci ?? ""} />
          <Controller
            name="tiposCuentaBancaria"
            control={control}
            render={({ field }) => (
              <Select
                label="Tipo de cuenta"
                selectedKeys={form.tiposCuentaBancaria ? [form.tiposCuentaBancaria] : []}
                onSelectionChange={(keys) => handleSelectChange("tiposCuentaBancaria", Array.from(keys)[0] as string)}
              >
                {catalogos.tiposCuentaBancaria.map((tc: any) => (
                  <SelectItem key={String(tc.id)}>{tc.nombre}</SelectItem>
                ))}
              </Select>
            )}
          />
        </SectionCard>

        {/* Pensiones y salud */}
        <SectionCard title="Pensiones y salud" icon={HeartPulse}>
          <Controller
            name="sistemaPensiones"
            control={control}
            render={({ field }) => (
              <Select
                label="Sistema de pensiones"
                selectedKeys={form.sistemaPensiones ? [form.sistemaPensiones] : []}
                onSelectionChange={(keys) => handleSelectChange("sistemaPensiones", Array.from(keys)[0] as string)}
              >
                {catalogos.sistemasPensiones.map((sp: any) => (
                  <SelectItem key={String(sp.id)}>{sp.nombre}</SelectItem>
                ))}
              </Select>
            )}
          />
          <Input label="CUSPP" size="sm" defaultValue={empleado.cuspp ?? ""} />
          <Input label="N° EsSalud" size="sm" defaultValue={empleado.numeroEssalud ?? ""} className="sm:col-span-2" />
        </SectionCard>
      </div>
    </div>
  );
}
