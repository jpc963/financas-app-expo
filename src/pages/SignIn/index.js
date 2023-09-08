import React, { useState, useContext } from "react"
import { Platform } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { AuthContext } from "../../contexts/auth"

import {
    Background,
    Container,
    Logo,
    AreaInput,
    Input,
    SubmitButton,
    SubmitText,
    Link,
    LinkText,
} from "./styles"

const SignIn = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { user } = useContext(AuthContext)

    function handleLogin() {}

    return (
        <Background>
            <Container
                behavior={Platform.OS === "ios" ? "padding" : ""}
                enabled
            >
                <Logo source={require("../../assets/logo.png")} />

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

                <SubmitButton onPress={handleLogin}>
                    <SubmitText>Acessar</SubmitText>
                </SubmitButton>

                <Link onPress={() => navigation.navigate("SignUp")}>
                    <LinkText>Criar uma conta</LinkText>
                </Link>
            </Container>
        </Background>
    )
}

export default SignIn
