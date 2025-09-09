"use client";

import { motion } from 'framer-motion';

interface Event {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

const upcomingEvents: Event[] = [
  {
    title: "Introduction to Machine Learning Workshop",
    date: "Sept 15, 2025",
    time: "3:00 PM - 4:30 PM",
    location: "Science Building Room 309",
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
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
            >
              {/* Event Card Header */}
              <div className="bg-[#65513C]/5 p-6 border-b border-[#65513C]/10">
                <h3 className="text-xl font-semibold text-[#65513C] mb-2">
                  {event.title}
                </h3>
                <div className="flex flex-col space-y-1">
                  <p className="text-[#FDB515] font-medium text-sm">
                    {event.date} • {event.time}
                  </p>
                  <p className="text-gray-600 text-sm">
                    📍 {event.location}
                  </p>
                </div>
              </div>

              {/* Event Card Body */}
              <div className="p-6 bg-white">
                <p className="text-gray-600">
                  {event.description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6 w-full bg-[#FDB515] hover:bg-[#FDB515]/80 
                           text-black rounded-md 
                           py-2 px-4 transition-all duration-200 font-medium shadow-md hover:shadow-xl"
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
