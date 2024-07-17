'use client'
import React, {useState, FC} from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Comment } from '@/types/comment'
import { Button, Label, TextInput } from 'flowbite-react'

interface FormNewCommentProps {
  postId: string
  onCommentAdded: (comment : Comment) => void
}

const FormNewComment: FC<FormNewCommentProps> = ({ postId, onCommentAdded }) => {
  const [comment, setComment] = useState<string>('' as Comment['text'])
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (comment.trim() !== '') {
      try {
        const newComment = await axios.post('/api/comments', {postId, text: comment})
        console.log('newComment:', newComment)
        if (newComment.status === 200) {
          onCommentAdded(newComment.data)
        }
      } catch (error) {
        console.error(error)
      }
    }
 
  }
  return (
    <div className='mt-4 '>
      <form onSubmit={handleSubmit} >
      <Label 
        htmlFor="comment" 
        className=' mb-2'
        >
          Add Comment
        </Label>
      <TextInput 
        value={comment}
        onChange={handleChange}
        type="text" 
        name='comment'
        id='comment'
        title='Enter your comment here'
        placeholder='Write a comment...'
        required shadow
        />
      <Button
        gradientMonochrome='info'
        type='submit'
        className='  mt-2'
        >
          Add Comment
        </Button>
      </form>
    </div>
  )
}

export default FormNewComment
