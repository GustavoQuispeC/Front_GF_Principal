import { IRegistarEmpleado } from "@/types/IRegistrarEmpleado";
import { getAuthUser } from "./authorization";
import { apiEmpleado } from "@/lib/api-empleado";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//! Función para listar empleados
export function ListarEmpleados() {
  return apiEmpleado(`${apiUrl}/Empleados`, {
    method: "GET",
  });
}

//! Función para registrar empleados, token y rol requrido
export async function registrarEmpleado(
  payload: IRegistarEmpleado, // recibe del formulario
): Promise<IRegistarEmpleado> {
  const user = getAuthUser();

  const rol = user?.rol;

  if (rol !== "Admin" && rol !== "Supervisor") {
    throw new Error("No tienes permisos para registrar empleados");
  }

  return apiEmpleado(`${apiUrl}/empleados`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
