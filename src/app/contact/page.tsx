'use client';

import { siteConfig } from '@/config/site';
import Contact from '@/components/Contact';
import ContactForm from '@/components/ContactForm';
import MinecraftLayout from '@/components/MinecraftLayout';
import { useState, useEffect } from 'react';

export default function ContactPage() {
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
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-4xl font-bold mb-12 text-center nes-text is-primary">Contact Me</h1>
            <ContactForm day={day} />
            <Contact day={day} />
          </div>
        </section>
      </div>
    </MinecraftLayout>
  );
}