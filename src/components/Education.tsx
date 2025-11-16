import { siteConfig } from '@/config/site';

const Education = ({ day }: { day: boolean }) => {
  if (!siteConfig.education || siteConfig.education.length === 0) {
    return null;
  }

  return (
    <section className="py-6 sm:py-8 md:py-12 mb-6 sm:mb-8 md:mb-12 pixelated px-4">
      <div className="text-center mb-6 sm:mb-8">
        {/* Main Header with Pixelated NES Container */}
        <div className={`nes-container is-rounded p-4 sm:p-6 mb-4 max-w-2xl mx-auto education-header-container touch-manipulation ${day ? 'bg-gray-200' : 'is-dark bg-gray-900'}`}>
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-2 flex-wrap">
            <i className={`nes-icon trophy text-xl sm:text-2xl ${day ? 'text-yellow-600' : 'text-yellow-400'}`}></i>
            <h3 className={`pixel-text text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold ${day ? 'text-yellow-600' : 'text-yellow-400'} text-center`}>EDUCATION JOURNEY</h3>
            <i className={`nes-icon trophy text-xl sm:text-2xl ${day ? 'text-yellow-600' : 'text-yellow-400'}`}></i>
          </div>
          <div className="flex justify-center gap-3">
            <i className="nes-icon star text-blue-400"></i>
            <i className="nes-icon heart text-red-400"></i>
            <i className="nes-icon like text-green-400"></i>
            <i className="nes-icon close text-purple-400"></i>
          </div>
        </div>
      </div>

      <div className="relative px-2 sm:px-4">
        {/* Enhanced Pixelated Timeline - Hidden on mobile, visible on tablet+ */}
        <div className="absolute left-4 sm:left-6 md:left-8 top-0 bottom-0 w-2 sm:w-3 bg-gradient-to-b from-yellow-400 via-blue-400 to-purple-400 hidden sm:block education-timeline education-timeline-enhanced">
          {/* Timeline markers */}
          {siteConfig.education.map((_, index) => (
            <div
              key={index}
              className="absolute w-full h-1 sm:h-2 bg-yellow-400 education-timeline-marker"
              style={{ top: `${(index * 100) / (siteConfig.education.length - 1)}%` }}
            />
          ))}
        </div>

        <div className="space-y-4 sm:space-y-6 md:space-y-8">
          {siteConfig.education.map((edu, index) => (
            <div
              key={index}
              className="relative"
            >
              {/* Enhanced Timeline Dot - Responsive sizing */}
              <div className="absolute left-2 sm:left-4 md:left-6 top-4 sm:top-6 w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 bg-yellow-400 rounded-full border-2 sm:border-3 md:border-4 border-gray-800 hidden sm:block education-timeline-dot">
                <div className="w-full h-full bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-yellow-900">{index + 1}</span>
                </div>
              </div>

              <div className="ml-0 sm:ml-12 md:ml-16 lg:ml-20">
                <div className={`nes-container with-title is-rounded pixelated hover:shadow-2xl active:scale-95 transition-all duration-300 education-card touch-manipulation cursor-pointer ${day ? 'bg-white' : 'is-dark'}`}>
                  <div className="title flex items-center gap-3 pixel-text text-lg bg-gray-800 p-3 rounded">
                    <span className="text-3xl animate-bounce">🎓</span>
                    <span className="text-yellow-400 font-bold text-xl">{edu.degree}</span>
                    <div className="flex gap-1 ml-auto">
                      <i className="nes-icon star is-small text-yellow-400"></i>
                      <i className="nes-icon heart is-small text-red-400"></i>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                    <div className={`nes-container is-rounded education-info-card touch-manipulation hover:scale-105 active:scale-95 transition-transform duration-200 ${day ? 'bg-white' : 'is-dark'}`}>
                      <p className={`nes-text ${day ? 'text-blue-600' : 'text-blue-200'}`}>
                        <strong className={`flex items-center gap-2 pixel-text text-xs sm:text-sm ${day ? 'text-blue-700' : 'text-blue-400'}`}>
                          <i className="nes-icon home"></i>
                          INSTITUTION
                        </strong><br />
                        <span className={`font-bold text-sm sm:text-base md:text-lg pixel-text ${day ? 'text-gray-800' : 'text-white'} break-words`}>{edu.institution}</span>
                      </p>
                    </div>
                    <div className={`nes-container is-rounded education-info-card touch-manipulation hover:scale-105 active:scale-95 transition-transform duration-200 ${day ? 'bg-white' : 'is-dark'}`}>
                      <p className={`nes-text ${day ? 'text-green-600' : 'text-green-200'}`}>
                        <strong className={`flex items-center gap-2 pixel-text text-xs sm:text-sm ${day ? 'text-green-700' : 'text-green-400'}`}>
                          <i className="nes-icon clock"></i>
                          YEAR
                        </strong><br />
                        <span className={`font-bold text-sm sm:text-base md:text-lg pixel-text ${day ? 'text-gray-800' : 'text-white'}`}>{edu.year}</span>
                      </p>
                    </div>
                  </div>

                  {edu.gpa && (
                    <div className={`nes-container is-rounded mb-4 education-gpa-card border-4 border-yellow-500 ${day ? 'bg-white' : 'is-dark'}`}>
                      <div className="flex items-center justify-between p-2">
                        <div>
                          <p className="nes-text text-yellow-200 mb-1">
                            <strong className="text-yellow-400 flex items-center gap-2 pixel-text">
                              <i className="nes-icon star text-xl"></i>
                              GPA SCORE
                            </strong>
                          </p>
                          <span className="text-white font-bold text-2xl pixel-text">{edu.gpa}</span>
                        </div>
                        <div className="nes-progress w-40">
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
                    <div className={`nes-container is-rounded education-desc-card border-4 border-purple-500 ${day ? 'bg-white' : 'is-dark'}`}>
                      <p className="nes-text text-purple-200">
                        <strong className="text-purple-400 flex items-center gap-2 pixel-text text-sm mb-2">
                          <i className="nes-icon book text-lg"></i>
                          DESCRIPTION
                        </strong><br />
                        <span className="text-white pixel-text leading-relaxed">{edu.description}</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;