import React, { useContext } from "react"
import { useNavigation } from "@react-navigation/native"
import { AuthContext } from "../../contexts/auth"
import { Container, Nome, NewLink, NewText, Logout, LogoutText } from "./styles"
import Header from "../../components/Header"

const Profile = () => {
    const navigation = useNavigation()
    const { user, logout } = useContext(AuthContext)

    return (
        <Container>
            <Header />
            <Nome>{user && user.nome}</Nome>
            <NewLink onPress={() => navigation.navigate("Registrar")}>
                <NewText>Registrar gastos</NewText>
            </NewLink>

            <Logout onPress={() => logout()}>
                <LogoutText>Sair</LogoutText>
            </Logout>
        </Container>
    )
}

export default Profile
