import { apiAuth } from "./api";


export const RegisterUser = async ( data: {
    name: string;
    email: string;
    password: string;
    role: string;
}) => {
    return await apiAuth.post("/register", data)
}

export const LoginUser = async ( data: {
    email: string;
    password: string;
}) => {
    return await apiAuth.post("/login", data)
}
