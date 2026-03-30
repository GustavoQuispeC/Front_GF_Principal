import { apiUsuario } from "@/lib/api-usuario";
import { IListarUsuarios } from "@/types/IListarUsuarios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//!  Listar usuarios
export async function listarUsuarios(): Promise<IListarUsuarios[]> {
  return apiUsuario(`${apiUrl}/Usuarios`, {
    method: "GET",
  });
}

//! Función para iniciar sesión de usuario
export function loginUsuario(email: string, password: string) {
  return apiUsuario(`${apiUrl}/Auth/login/usuario`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}
