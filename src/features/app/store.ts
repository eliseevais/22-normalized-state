import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {postsReducer} from "../posts/posts-reducer";
import thunkMiddleware from "redux-thunk"


const rootReducer = combineReducers({
  posts: postsReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>