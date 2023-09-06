import styled, { keyframes }from "styled-components";
import Snack1 from "../../common/image/snacks1.webp";

export const TopContainer = styled.div`
  position: relative;  
  width: 100vw;
  height: 25rem;
  background-image: url(${Snack1});
  background-size: cover;
  background-position: 25% 60%;
  `;

export const ItemWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 80px;
  margin-left: 20vw;
  @media (max-width: 768px) {
    display: block;
    margin-top: 30px;
  }
`;
export const ItemBox = styled.div`
  width: 30%;
  flex: none;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
export const ItemTitle = styled.div`
  height: 63px;
  border-bottom: 2px solid grey;
  margin-bottom: 15px;
  font-size: 40px;
  font-weight: bold;
  > h3 {
    color: black;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const ItemOverview = styled.div`
  img {
    width: 90%;
    height: auto;
    object-fit: cover;
    margin-bottom: 30px;
    @media (max-width: 768px) {
      width: 100%;
      margin-bottom: 15px;
    }
  }
  ul {
    > li {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      margin-bottom: 15px;
      font-size: var(--fz-md);
      line-height: 24px;
      > span {
        position: relative;
        padding: 0 15px 0 10px;
        flex: none;
        width: 80px;
        white-space: nowrap;
        color: var(--mainbl);
        &:after {
          content: '';
          position: absolute;
          left: 0;
          top: 2px;
          background: var(--mainbl);
          width: 3px;
          height: 20px;
        }
      }
      > div {
        width: calc(100% - 80px);
        word-break: keep-all;
      }
      @media (max-width: 768px) {
        font-size: var(--fz-base);
        line-height: 20px;
      }
    }
  }
`;
export const ItemDetail = styled.div`
  margin-top: 50px;
  width: 70%;
  padding-left: 30px;
  @media (max-width: 768px) {
    width: 100%;
    padding-left: 0;
  }
`;

export const likeClicked = keyframes`
  0% {opacity: 1; transform: translateY(0);}
  100% {opacity: 0; transform: translateY(-20px);}
`;

export const LikeWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  margin-bottom: 10px;
  > button {
    font-size: 20px;
    color: var(--mainbl);
    position: relative;
    > span {
      position: absolute;
      left: 0;
      top: -10px;
      font-size: 24px;
      opacity: 0;
    }
    &.liked span {
      animation: ${likeClicked} 1s forwards;
    }
  }
  > p {
    padding: 3px 0 0 5px;
    color: var(--mainbl);
  }
`;