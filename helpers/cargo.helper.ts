import { getAuthUser } from "./authorization";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function listarCargos() {
    const user = getAuthUser();
      const token = user?.token;
      if (!token) throw new Error("No hay token en localStorage: revisar");
  try {
    const response = await fetch(`${apiUrl}/Cargos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud: " + response.statusText);
    }

    const data = await response.json(); 
    return data; 
   

  } catch (error) {
    console.log("Error al obtener el listado de cargos", error);
    throw error;
  }
}