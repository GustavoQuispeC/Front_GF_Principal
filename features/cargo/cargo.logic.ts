import { getAuthUser } from "@/shared/auth/auth.service";
import { listarCargos } from "./cargo.service";

export async function listarCargosSegunRol() {
  const user = getAuthUser();

  if (!user) {
    throw new Error("No autenticado");
  }

  return listarCargos();
}
