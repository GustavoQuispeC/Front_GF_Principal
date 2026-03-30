"use client";
import DetalleEmpleado from "@/components/empleado/ver-empleado/ver-empleado";
import { use } from "react";

export default function DetalleEmpleadoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  if (!id) {
    return <p>No se encontró el empleado</p>;
  }

  return <DetalleEmpleado id={id} />;
}
