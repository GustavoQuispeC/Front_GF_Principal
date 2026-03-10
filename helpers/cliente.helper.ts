import { apiCliente } from "@/lib/api-cliente";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//! Función para iniciar sesión de cliente
export async function loginCliente(email: string, password: string) {
return apiCliente(`${apiUrl}/auth/login-cliente`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}