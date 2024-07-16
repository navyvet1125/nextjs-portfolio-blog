
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const AboutPage: React.FC = () => {
    return (
        <section className='px-4 py-8 md:px-8 lg:py-16 mx-auto glass-effect'>
            <h1 className="font-medium text-2xl mb-8 tracking-tighter">
                From Massage Therapist to Full-Stack Developer: My Coding Journey
            </h1>
            <div className="prose prose-neutral dark:prose-invert">
                <Image 
                    src="/black_kimono30Mar2024.jpg" 
                    alt="Evan J. Washington" 
                    className="float-left mr-4 mb-4 w-64 h-128 shadow-lg" 
                    width={256}
                    height={256}
                    layout="fixed"
                />
                <p className='text-base md:text-lg leading-relaxed mb-4'>
                    The path to becoming a full-stack developer wasn&apos;t linear for me! Coding first sparked my curiosity at a young
                    age, around 11. It was a hobby I tinkered with while attending college in the early 2000s. However, life took
                    some unexpected turns.
                </p>
                <p className='text-base md:text-lg leading-relaxed mb-4'>
                    While I didn&apos;t finish college at that time, I found purpose and discipline serving in the US Navy for four
                    years. Initially, my technical aptitude landed me a role as a Nuclear Electrician (scoring a perfect 99 on the
                    ASVAB!), but I later transitioned to become a Fire Control Technician. After the service, I tried working as a
                    Union Sheet Metal Worker, but it wasn&apos;t for me. I would end up beginning a career as a Reiki Master and
                    Massage Therapist, working for 11+ years.
                </p>
                <p className='text-base md:text-lg leading-relaxed mb-4'>
                    The urge to code never truly went away. In 2016, I enrolled in the Web Development Immersive program as
                    General Assembly in Santa Monica, CA, learning the MEAN stack. While I faced challenges finding a job after
                    the bootcamp, the experience planted a seed. Last year, with new opportunities opening up, I enrolled in the
                    IBM Full Stack Software Development course on Coursera. This program ignited my passion for web development,
                    giving me a solid foundation in frameworks like Django and Flask, and introducing me to powerful tools like
                    Docker and Kubernetes.
                </p>
                <p className='text-base md:text-lg leading-relaxed mb-4'>
                    This blog serves as a chronicle of my current coding adventure. Join me as I leverage lessons learned from my
                    diverse background to navigate the exciting world of software development. You&apos;ll get a front-row seat to a
                    collaborative to-do app built with Django and React. I&apos;ll be using Agile methodologies to develop this app,
                    simulating a DevOps workflow. I&apos;ve been posting my Scrum Stand-ups on LinkedIn, and will be utilizing this
                    blog to document the process. You can see the GitHub Repo <Link href="https://github.com/navyvet1125/Navyvet1125-To-Do-App">here</Link>.
                </p>
            </div>
        </section>
    );
};

export default AboutPage;