import React, { useState, createContext, useEffect } from "react"
import { FIREBASE_DB, FIREBASE_AUTH } from "../../firebaseConfig"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth"
import { ref, child, set, get } from "firebase/database"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const AuthContext = createContext({})

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [loadingAuth, setLoadingAuth] = useState(false)

    useEffect(() => {
        async function loadStorage() {
            const storageUser = await AsyncStorage.getItem("Auth_user")
            if (storageUser) {
                setUser(JSON.parse(storageUser))
                setLoading(false)
            }

            setLoading(false)
        }

        loadStorage()
    }, [])

    async function signIn(email, password) {
        setLoadingAuth(true)
        await signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
            .then(async (value) => {
                await get(
                    child(ref(FIREBASE_DB, "users"), value.user.uid)
                ).then((snapshot) => {
                    data = {
                        uid: value.user.uid,
                        nome: snapshot.val().nome,
                        email: value.user.email,
                    }
                    setUser(data)
                    storageUser(data)
                    setLoadingAuth(false)
                })
            })
            .catch((error) => {
                console.log(`ERRO: ${error} | ${error.code}`)
                setLoadingAuth(false)
            })
    }

    async function signUp(email, password, nome) {
        setLoadingAuth(true)
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
                    storageUser(data)
                    setLoadingAuth(false)
                })
            })
            .catch((error) => {
                console.log(`ERRO: ${error} | ${error.code}`)
                setLoadingAuth(false)
            })
    }

    async function storageUser(data) {
        await AsyncStorage.setItem("Auth_user", JSON.stringify(data))
    }

    async function logout() {
        await signOut(FIREBASE_AUTH)
        await AsyncStorage.clear().then(() => {
            setUser(null)
        })
    }

    return (
        // sidned: !!user ---> se tiver algo no usuário o signed será true
        <AuthContext.Provider
            value={{
                signed: !!user,
                user,
                loading,
                signUp,
                signIn,
                logout,
                loadingAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
