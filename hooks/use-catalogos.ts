import { useState, useEffect } from "react";
import {
  BancosListar,
  EstadoCivilListar,
  GenerosListar,
  NivelesEducativosListar,
  SistemaPensionesListar,
  TipoDocumentoListar,
  TiposContratoListar,
  TiposJornadaListar,
  TiposParentescoListar,
} from "@/helpers/catalogo.helper";

interface Catalogos {
  TiposDocumentos: any[];
  Generos: any[];
  EstadosCiviles: any[];
  TiposCuentaBancaria: any[];
  SistemasPensiones: any[];
  NivelesEducativos: any[];
  TiposParentesco: any[];
  TiposContrato: any[];
  TiposJornada: any[];
}

const initialCatalogos: Catalogos = {
  TiposDocumentos: [],
  Generos: [],
  EstadosCiviles: [],
  TiposCuentaBancaria: [],
  SistemasPensiones: [],
  NivelesEducativos: [],
  TiposParentesco: [],
  TiposContrato: [],
  TiposJornada: [],
};

export function useCatalogos() {
  const [catalogos, setCatalogos] = useState<Catalogos>(initialCatalogos);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function cargarCatalogos() {
      try {
        setLoading(true);
        const [
          tiposDocumentos,
          generos,
          estadoCivil,
          tiposCuentaBancaria,
          sistemaPensiones,
          nivelesEducativos,
          tiposParentesco,
          tiposContrato,
          tiposJornada,
        ] = await Promise.all([
          TipoDocumentoListar(),
          GenerosListar(),
          EstadoCivilListar(),
          BancosListar(),
          SistemaPensionesListar(),
          NivelesEducativosListar(),
          TiposParentescoListar(),
          TiposContratoListar(),
          TiposJornadaListar(),
        ]);

        setCatalogos({
          TiposDocumentos: tiposDocumentos || [],
          Generos: generos || [],
          EstadosCiviles: estadoCivil || [],
          TiposCuentaBancaria: tiposCuentaBancaria || [],
          SistemasPensiones: sistemaPensiones || [],
          NivelesEducativos: nivelesEducativos || [],
          TiposParentesco: tiposParentesco || [],
          TiposContrato: tiposContrato || [],
          TiposJornada: tiposJornada || [],
        });
      } catch (err) {
        console.error("Error en la carga masiva de catálogos:", err);
        setError("Error al cargar los catálogos");
      } finally {
        setLoading(false);
      }
    }

    cargarCatalogos();
  }, []);

  return { catalogos, loading, error };
}