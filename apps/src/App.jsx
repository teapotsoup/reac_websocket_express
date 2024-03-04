import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Main from './pages/Main'
import ChattingList from './pages/ChattingList'
import NotFound from './pages/NotFound'
import Chatting from './pages/Chatting'
import {useIdStore} from "./state/Session";


function App(props) {
    const { id } = useIdStore();

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
