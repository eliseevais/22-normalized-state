import {api, AuthorAPIType} from "../../api/api";
import {fetchPostsSuccess, mapToLookUpTable} from "./posts-reducer";
import {Dispatch} from "redux";
import {fetchPostCommentsSuccess} from "./comments-reducer";

// type
type ActionTypes =
  | ReturnType<typeof fetchPostsSuccess>
  | ReturnType<typeof updateAuthorSuccess>
  | ReturnType<typeof fetchPostCommentsSuccess>;

type StateType = typeof initialState;

const initialState = {
  byId: {} as { [key: string]: AuthorAPIType }
};

export const authorsReducer = (state = initialState, action: ActionTypes): StateType => {
  switch (action.type) {
    case "POSTS/FETCH-POSTS-SUCCESS": {
      return {
        ...state,
        byId: {
          ...state.byId,
          ...mapToLookUpTable(action.payload.posts.map(p => p.author)),
          ...mapToLookUpTable(action.payload.posts.map(p => p.lastComments).flat().map(c => c.author))
        }
      }
    }
    case "POSTS/UPDATE-NAME-SUCCESS": {
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.authorId]: {...state.byId[action.payload.authorId], name: action.payload.name}
        }
      }
    }
    case "POSTS/FETCH-POSTS-COMMENTS-SUCCESS": {
      return {
        ...state,
        byId: {
          ...state.byId,
          ...mapToLookUpTable(action.payload.comments.map(p => p.author))
        }
      }
    }
    default: return state
  }
};

// action creators
export const updateAuthorSuccess = (authorId: number, name: string) => ({
  type: 'POSTS/UPDATE-NAME-SUCCESS',
  payload: {authorId, name}
} as const);

// thunks
export const updateAuthor = (authorId: number, name: string) => async (dispatch: Dispatch) => {
  const result = await api.updateAuthor(authorId, name);
  dispatch(updateAuthorSuccess(authorId, name));
};