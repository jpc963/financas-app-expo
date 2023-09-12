import React, { useContext, useState, useEffect } from "react"
import {
    ActivityIndicator,
    Alert,
    Platform,
    TouchableOpacity,
} from "react-native"
import { AuthContext } from "../../contexts/auth"
import { FIREBASE_DB } from "../../../firebaseConfig"
import {
    ref,
    onValue,
    child,
    remove,
    set,
    query,
    limitToLast,
    equalTo,
    orderByChild,
} from "firebase/database"
import Header from "../../components/Header"
import HistoricoList from "../../components/HistoricoList"
import { Background, Container, Nome, Saldo, Title, List, Area } from "./styles"
import Icon from "react-native-vector-icons/Feather"
import DatePicker from "../../components/DatePicker"
import { format } from "date-fns"

const Home = () => {
    const { user } = useContext(AuthContext)
    const uid = user && user.uid
    const [historico, setHistorico] = useState([])
    const [saldo, setSaldo] = useState(0)
    const [refreshing, setRefreshing] = useState(false)
    const [show, setShow] = useState(false)
    const [newDate, setNewDate] = useState(new Date())

    async function loadList() {
        await onValue(ref(FIREBASE_DB, `users/${uid}`), (snapshot) => {
            setSaldo(snapshot.val().saldo)
        })
        await onValue(
            query(
                child(ref(FIREBASE_DB, "historico"), uid),
                orderByChild("date"),
                limitToLast(6),
                equalTo(format(newDate, "dd/MM/yy"))
            ),
            (snapshot) => {
                setHistorico([])
                snapshot.forEach((child) => {
                    let list = {
                        key: child.key,
                        tipo: child.val().tipo,
                        valor: child.val().valor,
                        date: child.val().date,
                    }
                    setHistorico((oldArray) => [...oldArray, list])
                })
            }
        )
    }

    useEffect(() => {
        loadList()
        setRefreshing(false)
    }, [refreshing, newDate])

    function handleDelete(data) {
        Alert.alert(
            "Excluir",
            `Deseja excluir ${data.tipo} no valor de R$ ${data.valor}?`,
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Confirmar",
                    onPress: () => {
                        handleDeleteSuccess(data)
                    },
                },
            ]
        )
    }

    async function handleDeleteSuccess(data) {
        await remove(ref(FIREBASE_DB, `historico/${uid}/${data.key}`))
            .then(async () => {
                let saldoAtual = saldo
                data.tipo === "despesa"
                    ? (saldoAtual += parseFloat(data.valor))
                    : (saldoAtual -= parseFloat(data.valor))
                await set(
                    ref(FIREBASE_DB, `users/${uid}/saldo`),
                    saldoAtual
                ).then(() => {
                    setSaldo(saldoAtual)
                })
            })
            .catch((error) => {
                console.log(`ERRO: ${error} | ${error.code}`)
            })
    }

    function handleShowPicker() {
        setShow(true)
    }

    function handleClose() {
        setShow(false)
    }

    const onChange = (date) => {
        setShow(Platform.OS === "ios")
        setNewDate(date)
    }

    return (
        <Background>
            <Header />
            <Container>
                <Nome>{user && user.nome}</Nome>
                <Saldo>
                    R${" "}
                    {saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                </Saldo>
            </Container>

            <Area>
                <TouchableOpacity onPress={handleShowPicker}>
                    <Icon
                        name="calendar"
                        color={"#fff"}
                        size={20}
                    />
                </TouchableOpacity>
                <Title>Ultimas transações</Title>
                <TouchableOpacity onPress={() => setRefreshing(true)}>
                    <Icon
                        name="refresh-cw"
                        size={20}
                        color={"#fff"}
                    />
                </TouchableOpacity>
            </Area>

            {refreshing ? (
                <ActivityIndicator
                    size="large"
                    color="#fff"
                />
            ) : (
                <List
                    showsVerticalScrollIndicator={false}
                    data={historico}
                    keyExtractor={(item) => item.key}
                    renderItem={({ item }) => (
                        <HistoricoList
                            data={item}
                            deleteItem={handleDelete}
                        />
                    )}
                />
            )}

            {show && (
                <DatePicker
                    onClose={handleClose}
                    date={newDate}
                    onChange={onChange}
                />
            )}
        </Background>
    )
}

export default Home
