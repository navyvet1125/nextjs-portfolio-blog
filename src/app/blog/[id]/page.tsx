import React from 'react'
import Comments from '@/components/comments'
import FormNewComment from '@/components/formNewComment'

const BlogDetail = () => {
  return (
    <div className='max-w-4xl mx-auto py-8 '>
      <h1 className='text-3xl font-bold'>Title</h1>
      <p className='text-gray-500'>By Author</p>
        <div className='mt-4'>
            <p>
            Content
            </p>
        </div>
        <Comments />
        <FormNewComment />
    </div>
  )
}

export default BlogDetail
