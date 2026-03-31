import { getAuthUser } from "@/shared/auth/auth.service";
import { IRegistarEmpleado } from "@/types/Empleado/IRegistrarEmpleado";
import {
  registrarEmpleado as registrarEmpleadoService,
  eliminarEmpleado as eliminarEmpleadoService,
} from "@/features/empleado/empleado.service";
//! eliminar empleado con validación
export async function eliminarEmpleado(id: string): Promise<void> {
  const user = getAuthUser();
  if (!user) {
    throw new Error("No autenticado");
  }

  if (user.rol !== "Admin" && user.rol !== "Supervisor") {
    throw new Error("No tienes permisos para eliminar empleados");
  }

  return eliminarEmpleadoService(id);
}

//! registrar empleado con validación
export async function registrarEmpleado(
  payload: IRegistarEmpleado, // recibe del formulario
): Promise<IRegistarEmpleado> {
  const user = getAuthUser();
  if (!user) {
    throw new Error("No autenticado");
  }
  if (user.rol !== "Admin" && user.rol !== "Supervisor") {
    throw new Error("No tienes permisos para registrar empleados");
  }

  return registrarEmpleadoService(payload);
}
