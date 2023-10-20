import { MainContainer } from './Main.styled';
import MainImage from '../../components/MainImage/MainImage';
import MainConceptStory from '../../components/MainConceptStory/MainConceptStory';
import MainProducts from '../../components/MainProducts/MainProducts';
import MainNewProducts from '../../components/MainNewProducts/MainNewPorducts';

export default function Main() {
  return (
    <MainContainer>
      <MainImage />
      <MainConceptStory />
      <MainProducts />
      <MainNewProducts />
    </MainContainer>
  );
}
