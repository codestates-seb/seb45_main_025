import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import getAccessToken from '../../common/utils/getToken';
import { AddBtn } from './AddCartItemBtn.styled';
import { BsCartPlus } from 'react-icons/bs';
import { toast, ToastContainer } from 'react-toastify';

export default function AddCartItemBtn() {
    const dispatch = useDispatch();
    const URI = process.env.REACT_APP_API_URL;
    const notify = () => toast("Added to Cart!")
    let accessToken = getAccessToken();

    useEffect(() => {
        console.log('useEffect');
        accessToken = getAccessToken();
        console.log('access token: ', accessToken);
    }, [dispatch]);

    const addHandler = () => {
        accessToken = getAccessToken();
        const productId = location.pathname.split('/')[3];
        const quantity = 1;
        axios.post(
            `${URI}/cart/add/${productId}?quantity=${quantity}`,
            null,
            { headers: { Authorization: accessToken }})
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <AddBtn>
          <button onClick={() => {addHandler(); notify()}}> <BsCartPlus />
          <ToastContainer
            position="top-right"
            pauseOnFocusLoss
            draggable
            pauseOnHover
         />
           Add to Cart </button>
        </AddBtn>
    )
}
