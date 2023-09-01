import { CustomLink,
         Wrapper,
         Container,
         Line,
         NavItem, } from "./Gnb.styled";
        
import { BiCookie } from "react-icons/bi";
import { GiChipsBag, GiChocolateBar, GiJellyBeans } from "react-icons/gi";
import { LuCandy } from "react-icons/lu";

const Gnb = () => {
    return (
        <Wrapper>
            <Line />
            <Container>
                <CustomLink>
                    <NavItem>
                        <GiChipsBag className="icon" />Chips
                    </NavItem>
                </CustomLink>


                <CustomLink>
                    <NavItem>
                        <BiCookie className="icon" />Cookies
                    </NavItem>
                </CustomLink>


                <CustomLink>
                    <NavItem>
                        <GiChocolateBar className="icon" />Chocolate
                    </NavItem>
                </CustomLink>


                <CustomLink>
                    <NavItem>
                        <GiJellyBeans className="icon" />Jelly
                    </NavItem>
                </CustomLink>


                <CustomLink>
                    <NavItem>
                        <LuCandy className="icon" />Candy
                    </NavItem>
                </CustomLink>
            </Container>
        </Wrapper>
    );
};

export default Gnb;