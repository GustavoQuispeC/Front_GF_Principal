import { apiDni } from "@/lib/api-dni";
import { IBuscarDni } from "@/types/IBuscarDni";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function buscarDni(dni: string): Promise<IBuscarDni> {
  const url = `${apiUrl}/dni/${dni}`;
  return apiDni(url);
}
