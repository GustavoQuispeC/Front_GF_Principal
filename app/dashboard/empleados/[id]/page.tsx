"use client";
import DetalleEmpleado from "@/components/empleado/ver-empleado/ver-empleado";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function DetalleEmpleadoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // 🔥 AQUÍ está el cambio
  const router = useRouter();

  // if (!id) {
  //   return <p>No se encontró el empleado</p>;
  // }

  return <DetalleEmpleado id={id} />;
}
