import React, { useContext, useState } from "react"
import { Platform, ActivityIndicator } from "react-native"
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
    const { signUp, loadingAuth } = useContext(AuthContext)

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
                        secureTextEntry={true}
                    />
                </AreaInput>

                <SubmitButton onPress={handleSignUp}>
                    {loadingAuth ? (
                        <ActivityIndicator
                            color="#fff"
                            size={20}
                        />
                    ) : (
                        <SubmitText>Cadastrar</SubmitText>
                    )}
                </SubmitButton>
            </Container>
        </Background>
    )
}

export default SignIn
