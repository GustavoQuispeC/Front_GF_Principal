const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//! Función para iniciar sesión de cliente
export async function loginCliente(email: string, password: string) {
  const response = await fetch(`${apiUrl}/Auth/login/cliente`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const text = await response.text();

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = text;
  }

  if (!response.ok) {
    const msg =
      data?.error || data?.message || data?.title || text || "Error de autenticación";

    throw new Error(msg);
  }

  return data;
}