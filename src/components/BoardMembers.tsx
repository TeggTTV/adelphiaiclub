"use client";

import { motion } from 'framer-motion';
import { BoardMember } from '@/types';

const AvatarSVG = ({ initial }: { initial: string }) => (
  <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f8f8f8"/>
        <stop offset="100%" stopColor="#f3f3f3"/>
      </linearGradient>
      <pattern id="avatarPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M0 0h20v20h-20z" fill="none" stroke="#65513C" strokeWidth="0.5"/>
        <circle cx="10" cy="10" r="1" fill="#FDB515"/>
      </pattern>
    </defs>
    <circle cx="50" cy="50" r="45" fill="url(#avatarGrad)"/>
    <circle cx="50" cy="50" r="45" fill="url(#avatarPattern)" fillOpacity="0.1"/>
    <text
      x="50"
      y="50"
      dominantBaseline="middle"
      textAnchor="middle"
      fill="#FDB515"
      fontSize="40"
      fontFamily="sans-serif"
    >
      {initial}
    </text>
  </svg>
);

const boardMembers: BoardMember[] = [
  {
    name: "Santiago Rodriguez",
    role: "President",
    description: "Artificial Intelligence major dedicated to improving lives through AI awareness and education. Leading initiatives to help students and faculty harness the power of AI tools."
  },
  {
    name: "Joseph Jazwinski",
    role: "Senior Software Engineer",
    description: "Computer Science major with 7+ years of coding experience, specializing in TypeScript web development and backend systems"
  },
  {
    name: "Doyan Bendezu",
    role: "Vice President",
    description: "Nursing major bringing healthcare perspective to AI applications. Focused on bridging the gap between medical care and artificial intelligence."
  },
  {
    name: "Michael Riccio",
    role: "Treasurer",
    description: "Accounting major managing club finances and budgeting. Exploring the intersection of AI and financial technology."
  },
  {
    name: "Ann-lyse Joseph",
    role: "Secretary",
    description: "Health Science major documenting our journey and coordinating club activities. Interested in AI applications in healthcare and wellness."
  },
  // {
  //   name: "Sixia Chen",
  //   role: "Faculty Advisor",
  //   description: "Assistant Professor of Mathematics and Computer Science at Adelphi University"
  // }
];

const BoardMembers = () => {
  return (
    <section id="board" className="py-20 bg-gradient-to-b from-[#f8f8f8] to-white">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-[#65513C] text-center mb-12"
        >
          Meet Our Board
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {boardMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut"
              }}
              className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#FDB515]/20"
            >
              <div className="w-36 h-36 mx-auto mb-6 overflow-hidden rounded-full shadow-md transform hover:scale-105 transition-transform duration-300">
                <AvatarSVG initial={member.name[0]} />
              </div>
              <h3 className="text-2xl font-bold text-[#65513C] text-center mb-2">
                {member.name}
              </h3>
              <p className="text-[#FDB515] font-semibold text-lg text-center mb-4">{member.role}</p>
              <p className="text-gray-600 text-center leading-relaxed">{member.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BoardMembers;
