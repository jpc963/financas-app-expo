import styled from "styled-components/native"

export const Background = styled.View`
    flex: 1;
    background-color: #131313;
`

export const Container = styled.View`
    margin-left: 15px;
    margin-bottom: 25px;
`

export const Nome = styled.Text`
    font-size: 19px;
    color: #fff;
    font-style: italic;
`

export const Saldo = styled.Text`
    margin-top: 5px;
    font-size: 30px;
    color: #fff;
    font-weight: bold;
`

export const Area = styled.View`
    flex-direction: row;
    justify-content: center;
    gap: 50px;
    margin-bottom: 10px;
`

export const Title = styled.Text`
    color: #00b94a;
`

export const List = styled.FlatList.attrs({
    marginHorizontal: 15,
})`
    padding-top: 15px;
    background-color: #fff;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    margin-left: 8px;
    margin-right: 8px;
`
