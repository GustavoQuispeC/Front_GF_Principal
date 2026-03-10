import { IListarUsuarios } from "@/types/IListarUsuarios";
import { getAuthUser } from "./authorization";
import { apiUsuario } from "@/lib/api-usuario";



const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//! Función para iniciar sesión de usuario
export function loginUsuario(email: string, password: string) {

  return apiUsuario(`${apiUrl}/Auth/login/usuario`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

}


//! Función para listar usuarios, token requrido 
export async function listarUsuarios(): Promise<IListarUsuarios[]> {
  const user = getAuthUser();
  
  return apiUsuario(`${apiUrl}/Usuarios`, {
    method: "GET",
  });
}
