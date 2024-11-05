import {api, CommentAPIType} from "../../api/api";
import {fetchPostsSuccess, mapToLookUpTable} from "./posts-reducer";
import {Dispatch} from "redux";

// types
export type CommentType = Omit<CommentAPIType, 'author'> & { authorId: number };
type StateType = typeof initialState;
type ActionsType =
  | ReturnType<typeof fetchPostsSuccess>
  | ReturnType<typeof fetchPostCommentsSuccess>
  | ReturnType<typeof deleteCommentSuccess>
  | ReturnType<typeof addCommentSuccess>;

const initialState = {
  byId: {} as { [key: string]: CommentType }
};

export const commentsReducer = (state = initialState, action: ActionsType): StateType => {
  switch (action.type) {
    case "POSTS/FETCH-POSTS-SUCCESS": {
      return {
        ...state,
        byId: {
          ...state.byId,
          ...mapToLookUpTable(action.payload.posts
            .map(p => p.lastComments).flat()
            .map(com => {
              const commentCopy: CommentType = {
                id: com.id,
                text: com.text,
                authorId: com.author.id
              }
              return commentCopy
            }))
        }
      }
    }
    case "POSTS/FETCH-POSTS-COMMENTS-SUCCESS": {
      const lookUpTable = mapToLookUpTable(action.payload.comments
        .map(com => {
          const commentCopy: CommentType = {
            id: com.id,
            text: com.text,
            authorId: com.author.id
          }
          return commentCopy
        }))
      return {
        ...state,
        byId: {
          ...state.byId,
          ...lookUpTable
        }
      }
    }
    case "POSTS/DELETE-COMMENT-SUCCESS": {
      const copyById = {
        ...state.byId
      }
      delete copyById[action.payload.commentId];
      return {
        ...state,
        byId: copyById
      }
    }
    case "POSTS/ADD-COMMENT-SUCCESS":
      debugger
      let newComment: CommentType = {
        id: 1000,
        text: action.payload.text,
        authorId: 1,
      };
      return {
        ...state,
        byId: {
          ...state.byId,
          [newComment.id]: newComment
        }
      };
    default: return state
  }
}

// action creators
export const fetchPostCommentsSuccess = (postId: number, comments: CommentAPIType[]) => (
  {
    type: 'POSTS/FETCH-POSTS-COMMENTS-SUCCESS',
    payload: {comments: comments, postId: postId}
  } as const);
export const deleteCommentSuccess = (postId: number, commentId: number) => (
  {
    type: 'POSTS/DELETE-COMMENT-SUCCESS',
    payload: {postId, commentId}
  } as const);
export const addCommentSuccess = (postId: number, text: string) => ({
  type: 'POSTS/ADD-COMMENT-SUCCESS',
  payload: {postId, text}
} as const);

// thunks
export const fetchPostsComments = (postId: number) => async (dispatch: Dispatch) => {
  const comments = await api.getComments(postId);
  dispatch(fetchPostCommentsSuccess(postId, comments));
};
export const deleteComment = (postId: number, commentId: number) => async (dispatch: Dispatch) => {
  const result = await api.deleteComment(postId, commentId);
  dispatch(deleteCommentSuccess(postId, commentId));
};
export const addComment = (postId: number, text: string) => async (dispatch: Dispatch) => {
  const result = await api.addComment(postId, text);
  dispatch(addCommentSuccess(postId, text));
};