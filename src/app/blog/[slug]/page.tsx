import React, { FC } from 'react'
import Comments from '@/components/comments'
import FormNewComment from '@/components/formNewComment'
import  prisma  from '@/lib/db'  

interface BlogDetailProps {
  params: {
    slug: string
  }
}

const BlogDetail: FC<BlogDetailProps> = async ({ params }) => {
  const post = await prisma.post.findFirst({
    where: {
      slug: params.slug
    },
    include: {
      author: true,
    }
  })
  return (
    <div className='max-w-4xl mx-auto py-8 '>
      <h1 className='text-3xl font-bold'>{post?.title}</h1>
      <p className='text-gray-500'>By {post?.author.name}</p>
        <div className='mt-4'>
            {post?.content}
        </div>
        {post?.id && <Comments postId={post?.id}/>}
        {post?.id && <FormNewComment postId={post?.id}/>}
    </div>
  )
}

export default BlogDetail
