import { Container, Logo, GithubContainer, PageTop } from './Footer.styled';
import LogoImage from "../../common/image/newLogo.png";
import { ReactComponent as GitIcon } from '../../common/image/Icons/github.svg';
import { Link } from 'react-router-dom';

export default function Footer() {

  const handleLinkClick = () => {
    window.scroll(0, 0);
  }

  return (
    <Container>
      <div>
        <div className="logo">
          <Logo src={LogoImage} alt="logo" />
        </div>
        <div className='developers'>Developers</div>
        <div className="github">
          <GithubProfile profileUrl="126146836" account="dongyunkim96" name="Dongyun Kim" />
          <GithubProfile profileUrl="114473861" account="Juseong-Yu" name="Juseong Yu" />
          <GithubProfile profileUrl="81401022" account="son-young-jin" name="Youngjin Son" />
          <GithubProfile profileUrl="123739304" account="minppal" name="Minsu Kim" />
          <GithubProfile profileUrl="117506675" account="yoongunyong" name="Gunyong Yoon" />
          <GithubProfile profileUrl="84065357" account="pyo8470" name="Yoonpyo Hong" />
          <GithubProfile profileUrl="75276860" account="ParkYoungGil" name="Younggil Park" />
        </div>
        <PageTop onClick={handleLinkClick}>TOP</PageTop>
      </div>
    </Container>
  )
}

const GithubProfile = ({
  // profileUrl, 
  account,
  name }) => {
  return (
    <GithubContainer>
      <div className='git-info'>
        {/* <img
          src={`https://avatars.githubusercontent.com/u/${profileUrl}?v=4`}
          alt="github profile img"
        /> */}
        <Link to={`https://github.com/${account}`}>
          <GitIcon /> {name}
        </Link>
      </div>
    </GithubContainer>
  );
};
