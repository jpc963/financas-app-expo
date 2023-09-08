import React, { useContext, useState } from "react"
import { Platform } from "react-native"
import { AuthContext } from "../../contexts/auth"

import {
    Background,
    Container,
    AreaInput,
    Input,
    SubmitButton,
    SubmitText,
} from "../SignIn/styles"

const SignIn = () => {
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { signUp } = useContext(AuthContext)

    function handleSignUp() {
        signUp(email, password, nome)
    }

    return (
        <Background>
            <Container
                behavior={Platform.OS === "ios" ? "padding" : ""}
                enabled
            >
                <AreaInput>
                    <Input
                        placeholder="Nome"
                        autoCorrect={false}
                        autoCaptalize="none"
                        value={nome}
                        onChangeText={(e) => setNome(e)}
                    />
                </AreaInput>
                <AreaInput>
                    <Input
                        placeholder="Email"
                        autoCorrect={false}
                        autoCaptalize="none"
                        value={email}
                        onChangeText={(e) => setEmail(e)}
                    />
                </AreaInput>
                <AreaInput>
                    <Input
                        placeholder="Senha"
                        autoCorrect={false}
                        autoCaptalize="none"
                        value={password}
                        onChangeText={(e) => setPassword(e)}
                    />
                </AreaInput>

                <SubmitButton onPress={handleSignUp}>
                    <SubmitText>Cadastrar</SubmitText>
                </SubmitButton>
            </Container>
        </Background>
    )
}

export default SignIn
