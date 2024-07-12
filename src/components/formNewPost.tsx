'use client'
import axios from 'axios'
import React, { useState } from 'react'
import { BlogPost } from '@/types/blog'
import { useRouter } from 'next/navigation'
// import { useSession } from 'next-auth/react'

const inputStyles ='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 focus:ring-blue-200 focus:ring-opacity-50 text-black'

const FormNewPost = () => {
  const [post, setPost] = useState<BlogPost>({ title: '', content: '' })
  const router = useRouter()
  // const {data} = useSession()
  // console.log(data)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault()
    const { name, value } = e.target
    setPost({ ...post, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/posts', post)
      if (response.status === 200) {
        const postId = response.data.newPost.id
       router.push(`/blog/${postId}`) 
      }
    }
    catch (error) {
      console.error(error)
    }
  }

  return (
    <form className='max-w-4xl mx-auto p-4' onSubmit={handleSubmit}>
      <div className='mb-4'>
        <label htmlFor='title' className='block text-sm font-bold text-gray-700'>
          Title
        </label>
        <input 
          type="text" 
          id="title" // Associates this input with the label above
          placeholder="Enter post title" // Provides a hint to the user
          name='title'
          value={post.title}
          className={`${inputStyles} max-w-md`}
          onChange={handleChange}
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='content' className='block text-sm font-bold text-gray-700'>
          Content
        </label>
        <textarea 
          id="content" // Associates this input with the label above
          placeholder="Enter post content" // Provides a hint to the user
          name='content'
          className={`${inputStyles} h-96`}
          value={post.content}
          onChange={handleChange}></textarea>
      </div>
      <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:ring'>
        Submit
      </button>
    </form>
  )
}

export default FormNewPost;