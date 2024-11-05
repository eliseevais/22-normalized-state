import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {deleteComment} from "../comments-reducer";
import * as React from 'react';
import Button from '@mui/material/Button';
import './Comment.css'

export const Comment: React.FC<{ id: number, postId: number }> = ({id, postId}) => {
  const comment = useSelector((state: AppRootStateType) => state.comments.byId[id]);
  const author = useSelector((state: AppRootStateType) => state.authors.byId[comment.authorId]);
  const dispatch = useDispatch();

  const deleteCommentHandler = () => {
    dispatch(deleteComment(postId, id))
  }

  return (<li className="ContainerComment">
      <h3>{author.name}:</h3>
      <p>{comment.text}</p>
      <Button onClick={deleteCommentHandler} variant="contained">Delete</Button>
    </li>
  )
}