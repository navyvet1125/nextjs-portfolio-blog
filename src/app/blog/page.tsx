import React from 'react'
import Link from 'next/link'
import prisma from '@/lib/db'

const BlogList = async () => {

  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      author: true,
    }
  })
  return (
    <div className='max-w-6xl mx-auto py-8'>
      <h1 className='text-4xl font-bold mb-4'>Blog</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {posts.map((post) => (
          <div key={post.id} className='bg-white p-4 rounded-md shadow-md text-gray-900'>
            <Link href={`/blog/${post.slug}`}>
                <h2 className='text-xl font-bold'>{post.title}</h2>
                <p className='text-gray-500'>By {post.author.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlogList
