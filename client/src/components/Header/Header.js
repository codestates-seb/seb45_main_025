import { Link } from 'react-router-dom';
import {
  HeaderContainer,
  HeaderWrap,
  HeaderLogo,
  LogoLink
} from './Header.styled';
import headerLogoImg from '../../common/image/header-logo.png';

export default function Header() {
  return (
    <HeaderContainer>
      <HeaderWrap>
        <LogoLink to="/">
          <HeaderLogo src={headerLogoImg} />
        </LogoLink>

        <div>
          <Link to="/login">로그인</Link>
          <Link to="/sign-up"> 회원가입</Link>
        </div>
      </HeaderWrap>
    </HeaderContainer>
  );
}
