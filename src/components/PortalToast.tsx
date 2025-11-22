'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function PortalToast({onOpenOverlay}:{onOpenOverlay: () => void}) {
  const router = useRouter();

  const openPortalPage = () => {
    router.push('/portal');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      className="fixed bottom-6 right-6 z-[9999] bg-black bg-opacity-80 text-white rounded-lg p-3 shadow-lg border border-cyan-500"
    >
      <div className="flex items-center gap-3">
        <div className="font-pixel text-sm">✨ I built a portal — explore my work!</div>
        <div className="flex items-center gap-2">
          <button className="nes-btn is-success font-pixel text-xs" onClick={onOpenOverlay}>Open</button>
          <button className="nes-btn is-primary font-pixel text-xs" onClick={openPortalPage}>Portal</button>
        </div>
      </div>
    </motion.div>
  );
}

// Debug on mount
// eslint-disable-next-line no-console
console.debug('[PortalToast] component loaded');
