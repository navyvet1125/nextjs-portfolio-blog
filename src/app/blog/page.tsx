import CarouselComponent from '@/components/carousel'
import { BlogCards } from '@/components/blogCards'

const BlogList = () => {
  return (
    <div className='max-w-6xl mx-auto py-8 px-4'>
      {/* <Carousel items={carouselItems}/> */}
      <CarouselComponent />

      <h1 className='text-4xl font-bold mb-4'>Blog</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        <BlogCards />
      </div>
    </div>
  )
}

export default BlogList
