'use client'
import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import axios from 'axios'
import { Post } from '@/types/post'

const formatDateAndTime = (date: Date) => {
  return new Date(date).toLocaleString()

} 

const BlogList = () => {
  const [posts, setPosts] = useState([] as Post[])
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts')
        if (response.status === 200) {
          setPosts(response.data.posts)
        }
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }
    fetchPosts()
  }, [setPosts])
  return (
    <div className='max-w-6xl mx-auto py-8 px-4'>
      <h1 className='text-4xl font-bold mb-4'>Blog</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {posts.map((post) => (
          <div key={post.id} className='bg-white p-4 rounded-md shadow-md text-gray-900'>
            <Link href={`/blog/${post.slug}`}>
                <h2 className='text-xl font-bold'>{post.title}</h2>
                <p className='text-gray-500'>By {post.author.name}</p>
                <p className='mt-2 text-gray-600 text-sm font-medium'>{formatDateAndTime(post.createdAt)}</p>
                <p className='mt-2'>{post.content}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlogList
