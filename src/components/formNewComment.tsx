'use client'
import React, {useState, FC} from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface FormNewCommentProps {
  postId: string
}

const FormNewComment: FC<FormNewCommentProps> = ({ postId }) => {
  const [comment, setComment] = useState<string>('')
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault()
    if (comment.trim() !== '') {
      try {
        const newComment = await axios.post('/api/comments', {postId, text: comment})
        if (newComment.data.status === 200) {
          router.refresh()
        }
      } catch (error) {
        console.error(error)
      }
    }
 
  }
  return (
    <div className='mt-4 '>
      <form onSubmit={handleSubmit}>
      <label 
        htmlFor="comment" 
        className='block text-gray-700 text-sm font-bold mb-2'
        >
          Add Comment
        </label>
      <input 
        value={comment}
        onChange={handleChange}
        type="text" 
        className='w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300'
        name='comment'
        id='comment'
        title='Enter your comment here'
        placeholder='Write a comment...'
        />
      <button
        type='submit'
        className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mt-2 disabled:bg-gray-400'
        >
          Add Comment
        </button>
      </form>
    </div>
  )
}

export default FormNewComment
