import { useEffect } from 'react';
import { CustomLink,
         Wrapper,
         Container,
         Line,
         NavItem, } from "./Gnb.styled";
import { useNavigate } from 'react-router-dom';        
import { BiCookie } from "react-icons/bi";
import { GiChipsBag, GiChocolateBar, GiJellyBeans } from "react-icons/gi";
import { TbCookieMan } from "react-icons/tb";
import { LuCandy } from "react-icons/lu";
import { 
    useSearchCategoryStore,
    useSearchIsUpdateStore,
    useSearchSelectedCategoryStore,
 } from "../../stores/listSearchStore";
import {
    useListCurrentPageStore,
    useListPageStore,
} from "../../stores/listPageStore";

const Gnb = () => {

    const { setSearchCategory } = useSearchCategoryStore(state => state);
    const { setSearchSelectedCategory } = useSearchSelectedCategoryStore(state => state);
    const { setSearchIsUpdate } = useSearchIsUpdateStore(state => state);
    const { setListPage } = useListPageStore(state => state);
    const { setListCurrentPage } = useListCurrentPageStore(state => state);
    const navigate = useNavigate();
    
    const selectCategoryHandler = e => {
        const selected = e.target.value;
        if (selected === 'all') {
            setSearchCategory('all');
        } else if (selected === 'Snacks') {
            setSearchCategory('Snacks');
        } else if (selected === 'Cookies') {
            setSearchCategory('Cookies');
        } else if (selected === 'Chocolate') {
            setSearchCategory('Chocolate');
        } else if (selected === 'Candy') {
            setSearchCategory('Candy');
        } else if (selected === 'Jelly') {
            setSearchCategory('Jelly');
        }
        setSearchSelectedCategory(selected);
        setSearchIsUpdate(true);
    }

    useEffect(() => {
        setSearchSelectedCategory('all');
        setSearchCategory('all');
        setSearchIsUpdate(false);
        setListCurrentPage(1);
        setListPage(1);
    }, []);
    
    const allItemClickHandler = () => {
        navigate(`/list`);
      };

    return (
        <Wrapper>
            <Line />
            <Container>
            <CustomLink>
                    <NavItem
                      onClick={allItemClickHandler}>
                        <TbCookieMan className="icon" />All
                    </NavItem>
                </CustomLink>

                <CustomLink>
                    <NavItem
                      onClick={selectCategoryHandler}
                      value='Snacks'>
                        <GiChipsBag className="icon" />Snacks
                    </NavItem>
                </CustomLink>


                <CustomLink>
                    <NavItem
                      onClick={selectCategoryHandler}
                      value='Cookies'>
                        <BiCookie className="icon" />Cookies
                    </NavItem>
                </CustomLink>


                <CustomLink>
                    <NavItem
                      onClick={selectCategoryHandler}
                      value='Chocolate'>
                        <GiChocolateBar className="icon" />Chocolate
                    </NavItem>
                </CustomLink>


                <CustomLink>
                    <NavItem
                      onClick={selectCategoryHandler}
                      value='Jelly'>
                        <GiJellyBeans className="icon" />Jelly
                    </NavItem>
                </CustomLink>


                <CustomLink>
                    <NavItem
                      onClick={selectCategoryHandler}
                      value='Candy'>
                        <LuCandy className="icon" />Candy
                    </NavItem>
                </CustomLink>
            </Container>
        </Wrapper>
    );
};

export default Gnb;