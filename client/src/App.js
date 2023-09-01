import { Routes, Route } from 'react-router-dom';
import { AppContainer } from './style/App.styled';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './pages/Main/Main';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import CommunityList from './pages/CommunityList/CommunityList';
import WritePost from './pages/WritePost/WritePost';
function App() {
  return (
    <AppContainer>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<Main />} />
        <Route path='/CommunityList' element={<CommunityList />} />
        <Route path='/WritePost' element={<WritePost />} />

      </Routes>
      <Footer />
    </AppContainer>
  );
}

export default App;
