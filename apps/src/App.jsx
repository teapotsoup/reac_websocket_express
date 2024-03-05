import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Main from './pages/Main'
import ChattingList from './pages/ChattingList'
import NotFound from './pages/NotFound'
import Chatting from './pages/Chatting'


function App(props) {
    // 로그아웃하면 바로 로그인 화면(Main)으로
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main {...props}/>}></Route>
                <Route path="/chattingList"
                       element={<ChattingList {...props}/>}></Route>
                <Route path="/chatting"
                       element={<Chatting {...props}/>}></Route>
                <Route path="*" element={<NotFound {...props}/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
