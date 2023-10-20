import { ItemCardContainer } from './ItemCard.styled';
import { ReactComponent as HeartIcon } from '../../common/image/Icons/heart.svg';

export default function ItemCard({ item }) {
  const apiUrl = process.env.REACT_APP_API_URL;

  return (
    <ItemCardContainer>
      <img src={`${apiUrl}${item.img}`} alt='' />
      <div className='product-info'>
        <div className='product-title'>{item.productName}</div>
        <div className='flex-row'>
          <div className='product-price'>&#8361; {item.productPrice.toLocaleString()}</div>
          <div className='like'>
            <HeartIcon />
            {item.likes}
          </div>
        </div>
      </div>
    </ItemCardContainer>
  );
}
