import {
  MainProductsContainer,
  CardContainer
} from './MainProducts.styled';
import MainCategoryCard from '../MainProductsCard/MainProductsCard';
import SnackImage from '../../common/image/snack.png';
import CookiesImage from '../../common/image/cookies.png';
import ChocolateImage from '../../common/image/chocolate.png';
import CandyImage from '../../common/image/candy3.png';
import JellyImage from '../../common/image/jelly3.png';

export default function MainProducts() {
  return (
    <MainProductsContainer>
      <div className='title'>PRODUCTS</div>
      <CardContainer>
        <MainCategoryCard img={SnackImage} type='SNACK' />
        <MainCategoryCard img={CookiesImage} type='COOKIE' />
        <MainCategoryCard img={ChocolateImage} type='CHOCOLATE' />
        <MainCategoryCard img={CandyImage} type='CANDY' />
        <MainCategoryCard img={JellyImage} type='JELLY' />
      </CardContainer>
    </MainProductsContainer>
  )
}