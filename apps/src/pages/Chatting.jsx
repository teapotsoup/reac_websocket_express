import React, {useState, useEffect} from 'react'
import {useLocation} from "react-router-dom";
// useLocation이 react-router-dom에서 가져와야 하며,
// react-router에서 가져오는 것이 아닙니다.
import useWebSocket from 'react-use-websocket';
// import {Wrapper} from "../comps/comps";
import styled from "styled-components";
import {Btn1} from "../comps/Btn1";
import {useIdStore} from "../state/Session";
// import Smartphone from "./Smartphone";

//웹소켓 라이브러리를 사용 합니다.


function Chatting() {
    const {id} = useIdStore()


    let {state: {value, _id}} = useLocation();
    const [socketUrl,] = useState(`ws://localhost:8001/wsocket?id=${_id}`);
    const {sendMessage, lastMessage} = useWebSocket(socketUrl);  //웹소캣 라이브러리인 useWebSocket 입니다.
    const [messageHistory, setMessageHistory] = useState([]);  //웹소켓에서 메시지를 받으면 호출되는 상태 입니다.

    //메시지를 보내기 위한 기능 입니다.
    const [message, setMessage] = useState('');
    const onMessage = (event) => (setMessage(event.target.value));
    const sendMsg = () => {
        let msg = {
            _room_id: value._room_id,
            _id: _id,
            send: 'send',
            message: message
        }
        sendMessage(JSON.stringify(msg))
        setMessage('')
    }

    //메시지에 대한 변화에 대해서 정의 합니다.
    useEffect(() => {
        if (lastMessage !== null) {
            setMessageHistory((prev) => {  //기존 메시지에 데이터를 추가합니다.
                let msg = lastMessage ? lastMessage.data : null;
                if (msg) {
                    let object = JSON.parse(msg);
                    lastMessage._id = object._id;
                    lastMessage.result = object.result;
                    lastMessage.message = object.message;
                }
                return prev.concat(lastMessage)
            });
        }
    }, [lastMessage, setMessageHistory]);

    //최초 방에 들어온 경우 실행되는 "나 방에 들어왔어" 기능 입니다.
    useEffect(() => {
        let join = {
            _room_id: value._room_id,
            password: value.password,
            _id: _id,
            join: 'join'
        }
        sendMessage(JSON.stringify(join))
    }, [value, _id, sendMessage])
    console.log(messageHistory)

    const AdjustPositionWrapper = styled.div`
        display: flex;
        justify-content: ${props => props._id === id ? 'flex-end' : 'flex-start'};
    `

    return (
        <WholeCase>
            <Content>
                {messageHistory.map(
                    (message, idx) => {
                        if (message.result) {
                            let desc = '가 나갔습니다.'
                            if (message.result === 'someIn') {
                                desc = '가 들어왔습니다.'
                            }
                            return <InNOutCell key={idx}>{message._id}{desc}</InNOutCell>
                        }
                        return <AdjustPositionWrapper key={idx} _id={message._id}>
                            <ChatCell>
                                <strong>{message._id}</strong> : {message.message}

                            </ChatCell>
                        </AdjustPositionWrapper>
                    }
                )}
            </Content>
            <ChattingBar>
                <input type='text' onChange={onMessage} value={message} placeholder='메시지를 입력하세요'
                       className='form-control'/>
                <Btn1 width='110px' height='40px' onClick={sendMsg}> send</Btn1>
            </ChattingBar>
        </WholeCase>
    );
}


const WholeCase = styled.div`
    margin-top: 100px;
    width: 360px; // 스마트폰 화면의 너비
    height: 600px; // 스마트폰 화면의 높이
    background-color: #fff; // 화면 배경색
    border: 6px solid #000; // 화면 테두리
    border-radius: 36px; // 테두리 둥글기
    overflow: hidden; // 테두리 밖으로 넘어가는 내용을 숨김
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Content = styled.div`
    width: 100%;
    height: 90%;
    overflow-y: scroll;
    padding: 20px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px
`;


const InNOutCell = styled.div`
    width: 100%;
    height: 40px;
    border: 1px solid black;
    padding: 3px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
`

const ChatCell = styled.div`
    width: 70%;
    height: 40px;
    border: 1px solid black;
    padding: 3px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ChattingBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 10%;
    margin-bottom: 10px;
    gap: 10px;

`

export default Chatting;
