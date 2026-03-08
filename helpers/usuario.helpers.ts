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

  if (!response.ok) {
    let msg = `Error ${response.status}`;
    try {
      const text = await response.text();
      try {
        const body = JSON.parse(text);
        msg = body?.error || body?.message || body?.title || text;
      } catch {
        // Si no es JSON, usa el texto plano devuelto por el backend
        msg = text || msg;
      }
    } catch {
      // Ignorar fallback
    }

    throw new Error(msg); // mensaje real de la API
  }

  return response.json();
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
