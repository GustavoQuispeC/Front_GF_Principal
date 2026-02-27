export interface ILoginResponse {
    token:          string;
    email:          string;
    nombreCompleto: string;
    expiresAt:      string;
}

export interface IUserData extends ILoginResponse {
    rol: string; //? Aquí se guarda el rol extraído del JWT
}