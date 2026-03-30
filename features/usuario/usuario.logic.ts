import { getAuthUser } from "@/shared/auth/auth.service";
import { listarUsuarios } from "./usuario.service";

export async function listarUsuariosSegunRol() {
  const user = getAuthUser();

  if (!user) {
    throw new Error("No autenticado");
  }

  return listarUsuarios();
}
