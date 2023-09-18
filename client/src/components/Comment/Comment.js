import { useEffect, useRef, useState } from 'react';
import { CommentContainer } from './Comment.styled';
import axios from 'axios';
import getAccessToken from '../../common/utils/getToken';

export default function Comment({ boardId, comment, fetchComment, fetchBoard }) {
  const [newComment, setNewComment] = useState(comment.content);
  const inputRef = useRef(null);
  const [isEdit, setIsEdit] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  let accessToken = getAccessToken();

  useEffect(() => {
    if (isEdit) {
      inputRef.current.focus();
    }
  }, [isEdit]);


  const changeHandler = (event) => {
    setNewComment(event.target.value);
  }

  const patchHandler = () => {
    accessToken = getAccessToken();
    setIsEdit(false);
    axios
      .patch(`${apiUrl}/board/${boardId}/comment/${comment.commentId}`,
        { "content": newComment },
        { headers: { Authorization: accessToken } })
      .then((response) => {
        console.log(response.data);
        setIsEdit(false);
        fetchComment();
        fetchBoard();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const deleteHandler = () => {
    accessToken = getAccessToken();
    axios
      .delete(`${apiUrl}/board/${boardId}/comment/${comment.commentId}`,
        { headers: { Authorization: accessToken } })
      .then((response) => {
        console.log(response.data);
        fetchComment();
        fetchBoard();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <CommentContainer>
      {isEdit ?
        <input
          type='text'
          value={newComment}
          onChange={(event) => changeHandler(event)}
          ref={inputRef}
        /> :
        <div>
          {comment.content}
        </div>}
      <div className='name'>{comment.name}</div>
      <></>
      {isEdit ?
        <button onClick={patchHandler}>Save</button> :
        <button onClick={() => setIsEdit(true)}>Edit</button>}
      <button onClick={deleteHandler}>Delete</button>

    </CommentContainer>
  )
}