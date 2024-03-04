import React, {  useState }   from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useIdStore} from '../state/Session'

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
    <div className='container'>

      <div className='row'>
        <span>id</span> : <input type='text' onChange={onId} value={id} className='form-control'/>
      </div>

      <div className='row'>
        <span>pwd</span> : <input type='text' onChange={setPwd} value={pwd} className='form-control'/>
      </div>    

      <div className='row'>
        <button type='button' onClick={logInOrJoin} name='logIn' className='btn btn-info'>로그인</button>
        <button type='button' onClick={logInOrJoin} name='join'  className='btn btn-success'>가입</button>
      </div> 
      
    </div>
  );
}

export default Main;
