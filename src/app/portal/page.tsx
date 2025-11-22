'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PortalOverlay from '@/components/PortalOverlay';
import MinecraftLayout from '@/components/MinecraftLayout';

export default function PortalPage() {
  const router = useRouter();
  const [day, setDay] = useState(true);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
      // Check if the portal should be hidden (hidePortalUntil set) — prevents
      // portal from showing again within a TTL after landing.
      const hidePortalUntil = localStorage.getItem('hidePortalUntil');
      if (hidePortalUntil) {
        const until = parseInt(hidePortalUntil);
        if (Date.now() < until) {
          router.replace('/');
          return;
        } else {
          // TTL passed, remove block
          localStorage.removeItem('hidePortalUntil');
        }
      }

      // Check if user should see portal (prevent redirect loop)
    if (typeof window !== 'undefined') {
      const hasEntered = localStorage.getItem('portalEntered');
      const lastEnterTime = localStorage.getItem('portalEnterTime');
      const currentTime = Date.now();
      
      // Check if entered within last 30 minutes (1800000 ms)
      const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes
      
      if (hasEntered === 'true' && lastEnterTime) {
        const timeSinceEnter = currentTime - parseInt(lastEnterTime);
        if (timeSinceEnter < CACHE_DURATION) {
          // Recently entered (within 30 min), redirect to home
          router.replace('/');
          return;
        } else {
          // Cache expired, clear storage
          localStorage.removeItem('portalEnterTime');
        }
      }
      // If hasEntered is true but no lastEnterTime (or expired), we allow rendering (show portal)
      // This handles the case where user returns from Solar System (cache cleared)
      
      setShouldRender(true);
    }

    const hour = new Date().getHours();
    setDay(hour >= 6 && hour < 18);
  }, [router]);

  const handleEnter = () => {
    // Mark portal as entered and store timestamp
    if (typeof window !== 'undefined') {
      localStorage.setItem('portalEntered', 'true');
      localStorage.setItem('portalEnterTime', Date.now().toString());
    }
    // No direct navigation here — caller will decide where to route next.
  };

  const handleDayChange = (isDay: boolean) => {
    setDay(isDay);
  };

  if (!shouldRender) {
    return null; // Prevent flash before redirect
  }

  return (
    <MinecraftLayout setDayOrNight={handleDayChange}>
      <div className="fixed inset-0 z-50">
        <PortalOverlay day={day} onEnter={handleEnter} />
      </div>
    </MinecraftLayout>
  );
}
