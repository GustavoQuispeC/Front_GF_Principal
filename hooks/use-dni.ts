import { buscarDni } from "@/helpers/dni.helper";
import { IBuscarDni } from "@/types/IBuscarDni";
import { useState } from "react";

export function useDni() {
  const [dniData, setDniData] = useState<IBuscarDni | null>(null);
  const [loadingDni, setLoadingDni] = useState(false);
  const [errorDni, setErrorDni] = useState<string | null>(null);

  const consultarDni = async (dni: string) => {
    try {
      setLoadingDni(true);
      setErrorDni(null);
      setDniData(null);

      const response = await buscarDni(dni);
      setDniData(response ?? null);
      return response;
    } catch (error) {
      setDniData(null);
      setErrorDni("DNI no encontrado");
      return null;
    } finally {
      setLoadingDni(false);
    }
  };
  const resetDni = () => {
    setDniData(null);
    setErrorDni(null);
    setLoadingDni(false);
  };

  return {
    dniData,
    loadingDni,
    errorDni,
    consultarDni,
    resetDni,
  };
}
