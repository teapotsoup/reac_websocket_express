import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Main from './pages/Main'
import ChattingList from './pages/ChattingList'
import NotFound from './pages/NotFound'
import Chatting from './pages/Chatting'
import {useIdStore} from "./state/Session";

//라우팅을 담당하는 App 함수 입니다.
function App(props) {
    const { id } = useIdStore();
  // const logInData = useSelector( state => state.INSERT_SESSION)
  // 로그인 여부에 대한 레덕스 입니다. ChattingList와 Chatting 컴포넌트에 대한 접근을 제한합니다.
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Main {...props}/>} ></Route>
        <Route path="/ChattingList" element={ id.length > 0 ? <ChattingList {...props}/> : <NotFound {...props}/> } ></Route>
        <Route path="/chatting" element={  id.length > 0 ? <Chatting {...props}/> : <NotFound {...props}/> } ></Route>
        <Route path="*" element={<NotFound {...props}/>} ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
