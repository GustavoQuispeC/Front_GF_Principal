"use client";
import { VerEmpleado as fetchEmpleado } from "@/helpers/empleado.helper";
import { IVerEmpleado } from "@/types/Empleado/IVerEmpleado";
import {
  ArrowLeft,
  Download,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Landmark,
  CreditCard,
  HeartPulse,
} from "lucide-react";
import { useEffect, useState } from "react";

// 👉 props correctas
interface Props {
  id: string;
  onVolver?: () => void;
}

const Section = ({ title, icon: Icon, children }: any) => (
  <div className="bg-white rounded-2xl shadow p-4">
    <div className="flex items-center gap-2 mb-3">
      <Icon className="w-5 h-5 text-blue-600" />
      <h2 className="font-semibold text-lg">{title}</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">{children}</div>
  </div>
);

const Item = ({ label, value }: any) => (
  <div>
    <p className="text-gray-500">{label}</p>
    <p className="font-medium">{value || "-"}</p>
  </div>
);

export default function DetalleEmpleado({ id, onVolver }: Props) {
  const [empleado, setEmpleado] = useState<IVerEmpleado | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEmpleado = async () => {
      try {
        const data = await fetchEmpleado(id);
        setEmpleado(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    getEmpleado();
  }, [id]);

  if (loading) {
    return <p>Cargando empleado...</p>;
  }

  if (!empleado) {
    return <p>No se encontró el empleado</p>;
  }

  return (
    <div className="p-4 md:p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src={empleado.fotoUrl ?? "/avatar.png"}
            alt="foto"
            className="w-16 h-16 rounded-full object-cover border"
          />
          <div>
            <h1 className="text-xl font-bold">{empleado.nombreCompleto}</h1>
            <p className="text-sm text-gray-500">
              {empleado.codigoEmpleado} • {empleado.cargoActual}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onVolver?.()}
            className="flex items-center gap-2 px-4 py-2 border rounded-xl hover:bg-gray-100"
          >
            <ArrowLeft size={16} /> Volver
          </button>

          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
            <Download size={16} /> Exportar
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Section title="Datos personales" icon={User}>
          <Item label="Nombre" value={empleado.nombre} />
          <Item label="Apellidos" value={empleado.apellidos} />
          <Item label="Género" value={empleado.genero} />
          <Item label="Estado civil" value={empleado.estadoCivil} />
          <Item label="Fecha nacimiento" value={empleado.fechaNacimiento} />
          <Item label="Edad" value={empleado.edad} />
          <Item label="Nacionalidad" value={empleado.nacionalidad} />
        </Section>

        <Section title="Contacto" icon={Mail}>
          <Item label="Correo" value={empleado.correo} />
          <Item label="Teléfono" value={empleado.telefonoMovil} />
        </Section>

        <Section title="Ubicación" icon={MapPin}>
          <Item label="Dirección" value={empleado.direccion} />
          <Item label="Departamento" value={empleado.departamento} />
          <Item label="Provincia" value={empleado.provincia} />
          <Item label="Distrito" value={empleado.distrito} />
        </Section>

        <Section title="Contacto de emergencia" icon={HeartPulse}>
          <Item label="Nombre" value={empleado.contactoEmergenciaNombre} />
          <Item label="Teléfono" value={empleado.contactoEmergenciaTelefono} />
          <Item label="Parentesco" value={empleado.contactoEmergenciaParentesco} />
        </Section>

        <Section title="Información laboral" icon={Briefcase}>
          <Item label="Cargo" value={empleado.cargoActual} />
          <Item label="Salario" value={`S/ ${empleado.salarioActual}`} />
          <Item label="Contrato" value={empleado.tipoContrato} />
          <Item label="Jornada" value={empleado.tipoJornada} />
          <Item label="Ingreso" value={empleado.fechaIngresoActual} />
        </Section>

        <Section title="Datos bancarios" icon={Landmark}>
          <Item label="Banco" value={empleado.bancoNombre} />
          <Item label="Cuenta" value={empleado.numeroCuentaBancaria} />
          <Item label="CCI" value={empleado.cci} />
          <Item label="Tipo cuenta" value={empleado.tipoCuenta} />
        </Section>

        <Section title="Sistema de pensiones" icon={CreditCard}>
          <Item label="Sistema" value={empleado.sistemaPensiones} />
          <Item label="CUSPP" value={empleado.cuspp} />
          <Item label="ESSALUD" value={empleado.numeroEssalud} />
        </Section>
      </div>
    </div>
  );
}
