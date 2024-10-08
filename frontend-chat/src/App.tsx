import './App.css';
import AppToolbar from './UI/AppToolbar/AppToolbar';
import {Route, Routes} from 'react-router-dom';
import Register from './features/users/components/Register';
import Login from './features/users/components/Login';
import NotFoundPage from './UI/NotFoundPage/NotFoundPage';
import ChatPage from './features/chat/ChatPage';

const App = () => {

    return (
      <>
        <header>
          <AppToolbar/>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<ChatPage />} />
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
          </Routes>
        </main>
      </>
    )
};

export default App;
