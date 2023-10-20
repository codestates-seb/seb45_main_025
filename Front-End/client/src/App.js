import { Routes, Route } from 'react-router-dom';
import { AppContainer } from './style/App.styled';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './pages/Main/Main';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Cart from './pages/Cart/Cart';
import Order from './pages/Order/Order';
import OrderHistory from './pages/OrderHistory/OrderHistory';
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
import MyPageEditOauth from './pages/MyPageEditOauth/MyPageEditOauth'
import MyWriting from './pages/MyWriting/MyWriting';
import Snacks from './pages/Category/Snacks/Snacks';
import Jelly from './pages/Category/Jelly/Jelly';
import Candy from './pages/Category/Candy/Candy';
import Chocolate from './pages/Category/Chocolate/Chocolate';
import Cookies from './pages/Category/Cookies/Cookies';
import EditPage from './pages/EditPage/EditPage';
import NotFound from './pages/NotFound/NotFound';

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
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/signup/select" element={<SignUpSelect />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/edit" element={<MyPageEdit />} />
        <Route path='/mywriting' element={<MyWriting />} />
        <Route path="/mypage/editoauth" element={<MyPageEditOauth />} />
        <Route path="/signup/oauth" element={<SignUpOauth />} />
        <Route path="/loading" element={<OauthLoading />} />
        <Route path="/products/get/:productId" element={<Item />} />
        <Route path="/list" element={<List />} />
        <Route path="/Snacks" element={<Snacks />} />
        <Route path="/Cookies" element={<Cookies />} />
        <Route path="/Chocolate" element={<Chocolate />} />
        <Route path="/Candy" element={<Candy />} />
        <Route path="/Jelly" element={<Jelly />} />
        <Route path='/CommunityList' element={<CommunityList />} />
        <Route path='/WritePost' element={<WritePost />} />
        <Route path='/CommunityBoard/:boardId' element={<CommunityBoard />} />
        <Route path='/order/checkout' element={<OrderCheckout />} />
        <Route path='/order/fail' element={<OrderFail />} />
        <Route path='/order/success' element={<OrderSuccess />} />
        <Route path='/EditPage/:id' element={<EditPage />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
      <Footer />
    </AppContainer>
  );
}

export default App;