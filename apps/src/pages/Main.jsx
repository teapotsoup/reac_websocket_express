import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {useIdStore} from '../state/Session'
import {Btn1} from "../comps/Btn1";
import {Bar, BtnWrapper, Title, Wrapper} from "../comps/comps";

function Main() {
    const navigate = useNavigate();

    const [pwd, setPassword] = useState("")
    const {id, setStoreId} = useIdStore()
    const onId = ({target: {value}}) => setStoreId(value);
    const setPwd = ({target: {value}}) => setPassword(value);

    const logInOrJoin = ({target: {name}}) => {
        let param = {id, password: pwd};
        if (name === 'join') param.join = 'join';
        axios.post('data/joinOrLogIn', param).then(arg => {
            let {result} = arg.data;
            if (result === 'OK') {
                alert('성공!')
                setStoreId(id)
                setTimeout(() => navigate('/chatting-list', {state: {param}}), 10)
            } else {
                alert(`실패 : ${result}`)
            }
            setPassword('')
        })
    }

    return (
        <Wrapper>
            <Title>
                Chat Room
            </Title>

            <Bar>
                <div>ID</div>
                <input type='text' onChange={onId} value={id}/>
            </Bar>

            <Bar>
                <div>PWD</div>
                <input type='text' onChange={setPwd} value={pwd}/>
            </Bar>

            <BtnWrapper>
                <Btn1 name='logIn' onClick={logInOrJoin} width='110px' height='40px'>로그인</Btn1>
                <Btn1 name='join' onClick={logInOrJoin} width='110px' height='40px'>가입</Btn1>
            </BtnWrapper>
        </Wrapper>

    );
}

export default Main;
