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
export const GenerosListar = () => fetchCatalogo("generos"); // Estaba en singular antes
export const EstadoCivilListar = () => fetchCatalogo("estados-civiles"); // Usar guion
export const BancosListar = () => fetchCatalogo("tipos-cuenta-bancaria"); // Corregido
export const SistemaPensionesListar = () => fetchCatalogo("sistemas-pensiones");
export const NivelesEducativosListar = () => fetchCatalogo("niveles-educativos"); // Nuevo
export const TiposParentescoListar = () => fetchCatalogo("tipos-parentesco");
export const TiposContratoListar = () => fetchCatalogo("tipos-contrato"); 
export const TiposJornadaListar = () => fetchCatalogo("tipos-jornada"); 



