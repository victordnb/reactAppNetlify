import { createContext } from "react";

export const AuthContext = createContext({
    logged: false,
    register: () => {},
    login: () => {},
    logout: () => {},
});
