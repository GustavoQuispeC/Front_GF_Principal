// import { apiCatalogo } from "@/lib/api-catalogo";

// //! Función base privada para evitar repetir el fetch y el manejo de errores
// async function fetchCatalogo(endpoint: string) {
//   return apiCatalogo(`${process.env.NEXT_PUBLIC_API_URL}/catalogos/${endpoint}`, {
//     method: "GET",
//   });
// }

// //? Funciones específicas que usarás en tus componentes
// export const TipoDocumentoListar = () => fetchCatalogo("tipos-documento");
// export const GenerosListar = () => fetchCatalogo("generos");
// export const EstadoCivilListar = () => fetchCatalogo("estados-civiles");
// export const BancosListar = () => fetchCatalogo("tipos-cuenta-bancaria");
// export const SistemaPensionesListar = () => fetchCatalogo("sistemas-pensiones");
// export const NivelesEducativosListar = () =>
//   fetchCatalogo("niveles-educativos");
// export const TiposParentescoListar = () => fetchCatalogo("tipos-parentesco");
// export const TiposContratoListar = () => fetchCatalogo("tipos-contrato");
// export const TiposJornadaListar = () => fetchCatalogo("tipos-jornada");
