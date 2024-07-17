'use client'
import React, { FC, useState, useEffect } from 'react'
import Comments from '@/components/comments'
import axios from 'axios'
import { Post } from '@/types/post'

interface BlogDetailProps {
  params: {
    slug: string
  }
}


const BlogDetail: FC<BlogDetailProps> = ({ params }) => {
  const [post, setPost] = useState({} as Post)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/posts?slug=${params.slug}`)
        if (response.status === 200) {
          setPost(response.data.post)
        }
      } catch (error) {
        console.error('Error fetching post:', error)
      }
    }
    fetchPost()
  }, [setPost, params.slug])

  return (
    <div className='max-w-4xl mx-auto py-8 '>
      <h1 className='text-3xl font-bold px-4'>{post?.title}</h1>
      <p className='text-gray-500 px-4'>By {post?.author?.name }</p>
        <div className='mt-4 px-4'>
            {post.content}
        </div>
        {post.id && <Comments postId={post?.id}/>}
    </div>
  )
}

export default BlogDetail
