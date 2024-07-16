import React from 'react'
import  SkillCard from './skillCard'
// import { title } from 'process'
import { frontEndSkills, backEndSkills, otherSkills } from '../data/skills'

const Skills = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
    <h2 className="text-3xl font-bold mb-6">My Skills</h2>
    <p className="mb-6">
      I have experience with a variety of technologies. Here are some of the
      tools I have used in the past.
    </p>
    <h3 className="text-xl font-semibold mb-4">Frontend</h3>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {frontEndSkills.map((skill) => (
        <SkillCard key={skill.title} {...skill} />
      ))}
    </div>
    <h3 className="text-xl font-semibold my-4">Backend</h3>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {backEndSkills.map((skill) => (
        <SkillCard key={skill.title} {...skill} />
      ))}
    </div>
    <h3 className="text-xl font-semibold my-4">Other</h3>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {otherSkills.map((skill) => (
        <SkillCard key={skill.title} {...skill} />
      ))}
      </div>
    </div>
  )
}

export default Skills
