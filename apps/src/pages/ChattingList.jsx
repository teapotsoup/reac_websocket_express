import React, {useEffect, useState} from 'react'
import { useForm } from "react-hook-form"
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useIdStore} from "../state/Session";
import  useRoomStore  from "../state/Room";
import styled from "styled-components";
import {Btn1} from "../comps/Btn1";

function ChattingList() {
  const { register, handleSubmit, getValues } = useForm();
  const { insertRoom } = useRoomStore();
  const [pageRooms, setPageRooms] = useState()
  const { id } = useIdStore();

  //최초 등록된 방 목록을 가져 옵니다.
  useEffect(()=>{
    console.log('!')
    axios.get('data/getRoomList', {}).then(res=>{
      setPageRooms(res.data)
    })
  }, []) // 추가시 랜더링 고려

  //방만들기 버튼기능 함수 입니다.
  const createRoom = ()=>{
    let param = getValues();
    param._id = id
    axios.post('data/createRoom', param).then(arg=>{  //방을 만들고
      axios.post('data/getRoomList', {}).then(arg=>{ // 혹시 다른사람도 만들었을 수 있으니 방 목록을 다시 가져옵니다.
        if(arg.data && arg.data.length > 0 ) {
          insertRoom(arg.data)
          setPageRooms(arg.data)
        }
     })         
   })       
  } 

  //각각 만들어진 채팅방에서 방에 들어가기 위해 비밀번호를 입력할 때 데이터를 대입하기 위한 함수 입니다.
  const setRoomPwd = (event, value)=>{
    value.comparePwd = event.target.value;
  }

  //방 들어가기 함수 입니다.
  const navigate = useNavigate();
  const accessRoom = (event, value)=>{
    // console.log(value)

    if(value.comparePwd === value.password){// 비밀번호가 일치하면 방에 들여보내 줍니다.(서버에서 확인하는 걸로 바꾸는게 당연히 효율적인 방법 입니다!)
      setTimeout(()=> navigate('/chatting',{ state : {value, _id : id} }) ,10)
    }
  }

  return (
    <Wrapper>
      <Title>Chat Room List</Title>
      <form onSubmit={handleSubmit(createRoom)}  >
        <div> * 방만들기</div>
        <Bar>
          <input type='text' name='roomname' {...register('roomname')} className='form-control' placeholder='방이름'/>
        </Bar>
        <Bar>
          <input type='text' name='password' {...register('password')} className='form-control' placeholder='비번'/>
        </Bar>
        <BtnWrapper>
          <Btn1 type='submit'>Create</Btn1>
        </BtnWrapper>
        <div className='clearfix'>&nbsp;</div>
      </form>
      <div>

        <div>Room lists</div>
        {
          pageRooms && pageRooms.length > 0 && pageRooms.map(
            room =>
              <div key={room._room_id} >
                <div>방 이름 : {room?.roomname}, 현재 인원 : {room?.size}</div>
                <input type='text' value={room.comparePwd} placeholder='비밀번호 입력' onChange={(event)=> setRoomPwd(event, room)}/>
                <input type='button' value='방들어가기' onClick={ (event)=> accessRoom(event, room) }/>
                <div className='clearfix'>&nbsp;</div>
              </div> 
          )
        }
      </div>
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
    justify-content: center;
`

const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 250px;
    margin-bottom: 10px;
`

export default ChattingList;
