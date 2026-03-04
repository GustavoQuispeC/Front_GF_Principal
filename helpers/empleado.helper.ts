import { IRegistarEmpleado } from "@/types/IRegistrarEmpleado";
import { getAuthUser } from "./authorization";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//! Función para listar empleados
export async function ListarEmpleados() {
  try {
    const response = await fetch(`${apiUrl}/Empleados`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Error en la solicitud: " + response.statusText);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error al obtener los empleados.", error);
    throw error;
  }
}

//! Función base privada para evitar repetir el fetch y el manejo de errores
async function fetchCatalogo(endpoint: string) {
  try {
    const response = await fetch(`${apiUrl}/Catalogos/${endpoint}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Error en ${endpoint}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error al obtener catálogo: ${endpoint}`, error);
    throw error;
  }
}

//? Funciones específicas que usarás en tus componentes
export const TipoDocumentoListar = () => fetchCatalogo("tipos-documento");
export const GenerosListar = () => fetchCatalogo("generos");
export const EstadoCivilListar = () => fetchCatalogo("estados-civiles");
export const BancosListar = () => fetchCatalogo("tipos-cuenta-bancaria");
export const SistemaPensionesListar = () => fetchCatalogo("sistemas-pensiones");
export const NivelesEducativosListar = () => fetchCatalogo("niveles-educativos");
export const TiposParentescoListar = () => fetchCatalogo("tipos-parentesco");
export const TiposContratoListar = () => fetchCatalogo("tipos-contrato");
export const TiposJornadaListar = () => fetchCatalogo("tipos-jornada");

//! Función para registrar empleados, token y rol requrido
export async function registrarEmpleado(
  payload: IRegistarEmpleado, // 👈 recibe el formulario
): Promise<IRegistarEmpleado> {
  const user = getAuthUser();
  const token = user?.token;
  const rol = user?.rol;

  if (rol !== "Admin" && rol !== "Supervisor")// 👈 ambos roles
    throw new Error("No tienes permisos para registrar empleados");

  if (!token) throw new Error("No hay token en localStorage: revisar");

  const response = await fetch(`${apiUrl}/empleados`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload ),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(
      `Error en la solicitud: ${response.status} ${response.statusText} ${body}`,
    );
  }

  return response.json();
}
