import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Tab } from "../../style/Global.styled";
import { BsSuitHeartFill, BsSuitHeart } from 'react-icons/bs';
import { FaRegThumbsUp } from "react-icons/fa";
import ItemInfo from "../../components/ItemInfo/ItemInfo";
import getAccessToken from "../../common/utils/getToken";
import {
    ItemWrap,
    ItemBox,
    ItemTitle,
    ItemOverview,
    ItemDetail,
    LikeWrap,
    TopContainer,
} from './Item.styled';
import Review from "../../components/Review/Review";
import { useSnackItemStore } from "../../stores/SnackItemStore";
import AddCartItemBtn from "../../components/AddCartItemBtn/AddCartItemBtn";

const Item = () => {
    const URI = process.env.REACT_APP_API_URL;
    const [curTab, setCurTab] = useState(0);
    const [like, setLike] = useState(false);
    const { snackItem, setSnackItem, setLikeIncrease, setLikeDecrease } = useSnackItemStore(state => state);
    const location = useLocation();
    const tabArr = ['Information', 'Review'];
    const productId = location.pathname.split('/')[3];
    const accessToken = getAccessToken();

    const tabHandler = idx => {
        setCurTab(idx);
    };

    const likeHandler = () => {
        setLike(!like);
        console.log(like);
        if (like) {
            setLikeDecrease();
        } else {
            setLikeIncrease();
        }
        axios
            .post(`${URI}/products/product/${productId}/like`, null, { headers: { Authorization: accessToken }})
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    const handleImageError = e => {
        e.target.src = 'https://demofree.sirv.com/nope-not-here.jpg';
    };

    useEffect(() => {
        axios
            .get(`${URI}/products/get/${productId}`)
            .then(res => {
                setSnackItem(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <TopContainer>
                Product Detail
            </TopContainer>
            <div className="bodywrap">
                <ItemWrap>
                    <ItemBox>
                        <ItemTitle>
                            <LikeWrap>
                                <button
                                    onClick={likeHandler}
                                    className={like ? 'like-btn liked' : 'like-btn'}
                                >
                                    {like ? <BsSuitHeartFill /> : <BsSuitHeart />}
                                    <span>
                                        <FaRegThumbsUp />
                                    </span>
                                </button>
                                <p>{snackItem.likes}</p>
                                <div> ← If you like this product, Click Heart!</div>
                            </LikeWrap>
                            <h3>{snackItem.productName}</h3>
                        </ItemTitle>
                        <ItemOverview>
                            <img
                                src={`${URI}${snackItem.img}`}
                                alt={snackItem.productName}
                                onError={handleImageError}
                            />
                            <ul>
                                <li>
                                    <span>Name</span>
                                    <div>{snackItem.productName}</div>
                                </li>
                                <li>
                                    <span>Price</span>
                                    <div>₩ {snackItem.productPrice}</div>
                                </li>
                                <li>
                                    <span>Content</span>
                                    <div>{snackItem.content}</div>
                                </li>
                            </ul>
                        </ItemOverview>
                    </ItemBox>

                    <ItemDetail>
                        <Tab>
                            {tabArr.map((item, idx) => (
                                <li
                                    onClick={() => tabHandler(idx)}
                                    onKeyUp={item.tabHandler}
                                    onKeyDown={item.tabHandler}
                                    key={idx}
                                    className={idx === curTab ? 'active tabmenu' : 'tabmenu'}
                                    role="tab"
                                >
                                    {item}
                                </li>
                            ))}
                            <AddCartItemBtn />
                        </Tab>
                        {curTab === 0 ? <ItemInfo /> : <Review />}
                    </ItemDetail>
                </ItemWrap>
            </div>
        </>
    );
};

export default Item;