'use client'
import React, {useState} from 'react'

const FormNewComment = () => {
  const [comment, setComment] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(comment)
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
