import { ILoginResponse, IUserData } from "@/types/Auth/IAuth";
import { jwtDecode } from "jwt-decode";

//! --- Constante unificada según tu LocalStorage ---
const AUTH_KEY = "auth_usuario";

export const saveAuthData = (data: ILoginResponse) => {
  if (typeof window === "undefined") return;

  try {
    // 1. Decodificamos para extraer el Rol de los claims de .NET
    const decoded: any = jwtDecode(data.token);
    const rol = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    // 2. Preparamos el objeto final (IUserData)
    const authData: IUserData = {
      token: data.token,
      email: data.email,
      nombreCompleto: data.nombreCompleto,
      expiresAt: data.expiresAt,
      rol: rol || "User" 
    };

    // 3. Guardamos bajo la llave que ya estás usando en el navegador
    localStorage.setItem(AUTH_KEY, JSON.stringify(authData));

  } catch (error) {
    console.error("Error al procesar el login:", error);
  }
};

//! --- Obtener los datos (Token, Email, Nombre, Rol) ---
export const getAuthUser = (): IUserData | null => {
  if (typeof window === "undefined") return null;
  
  const data = localStorage.getItem(AUTH_KEY);
  if (!data) return null;

  try {
    return JSON.parse(data) as IUserData;
  } catch (error) {
    console.error("Error al parsear auth_usuario:", error);
    return null;
  }
};

//! --- Función para cerrar sesión ---
export const logout = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_KEY);
  window.location.href = "/"; 
};