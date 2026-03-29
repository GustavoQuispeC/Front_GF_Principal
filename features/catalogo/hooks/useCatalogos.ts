import { useState, useEffect } from "react";

import {
  listarBancos,
  listarEstadosCiviles,
  listarGeneros,
  listarNivelesEducativos,
  listarSistemasPensiones,
  listarTiposDocumento,
  listarTiposContrato,
  listarTiposJornada,
  listarTiposParentesco,
} from "@/features/catalogo/catalogo.service";

// 🔹 Ideal: luego tipar bien cada catálogo (por ahora lo dejamos genérico)
interface Catalogos {
  tiposDocumentos: any[];
  generos: any[];
  estadosCiviles: any[];
  tiposCuentaBancaria: any[];
  sistemasPensiones: any[];
  nivelesEducativos: any[];
  tiposParentesco: any[];
  tiposContrato: any[];
  tiposJornada: any[];
}

const initialCatalogos: Catalogos = {
  tiposDocumentos: [],
  generos: [],
  estadosCiviles: [],
  tiposCuentaBancaria: [],
  sistemasPensiones: [],
  nivelesEducativos: [],
  tiposParentesco: [],
  tiposContrato: [],
  tiposJornada: [],
};

export function useCatalogos() {
  const [catalogos, setCatalogos] = useState<Catalogos>(initialCatalogos);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarCatalogos = async () => {
      try {
        setLoading(true);
        setError(null);

        const [
          tiposDocumentos,
          generos,
          estadosCiviles,
          tiposCuentaBancaria,
          sistemasPensiones,
          nivelesEducativos,
          tiposParentesco,
          tiposContrato,
          tiposJornada,
        ] = await Promise.all([
          listarTiposDocumento(),
          listarGeneros(),
          listarEstadosCiviles(),
          listarBancos(),
          listarSistemasPensiones(),
          listarNivelesEducativos(),
          listarTiposParentesco(),
          listarTiposContrato(),
          listarTiposJornada(),
        ]);

        setCatalogos({
          tiposDocumentos: tiposDocumentos ?? [],
          generos: generos ?? [],
          estadosCiviles: estadosCiviles ?? [],
          tiposCuentaBancaria: tiposCuentaBancaria ?? [],
          sistemasPensiones: sistemasPensiones ?? [],
          nivelesEducativos: nivelesEducativos ?? [],
          tiposParentesco: tiposParentesco ?? [],
          tiposContrato: tiposContrato ?? [],
          tiposJornada: tiposJornada ?? [],
        });
      } catch (err) {
        console.error("Error en la carga masiva de catálogos:", err);
        setError("Error al cargar los catálogos");
      } finally {
        setLoading(false);
      }
    };

    cargarCatalogos();
  }, []);

  return { catalogos, loading, error };
}
