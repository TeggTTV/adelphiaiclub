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
    name: "John Doe",
    role: "President",
    description: "Computer Science senior with a focus on Machine Learning"
  },
  {
    name: "Jane Smith",
    role: "Vice President",
    description: "Mathematics junior passionate about AI applications"
  },
  {
    name: "Mike Johnson",
    role: "Secretary",
    description: "Data Science sophomore interested in Neural Networks"
  },
  // Add more board members as needed
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
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                <AvatarSVG initial={member.name[0]} />
              </div>
              <h3 className="text-xl font-semibold text-[#65513C] text-center">
                {member.name}
              </h3>
              <p className="text-[#FDB515] text-center mb-2">{member.role}</p>
              <p className="text-gray-600 text-center">{member.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BoardMembers;
