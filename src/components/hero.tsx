import './hero.css';
import Image from 'next/image';
function Hero() {
    return (
        <div>
        {/* <div className="hero min-h-screen flex justify-center items-center px-4">
          <div className='flex flex-col items-center justify-center w-1/2'>
          <h1 className="text-6xl font-bold mb-4">Evan J. Washington</h1>
          <p className="text-3xl mb-8">Full Stack Developer</p>
          <div className="flex justify-center">
            <button className="bg-blue-800 text-white px-4 py-2 rounded mr-2">Button 1</button>
            <button className="bg-gray-800 text-white px-4 py-2 rounded">Button 2</button>
          </div>
          </div>
          <div className="px-4 w-1/2">
            <Image src="/black_kimono30Mar2024.jpg" alt="Hero image"  width={500} height={500}/>
          </div>
        </div> */}

          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-4'>
            <div className='px-4'>
              <Image src='/logo1.jpg' alt='Hero image' width={600} height={600} />
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