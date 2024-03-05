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
    //아이디, 비밀번호가 바뀐경우에 대한 이벤트 정의 입니다(나중에 hook처럼 라이브러리를 써도 좋을 것 같습니다.)
    const onId = ({target: {value}}) => setStoreId(value);
    const setPwd = ({target: {value}}) => setPassword(value);

    const logInOrJoin = ({target: {name, value}}) => {

        let param = {id, password: pwd};
        if (name === 'join') param.join = 'join';
        console.log(param)
        axios.post('data/joinOrLogIn', param).then(arg => {
            let {result} = arg.data;
            if (result === 'OK') {
                alert('성공!')
                setStoreId(id)
                setTimeout(() => navigate('/ChattingList', {state: {param}}), 10)
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
