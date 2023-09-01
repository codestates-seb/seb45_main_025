import styled from "styled-components";

export const CustomLink = styled.div`
  text-decoration: none;
  color: inherit;
  &:hover {
    background-color: #e3e6e8;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
`;

export const Container = styled.div`
  height: 4rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  margin-left: 22vw;
  align-items: center;
  background-color: var()(--white-color);
  max-width: 1024px;

  .icon {
    font-size: 26px;
    margin-bottom: 5px;
  }
`;

export const Line = styled.div`
  border: 0.5px solid var(--white5-color);
  max-width: 1024px;
`;

export const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  font-size: 0.8rem;
`;