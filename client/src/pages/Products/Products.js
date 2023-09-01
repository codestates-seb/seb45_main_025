import { useState } from "react";
import { Tab } from "../../style/Global.styled";
import Item from "../../components/Item/Item";
import chocolateCookie from "../../common/image/chocolateCookie.jpeg";
import {
    ItemWrap,
    ItemBox,
    ItemTitle,
    ItemOverview,
    ItemDetail,
} from './Products.styled';
import Review from "../../components/Review/Review";

const Products = () => {
    const [curTab, setCurTab] = useState(0);

    const tabArr = ['Product', 'Review'];
    const tabHandler = idx => {
        setCurTab(idx);
    };

    return (
        <>
            <ItemWrap>
                <ItemBox>
                    <ItemTitle>
                        <h3>Chocolate Cookies</h3>
                    </ItemTitle>
                    <ItemOverview>
                        <img src={chocolateCookie} alt="name" />
                        <ul>
                            <li>
                                <span>상품명</span>
                                <div>Chocolate Cookies</div>
                            </li>
                            <li>
                                <span>가격</span>
                                <div>$3.09</div>
                            </li>
                            <li>
                                <span>상품설명</span>
                                <div>Chocolate flavor</div>
                            </li>
                        </ul>
                    </ItemOverview>
                </ItemBox>

                <ItemDetail>
                    <Tab>
                        {tabArr.map((item, idx) => (
                        <li
                          onClick={() => tabHandler(idx)}
                          onKeyUp={Item.tabHandler}
                          onKeyDown={Item.tabHandler}
                          key={idx}
                          className={idx === curTab ? 'active tabmenu' : 'tabmenu'}
                          role='tab'
                          >
                            {item}
                          </li>
                        ))}
                    </Tab>
                    {curTab === 0 ? <Item /> : <Review />}
                </ItemDetail>
            </ItemWrap>
        </>
    );
};

export default Products;