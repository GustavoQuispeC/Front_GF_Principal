import { useCallback, useEffect, useState } from "react";
import { listarEmpleados } from "../empleado.service";
import { IEmpleadosListar } from "@/features/empleado/empleado.types";

export function useEmpleados() {
  const [empleados, setEmpleados] = useState<IEmpleadosListar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmpleados = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await listarEmpleados();
      setEmpleados(data ?? []);
    } catch (err) {
      console.error("Error al obtener empleados:", err);
      setError("Error al cargar empleados");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmpleados();
  }, [fetchEmpleados]);

  return { empleados, loading, error, refetch: fetchEmpleados };
}
