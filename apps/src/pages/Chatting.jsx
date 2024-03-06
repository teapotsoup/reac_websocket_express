import React, {useState, useEffect} from 'react'
import {useLocation, useNavigate} from "react-router-dom";
// useLocation이 react-router-dom에서 가져와야 하며, react-router에서 가져오는 것이 아닙니다.
import useWebSocket from 'react-use-websocket';
import styled from "styled-components";
import {Btn1} from "../comps/Btn1";
import {useIdStore} from "../state/Session";

//웹소켓 라이브러리를 사용 합니다.

function Chatting() {
    const {id} = useIdStore()
    const navigate = useNavigate();
    let {state: {value, _id}} = useLocation();

    const [socketUrl,] = useState(`ws://localhost:8001/wsocket?id=${_id}`);
    const {sendMessage, lastMessage} = useWebSocket(socketUrl);  //웹소캣 라이브러리인 useWebSocket 입니다.
    const [messageHistory, setMessageHistory] = useState([]);  //웹소켓에서 메시지를 받으면 호출되는 상태 입니다.
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

    useEffect(() => {
        if (!value || !_id) {
            navigate('/')
            return;
        }

        let join = {
            _room_id: value._room_id,
            password: value.password,
            _id: _id,
            join: 'join'
        }
        sendMessage(JSON.stringify(join))
    }, [value, _id, sendMessage])

    const ChatCellWrapper = styled.div`
        display: flex;
        justify-content: ${props => props._id === id ? 'flex-end' : 'flex-start'};
    `;

    return (
        <>
            <RightWrapper>
                <Btn1 width='110px' height='40px' onClick={() => {
                    navigate('/chatting-list')
                }}> 나가기</Btn1>
            </RightWrapper>
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
                            return <ChatCellWrapper key={idx} _id={message._id}>
                                <ChatCell>
                                    <strong>{message._id}</strong> : {message.message}
                                </ChatCell>
                            </ChatCellWrapper>
                        }
                    )}
                </Content>
                <ChattingBar>
                    <input type='text' onChange={onMessage} value={message} placeholder='메시지를 입력하세요'
                           className='form-control'/>
                    <Btn1 width='110px' height='40px' onClick={sendMsg}> send</Btn1>
                </ChattingBar>
            </WholeCase>
        </>

    );
}

const RightWrapper = styled.div`
    width: 360px;
    height: 40px;
    display: flex;
    justify-content: flex-end;
`

const WholeCase = styled.div`
    margin-top: 100px;
    width: 360px;
    height: 600px;
    background-color: #fff;
    border: 6px solid #000;
    border-radius: 36px;
    overflow: hidden;
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
    align-items: center;
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
