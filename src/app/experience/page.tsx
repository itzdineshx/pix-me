'use client';

import { siteConfig } from '@/config/site';
import WorkExprience from '@/components/WorkExprience';
import MinecraftLayout from '@/components/MinecraftLayout';
import { useState, useEffect } from 'react';

export default function ExperiencePage() {
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
            <h1 className="text-4xl font-bold mb-12 text-center nes-text is-primary">Work Experience</h1>
            <WorkExprience day={day} />
          </div>
        </section>
      </div>
    </MinecraftLayout>
  );
}