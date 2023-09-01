import { Routes, Route } from 'react-router-dom';
import { AppContainer } from './style/App.styled';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './pages/Main/Main';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import SignUpSelect from './pages/SignUpSelect/SignUpSelect';
import MyPage from './pages/MyPage/MyPage';
import MyPageEdit from './pages/MyPageEdit/MyPageEdit'
import SignUpOauth from './pages/SignUpOauth/SignUpOatuh'
function App() {
  return (
    <AppContainer>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Main />} />
        <Route path="/signup/select" element ={<SignUpSelect />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/edit" element={<MyPageEdit />} />
        <Route path="/signup/oauth" element={<SignUpOauth />}/>
      </Routes>
      <Footer />
    </AppContainer>
  );
}

export default App;