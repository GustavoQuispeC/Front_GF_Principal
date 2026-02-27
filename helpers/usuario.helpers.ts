import { IUsuariosListar } from "@/types/IUsuariosListar";
import { getAuthUser } from "./authorization";


const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//! Función para iniciar sesión de usuario
export async function loginUsuario(email: string, password: string) {
  try {
    const response = await fetch(`${apiUrl}/Auth/login/usuario`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud: " + response.statusText);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
}


//! Función para listar usuarios, token requrido 
export async function UsuariosListar(): Promise<IUsuariosListar[]> {
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
