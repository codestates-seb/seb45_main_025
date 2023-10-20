import { CustomLink,
         Wrapper,
         Container,
         Line,
         NavItem, } from "./Gnb.styled";
import { useNavigate , Link } from 'react-router-dom';        
import { BiCookie } from "react-icons/bi";
import { GiChipsBag, GiChocolateBar, GiJellyBeans } from "react-icons/gi";
import { TbCookieMan } from "react-icons/tb";
import { LuCandy } from "react-icons/lu";

const Gnb = () => {
    const navigate = useNavigate();
    
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
                    <Link to="/Snacks">
                    <NavItem>
                        <GiChipsBag className="icon" />Snacks
                    </NavItem>
                    </Link>
                </CustomLink>


                <CustomLink>
                <Link to="/Cookies">
                    <NavItem>
                        <BiCookie className="icon" />Cookies
                    </NavItem>
                </Link>
                </CustomLink>


                <CustomLink>
                <Link to="/Chocolate">
                    <NavItem>
                        <GiChocolateBar className="icon" />Chocolate
                    </NavItem>
                </Link>
                </CustomLink>


                <CustomLink>
                <Link to="/Jelly">
                    <NavItem>
                        <GiJellyBeans className="icon" />Jelly
                    </NavItem>
                </Link>
                </CustomLink>


                <CustomLink>
                <Link to="/Candy">
                    <NavItem>
                        <LuCandy className="icon" />Candy
                    </NavItem>
                </Link>
                </CustomLink>
            </Container>
        </Wrapper>
    );
};

export default Gnb;