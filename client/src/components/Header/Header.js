import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { handleScrollY } from '../../redux/thunks/scrollThunks';
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
  const scrollY = useSelector((state) => state.scroll.scrollY);
  const isHome = useLocation().pathname === '/';

  useEffect(() => {
    window.addEventListener('scroll', () => {
      dispatch(handleScrollY());
    });

    return () => {
      window.removeEventListener('scroll', () => {
        dispatch(handleScrollY());
      });
    };
  }, [dispatch]);

  const [isLogin, setIsLogin] = useState(false);

  const handleLinkClick = () => {
    window.scroll(0, 0);
  }

  return (
    <HeaderContainer scrolled={scrollY} className={isHome ? 'home' : ''}>
      <LeftNavContainer scrolled={scrollY}>
        <Link to="/" onClick={handleLinkClick}>
          <HeaderLogo src={scrollY ? headerLogoImgSmall : headerLogoImgBig} scrolled={scrollY} />
        </Link>
        <div className='left-nav'>
          <Link to='/products' onClick={handleLinkClick}>SHOP</Link>
          <Link to='/community' onClick={handleLinkClick}>COMMUNITY</Link>
        </div>
      </LeftNavContainer>

      <RightNavContainer scrolled={scrollY}>
        {isLogin ?
          <div>
            <Link to='/' onClick={handleLinkClick}>
              <button onClick={() => setIsLogin(false)}>
                <LogoutIcon scrolled={scrollY} />
                Log out
              </button>
            </Link>
            <Link to='/mypage' onClick={handleLinkClick}>
              <MypageIcon scrolled={scrollY} />
              My page
            </Link>
            <Link to='/cart' onClick={handleLinkClick}>
              <CartIcon scrolled={scrollY} />
              Cart
            </Link>
          </div> :
          <div>
            <Link to="/login" onClick={handleLinkClick}>
              <button onClick={() => setIsLogin(true)}>
                <LoginIcon scrolled={scrollY} />
                Log in
              </button>
            </Link>
            <Link to="/signup" onClick={handleLinkClick}>
              <SignupIcon scrolled={scrollY} />
              Sign up
            </Link>
          </div>
        }
      </RightNavContainer>
    </HeaderContainer>
  );
}
