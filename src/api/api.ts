export type AuthorAPIType = {
  id: number,
  name: string
};
export type CommentAPIType = {
  id: number,
  text: string
  author: AuthorAPIType
};
export type PostAPIType = {
  id: number,
  text: string,
  likes: number,
  author: AuthorAPIType,
  lastComments: CommentAPIType[]
};

export const api = {
  getPosts(): Promise<PostAPIType[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
          return resolve([
            {
              id: 1,
              text: 'Hello! I like React!',
              likes: 57,
              author: {id: 1, name: 'Irina Eliseeva'},
              lastComments: [
                {id: 999, text: 'Nice! Me too', author: {id: 3, name: 'Katya Petrova'}},
                {id: 998, text: 'Hm... I have not decided it yet', author: {id: 4, name: 'Victor Markov'}},
              ]
            },
            {
              id: 2,
              text: 'Wow! Tell us about it some more information, please.',
              likes: 13,
              author: {id: 2, name: 'Valera Netrebko'},
              lastComments: []
            },
            {
              id: 3,
              text: 'React is a library, based on Java script. It optimized rendering page and so computer resource.',
              likes: 57,
              author: {id: 1, name: 'Irina Eliseeva'},
              lastComments: [
                {id: 888, text: 'Thank you for explanations', author: {id: 2, name: 'Valera Netrebko'}},
                {id: 887, text: 'I will try it next time again', author: {id: 4, name: 'Victor Markov'}},
              ]
            },
            {
              id: 4,
              text: 'I like Angular',
              likes: 10,
              author: {id: 1, name: 'Irina Eliseeva'},
              lastComments: [
                {id: 777, text: 'Wow', author: {id: 2, name: 'Valera Netrebko'}},
              ]
            },
          ])
        }
        , 2000)
    })
  },
  updatePost(postId: number, text: string) {
    return Promise.resolve({})
  },
  getComments(postId: number) {
    return Promise.resolve([
      {id: 888, text: 'Thank you for explanations', author: {id: 2, name: 'Valera Netrebko'}},
      {id: 887, text: 'I will try it next time again', author: {id: 4, name: 'Victor Markov'}},
      {id: 886, text: 'Java script is cool language', author: {id: 5, name: 'Elena Gorshova'}},
      {id: 885, text: 'I like Java script', author: {id: 5, name: 'Elena Gorshova'}},
    ])
  },
  updateAuthor(authorId: number, name: string) {
    return Promise.resolve({})
  },
  deleteComment(postId: number, commentId: number) {
    return Promise.resolve({})
  },
  addComment(postId: number, text: string) {
    return Promise.resolve({})
  }
};