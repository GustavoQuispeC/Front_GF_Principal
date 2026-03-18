"use client";
import React, { useState, ChangeEvent } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Input,
  Button,
  Select,
  SelectItem,
  Divider,
  Avatar,
  DatePicker,
  Progress,
  NumberInput,
  Accordion,
  AccordionItem,
  Chip,
  Form,
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
  Search,
} from "lucide-react";
import { IRegistarEmpleado } from "@/types/Empleado/IRegistrarEmpleado";
import { useUbigeo } from "@/hooks/use-ubigeo";
import { useCatalogos } from "@/hooks/use-catalogos";
import { useCargos } from "@/hooks/use-cargos";
import { registrarEmpleado } from "@/helpers/empleado.helper";
import { useFirebaseStorage } from "@/hooks/use-firebase-storage";
import { toastPromise } from "@/helpers/toast.helper";
import { useDni } from "@/hooks/use-dni";
import { toDotNetDateTime } from "@/helpers/date.helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmpleadoForm, empleadoSchema } from "@/types/Empleado/empleado.schema";

interface RegistrarEmpleadosProps {
  onBack?: () => void;
}

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
};

export default function RegistrarEmpleados({ onBack }: RegistrarEmpleadosProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dniBusqueda, setDniBusqueda] = useState("");
  // resetKey controla el remount de DatePickers y Selects para limpiarlos visualmente
  const [resetKey, setResetKey] = useState(0);

  const { ubigeoData, loadingUbigeo } = useUbigeo();
  const { catalogos, loading } = useCatalogos();
  const { cargos } = useCargos();
  const { dniData, loadingDni, errorDni, consultarDni, resetDni } = useDni();
  const { uploading, progress, error: uploadError, uploadFile } = useFirebaseStorage();

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

  const departamento = watch("departamento");
  const provincia = watch("provincia");

  // ── DNI ──────────────────────────────────────────────────────────────────────
  const handleBuscarDni = async () => {
    if (!dniBusqueda.trim() || dniBusqueda.trim().length !== 8) return;
    const response = await consultarDni(dniBusqueda.trim());
    if (response) {
      setValue("nombre", response.nombres ?? "");
      setValue("apellidos", `${response.apellidoPaterno ?? ""} ${response.apellidoMaterno ?? ""}`.trim());
      setValue("numeroDocumento", response.dni ?? "");
    }
  };

  // ── Imagen ───────────────────────────────────────────────────────────────────
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // ── Reset completo del formulario ────────────────────────────────────────────
  const resetForm = () => {
    reset(defaultValues);
    // Incrementar resetKey fuerza el remount de DatePickers y Selects controlados por key
    setResetKey((k) => k + 1);
    setPreview(null);
    setSelectedFile(null);
    setDniBusqueda("");
    resetDni();
    // Limpiar el input file para que se pueda volver a seleccionar la misma imagen
    const fileInput = document.getElementById("foto-input") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  // ── Submit ───────────────────────────────────────────────────────────────────
  const onSubmit = async (data: EmpleadoForm) => {
    let fotoUrl: string | null = data.fotoUrl ?? null;

    if (selectedFile) {
      const result = await uploadFile(selectedFile, "empleados");
      if (!result) return;
      fotoUrl = result.url;
    }

    const payload: IRegistarEmpleado = { ...data, fotoUrl };

    try {
      await toastPromise(registrarEmpleado(payload), {
        loading: "Registrando empleado...",
        success: "Empleado registrado correctamente",
        error: "Error al registrar el empleado",
      });
      resetForm();
    } catch (_) {}
  };

  return (
    <Form className="max-w-5xl mx-auto p-4 space-y-8" onSubmit={handleSubmit(onSubmit)} validationBehavior="aria">
      {/* 🔍 BUSCADOR DNI */}
      <div className="flex flex-col gap-2 mb-6">
        <p className="text-sm font-medium text-default-700">Búsqueda por DNI</p>

        <div className="flex items-center gap-2">
          <Input
            placeholder="Ingrese 8 dígitos"
            size="sm"
            maxLength={8}
            className="max-w-[180px]"
            value={dniBusqueda}
            onChange={(e) => setDniBusqueda(e.target.value.replace(/\D/g, "").slice(0, 8))}
            onKeyDown={(e) => e.key === "Enter" && handleBuscarDni()}
            startContent={<Search size={15} className="text-default-400" />}
            description={
              dniBusqueda.length > 0 && dniBusqueda.length < 8 ? `Faltan ${8 - dniBusqueda.length} dígitos` : undefined
            }
            color={errorDni ? "danger" : "default"}
          />
          <Button
            color="primary"
            size="sm"
            onPress={handleBuscarDni}
            isLoading={loadingDni}
            isDisabled={dniBusqueda.length !== 8}
          >
            Buscar
          </Button>
        </div>

        {/* Chip de resultado DNI — se limpia con resetDni() en resetForm() */}
        {dniData?.nombreCompleto && !errorDni && (
          <Chip color="success" variant="flat" size="sm">
            {dniData.nombreCompleto}
          </Chip>
        )}
        {errorDni && (
          <Chip color="danger" variant="flat" size="sm">
            DNI no encontrado
          </Chip>
        )}
      </div>

      {/* 🧾 FORM */}
      <Accordion selectionMode="multiple" defaultExpandedKeys={["1"]}>
        {/* ── Sección 1: Datos Personales ── */}
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
              <span className="text-sm font-medium text-default-600">Fotografía</span>
              <Avatar
                isBordered
                radius="sm"
                src={preview || undefined}
                className="w-32 h-40 text-large"
                fallback={<ImageIcon className="w-10 h-10 text-default-400" />}
              />
              <input type="file" id="foto-input" accept="image/*" className="hidden" onChange={handleImageChange} />
              <Button as="label" htmlFor="foto-input" variant="flat" size="sm" startContent={<ImageIcon size={16} />}>
                Subir Foto
              </Button>
              {uploading && (
                <div className="w-full space-y-1">
                  <Progress value={progress} size="sm" color="primary" />
                  <p className="text-xs text-center text-default-500">{progress}%</p>
                </div>
              )}
              {uploadError && <p className="text-xs text-danger text-center">{uploadError}</p>}
            </div>

            {/* Campos */}
            <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Controller
                name="nombre"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Nombres"
                    placeholder="Ej. Juan Carlos"
                    isRequired
                    isInvalid={!!errors.nombre}
                    errorMessage={errors.nombre?.message}
                  />
                )}
              />

              <Controller
                name="apellidos"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Apellidos"
                    placeholder="Ej. Pérez García"
                    isRequired
                    isInvalid={!!errors.apellidos}
                    errorMessage={errors.apellidos?.message}
                  />
                )}
              />

              <Controller
                name="tipoDocumento"
                control={control}
                render={({ field }) => (
                  <Select
                    key={`tipoDocumento-${resetKey}`}
                    label="Tipo Documento"
                    placeholder="Seleccione"
                    isLoading={loading}
                    items={catalogos.TiposDocumentos}
                    isRequired
                    selectedKeys={field.value ? [String(field.value)] : []}
                    onSelectionChange={(keys) => field.onChange(Number(Array.from(keys)[0]))}
                    isInvalid={!!errors.tipoDocumento}
                    errorMessage={errors.tipoDocumento?.message}
                  >
                    {(item: any) => <SelectItem key={item.id}>{item.nombre}</SelectItem>}
                  </Select>
                )}
              />

              <Controller
                name="numeroDocumento"
                control={control}
                render={({ field }) => (
                  <NumberInput
                    key={`numeroDocumento-${resetKey}`}
                    hideStepper
                    formatOptions={{ useGrouping: false }}
                    label="Número Documento"
                    placeholder="12345678"
                    maxLength={8}
                    isRequired
                    value={field.value ? Number(field.value) : undefined}
                    onValueChange={(value) => field.onChange(Number.isNaN(value) ? "" : String(value))}
                    isInvalid={!!errors.numeroDocumento}
                    errorMessage={errors.numeroDocumento?.message}
                  />
                )}
              />

              <Controller
                name="fechaNacimiento"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    key={`fechaNacimiento-${resetKey}`}
                    showMonthAndYearPickers
                    className="w-full"
                    label="Fecha Nacimiento"
                    isRequired
                    onChange={(val) => field.onChange(toDotNetDateTime(val))}
                    isInvalid={!!errors.fechaNacimiento}
                    errorMessage={errors.fechaNacimiento?.message}
                  />
                )}
              />

              <Controller
                name="genero"
                control={control}
                render={({ field }) => (
                  <Select
                    key={`genero-${resetKey}`}
                    label="Género"
                    placeholder="Seleccione"
                    isLoading={loading}
                    items={catalogos.Generos}
                    isRequired
                    selectedKeys={field.value ? [String(field.value)] : []}
                    onSelectionChange={(keys) => field.onChange(Number(Array.from(keys)[0]))}
                    isInvalid={!!errors.genero}
                    errorMessage={errors.genero?.message}
                  >
                    {(item: any) => <SelectItem key={item.id}>{item.nombre}</SelectItem>}
                  </Select>
                )}
              />

              <Controller
                name="estadoCivil"
                control={control}
                render={({ field }) => (
                  <Select
                    key={`estadoCivil-${resetKey}`}
                    label="Estado Civil"
                    placeholder="Seleccione"
                    isLoading={loading}
                    items={catalogos.EstadosCiviles}
                    isRequired
                    selectedKeys={field.value ? [String(field.value)] : []}
                    onSelectionChange={(keys) => field.onChange(Number(Array.from(keys)[0]))}
                    isInvalid={!!errors.estadoCivil}
                    errorMessage={errors.estadoCivil?.message}
                  >
                    {(item: any) => <SelectItem key={item.id}>{item.nombre}</SelectItem>}
                  </Select>
                )}
              />

              <Controller
                name="salario"
                control={control}
                render={({ field }) => (
                  <NumberInput
                    key={`salario-${resetKey}`}
                    label="Salario"
                    isRequired
                    placeholder="0.00"
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">S/</span>
                      </div>
                    }
                    value={field.value ? Number(field.value) : undefined}
                    onValueChange={(value) => field.onChange(Number.isNaN(value) ? 0 : value)}
                    isInvalid={!!errors.salario}
                    errorMessage={errors.salario?.message}
                  />
                )}
              />

              <Controller
                name="cargoId"
                control={control}
                render={({ field }) => (
                  <Select
                    key={`cargoId-${resetKey}`}
                    label="Cargo"
                    isRequired
                    placeholder="Seleccione"
                    isLoading={loading}
                    items={cargos}
                    selectedKeys={field.value ? [String(field.value)] : []}
                    onSelectionChange={(keys) => field.onChange(Number(Array.from(keys)[0]))}
                    isInvalid={!!errors.cargoId}
                    errorMessage={errors.cargoId?.message}
                  >
                    {(item: any) => <SelectItem key={item.id}>{item.nombre}</SelectItem>}
                  </Select>
                )}
              />

              <Controller
                name="fechaIngreso"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    key={`fechaIngreso-${resetKey}`}
                    showMonthAndYearPickers
                    isRequired
                    className="w-full"
                    label="Fecha Ingreso"
                    onChange={(val) => field.onChange(toDotNetDateTime(val))}
                    isInvalid={!!errors.fechaIngreso}
                    errorMessage={errors.fechaIngreso?.message}
                  />
                )}
              />
            </div>
          </div>

          <Divider className="my-6" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Controller
              name="correo"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  value={field.value ?? ""}
                  label="Correo Electrónico"
                  type="email"
                  placeholder="ejemplo@correo.com"
                  startContent={<Mail size={18} />}
                  isRequired
                  isInvalid={!!errors.correo}
                  errorMessage={errors.correo?.message}
                  onBlur={field.onBlur}
                />
              )}
            />

            <Controller
              name="telefonoMovil"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  value={field.value ?? ""}
                  label="Teléfono Móvil"
                  placeholder="987654321"
                  startContent={<Phone size={18} />}
                  isRequired
                  isInvalid={!!errors.telefonoMovil}
                  errorMessage={errors.telefonoMovil?.message}
                  onBlur={field.onBlur}
                />
              )}
            />

            <Controller
              name="nacionalidad"
              control={control}
              render={({ field }) => (
                <Input {...field} value={field.value ?? ""} label="Nacionalidad" placeholder="Peruana" />
              )}
            />

            <Controller
              name="direccion"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  value={field.value ?? ""}
                  label="Dirección"
                  placeholder="Av. Principal 123"
                  className="md:col-span-2"
                  startContent={<MapPin size={18} />}
                />
              )}
            />

            {/* Ubigeo */}
            <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Controller
                name="departamento"
                control={control}
                render={({ field }) => (
                  <Select
                    key={`departamento-${resetKey}`}
                    label="Departamento"
                    placeholder="Seleccione"
                    isLoading={loadingUbigeo}
                    selectedKeys={field.value ? [field.value] : []}
                    onSelectionChange={(keys) => {
                      const valor = Array.from(keys)[0] as string;
                      field.onChange(valor);
                      setValue("provincia", "");
                      setValue("distrito", "");
                    }}
                  >
                    {ubigeoData
                      ? Object.keys(ubigeoData).map((d) => (
                          <SelectItem key={d} textValue={d}>
                            {d}
                          </SelectItem>
                        ))
                      : []}
                  </Select>
                )}
              />

              <Controller
                name="provincia"
                control={control}
                render={({ field }) => (
                  <Select
                    key={`provincia-${resetKey}`}
                    label="Provincia"
                    placeholder="Seleccione"
                    isDisabled={!departamento}
                    selectedKeys={field.value ? [field.value] : []}
                    onSelectionChange={(keys) => {
                      const valor = Array.from(keys)[0] as string;
                      field.onChange(valor);
                      setValue("distrito", "");
                    }}
                  >
                    {departamento && ubigeoData?.[departamento]
                      ? Object.keys(ubigeoData[departamento]).map((p) => (
                          <SelectItem key={p} textValue={p}>
                            {p}
                          </SelectItem>
                        ))
                      : []}
                  </Select>
                )}
              />

              <Controller
                name="distrito"
                control={control}
                render={({ field }) => (
                  <Select
                    key={`distrito-${resetKey}`}
                    label="Distrito"
                    placeholder="Seleccione"
                    isDisabled={!provincia}
                    selectedKeys={field.value ? [field.value] : []}
                    onSelectionChange={(keys) => field.onChange(Array.from(keys)[0] as string)}
                  >
                    {provincia && departamento && ubigeoData?.[departamento]?.[provincia]
                      ? Object.keys(ubigeoData[departamento][provincia]).map((dist) => (
                          <SelectItem key={dist} textValue={dist}>
                            {dist}
                          </SelectItem>
                        ))
                      : []}
                  </Select>
                )}
              />
            </div>
          </div>
        </AccordionItem>

        {/* ── Sección 2: Contacto de Emergencia ── */}
        <AccordionItem
          key="2"
          aria-label="Accordion 2"
          title="Contacto de Emergencia"
          startContent={<Phone size={20} className="text-blue-900" />}
          classNames={{ title: "font-bold text-blue-900" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Controller
              name="contactoEmergenciaNombre"
              control={control}
              render={({ field }) => (
                <Input {...field} value={field.value ?? ""} label="Nombre" placeholder="Ej. María Pérez" />
              )}
            />

            <Controller
              name="contactoEmergenciaParentesco"
              control={control}
              render={({ field }) => (
                <Select
                  key={`parentesco-${resetKey}`}
                  label="Parentesco"
                  placeholder="Seleccione"
                  isLoading={loading}
                  items={catalogos.TiposParentesco}
                  selectedKeys={field.value ? [String(field.value)] : []}
                  onSelectionChange={(keys) => field.onChange(Number(Array.from(keys)[0]))}
                >
                  {(item: any) => <SelectItem key={item.id}>{item.nombre}</SelectItem>}
                </Select>
              )}
            />

            <Controller
              name="contactoEmergenciaTelefono"
              control={control}
              render={({ field }) => (
                <Input {...field} value={field.value ?? ""} label="Teléfono" placeholder="999888777" />
              )}
            />
          </div>
        </AccordionItem>

        {/* ── Sección 3: Datos Laborales ── */}
        <AccordionItem
          key="3"
          aria-label="Accordion 3"
          title="Datos Laborales"
          startContent={<Briefcase size={20} className="text-blue-900" />}
          classNames={{ title: "font-bold text-blue-900" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Controller
              name="profesionOficio"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  value={field.value ?? ""}
                  label="Profesión/Oficio"
                  placeholder="Ingeniero de Sistemas"
                />
              )}
            />

            <Controller
              name="nivelEducativo"
              control={control}
              render={({ field }) => (
                <Select
                  key={`nivelEducativo-${resetKey}`}
                  label="Nivel Educativo"
                  placeholder="Seleccione"
                  isLoading={loading}
                  items={catalogos.NivelesEducativos}
                  selectedKeys={field.value ? [String(field.value)] : []}
                  onSelectionChange={(keys) => field.onChange(Number(Array.from(keys)[0]))}
                >
                  {(item: any) => <SelectItem key={item.id}>{item.nombre}</SelectItem>}
                </Select>
              )}
            />

            <Controller
              name="tipoContrato"
              control={control}
              render={({ field }) => (
                <Select
                  key={`tipoContrato-${resetKey}`}
                  label="Tipo Contrato"
                  placeholder="Seleccione"
                  items={catalogos.TiposContrato}
                  selectedKeys={field.value ? [String(field.value)] : []}
                  onSelectionChange={(keys) => field.onChange(Number(Array.from(keys)[0]))}
                >
                  {(item: any) => <SelectItem key={item.id}>{item.nombre}</SelectItem>}
                </Select>
              )}
            />

            <Controller
              name="tipoJornada"
              control={control}
              render={({ field }) => (
                <Select
                  key={`tipoJornada-${resetKey}`}
                  label="Tipo Jornada"
                  placeholder="Seleccione"
                  items={catalogos.TiposJornada}
                  selectedKeys={field.value ? [String(field.value)] : []}
                  onSelectionChange={(keys) => field.onChange(Number(Array.from(keys)[0]))}
                >
                  {(item: any) => <SelectItem key={item.id}>{item.nombre}</SelectItem>}
                </Select>
              )}
            />

            <Controller
              name="ruc"
              control={control}
              render={({ field }) => <Input {...field} value={field.value ?? ""} label="RUC (Opcional)" />}
            />

            <Controller
              name="observaciones"
              control={control}
              render={({ field }) => (
                <Input {...field} value={field.value ?? ""} label="Observaciones" className="md:col-span-3" />
              )}
            />
          </div>
        </AccordionItem>

        {/* ── Sección 4: Financiero y Seguros ── */}
        <AccordionItem
          key="4"
          aria-label="Accordion 4"
          title="Financiero y Seguros"
          startContent={<Landmark size={20} className="text-blue-900" />}
          classNames={{ title: "font-bold text-blue-900" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Controller
              name="bancoNombre"
              control={control}
              render={({ field }) => (
                <Input {...field} value={field.value ?? ""} label="Banco" startContent={<CreditCard size={18} />} />
              )}
            />

            <Controller
              name="tipoCuenta"
              control={control}
              render={({ field }) => (
                <Select
                  key={`tipoCuenta-${resetKey}`}
                  label="Tipo de Cuenta"
                  placeholder="Seleccione"
                  items={catalogos.TiposCuentaBancaria}
                  selectedKeys={field.value ? [String(field.value)] : []}
                  onSelectionChange={(keys) => field.onChange(Number(Array.from(keys)[0]))}
                >
                  {(item: any) => <SelectItem key={item.id}>{item.nombre}</SelectItem>}
                </Select>
              )}
            />

            <Controller
              name="numeroCuentaBancaria"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  value={field.value ?? ""}
                  label="Número de Cuenta"
                  startContent={<CreditCard size={18} />}
                />
              )}
            />

            <Controller
              name="cci"
              control={control}
              render={({ field }) => <Input {...field} value={field.value ?? ""} label="CCI" />}
            />

            <Controller
              name="sistemaPensiones"
              control={control}
              render={({ field }) => (
                <Select
                  key={`sistemaPensiones-${resetKey}`}
                  label="Sistema de Pensiones"
                  placeholder="Seleccione"
                  isLoading={loading}
                  items={catalogos.SistemasPensiones}
                  selectedKeys={field.value ? [String(field.value)] : []}
                  onSelectionChange={(keys) => field.onChange(Number(Array.from(keys)[0]))}
                >
                  {(item: any) => <SelectItem key={item.id}>{item.nombre}</SelectItem>}
                </Select>
              )}
            />

            <Controller
              name="cuspp"
              control={control}
              render={({ field }) => (
                <Input {...field} value={field.value ?? ""} label="CUSPP" placeholder="1234567890AB" />
              )}
            />

            <Controller
              name="numeroESSalud"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  value={field.value ?? ""}
                  label="Número ESSalud"
                  startContent={<HeartPulse size={18} />}
                />
              )}
            />
          </div>
        </AccordionItem>
      </Accordion>

      <div className="mt-10 flex w-full justify-end items-center gap-3">
        <Button color="default" className="min-w-[150px]" startContent={<ArrowLeft size={18} />} onPress={onBack}>
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
    </Form>
  );
}
