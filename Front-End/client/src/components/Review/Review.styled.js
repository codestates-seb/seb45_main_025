import { styled } from "styled-components";

export const SmBtn = styled.button`
  padding: 4px 6px;
  border-radius: 4px;
  text-align: center;
  font-size: var()(--fz-sm);
  border: 1px solid var(--brown-20);
  background: #fff;
  color: var(--brown-20);
  transition: 0.4s;
  &:hover {
    background: var(--brown-20);
    color: #fff;
    transition: 0.4s;
  }
`;

export const ReviewWrap = styled.div`
  margin-top: 15px;
`;
export const ReviewBtn = styled.button`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 7px;
  height: 30px;
  color: var(--brown-20);
  background: var(--bl-1);
  border-radius: 6px;
  > span {
    padding-left: 5px;
    font-weight: 600;
  }
  &:hover {
    background: var(--brown-20);
    color: #fff;
    transition: 0.4s;
  }
  @media (max-width: 768px) {
    background: var(--brown-20);
    color: #fff;
  }
`;
export const ReviewList = styled.ul`
  margin-top: 15px;
`;
export const ReviewItem = styled.li`
  position: relative;
  width: 100%;
  border-radius: 6px;
  background: var(--brown-10);
  padding: 20px;
  margin-bottom: 10px;
  height: 120px;
  overflow: hidden;
  &.review-open {
    height: auto;
  }
  .btn-wrap {
    position: absolute;
    right: 10px;
    top: 15px;
  }
  .btn-more {
    position: absolute;
    right: 10px;
    bottom: 15px;
    color: var(--brown-20);
    font-weight: 600;
    cursor: pointer;
  }
`;
export const ReviewContent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;
export const UserImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  flex: none;
  overflow: hidden;
  margin-top: 5px;
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
export const UserInputs = styled.div`
  width: calc(100% - 120px);
  margin-left: 10px;
  padding-top: 10px;
  img {
    width: auto;
    height: 50px;
    object-fit: cover;
    margin-bottom: 15px;
    ${ReviewItem}.review-open & {
      max-width: 60%;
      height: auto;
    }
  }
  .writedate {
    padding-left: 10px;
    color: var(--bl-2);
    font-size: var(--fz-sm);
  }
  div {
    width: 100%;
    margin-top: 15px;
    line-height: 20px;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    ${ReviewItem}.review-open & {
      display: block;
      text-overflow: initial;
      -webkit-line-clamp: initial;
      overflow: visible;
    }
  }
`;
export const ReviewModalBack = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(34, 34, 34, 0.6);
  z-index: 9999;
`;
export const ReviewModal = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 70vh;
  padding: 10px;
  border-radius: 12px;
  background: #fff;
  @media (max-width: 768px) {
    width: calc(100% - 30px);
    height: 60vh;
  }
`;
export const ReviewModalBox = styled.div`
  position: relative;
  padding: 40px 10px;
  height: 100%;
  overflow: auto;
  > .close {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 24px;
    cursor: pointer;
  }
`;
export const ReviewImage = styled.div`
  position: relative;
  width: 100%;
  height: 130px;
  padding: 10px;
  border: 1px dashed var(--brown-50);
  border-radius: 6px;
  overflow: auto;
  > label {
    cursor: pointer;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
    color: var(--brown-20);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 30px;
    > span {
      font-size: var(--fz-base);
      padding-top: 10px;
      line-height: 1.2;
    }
  }
  > input {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
  &.uploaded > label {
    opacity: 0;
  }
`;
export const ReviewText = styled.textarea`
  margin-top: 15px;
  width: 100%;
  height: 130px;
  resize: none;
  border: 1px solid var(--brown-20);
  border-radius: 6px;
  padding: 10px;
  font-size: var(--fz-sm);
  line-height: 18px;
`;
export const ReviewMedSelect = styled.div`
  margin-top: 15px;
  width: 100%;
  background: var(--brown-10);
  border-radius: 6px;
  padding: 10px;
  > input {
    border-bottom: 1px solid var(--brown-20);
  }
  .entered-med {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    margin-top: 15px;
  }
  p {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 3px 4px 4px 6px;
    background: var(--brown-50);
    border-radius: 4px;
    margin-right: 4px;
    cursor: pointer;
    > span {
      padding-right: 4px;
    }
  }
`;
export const ReviewSubmitBtn = styled.button`
  width: ${props => props.width || '120px'};
  height: ${props => props.height || '34px'};
  text-align: center;
  border-radius: 6px;
  background: ${props => props.background || 'var(--brown-20)'};
  color: ${props => props.color || '#fff'};
  border-width: 1px;
  border-style: solid;
  border-color: ${props => props.border || 'transparent'};
  margin: 20px auto 0;
  display: block;
  transition: 0.4s;
  &:hover {
    background: ${props => props.hoverbg || 'var(--darkbl)'};
    color: ${props => props.hoberColor || '#fff'};
    transition: 0.4s;
    transform: translateY(-3px);
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  > ul {
    display: flex;
    justify-content: center;
    align-items: center;
    > li {
      height: 25px;
      width: 25px;
      display: flex;
      margin: 0 3px;
      justify-content: center;
      align-items: center;
      > a {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        font-size: 11px;
      }
      &.previous,
      &.next {
        border-radius: 4px;
        background: var(--brown-20);
        color: #fff;
        margin: 0 5px;
      }
      &.active {
        background: var(--brown-10);
        font-weight: 600;
      }
    }
  }
  @media (max-width: 768px) {
    margin-top: 30px;
    display: none;
    &.always {
      display: flex;
    }
  }
`;