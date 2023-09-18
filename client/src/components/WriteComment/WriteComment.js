import { useState } from 'react';
import { WriteCommentContainer } from './WriteComment.styled';
import axios from 'axios';
import getAccessToken from '../../common/utils/getToken';

export default function WriteComment({ boardId, fetchComment, fetchBoard }) {
  const [comment, setComment] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;
  let accessToken = getAccessToken();

  const changeHandler = (event) => {
    setComment(event.target.value);
  }

  const submitHandler = () => {
    accessToken = getAccessToken();
    axios
      .post(`${apiUrl}/board/${boardId}/comment`,
        { "content": comment },
        { headers: { Authorization: accessToken } })
      .then((response) => {
        console.log(response.data);
        fetchBoard();
        fetchComment();
        setComment('');
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <WriteCommentContainer>
      <textarea
        placeholder='Enter your comment...'
        value={comment}
        onChange={(event) => changeHandler(event)}
      />
      <button onClick={submitHandler} disabled={comment.length === 0}>Save</button>
    </WriteCommentContainer>
  )
}