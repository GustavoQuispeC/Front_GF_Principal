"use client";

import { RegistrarEmpleados } from "@/components";
import { useRouter } from "next/navigation";

export default function NuevoEmpleadoPage() {
  const router = useRouter();

  return <RegistrarEmpleados onBack={() => router.push("/dashboard/empleados")} />;
}
