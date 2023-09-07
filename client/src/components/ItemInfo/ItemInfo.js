import { ItemInfoTable } from './ItemInfo.styled';
import { useSnackItemStore } from '../../stores/SnackItemStore';

const Item = () => {
    const { snackItem } = useSnackItemStore(state => state);

    return (
        <ItemInfoTable>
            <li>
                <span>제조사</span>
                <div>{snackItem.manufacturer}</div>
            </li>
            <li>
                <span>식품유형</span>
                <div>{snackItem.content}</div>
            </li>
            <li>
                <span>원재료명</span>
                <div>{snackItem.rawmaterial}</div>
            </li>
            <li>
                <span>주의사항</span>
                <div>{snackItem.precautions}</div>
            </li>
        </ItemInfoTable>
    );
};

export default Item;