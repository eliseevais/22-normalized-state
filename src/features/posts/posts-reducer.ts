import {api, PostAPIType} from "../../api/api";
import {Dispatch} from "redux";
import {addCommentSuccess, CommentType, deleteCommentSuccess, fetchPostCommentsSuccess} from "./comments-reducer";

// types
type ActionTypes =
  | ReturnType<typeof fetchPostsSuccess>
  | ReturnType<typeof updatePostSuccess>
  | ReturnType<typeof fetchPostCommentsSuccess>
  | ReturnType<typeof deleteCommentSuccess>
  | ReturnType<typeof addCommentSuccess>;

type PostType = {
  id: number,
  text: string,
  likes: number,
  authorId: number,
  commentsIds: number[]
};

type LookUpTableType<T> = {[key: string]: T};

const initialState = {
  allIds: [] as number[],
  byId: {} as { [key: string]: PostType }
};

export const mapToLookUpTable = <T extends {id: number}>(items: T[]): LookUpTableType<T> => {
  const acc: LookUpTableType<T> = {}
  return items.reduce((acc, item) => {
    acc[item.id] = item;
    return acc
  }, acc)
}
export const postsReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case "POSTS/FETCH-POSTS-SUCCESS": {
      return {
        ...state,
        // items: action.payload.posts,
        allIds: action.payload.posts.map(p => p.id),
        byId: mapToLookUpTable(action.payload.posts.map(p => {
          const copyPost: PostType = {
            id: p.id,
            text: p.text,
            likes: p.likes,
            authorId: p.author.id,
            commentsIds: p.lastComments.map(c => c.id)
          }
          return copyPost
        }))
      }
    }
    case "POSTS/FETCH-POSTS-COMMENTS-SUCCESS": {
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.postId]: {...state.byId[action.payload.postId],
            commentsIds: action.payload.comments.map(c => c.id)
          }
        }
      }
    }
    case "POSTS/UPDATE-POST-SUCCESS": {
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.postId]: {...state.byId[action.payload.postId], text: action.payload.text}
        }
        // items: state.items.map(i => i.id === action.payload.postId ? {...i, text: action.payload.text} : i)
      }
    }
    case "POSTS/DELETE-COMMENT-SUCCESS": {
      let post = state.byId[action.payload.postId];
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.postId]: {
            ...post,
            commentsIds: post.commentsIds.filter(id => id != action.payload.commentId)
          }
        }
      }
    }
    case "POSTS/ADD-COMMENT-SUCCESS":
      let newComment: CommentType = {
        id: 1000,
        text: action.payload.text,
        authorId: 1,
      };
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.postId]: {
            ...state.byId[action.payload.postId],
            commentsIds: [...state.byId[action.payload.postId].commentsIds, newComment.id]
          }
        }
      };
    default: return state
  }
}

// action creators
export const fetchPostsSuccess = (posts: PostAPIType[]) => (
  {type: 'POSTS/FETCH-POSTS-SUCCESS', payload: {posts: posts}} as const);
export const updatePostSuccess = (postId: number, text: string) => ({
  type: 'POSTS/UPDATE-POST-SUCCESS',
  payload: {postId, text}
} as const);

// thunks
export const fetchPosts = () => async (dispatch: Dispatch) => {
  const posts = await api.getPosts();
  dispatch(fetchPostsSuccess(posts));
};
export const updatePost = (postId: number, text: string) => async (dispatch: Dispatch) => {
  const result = await api.updatePost(postId, text);
  dispatch(updatePostSuccess(postId, text));
};