import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {postsReducer} from "../../components/postWall/posts/posts-reducer";
import thunkMiddleware from "redux-thunk";
import {authorsReducer} from "../../components/postWall/posts/authors-reducer";
import {commentsReducer} from "../../components/postWall/posts/comments-reducer";

const rootReducer = combineReducers({
  posts: postsReducer,
  authors: authorsReducer,
  comments: commentsReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>;

// @ts-ignore
window.store = store