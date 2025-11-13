import { siteConfig } from '@/config/site';
import { motion } from 'framer-motion';

const Education = () => {
  if (!siteConfig.education || siteConfig.education.length === 0) {
    return null;
  }

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
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <motion.section
      className="py-12 mb-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <motion.div
        className="text-center mb-8"
        variants={itemVariants}
      >
        <h3 className="text-3xl font-bold nes-text is-primary mb-4">🎓 Education Journey</h3>
        <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"></div>
      </motion.div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-purple-500 hidden md:block"></div>

        <div className="space-y-8">
          {siteConfig.education.map((edu, index) => (
            <motion.div
              key={index}
              className="relative"
              variants={itemVariants}
            >
              {/* Timeline dot */}
              <div className="absolute left-6 top-6 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full border-4 border-white dark:border-gray-800 hidden md:block"></div>

              <div className="ml-0 md:ml-16">
                <div className="nes-container with-title bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                  <p className="title flex items-center gap-2">
                    <span className="text-2xl">🎓</span>
                    {edu.degree}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="nes-container is-rounded">
                      <p className="nes-text">
                        <strong className="text-blue-600">🏫 Institution:</strong><br />
                        {edu.institution}
                      </p>
                    </div>
                    <div className="nes-container is-rounded">
                      <p className="nes-text">
                        <strong className="text-green-600">📅 Year:</strong><br />
                        {edu.year}
                      </p>
                    </div>
                  </div>

                  {edu.gpa && (
                    <div className="nes-container is-rounded mb-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
                      <div className="flex items-center justify-between">
                        <p className="nes-text">
                          <strong className="text-yellow-600">⭐ GPA:</strong> {edu.gpa}
                        </p>
                        <div className="nes-progress w-32">
                          <progress
                            className="nes-progress"
                            value={parseFloat(edu.gpa) * 10}
                            max="100"
                          ></progress>
                        </div>
                      </div>
                    </div>
                  )}

                  {edu.description && (
                    <div className="nes-container is-rounded bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                      <p className="nes-text">
                        <strong className="text-purple-600">📖 Description:</strong><br />
                        {edu.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Education;