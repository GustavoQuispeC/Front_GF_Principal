import { IListarUsuarios } from "@/types/IListarUsuarios";
import { getAuthUser } from "./authorization";


const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//! Función para iniciar sesión de usuario
export async function loginUsuario(email: string, password: string) {
  const response = await fetch(`${apiUrl}/Auth/login/usuario`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const text = await response.text();

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = text;
  }

  if (!response.ok) {
    const msg =
      data?.error || data?.message || data?.title || text || "Error de autenticación";

    throw new Error(msg);
  }

  return data;
}


//! Función para listar usuarios, token requrido 
export async function listarUsuarios(): Promise<IListarUsuarios[]> {
  const user = getAuthUser();
  const token = user?.token;
  if (!token) throw new Error("No hay token en localStorage: revisar");

  const response = await fetch(`${apiUrl}/usuarios`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

 if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Error en la solicitud: ${response.status} ${response.statusText} ${body}`);
  }
  return response.json();
}
