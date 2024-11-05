import * as React from "react";
import {ChangeEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updatePost} from "../posts-reducer";
import {AppRootStateType} from "../../app/store";
import {updateAuthor} from "../authors-reducer";
import {addComment, fetchPostsComments} from "../comments-reducer";
import {Comment} from "./Comment";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './Post.css'

export const Post: React.FC<{ postId: number }> = ({postId}) => {

  const post = useSelector((state: AppRootStateType) => state.posts.byId[postId]);
  const author = useSelector((state: AppRootStateType) => state.authors.byId[post.authorId]);

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
    setNewComment('')
  }

  return (
    <div className="ContainerPost">
      <div className="NamePostLikes">
        <div>
          {!editModeAuthor && <b onDoubleClick={onDoubleClickHandlerAuthor}>{author.name}</b>}
          {editModeAuthor && <textarea
            value={name}
            onChange={onchangeHandlerAuthor}
            onBlur={onBlurHandlerAuthor}
          >{name}</textarea>}
        </div>

          <p>
            {!editModePost && <span onDoubleClick={onDoubleClickHandlerPost}>{post.text}</span>}
            {editModePost && <textarea
              value={text}
              onChange={onchangeHandlerPost}
              onBlur={onBlurHandlerPost}
            >{text}</textarea>}
          </p>

          <span>likes: {post.likes}</span>
      </div>
      <hr/>

      Comments:
      <ul>
        {post.commentsIds.map(id => <Comment key={id} id={id} postId={postId}/>)}
      </ul>

      <Button variant="contained" onClick={onClickHandlerAllComments}>All comments</Button>

      <br/>

      <div className="ContainerNewComment">
        <div>
          <Box
            component="form"
            sx={{'& > :not(style)': {m: 1, width: '84ch'}}}
            noValidate
            autoComplete="off"
          >
            <TextField id="outlined-basic" label="New comment" variant="outlined"
                       value={newComment}
                       onChange={onchangeHandlerComment}
            >{newComment}</TextField>
          </Box>

        </div>
        <div>
          <Button variant="contained" onClick={onClickHandlerNewComment}>Add</Button>
        </div>
      </div>

    </div>
  )
}

