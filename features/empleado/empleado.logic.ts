import { getAuthUser } from "@/shared/auth/auth.service";
import { IRegistarEmpleado } from "@/types/Empleado/IRegistrarEmpleado";

//! eliminar empleado con validación
export async function eliminarEmpleado(id: string): Promise<void> {
  const user = getAuthUser();
  const rol = user?.rol;

  if (rol !== "Admin") {
    throw new Error("No tienes permisos para eliminar empleados");
  }

  return eliminarEmpleado(id);
}

//! registrar empleado con validación
export async function registrarEmpleado(
  payload: IRegistarEmpleado, // recibe del formulario
): Promise<IRegistarEmpleado> {
  const user = getAuthUser();
  const rol = user?.rol;

  if (rol !== "Admin" && rol !== "Supervisor") {
    throw new Error("No tienes permisos para registrar empleados");
  }

  return registrarEmpleado(payload);
}
