'use client';

import { siteConfig } from '@/config/site';
import Skills from '@/components/Skills';
import MinecraftLayout from '@/components/MinecraftLayout';
import { useState, useEffect } from 'react';

export default function SkillsPage() {
  const [day, setDay] = useState(true);

  useEffect(() => {
    const hour = new Date().getHours();
    setDay(hour >= 6 && hour < 18);
  }, []);

  const handleDayChange = (isDay: boolean) => {
    setDay(isDay);
  };

  return (
    <MinecraftLayout setDayOrNight={handleDayChange}>
      <div className="min-h-screen pt-20">
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold mb-12 text-center nes-text is-primary">My Skills</h1>
            <div className="nes-container is-rounded mb-8 text-center">
              <p className="nes-text is-primary">
                <i>Note: The icons below represent the technologies and tools I've been exposed to. Some I've mastered at an intermediate level, while others are at a foundational level. I continuously evolve and expand my expertise as a developer.</i>
              </p>
            </div>
            <Skills day={day} />
          </div>
        </section>
      </div>
    </MinecraftLayout>
  );
}