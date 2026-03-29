import { useState, useEffect } from "react";

import { IListarCargos } from "@/types/IListarCargos";
import { listarCargos } from "@/features/cargo/cargo.service";

export function useCargos() {
  const [cargos, setCargos] = useState<IListarCargos[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarCargos = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await listarCargos();
        setCargos(response ?? []);
      } catch (err) {
        console.error("Error al cargar cargos:", err);
        setError("Error al cargar los cargos");
      } finally {
        setLoading(false);
      }
    };

    cargarCargos();
  }, []);

  return { cargos, loading, error };
}
