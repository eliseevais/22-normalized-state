import React, {ChangeEvent, MouseEventHandler, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updatePost} from "../posts-reducer";
import {AppRootStateType} from "../../app/store";
import {updateAuthor} from "../authors-reducer";
import {addComment, deleteComment, fetchPostsComments} from "../comments-reducer";

export const Post: React.FC<{ postId: number }> = ({postId}) => {

  const post = useSelector((state: AppRootStateType) => state.posts.byId[postId]);
  const author = useSelector((state: AppRootStateType) => state.authors.byId[post.authorId]);

  // const comments = useSelector((state: AppRootStateType) => state.comments)

  const [editModePost, setEditModePost] = useState(false);
  const [editModeAuthor, setEditModeAuthor] = useState(false);

  const [text, setText] = useState(post.text);
  const [name, setName] = useState(author.name);
  const [newComment, setNewComment] = useState('');

  const dispatch = useDispatch();

  const onDoubleClickHandlerPost = () => {
    setEditModePost(true)
  };
  const onDoubleClickHandlerAuthor = () => {
    setEditModeAuthor(true)
  };

  const onchangeHandlerPost = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.currentTarget.value)
  };
  const onchangeHandlerAuthor = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setName(e.currentTarget.value)
  };
  const onchangeHandlerComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.currentTarget.value)
  };

  const onBlurHandlerPost = () => {
    dispatch(updatePost(post.id, text))
    setEditModePost(false)
  };
  const onBlurHandlerAuthor = () => {
    dispatch(updateAuthor(author.id, name))
    setEditModeAuthor(false)
  };

  const onClickHandlerAllComments = () => {
    dispatch(fetchPostsComments(postId))
  };
  const onClickHandlerNewComment = () => {
    dispatch(addComment(postId, newComment))
    alert(newComment);
    setNewComment('')
  }

  return (
    <div>
      {/*<b>{author.name}</b>*/}
      {!editModeAuthor && <b onDoubleClick={onDoubleClickHandlerAuthor}>{author.name}</b>}
      {editModeAuthor && <textarea
        value={name}
        onChange={onchangeHandlerAuthor}
        onBlur={onBlurHandlerAuthor}
      >{name}</textarea>}

      <br/>

      {!editModePost && <span onDoubleClick={onDoubleClickHandlerPost}>{post.text}</span>}
      {editModePost && <textarea
        value={text}
        onChange={onchangeHandlerPost}
        onBlur={onBlurHandlerPost}
      >{text}</textarea>}

      <br/>

      likes: {post.likes}
      <hr/>

      Comments:
      <ul>
        {post.commentsIds.map(id => <Comment key={id} id={id} postId={postId}/>)}
        {/*{comments.map(id => <Comment key={id} id={id} postId={postId}/>)}*/}
      </ul>

      <button onClick={onClickHandlerAllComments}>all comments</button>

      <br/>

      <textarea
        value={newComment}
        onChange={onchangeHandlerComment}
      >{newComment}</textarea>
      <button onClick={onClickHandlerNewComment}>add</button>
      <hr/>
    </div>
  )
}

const Comment: React.FC<{ id: number, postId: number }> = ({id, postId}) => {
  const comment = useSelector((state: AppRootStateType) => state.comments.byId[id]);
  const author = useSelector((state: AppRootStateType) => state.authors.byId[comment.authorId]);
  const dispatch = useDispatch();

  const deleteCommentHandler = ()=> {
    dispatch(deleteComment(postId, id))
  }

  return (<li>
      <b>{author.name}</b>: {comment.text}
      <button onClick={deleteCommentHandler}>x</button>
    </li>
  )
}