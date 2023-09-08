import React, { useState, createContext } from "react"
import { FIREBASE_DB, FIREBASE_AUTH } from "../../firebaseConfig"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { ref, child, set } from "firebase/database"

export const AuthContext = createContext({})

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    async function signUp(email, password, nome) {
        await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
            .then(async (value) => {
                await set(child(ref(FIREBASE_DB, "users"), value.user.uid), {
                    saldo: 0,
                    nome: nome,
                }).then(() => {
                    data = {
                        uid: value.user.uid,
                        nome: nome,
                        email: value.user.email,
                    }
                    setUser(data)
                })
            })
            .catch((error) => {
                console.log(`ERRO: ${error} | ${error.code}`)
                return
            })
    }

    return (
        // sidned: !!user ---> se tiver algo no usuário o signed será true
        <AuthContext.Provider value={{ signed: !!user, user, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
