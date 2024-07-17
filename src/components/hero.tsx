import './hero.css';
import Image from 'next/image';
function Hero() {
    return (
        <div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-4'>
            <div className='px-4'>
              <Image src='/bkimono2.jpg' alt='Hero image' width={600} height={600} priority={true} />
            </div>
            <div className='flex flex-col justify-center items-center'>
              <h1 className='text-6xl font-bold mb-4'>Evan J. Washington</h1>
              <p className='text-3xl mb-8'>Full Stack Developer</p>
            </div>
          </div>
      </div>
    );
  }
  
  export default Hero;