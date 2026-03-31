import { apiEmpleado } from "@/lib/api-empleado";
import { IRegistarEmpleado } from "@/types/Empleado/IRegistrarEmpleado";
import { IVerEmpleado } from "@/types/Empleado/IVerEmpleado";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//! Función para listar empleados
export function listarEmpleados() {
  return apiEmpleado(`${apiUrl}/Empleados`, {
    method: "GET",
  });
}

//! Listar empleado por ID
export async function verEmpleado(id: string): Promise<IVerEmpleado> {
  return apiEmpleado(`${apiUrl}/Empleados/${id}`, {
    method: "GET",
  });
}

//! Función para eliminar empleados, token y rol requrido
export async function eliminarEmpleado(id: string): Promise<void> {
  return apiEmpleado(`${apiUrl}/empleados/${id}`, {
    method: "DELETE",
  });
}

//! Función para registrar empleados, token y rol requrido
export async function registrarEmpleado(
  payload: IRegistarEmpleado, // recibe del formulario
): Promise<IRegistarEmpleado> {
  return apiEmpleado(`${apiUrl}/empleados`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
