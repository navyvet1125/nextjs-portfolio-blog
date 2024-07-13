export interface Post {
    id: string
    title: string
    content: string
    slug: string
    author: {
      name: string
    }
  }