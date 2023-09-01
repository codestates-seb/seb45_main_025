import { Routes, Route } from 'react-router-dom';
import { AppContainer } from './style/App.styled';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './pages/Main/Main';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Products from './pages/Products/Products';
import List from './pages/List/List';

function App() {
  return (
    <AppContainer>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<Main />} />
        <Route path="/products" element={<Products />} />
        <Route path="/list" element={<List />} />
      </Routes>
      <Footer />
    </AppContainer>
  );
}

export default App;
