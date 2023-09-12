import React, { useState, useContext } from "react"
import {
    SafeAreaView,
    Keyboard,
    TouchableWithoutFeedback,
    Alert,
} from "react-native"
import { AuthContext } from "../../contexts/auth"
import { format } from "date-fns"
import { FIREBASE_DB } from "../../../firebaseConfig"
import { set, child, ref, push, get } from "firebase/database"

import Header from "../../components/Header"
import Picker from "../../components/Picker"
import { Background, SubmitButton, SubmitText, Input } from "./styles"
import { useNavigation } from "@react-navigation/native"

const New = () => {
    const [valor, setValor] = useState("")
    const [tipo, setTipo] = useState("receita")
    const navigation = useNavigation()
    const { user: usuario } = useContext(AuthContext)

    function handleSubmit() {
        Keyboard.dismiss()
        if (isNaN(parseFloat(valor)) || tipo === null) {
            alert("Preencha os campos corretamente")
            return
        }

        Alert.alert(
            "Confirmando dados",
            `Tipo de transação: ${tipo}\nValor: ${parseFloat(valor)}`,
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Confirmar",
                    onPress: () => handleAdd(),
                },
            ]
        )
    }

    async function handleAdd() {
        let uid = usuario.uid
        let key = await push(child(ref(FIREBASE_DB, "historico"), uid)).key

        await set(child(ref(FIREBASE_DB, `historico/${uid}`), key), {
            tipo: tipo,
            valor: parseFloat(valor),
            date: format(new Date(), "dd/MM/yy"),
        })

        let saldoAtual = (
            await get(ref(FIREBASE_DB, `users/${uid}/saldo`))
        ).val()
        await set(
            ref(FIREBASE_DB, `users/${uid}/saldo`),
            tipo === "receita"
                ? saldoAtual + parseFloat(valor)
                : saldoAtual - parseFloat(valor)
        )

        Keyboard.dismiss()
        setValor("")
        navigation.navigate("Home")
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <Background>
                <Header />
                <SafeAreaView style={{ alignItems: "center" }}>
                    <Input
                        placeholder="Valor desejado"
                        keyboardType="numeric"
                        returnKeyType="next"
                        onSubmitEditing={() => Keyboard.dismiss()}
                        value={valor}
                        onChangeText={(e) => setValor(e)}
                    />

                    <Picker
                        onChange={setTipo}
                        tipo={tipo}
                    />

                    <SubmitButton onPress={handleSubmit}>
                        <SubmitText>Registrar</SubmitText>
                    </SubmitButton>
                </SafeAreaView>
            </Background>
        </TouchableWithoutFeedback>
    )
}

export default New
