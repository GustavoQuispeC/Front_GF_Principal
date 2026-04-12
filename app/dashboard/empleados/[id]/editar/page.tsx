"use client";
import { EditarEmpleado } from "@/components";
import { use } from "react";

export default function EditarEmpleadoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  if (!id) {
    return <p>No se encontró el empleado</p>;
  }
  return <EditarEmpleado id={id} />;
}
