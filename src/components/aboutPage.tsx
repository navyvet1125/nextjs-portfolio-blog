
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const AboutPage: React.FC = () => {
    return (
        <div className='px-4 py-8 md:px-8 lg:py-16 mx-auto'>
            <h1 className="font-medium text-2xl mb-8 tracking-tighter">
                From Massage Therapist to Full-Stack Developer: My Coding Journey
            </h1>
                <p className='text-base md:text-lg leading-relaxed mb-4 py-16'>
                My path to software development wasn&apos;t linear. While a childhood fascination with code sparked early, I explored various fields like the US Navy (Nuclear Electrician!), Union Sheet Metal Work, and a rewarding 11+ year career as a Reiki Master and Massage Therapist. However, the coding itch never truly faded. In 2016, I reignited that passion through a web development program, and now I&apos;m fueled by a solid foundation in frameworks like Django and Flask. This blog chronicles my coding adventure, where I leverage the unique skills and perspectives gained from my diverse background to navigate the exciting world of software development.
                </p>
        </div>
    );
};

export default AboutPage;