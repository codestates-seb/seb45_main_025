import { styled } from "styled-components";

export const CustomLink = styled.div`
  text-decoration: none;
  color: inherit;
  border-radius: 20px;
  padding: .5rem;
  border: 1px solid var(--brown-10);
  background-color: var(white);
  &:hover {
    background-color: var(--brown-10);
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  margin-top: 2rem;
  padding-top: 5rem;
`;

export const Container = styled.div`
  height: 4rem;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  margin-left: 22vw;
  align-items: center;
  background-color: var(white);
  max-width: 1024px;

  .icon {
    font-size: 3rem;
    margin-bottom: 1rem;
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
  font-size: 1rem;
`;