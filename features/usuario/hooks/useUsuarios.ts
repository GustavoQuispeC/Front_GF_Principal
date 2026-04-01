import { useCallback, useEffect, useState } from "react";
import { listarUsuarios } from "../usuario.logic";
import { ListarUsuarios } from "../usuario.types";

export function useUsuarios() {
  const [usuarios, setUsuarios] = useState<ListarUsuarios[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsuarios = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await listarUsuarios();
      setUsuarios(data ?? []);
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
      setError("Error al cargar usuarios");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsuarios();
  }, [fetchUsuarios]);

  return { usuarios, loading, error, refetch: fetchUsuarios };
}
