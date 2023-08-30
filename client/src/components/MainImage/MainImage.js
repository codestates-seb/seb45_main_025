import { MainImageContainer } from './MainImage.styled';
import mainImg from '../../common/image/main-image.png';

export default function MainImage() {
  return (
    <MainImageContainer backgroundImage={`url(${mainImg})`}>
      <div>
        <p>뭐라고 쓸지</p>
        <p>생각 중</p>
        <strong>KOREAN</strong>
        <strong>SNACKS</strong>
      </div>
    </MainImageContainer>
  );
}