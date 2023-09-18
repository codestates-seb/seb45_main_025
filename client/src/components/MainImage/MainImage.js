import { MainImageContainer } from './MainImage.styled';
import mainImg from '../../common/image/main-image.png';

export default function MainImage() {
  return (
    <MainImageContainer backgroundImage={`url(${mainImg})`}>
      <div>
        <p>WELCOME</p>
        <p>TO</p>
        <strong>KOREAN</strong>
        <strong>SNACKS</strong>
      </div>
    </MainImageContainer>
  );
}