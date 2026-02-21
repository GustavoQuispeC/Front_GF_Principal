

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function loginUsuario(email: string, password: string) {
  try {
    const response = await fetch(`${apiUrl}/Auth/login/usuario`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud: " + response.statusText);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
}
