import { createContext, useContext } from "react";

const AuthContext = createContext({
    token:null
})

export const AuthProvider = AuthContext.Provider

export default function useAuth(){
    return useContext(AuthContext)
}