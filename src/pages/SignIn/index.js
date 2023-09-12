import React, { useState, useContext } from "react"
import { Platform, ActivityIndicator, Keyboard } from "react-native"
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
    const { signIn, loadingAuth } = useContext(AuthContext)

    function handleLogin() {
        signIn(email, password)
        Keyboard.dismiss()
    }

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
                        secureTextEntry={true}
                    />
                </AreaInput>

                <SubmitButton onPress={handleLogin}>
                    {loadingAuth ? (
                        <ActivityIndicator
                            color="#fff"
                            size={20}
                        />
                    ) : (
                        <SubmitText>Acessar</SubmitText>
                    )}
                </SubmitButton>

                <Link onPress={() => navigation.navigate("SignUp")}>
                    <LinkText>Criar uma conta</LinkText>
                </Link>
            </Container>
        </Background>
    )
}

export default SignIn
