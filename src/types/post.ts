export interface Post {
    id: string
    title: string
    content: string
    slug: string
    createdAt: Date
    author: {
      name: string
    }
  }