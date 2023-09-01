import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { 
  Pagination ,
  ReviewWrap,
  ReviewBtn,
  ReviewList,
  ReviewItem,
  ReviewContent,
  UserImage,
  UserInputs,
  ReviewModalBack,
  ReviewModal,
  ReviewModalBox,
  ReviewImage,
  ReviewText,
  ReviewMedSelect,
  ReviewSubmitBtn,
} from './Review.styled';
import { IoMdClose } from 'react-icons/io';
import { FaPlus } from 'react-icons/fa';
import { BsFillImageFill } from 'react-icons/bs';

const Review = () => {
  const [reviewList] = useState([]);
  const [reviewAddOpen, setReviewAddOpen] = useState(false);
  const [reviewUpdateOpen, setReviewUpdateOpen] = useState(false);

  //Pagination
  const [setCurrentPage] = useState(1);
  const [totalLength] = useState(0);

  const PER_PAGE = 5;
  const pageCount = Math.ceil(totalLength/PER_PAGE);
  const handlerPageClick = event => {
    setCurrentPage(event.selected + 1);
  };

  const reviewAddModalOpen = e => {
    e.stopPropagation();
    setReviewAddOpen(!reviewAddOpen);
  };

  const reviewUpdateModalOpen = e => {
    e.stopPropagation();
    setReviewUpdateOpen(!reviewUpdateOpen);
  }

  return (
    <ReviewWrap>
      <ReviewBtn onClick="">
        <FaPlus />
        <span>리뷰쓰기</span>
      </ReviewBtn>
      {reviewList.map((item) => {
        return (
            <>
          <ReviewList>
            <ReviewItem
              className={item.reviewStretch ? 'review-open review' : 'review'}
            >
              <ReviewContent>
                <UserImage>
                    image
                </UserImage>
                <UserInputs>
                  <span className="username">Dongyun</span>
                  <span className="writedate">2023.08.31</span>
                </UserInputs>
              </ReviewContent>
            </ReviewItem>
          </ReviewList>
          </>
        );
      })}
      {reviewAddOpen ? (
        <ReviewModalBack>
          <ReviewModal>
            <ReviewModalBox>
              <button
                onClick={e => {
                  reviewAddModalOpen(e);
                }}
                className="close"
                aria-label="modal close"
              >
                <IoMdClose />
              </button>
              <ReviewImage className={null}>
                <label htmlFor="addReviewImg">
                  <BsFillImageFill />
                  <span>클릭해서 업로드</span>
                </label>
                <input
                  id="addReviewImg"
                  type="file"
                  accept="image/*"
                  onClick=""
                />
              </ReviewImage>
              <ReviewText
                maxLength={500}
                placeholder="후기를 적어주세요."
              ></ReviewText>
              <ReviewMedSelect>
                <input
                  type="text"
                  placeholder="#를 입력하세요"
                />
                <div className="entered-med">
                </div>
              </ReviewMedSelect>
              <ReviewSubmitBtn
                onClick=""
              >
                리뷰쓰기
              </ReviewSubmitBtn>
            </ReviewModalBox>
          </ReviewModal>
        </ReviewModalBack>
      ) : null}
      {reviewUpdateOpen ? (
        <ReviewModalBack>
          <ReviewModal>
            <ReviewModalBox>
              <button
                onClick={e => {
                  reviewUpdateModalOpen(e);
                }}
                className="close"
                aria-label="modal close"
              >
                <IoMdClose />
              </button>
              <ReviewImage className={null}>
                <label htmlFor="updateReviewImg">
                  <BsFillImageFill />
                  <span>클릭해서 업로드</span>
                </label>
                <input
                  id="updateReviewImg"
                  type="file"
                  accept="image/*"
                  onClick={e => (e.target.value = null)}
                />
              </ReviewImage>
              <ReviewText
                maxLength={500}
                placeholder="후기를 적어주세요."
              ></ReviewText>
              <ReviewMedSelect>
                <input
                  type="text"
                  placeholder="#를 입력하세요"
                />
                <div className="entered-med">
                </div>
              </ReviewMedSelect>
              <ReviewSubmitBtn
                onClick=""
              >
                수정하기
              </ReviewSubmitBtn>
            </ReviewModalBox>
          </ReviewModal>
        </ReviewModalBack>
      ) : null}
      {/* Pagination */}
      <Pagination>
        <ReactPaginate
          previousLabel="<"
          nextLabel=">"
          breakLabel="..."
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlerPageClick}
          // 밑 props는 style을 위한 className 지정 해주는 역할
          containerClassName=""
          // containerClassName="pagination"
          subContainerClassName=""
          activeClassName="active"
        />
      </Pagination>
    </ReviewWrap>
  );
};

export default Review;