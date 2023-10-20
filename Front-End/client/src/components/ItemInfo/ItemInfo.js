import { ItemInfoTable } from './ItemInfo.styled';
import { useSnackItemStore } from '../../stores/SnackItemStore';

const Item = () => {
    const { snackItem } = useSnackItemStore(state => state);

    return (
        <ItemInfoTable>
            <li>
                <span>Manufacturer</span>
                <div>{snackItem.manufacturer}</div>
            </li>
            <li>
                <span>Nutrient</span>
                <div>{snackItem.content}</div>
            </li>
            <li>
                <span>Ingredients</span>
                <div>{snackItem.rawmaterial}</div>
            </li>
            <li>
                <span>Warning</span>
                <div>{snackItem.precautions}</div>
            </li>
        </ItemInfoTable>
    );
};

export default Item;