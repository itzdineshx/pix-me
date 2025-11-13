'use client';

import { siteConfig } from '@/config/site';
import Education from '@/components/Education';
import Hero from '@/components/Hero';
import MinecraftLayout from '@/components/MinecraftLayout';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const [day, setDay] = useState(true);

  useEffect(() => {
    const hour = new Date().getHours();
    setDay(hour >= 6 && hour < 18);
  }, []);

  const handleDayChange = (isDay: boolean) => {
    setDay(isDay);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <MinecraftLayout setDayOrNight={handleDayChange}>
      <div className="min-h-screen pt-20">
        <Hero day={day} />

        {/* Enhanced About Section */}
        <motion.section
          className="py-20 px-4 relative"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 dark:bg-blue-800 rounded-full opacity-10 animate-pulse"></div>
            <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 dark:bg-purple-800 rounded-full opacity-10 animate-pulse delay-1000"></div>
            <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-green-200 dark:bg-green-800 rounded-full opacity-10 animate-pulse delay-500"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Main Title with enhanced styling */}
            <motion.div
              className="text-center mb-16"
              variants={itemVariants}
            >
              <motion.h2
                className="text-5xl md:text-6xl font-bold mb-6 nes-text is-primary bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                🎮 About Me
              </motion.h2>
              <div className="flex justify-center items-center space-x-4 mb-4">
                <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
                <span className="text-2xl">⭐</span>
                <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Discover my journey in AI, machine learning, and creative technology
              </p>
            </motion.div>

            {/* Profile Overview with enhanced design */}
            <motion.div
              className="nes-container with-title is-centered mb-16 shadow-2xl"
              variants={itemVariants}
            >
              <p className="title text-xl">👋 Profile Overview</p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <motion.div
                  className="space-y-6"
                  variants={itemVariants}
                >
                  <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300">
                    {siteConfig.profile.summary}
                  </p>
                  <div className="nes-container is-rounded bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-blue-200 dark:border-blue-800">
                    <p className="nes-text is-primary text-center text-lg font-semibold">
                      🚀 Ready to innovate and create amazing things!
                    </p>
                  </div>
                </motion.div>

                <div className="grid grid-cols-1 gap-4">
                  <motion.div
                    className="nes-container is-rounded bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20"
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xl">
                        🎓
                      </div>
                      <div>
                        <p className="nes-text is-primary font-bold text-lg">Education</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{siteConfig.profile.education}</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="nes-container is-rounded bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-xl">
                        💡
                      </div>
                      <div>
                        <p className="nes-text is-primary font-bold text-lg">Expertise</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{siteConfig.profile.expertise}</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="nes-container is-rounded bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white text-xl">
                        🎯
                      </div>
                      <div>
                        <p className="nes-text is-primary font-bold text-lg">Focus Areas</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{siteConfig.profile.focusAreas}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Skills & Expertise Grid with enhanced cards */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
              variants={itemVariants}
            >
              <motion.div
                className="nes-container with-title shadow-lg"
                variants={cardVariants}
                whileHover="hover"
              >
                <p className="title">🤝 Collaborations</p>
                <div className="space-y-4">
                  <p className="nes-text text-gray-700 dark:text-gray-300">{siteConfig.profile.collaborations}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Openness to Projects</span>
                      <span className="text-sm text-green-600 font-bold">90%</span>
                    </div>
                    <div className="nes-progress">
                      <progress className="nes-progress" value="90" max="100"></progress>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="nes-container with-title shadow-lg"
                variants={cardVariants}
                whileHover="hover"
              >
                <p className="title">🎮 Hobbies & Interests</p>
                <div className="space-y-4">
                  <p className="nes-text text-gray-700 dark:text-gray-300">{siteConfig.profile.hobbies}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="nes-badge">
                      <span className="is-primary">🎮 Gaming</span>
                    </span>
                    <span className="nes-badge">
                      <span className="is-success">📚 Sci-fi</span>
                    </span>
                    <span className="nes-badge">
                      <span className="is-warning">💻 Coding</span>
                    </span>
                    <span className="nes-badge">
                      <span className="is-error">🚀 Space</span>
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="nes-container with-title shadow-lg"
                variants={cardVariants}
                whileHover="hover"
              >
                <p className="title">🌟 Passion Levels</p>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <p className="nes-text text-sm">AI & Machine Learning</p>
                      <span className="text-sm font-bold text-blue-600">95%</span>
                    </div>
                    <div className="nes-progress">
                      <progress className="nes-progress" value="95" max="100"></progress>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <p className="nes-text text-sm">Data Science & Analytics</p>
                      <span className="text-sm font-bold text-green-600">90%</span>
                    </div>
                    <div className="nes-progress">
                      <progress className="nes-progress" value="90" max="100"></progress>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <p className="nes-text text-sm">Innovation & Creativity</p>
                      <span className="text-sm font-bold text-purple-600">88%</span>
                    </div>
                    <div className="nes-progress">
                      <progress className="nes-progress" value="88" max="100"></progress>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Education Section */}
            <motion.div variants={itemVariants}>
              <Education />
            </motion.div>

            {/* Fun Facts Section with enhanced design */}
            <motion.div
              className="nes-container with-title is-centered shadow-2xl"
              variants={itemVariants}
            >
              <p className="title text-xl">🎯 Fun Facts & Beyond</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {siteConfig.profile.funFacts.map((fact, index) => (
                  <motion.div
                    key={index}
                    className="nes-container is-rounded bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-200 dark:border-yellow-800"
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    <p className="nes-text text-center text-gray-800 dark:text-gray-200 font-medium">{fact}</p>
                  </motion.div>
                ))}
              </div>

              {/* Enhanced Call to Action */}
              <motion.div
                className="mt-10"
                variants={itemVariants}
              >
                <div className="nes-container is-rounded bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 dark:from-green-900/20 dark:via-blue-900/20 dark:to-purple-900/20 border-2 border-green-200 dark:border-green-800">
                  <div className="text-center space-y-4">
                    <p className="nes-text is-primary text-2xl font-bold">
                      🌟 Let's Connect & Build Something Amazing!
                    </p>
                    <p className="nes-text text-lg text-gray-700 dark:text-gray-300">
                      Whether it's AI projects, gaming innovations, or just a friendly chat about technology!
                    </p>
                    <div className="flex justify-center space-x-4 mt-6">
                      <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </MinecraftLayout>
  );
}