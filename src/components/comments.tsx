import React, { FC, useState, useEffect, use } from 'react'
import { formatDistanceToNow, set } from 'date-fns';
import axios from 'axios';
import { Comment } from '@/types/comment';
import FormNewComment from '@/components/formNewComment'
import { useSession, SessionProvider } from 'next-auth/react';

// import { getCurrentUser } from '@/lib/session';
interface CommentsProps {
  postId: string
}

const Comments: FC<CommentsProps> = ({postId}) => {
  const [comments, setComments] = useState([] as Comment[]);
  const [commentCount, setCommentCount] = useState(0);
  const session = useSession();

  const formatCommentDate = (date: Date) => {
    if(!date) return 'Loading...';
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  }

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/comments?postId=${postId}`);
        if (response.status === 200) {
          setComments(response.data.comments);
          setCommentCount(response.data.comments.length);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, [setComments, postId, commentCount]);

  const handleCommentAdded = (comment: Comment) => {
    console.log('comment:', comment);
    setComments([...comments, comment]);
    setCommentCount((prevCount) => prevCount + 1);
  };

  const handleCommentDeleted = async (commentId: string) => {
    const confirmed = confirm('Are you sure you want to delete this comment?');
    if (!confirmed) return;
    try {
      const deletedComment = await axios.delete(`/api/comments/`, { data: { id: commentId } });
      if (deletedComment.status === 200) {
        const updatedComments = comments.filter((comment) => comment.id !== commentId);
        setComments(updatedComments);
        setCommentCount((prevCount) => prevCount - 1);
      }
    }
    catch (error) {
      console.error('Error deleting comment:', error);
    }
  }

  return (
    <SessionProvider>
    <div className='mt-8'>
      <h2 className='text-2xl font-bold'>Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id} className="mb-4 bg-slate-300 p-2 flex justify-between items-center">
            <div>
              <div className="flex items-center mb-2">
                <div className="text-blue-500 font-bold mr-2">
                  {comment.author?.name}
                </div>
                <div className="text-gray-500">
                  {formatCommentDate(comment.createdAt)}
                </div>
              </div>
              <p>
                {comment.text}
              </p>
            </div>
            {comment.author?.email === session.data?.user?.email && (
              <button className="ml-auto bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleCommentDeleted(comment.id)}
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
      {comments && <FormNewComment onCommentAdded={handleCommentAdded} postId={postId}/>}

    </div>
    </SessionProvider>
  )
}

export default Comments
