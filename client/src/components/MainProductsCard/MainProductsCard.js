import { MainProductsCardContainer as MainProductsCardContainer } from './MainProductsCard.styled';
import { Link } from 'react-router-dom';

export default function MainProductsCard({ img, type }) {
  return (
    <MainProductsCardContainer>
      <Link to={`/${type}`}>
        <img src={img} alt="" />
        <div className='product-type'>{type}
          <span>&#8250;</span>
        </div>
      </Link>
    </MainProductsCardContainer>
  )
}