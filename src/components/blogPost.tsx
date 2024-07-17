// import { Post } from '@/types/post'

interface BlogPostProps {
    title: string;
    content: string;
    id: string;
    author:{
        name: string;
    }
  }
  
  function BlogPost({ title, content, id, author }: BlogPostProps) {
    return (
      <div>
        <h1>{title}</h1>
        by {author.name}
        <p>{content}</p>
        post id: {id}
      </div>
    );
  }
  
  export default BlogPost;