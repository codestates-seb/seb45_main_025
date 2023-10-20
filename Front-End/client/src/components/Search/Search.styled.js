import { styled } from "styled-components";

export const SearchBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 5rem;
  margin-top: 2rem;
  label {
    font-size: var(--fz-md);
    padding-right: 20px;
    @media (max-width: 768px) {
      display: none;
    }
  }
  input {
    width: 350px;
    height: 40px;
    border-radius: 6px;
    border: 1px solid var(--brown-50);
    padding: 0 10px;
  }
  @media (max-width: 768px) {
    label {
      font-size: 2.5rem;
      padding-right: 15px;
    }
    input {
      width: 250px;
      height: 34px;
    }
  }
`;
export const SearchBtn = styled.button`
  margin-left: 10px;
  height: 40px;
  width: 80px;
  border-radius: 6px;
  background-color: var(--brown-20);
  text-align: center;
  color: #fff;
  @media (max-width: 768px) {
    height: 34px;
    margin-left: 5px;
  }
`;
export const SearchSelBox = styled.div`
  position: relative;
  height: 40px;
  border: 1px solid var(--brown-20);
  border-radius: 6px;
  margin-right: 5px;
  background: var(--brown-20);
  color: #fff;
  @media (max-width: 768px) {
    height: 34px;
  }
`;
export const SearchSelect = styled.select`
  width: 80px;
  height: 100%;
  padding: 0 25px 0 10px;
  option {
    color: var(--brown-20);
  }
  @media (max-width: 768px) {
    width: 70px;
    padding: 0 20px 0 7px;
  }
`;
export const SearchSelectDown = styled.span`
  position: absolute;
  right: 7px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: var(--fz-sm);
`;