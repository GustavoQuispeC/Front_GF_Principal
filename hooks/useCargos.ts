import { useState, useEffect } from "react";
import { listarCargos } from "@/helpers/cargo.helper";
import { IListarCargos } from "@/types/IListarCargos";

export function useCargos() {
  const [cargos, setCargos] = useState<IListarCargos[]>([]);
  const [loadingCargos, setLoadingCargos] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function cargarCargos() {
      try {
        setLoadingCargos(true);
        const response = await listarCargos();
        setCargos(response || []);
      } catch (err) {
        console.error("Error al cargar cargos:", err);
        setError("Error al cargar los cargos");
      } finally {
        setLoadingCargos(false);
      }
    }

    cargarCargos();
  }, []);

  return { cargos, loadingCargos, error };
}