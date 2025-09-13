"use client";

import { motion } from 'framer-motion';

const upcomingEvents = [
  {
    title: "Introduction to Machine Learning Workshop",
    date: "Sept 15, 2025",
    time: "2:00 PM - 4:00 PM",
    location: "Science Building Room 301",
    description: "Join us for a hands-on workshop where we'll explore the basics of machine learning using Python and scikit-learn.",
    type: "Workshop"
  },
  {
    title: "AI in Healthcare Guest Speaker",
    date: "Sept 22, 2025",
    time: "4:00 PM - 5:30 PM",
    location: "Performing Arts Center",
    description: "Distinguished speaker Dr. Sarah Chen discusses the revolutionary impact of AI in modern healthcare.",
    type: "Speaker"
  },
  {
    title: "Hackathon: Build Your First AI Model",
    date: "Oct 1, 2025",
    time: "1:00 PM - 6:00 PM",
    location: "Innovation Lab",
    description: "A beginner-friendly hackathon where you'll build and train your first AI model. Prizes for top projects!",
    type: "Competition"
  }
];

const getEventTypeColor = (type: string) => {
  switch (type) {
    case "Workshop":
      return "from-blue-400 to-cyan-400";
    case "Speaker":
      return "from-purple-400 to-pink-400";
    case "Competition":
      return "from-green-400 to-emerald-400";
    default:
      return "from-blue-400 to-purple-400";
  }
};

const Events = () => {
  return (
    <section id="events" className="relative py-20 bg-black min-h-screen flex items-center overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5" />
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: 'gridMove 30s ease-in-out infinite alternate'
          }}
        />
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-20 left-20"
          animate={{ 
            x: [-100, 150, -100],
            y: [0, 80, 0] 
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <div className="w-[400px] h-[400px] rounded-full bg-purple-500/15 blur-[80px]" />
        </motion.div>
        <motion.div 
          className="absolute top-40 right-20"
          animate={{ 
            x: [100, -100, 100],
            y: [0, 60, 0] 
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <div className="w-[350px] h-[350px] rounded-full bg-blue-500/15 blur-[70px]" />
        </motion.div>
        <motion.div 
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
          animate={{ 
            x: [-50, 50, -50],
            y: [0, -40, 0] 
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <div className="w-[300px] h-[300px] rounded-full bg-indigo-500/15 blur-[60px]" />
        </motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
        >
          Upcoming Events
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-white/70 text-center max-w-2xl mx-auto mb-12 text-lg"
        >
          Join us for exciting workshops, guest speakers, and hands-on experiences in artificial intelligence
        </motion.p>

        <motion.div 
          className="max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.3
              }
            }
          }}
        >
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.title}
              className="relative mb-16 last:mb-0"
              variants={{
                hidden: { 
                  opacity: 0, 
                  x: index % 2 === 0 ? -80 : 80
                },
                visible: { 
                  opacity: 1, 
                  x: 0,
                  transition: {
                    duration: 0.8,
                    ease: "easeOut"
                  }
                }
              }}
            >
              {/* Timeline Line */}
              {index < upcomingEvents.length - 1 && (
                <div className="absolute left-1/2 top-32 w-px h-20 bg-gradient-to-b from-purple-400/50 to-blue-400/50 transform -translate-x-1/2 z-0" />
              )}
              
              {/* Timeline Dot */}
              <div className="absolute left-1/2 top-8 w-6 h-6 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full transform -translate-x-1/2 z-10 shadow-lg shadow-purple-400/50">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse opacity-75" />
              </div>

              {/* Event Card */}
              <div className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                {/* Badge Side - Always on the outside */}
                <div className="w-1/2 px-8">
                  <div className={index % 2 === 0 ? "text-right" : "text-left"}>
                    <div className={`inline-block px-6 py-3 rounded-full text-base font-semibold text-white mb-4 bg-gradient-to-r ${getEventTypeColor(event.type)} shadow-lg`}>
                      {event.type}
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-1/2 px-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 relative shadow-xl">
                    {/* Subtle glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl" />

                    <h3 className="text-3xl font-bold text-white mb-4 leading-tight">
                      {event.title}
                    </h3>
                    
                    <div className="grid grid-cols-1 gap-3 mb-6 text-base">
                      <div className="flex items-center text-blue-300">
                        <svg className="w-5 h-5 mr-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">{event.date}</span>
                      </div>
                      <div className="flex items-center text-blue-300">
                        <svg className="w-5 h-5 mr-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">{event.time}</span>
                      </div>
                      <div className="flex items-center text-blue-300">
                        <svg className="w-5 h-5 mr-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">{event.location}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 leading-relaxed text-lg">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Events;
