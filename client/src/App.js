import { Routes, Route } from 'react-router-dom';
import { AppContainer } from './style/App.styled';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './pages/Main/Main';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Cart from './pages/Cart/Cart';
import Order from './pages/Order/Order';
import OrderList from './pages/OrderList/OrderList';
import SignUpSelect from './pages/SignUpSelect/SignUpSelect';
import MyPage from './pages/MyPage/MyPage';
import MyPageEdit from './pages/MyPageEdit/MyPageEdit'
import SignUpOauth from './pages/SignUpOauth/SignUpOauth'
import Item from './pages/Item/Item';
import List from './pages/List/List';
import CommunityList from './pages/CommunityList/CommunityList';
import WritePost from './pages/WritePost/WritePost';
import CommunityBoard from './pages/CommunityBoard/CommunityBoard';
import OrderCheckout from './pages/OrderCheckout/OrderCheckout';
import OrderFail from './pages/OrderFail/OrderFail';
import OrderSuccess from './pages/OrderSuccess/OrderSuccess';
import OauthLoading from './pages/LoadingOauth/LoadingOauth';
function App() {
  return (
    <AppContainer>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Main />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/order-list" element={<OrderList />} />
        <Route path="/signup/select" element={<SignUpSelect />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/edit" element={<MyPageEdit />} />
        <Route path="/signup/oauth" element={<SignUpOauth />} />
        <Route path="/loading" element={<OauthLoading />} />
        <Route path="/products" element={<Item />} />
        <Route path="/list" element={<List />} />
        <Route path='/CommunityList' element={<CommunityList />} />
        <Route path='/WritePost' element={<WritePost />} />
        <Route path='/CommunityBoard' element={<CommunityBoard />} />
        <Route path='/order/checkout' element={<OrderCheckout />} />
        <Route path='/order/fail' element={<OrderFail />} />
        <Route path='/order/success' element={<OrderSuccess />} />
      </Routes>
      <Footer />
    </AppContainer>
  );
}

export default App;