import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect} from "react";
import {Post} from "../features/posts/components/Post";
import {AppRootStateType} from "../features/app/store";
import {fetchPosts} from "../features/posts/posts-reducer";

export const PostPages: React.FC = (props) => {
  const ids = useSelector((state: AppRootStateType) => state.posts.allIds);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts())
  }, []);

  return (
    <div>
      {ids.map(id => <Post key={id} postId={id}/>)}
    </div>
  )
}