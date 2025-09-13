"use client";

import { motion } from 'framer-motion';

const upcomingEvents = [
  {
    title: "Introduction to Machine Learning Workshop",
    date: "Sept 15, 2025",
    time: "2:00 PM - 4:00 PM",
    location: "Science Building Room 301",
    description: "Join us for a hands-on workshop where we'll explore the basics of machine learning using Python and scikit-learn."
  },
  {
    title: "AI in Healthcare Guest Speaker",
    date: "Sept 22, 2025",
    time: "4:00 PM - 5:30 PM",
    location: "Performing Arts Center",
    description: "Distinguished speaker Dr. Sarah Chen discusses the revolutionary impact of AI in modern healthcare."
  },
  {
    title: "Hackathon: Build Your First AI Model",
    date: "Oct 1, 2025",
    time: "1:00 PM - 6:00 PM",
    location: "Innovation Lab",
    description: "A beginner-friendly hackathon where you'll build and train your first AI model. Prizes for top projects!"
  }
];

const Events = () => {
  return (
    <section id="events" className="py-20 bg-gradient-to-b from-white to-[#f8f8f8]">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-[#65513C] text-center mb-12"
        >
          Upcoming Events
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut"
              }}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-[#65513C] mb-2">{event.title}</h3>
              <p className="text-[#FDB515] mb-1">{event.date}</p>
              <p className="text-gray-600 mb-1">{event.time}</p>
              <p className="text-gray-600 mb-4">{event.location}</p>
              <p className="text-gray-700">{event.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
