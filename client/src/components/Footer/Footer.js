import { Container, Logo, GithubContainer } from './Footer.styled';
import LogoImage from "../../common/image/header-logo-big.png";

export default function Footer() {
  return (
    <Container>
      <div>
        <div className="logo">
          <Logo src={LogoImage} alt="logo" />
        </div>
        <div className="github">
          <GithubProfile profileUrl="126146836" name="dongyunkim96" />
          <GithubProfile profileUrl="114473861" name="Juseong-Yu" />
          <GithubProfile profileUrl="81401022" name="son-young-jin" />
          <GithubProfile profileUrl="123739304" name="minppal" />
          <GithubProfile profileUrl="117506675" name="yoongunyong" />
          <GithubProfile profileUrl="84065357" name="pyo8470" />
          <GithubProfile profileUrl="75276860" name="ParkYoungGil" />
        </div>
      </div>
    </Container>
  )
}

const GithubProfile = ({ profileUrl, name }) => {
  return (
    <GithubContainer>
      <img
        src={`https://avatars.githubusercontent.com/u/${profileUrl}?v=4`}
        alt="github profile img"
      />
      <a href={`https://github.com/${name}`}>@{name}</a>
    </GithubContainer>
  );
};
