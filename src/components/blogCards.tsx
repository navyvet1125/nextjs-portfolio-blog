"use client";
import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import axios from 'axios'
import { Post } from '@/types/post'
import { Card } from "flowbite-react";
import { format } from 'date-fns';

const formatDateAndTime = (dateString: Date): string => {
    return format(new Date(dateString), 'MMMM dd, yyyy HH:mm');
  };
  

export function BlogCards() {
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
    <>
        {/* {posts.map((post) => (
          <div key={post.id} className='bg-white p-4 rounded-md shadow-md text-gray-900'>
            <Link href={`/blog/${post.slug}`}>
                <h2 className='text-xl font-bold'>{post.title}</h2>
                <p className='text-gray-500'>By {post.author.name}</p>
                <p className='mt-2 text-gray-600 text-sm font-medium'>{formatDateAndTime(post.createdAt)}</p>
                <p className='mt-2'>{post.content}</p>
            </Link>
          </div>
        ))} */}
        {posts.map((post) => (
            <Card key={post.id} href={`/blog/${post.slug}`} className="max-w-sm">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {post.title}
                </h5>
                <p className=" text-gray-500">
                    By {post.author.name}
                </p>
                <p className=" text-gray-600 text-sm">
                    {formatDateAndTime(post.createdAt)}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    {post.content}
                </p>
            </Card>
        ))}
    </>
  );
}