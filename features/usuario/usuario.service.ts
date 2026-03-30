import { apiUsuario } from "@/lib/api-usuario";
import { IListarUsuarios } from "@/types/IListarUsuarios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// 🔹 Listar usuarios
export async function listarUsuarios(): Promise<IListarUsuarios[]> {
  return apiUsuario(`${apiUrl}/Usuarios`, {
    method: "GET",
  });
}
