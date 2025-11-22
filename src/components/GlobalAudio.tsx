'use client';

import React, { useEffect } from 'react';

export default function GlobalAudio() {
  useEffect(() => {
    const el = document.getElementById('global-audio') as HTMLAudioElement | null;
    if (el) {
      el.preload = 'auto';
      el.loop = true;
      el.volume = 0.3;
    }
  }, []);

  return (
    <audio id="global-audio" preload="auto" />
  );
}
