import { styled, keyframes } from 'styled-components';

export const dots = keyframes`
  0% {transform: translateY(0);}
  50% {transform: translateY(-20px);}
  100% {transform: translateY(0);}
  `;

export const ContentList = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-top: 80px;
  .page-end {
    display: none;
  }
  @media (max-width: 768px) {
    margin-top: 50px;
    .page-end {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      margin-top: 50px;
      position: relative;
      > span {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        margin: 0 10px;
        background: var(--brown-20);
        animation: ${dots} 1s forwards infinite;
        &:nth-of-type(1) {
        }
        &:nth-of-type(2) {
          animation-delay: 0.3s;
        }
        &:nth-of-type(3) {
          animation-delay: 0.5s;
        }
      }
    }
  }
`;
export const ContentBox = styled.div`
  position: relative;
  cursor: pointer;
  transition: 0.2s;
  width: calc((100% - 60px) / 4);
  margin-right: 20px;
  margin-bottom: 20px;
  &:nth-of-type(4n) {
    margin-right: 0;
  }
  border-radius: 6px;
  padding: 15px;
  height: 250px;
  background: var(--brown-10);
  > img {
    width: auto;
    height: 100px;
    object-fit: contain;
    margin: 0 auto;
    @media (max-width: 768px) {
      height: 80px;
    }
  }
  @media (max-width: 930px) {
    width: calc((100% - 40px) / 3);
    &:nth-of-type(4n) {
      margin-right: 20px;
    }
    &:nth-of-type(3n) {
      margin-right: 0;
    }
  }
  @media (max-width: 768px) {
    width: calc(50% - 5px);
    margin-right: 10px;
    height: 220px;
    margin-bottom: 10px;
    padding: 15px;
    &:nth-of-type(3n) {
      margin-right: 10px;
    }
    &:nth-of-type(2n) {
      margin-right: 0;
    }
  }
  &:hover {
    box-shadow: var(--shadow);
    transition: box-shadow 0.2s;
  }
`;
export const ContentTit = styled.h3`
  font-size: var(--fz-base);
  line-height: 1.2;
  margin: 15px 0 10px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--brown-20);
  font-weight: 500;
  @media (max-width: 768px) {
    width: 90%;
  }
`;
export const ContentText = styled.div`
  width: 100%;
  overflow: hidden;
  font-size: var(--fz-base);
  line-height: 20px;
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  word-break: keep-all;
  @media (max-width: 768px) {
    -webkit-line-clamp: 3;
  }
`;
export const LikeCount = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  right: 10px;
  top: 10px;
  color: var(--brown-20);
  > p {
    font-size: 12px;
    padding-top: 3px;
  }
  @media (max-width: 768px) {
    top: 100px;
    right: 7px;
  }
`;