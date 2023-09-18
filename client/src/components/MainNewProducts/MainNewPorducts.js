import { MainNewProductsContainer } from './MainNewPorducts.styled';
import ItemCard from '../ItemCard/ItemCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function MainNewProducts() {
  const [itemList, setItemList] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${apiUrl}/products/search?page=1&pageSize=20`)
      .then((response) => {
        const data = response.data.content;
        setItemList(data.slice(0, 4));
        console.log(itemList);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <MainNewProductsContainer>
      <div className='title'>NEW PRODUCTS</div>
      <div className='flex-row'>
        {itemList.length > 0 &&
          itemList.map((item) => (
            <Link key={item.id} to={`/products/get/${item.id}`} onClick={() => scrollTo(0, 0)}>
              <ItemCard item={item} />
            </Link>
          ))}
      </div>
    </MainNewProductsContainer>
  )
}