import axios from "axios";
// import ServerComments from "@/components/serverComments";
import Comments from '@/components/comments'
import Provider from "@/components/provider";
import { Button } from "flowbite-react";
import { IoArrowBack } from "react-icons/io5";


async function getPost(slug: string) {
  const baseUrl = process.env.APP_API_BASE_URL;
  try {
    const response = await axios.get(`${baseUrl}/api/posts?slug=${slug}`);
    if (response.status === 200) {
      return response.data.post;
    }
  } catch (error) {
    console.error("Error fetching post:", error);
  }
}
async function getComments(postId: string) {
  const baseUrl = process.env.APP_API_BASE_URL;
  try {
    const response = await axios.get(`${baseUrl}/api/comments?postId=${postId}`);
    if (response.status === 200) {
      return response.data.comments;
    }
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
}


export default async function BlogDetail({
  params: {slug},
}: {
  params: {
    slug: string;
  };
}) {
  const post = await getPost(slug);
  const comments = await getComments(post?.id);

  return (
    <div className='flex flex-col min-h-screen'>

    <div className='max-w-4xl mx-auto py-8 '>
      <h1 className='text-3xl font-bold px-4'>{post?.title}</h1>
      <p className='text-gray-500 px-4'>By {post?.author?.name }</p>
        <div className='mt-4 px-4'>
            {post.content}
        </div>
        {post.id && <Provider><Comments postId={post?.id}/></Provider>}
    </div>
    <div className="max-w-4xl mx-auto px-4">
    <Button gradientMonochrome="info" href="/blog">
      <IoArrowBack size="20" className="mr-2" /> Back
    </Button>
    </div>
    </div>

  );
}