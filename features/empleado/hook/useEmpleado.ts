import { useEffect, useState } from "react";
import { verEmpleado } from "@/features/empleado/empleado.service";
import { IVerEmpleado } from "@/types/Empleado/IVerEmpleado";

export function useEmpleado(id: string) {
  const [empleado, setEmpleado] = useState<IVerEmpleado | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchEmpleado = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await verEmpleado(id);
        setEmpleado(data);
      } catch (err) {
        console.error("Error al obtener empleado:", err);
        setError("Error al cargar empleado");
      } finally {
        setLoading(false);
      }
    };

    fetchEmpleado();
  }, [id]);

  return { empleado, loading, error };
}
