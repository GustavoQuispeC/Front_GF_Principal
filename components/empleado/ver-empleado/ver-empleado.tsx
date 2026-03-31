"use client";

import { useEmpleado } from "@/features/empleado/hook/useEmpleado";
import { IVerEmpleado } from "@/types/Empleado/IVerEmpleado";
import { Button, Card, CardBody, CardHeader, Chip, Divider, Skeleton } from "@heroui/react";
import {
  ArrowLeft,
  Download,
  User,
  Mail,
  MapPin,
  Briefcase,
  Landmark,
  HeartPulse,
  Phone,
  IdCard,
  BadgeCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";

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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">{children}</div>
    </CardBody>
  </Card>
);

const Field = ({ label, value }: { label: string; value?: string | number | null }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-xs text-default-400 font-medium uppercase tracking-wider">{label}</span>
    <span className="text-sm text-default-700 font-medium">
      {value ?? <span className="text-default-300 italic">—</span>}
    </span>
  </div>
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
export default function DetalleEmpleado({ id }: Props) {
  const router = useRouter();
  const { empleado, loading, error } = useEmpleado(id);

  if (loading) return <LoadingSkeleton />;

  // Manejo de errores
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <p className="text-danger text-sm">{error}</p>
        <Button onPress={() => router.push("/dashboard/empleados/listar")}>Volver</Button>
      </div>
    );
  }

  // Si no se encuentra el empleado (por ejemplo, ID inválido o eliminado)
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

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-4">
      {/* ── Header Card ── */}
      <Card className="shadow-none border border-default-100 rounded-2xl">
        <CardBody className="p-4 md:p-5">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            {/* Foto + info */}
            <div className="flex items-start gap-4">
              {/* Avatar rectangular tipo carnet empresarial */}
              <div className="relative shrink-0">
                <img
                  src={empleado.fotoUrl ?? "/avatar.png"}
                  alt={empleado.nombreCompleto}
                  className="w-20 h-24 rounded-xl object-cover border-2 border-default-200"
                />
                {/* Badge de estado sobre la foto */}
                <span
                  className={`absolute -bottom-1.5 -right-1.5 w-4 h-4 rounded-full border-2 border-white ${
                    empleado.isActive ? "bg-success-500" : "bg-danger-500"
                  }`}
                />
              </div>

              {/* Datos principales */}
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
            <div className="flex gap-2 sm:self-start">
              <Button
                size="sm"
                variant="bordered"
                startContent={<ArrowLeft size={14} />}
                onPress={() => router.push("/dashboard/empleados/listar")}
                className="text-xs"
              >
                Volver
              </Button>
              <Button size="sm" color="primary" startContent={<Download size={14} />} className="text-xs">
                Exportar
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* ── Grid de secciones ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Datos personales */}
        <SectionCard title="Datos personales" icon={User}>
          <Field label="Nombres" value={empleado.nombre} />
          <Field label="Apellidos" value={empleado.apellidos} />
          <Field label="Género" value={empleado.genero} />
          <Field label="Estado civil" value={empleado.estadoCivil} />
          <Field label="Fecha de nacimiento" value={empleado.fechaNacimiento} />
          <Field label="Edad" value={empleado.edad ? `${empleado.edad} años` : null} />
          <Field label="Nacionalidad" value={empleado.nacionalidad} />
        </SectionCard>

        {/* Contacto */}
        <SectionCard title="Contacto" icon={Mail}>
          <Field label="Correo electrónico" value={empleado.correo} />
          <Field label="Teléfono móvil" value={empleado.telefonoMovil} />
        </SectionCard>

        {/* Ubicación */}
        <SectionCard title="Ubicación" icon={MapPin}>
          <Field label="Dirección" value={empleado.direccion} />
          <Field label="Departamento" value={empleado.departamento} />
          <Field label="Provincia" value={empleado.provincia} />
          <Field label="Distrito" value={empleado.distrito} />
        </SectionCard>

        {/* Contacto de emergencia */}
        <SectionCard title="Contacto de emergencia" icon={Phone}>
          <Field label="Nombre" value={empleado.contactoEmergenciaNombre} />
          <Field label="Teléfono" value={empleado.contactoEmergenciaTelefono} />
          <Field label="Parentesco" value={empleado.contactoEmergenciaParentesco} />
        </SectionCard>

        {/* Información laboral — ocupa todo el ancho */}
        <SectionCard title="Información laboral" icon={Briefcase} className="lg:col-span-2">
          <Field label="Cargo" value={empleado.cargoActual} />
          <Field label="Salario" value={empleado.salarioActual ? `S/ ${empleado.salarioActual}` : null} />
          <Field label="Tipo de contrato" value={empleado.tipoContrato} />
          <Field label="Tipo de jornada" value={empleado.tipoJornada} />
          <Field label="Fecha de ingreso" value={empleado.fechaIngresoActual} />
        </SectionCard>

        {/* Datos bancarios */}
        <SectionCard title="Datos bancarios" icon={Landmark}>
          <Field label="Banco" value={empleado.bancoNombre} />
          <Field label="Número de cuenta" value={empleado.numeroCuentaBancaria} />
          <Field label="CCI" value={empleado.cci} />
          <Field label="Tipo de cuenta" value={empleado.tipoCuenta} />
        </SectionCard>

        {/* Pensiones y salud */}
        <SectionCard title="Pensiones y salud" icon={HeartPulse}>
          <Field label="Sistema de pensiones" value={empleado.sistemaPensiones} />
          <Field label="CUSPP" value={empleado.cuspp} />
          <Field label="N° EsSalud" value={empleado.numeroEssalud} />
        </SectionCard>
      </div>
    </div>
  );
}
