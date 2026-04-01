import { getAuthUser } from "@/shared/auth/auth.service";
import { listarCargosApi as listarCargosService } from "@/features/cargo";

export async function listarCargos() {
  const user = getAuthUser();

  if (!user) {
    throw new Error("No autenticado");
  }

  return listarCargosService();
}
