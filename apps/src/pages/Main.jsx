import React, {  useState }   from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useIdStore} from '../state/Session'
import styled from "styled-components";
import {Btn1} from "../comps/Btn1";

function Main(arg) {
  const navigate = useNavigate();

  const [ pwd, setPassword ] = useState("")
  const {id ,setStoreId} =  useIdStore()
  //아이디, 비밀번호가 바뀐경우에 대한 이벤트 정의 입니다(나중에 hook처럼 라이브러리를 써도 좋을 것 같습니다.)
  const onId = ({target: {name, value}})=> setStoreId(value);
  const setPwd = ({target: {name, value}})=> setPassword(value);

  const logInOrJoin = ({target: {name, value}})=>{

    let param = { id, password:pwd };
    if(name === 'join') param.join = 'join';

    axios.post('data/joinOrLogIn', param).then(arg=>{  
      let {result} = arg.data;
      if(result === 'OK'){
        alert('성공!')
        setStoreId(id)
        setTimeout(()=> navigate('/ChattingList',{ state : {param} }) ,10)
      } else{
        alert(`실패 : ${result}`)
      }
    })
  }

  return (
          <Wrapper>
              <Title>
                  Chat Room
              </Title>

              <Bar>
                  <div>ID</div><input type='text' onChange={onId} value={id} />
              </Bar>

              <Bar>
                  <div>PWD</div>  <input type='text' onChange={setPwd} value={pwd} />
              </Bar>

              <BtnWrapper>
                  <Btn1 name='logIn' onClick={logInOrJoin}>로그인</Btn1>
                  <Btn1 name='join' onClick={logInOrJoin}>가입</Btn1>
              </BtnWrapper>
          </Wrapper>

  );
}



const Wrapper = styled.div`
    margin-top: 100px;
    width: 700px;
    min-height: 500px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: black 1px solid;
`

const Title = styled.div`
    font-size: 50px;
    font-weight: bold;
`

const BtnWrapper = styled.div`
    width: 230px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`

const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 250px;
    margin-bottom: 10px;
`





export default Main;
