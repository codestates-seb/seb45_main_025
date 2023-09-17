import { styled } from 'styled-components';

export const ItemInfoTable = styled.ul`
  li {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    > span {
        width: 100px;
        line-height: 20px;
        align-self: stretch;
        background: maroon;
        padding: 15px 10px;
        color: #fff;
        font-weight: 600;
        border-bottom: 1px solid #fff;
        &:last-of-type {
            border-color: white;
        }
        @media (max-width: 768px) {
            padding: 10px;
        }
    }
    > div {
        width: calc(100% - 150px);
        align-self: stretch;
        line-height: 20px;
        padding: 15px 10px;
        border-right: 1px solid black;
        border-top: 1px solid black;
        border-bottom: 0.5px solid black;
        word-break: keep-all;
        @media (max-width: 768px) {
            padding: 10px;
        }
    }
    @media (max-width: 768px) {
        font-size: var(--fz-sm);
    }
  }
`;