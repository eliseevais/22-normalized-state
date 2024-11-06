import * as React from "react";
import {ChangeEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updatePost} from "../posts-reducer";
import {AppRootStateType} from "../../../../features/application/store";
import {updateAuthor} from "../authors-reducer";
import {addComment, fetchPostsComments} from "../comments-reducer";
import {Comment} from "../../../comments/Comment";
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
  };

  return (
    <div className="ContainerPost">
      <div className="NamePostLikes">
        <div className="NameInPost">
          {!editModeAuthor && <b onDoubleClick={onDoubleClickHandlerAuthor}>{author.name}:</b>}
          {editModeAuthor && <textarea
            value={name}
            onChange={onchangeHandlerAuthor}
            onBlur={onBlurHandlerAuthor}
          >{name}</textarea>}
        </div>

          <p className="TextPost">
            {!editModePost && <span onDoubleClick={onDoubleClickHandlerPost}>{post.text}</span>}
            {editModePost && <textarea
              value={text}
              onChange={onchangeHandlerPost}
              onBlur={onBlurHandlerPost}
            >{text}</textarea>}
          </p>

          <span className="LikesPost">likes: {post.likes}</span>
      </div>
      <hr/>

      <div className="CommentsChapter">Comments</div>
      <div className="ListComments">
        {post.commentsIds.map(id => <Comment key={id} id={id} postId={postId}/>)}
      </div>

      <div>
        <Button variant="outlined" onClick={onClickHandlerAllComments} size="small">All comments</Button>
      </div>

      <br/>

      <div className="ContainerNewComment">
        <div>
          <Box
            component="form"
            sx={{'& > :not(style)': {m: 1, width: '45ch'}}}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-textarea"
              multiline
              label="New comment"
              placeholder="New comment"
              value={newComment}
              onChange={onchangeHandlerComment}
              size="small"
            >{newComment}</TextField>
          </Box>

        </div>
        <div>
          <Button variant="outlined" onClick={onClickHandlerNewComment} size="small">Add</Button>
        </div>
      </div>

    </div>
  )
};