import { ItemInfoTable } from './Item.styled';

const Item = () => {
    return (
        <ItemInfoTable>
            <li>
                <span>원재료명</span>
                <div>백설탕, 밀가루, 식물성유지1, 코코아프리퍼레이션 프랑스산(전지분유, 코코아분말), 식물성유지2, 식물성유지3, 탈지분유, 쇼트닝, 유당, 식물성크림분말</div>
            </li>
            <li>
                <span>주의사항</span>
                <div>-달걀, 땅콩, 호두, 복숭아, 토마토, 돼지고기, 닭고기, 오징어, 새우, 게, 조개류 혼입가능</div>
            </li>
            <li>
                <span>제조사</span>
                <div>(주)오리온 제3 익산공장 전라북도 익산시 동서로</div>
            </li>
            <li>
                <span>식품유형</span>
                <div>초콜릿가공품</div>
            </li>
        </ItemInfoTable>
    );
};

export default Item;