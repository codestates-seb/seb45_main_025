import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { handleScroll } from '../../redux/thunks/scrollThunks';
import {
  HeaderContainer,
  HeaderLogo,
  LeftNavContainer,
  RightNavContainer
} from './Header.styled';
import headerLogoImgBig from '../../common/image/header-logo-big.png';
import headerLogoImgSmall from '../../common/image/header-logo-small.png';
import { ReactComponent as LoginIcon } from '../../common/image/HeaderIcon/login.svg';
import { ReactComponent as SignupIcon } from '../../common/image/HeaderIcon/signup.svg';
import { ReactComponent as LogoutIcon } from '../../common/image/HeaderIcon/logout.svg';
import { ReactComponent as MypageIcon } from '../../common/image/HeaderIcon/mypage.svg';
import { ReactComponent as CartIcon } from '../../common/image/HeaderIcon/cart.svg';

export default function Header() {
  const dispatch = useDispatch();
  const scrolled = useSelector((state) => state.scroll.scrolled);
  const isHome = useLocation().pathname === '/';

  useEffect(() => {
    window.addEventListener('scroll', () => {
      dispatch(handleScroll());
    });

    return () => {
      window.removeEventListener('scroll', () => {
        dispatch(handleScroll());
      });
    };
  }, [dispatch]);

  const [isLogin, setIsLogin] = useState(false);

  return (
    <HeaderContainer scrolled={scrolled} className={isHome ? 'home' : ''}>
      <LeftNavContainer scrolled={scrolled}>
        <Link to="/">
          <HeaderLogo src={scrolled ? headerLogoImgSmall : headerLogoImgBig} scrolled={scrolled} />
        </Link>
        <div className='left-nav'>
          <Link to='/products'>SHOP</Link>
          <Link to='/community'>COMMUNITY</Link>
        </div>
      </LeftNavContainer>

      <RightNavContainer scrolled={scrolled}>
        {isLogin ?
          <div>
            <Link to='/'>
              <button onClick={() => setIsLogin(false)}>
                <LogoutIcon scrolled={scrolled} />
                Log out
              </button>
            </Link>
            <Link to='/my-page'>
              <MypageIcon scrolled={scrolled} />
              My page
            </Link>
            <Link to='/cart'>
              <CartIcon scrolled={scrolled} />
              Cart
            </Link>
          </div> :
          <div>
            <Link to="/login">
              <button onClick={() => setIsLogin(true)}>
                <LoginIcon scrolled={scrolled} />
                Log in
              </button>
            </Link>
            <Link to="/sign-up">
              <SignupIcon scrolled={scrolled} />
              Sign up
            </Link>
          </div>
        }
      </RightNavContainer>
    </HeaderContainer>
  );
}
