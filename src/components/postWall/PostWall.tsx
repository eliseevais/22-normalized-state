import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect} from "react";
import {Post} from "./posts/post/Post";
import {AppRootStateType} from "../../features/application/store";
import {fetchPosts} from "./posts/posts-reducer";
import "./PostWall.css";

export const PostWall: React.FC = (props) => {
  const ids = useSelector((state: AppRootStateType) => state.posts.allIds);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts())
  }, []);

  return (
    <div className="ContainerPostPage">
      {ids.map(id => <Post key={id} postId={id}/>)}
    </div>
  )
}