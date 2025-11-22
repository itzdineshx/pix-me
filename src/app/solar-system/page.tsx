'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import the SolarSystemSimulation with SSR disabled
const SolarSystemSimulation = dynamic(
  () => import('../../components/SolarSystemSimulation'),
  { 
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-center pixel-text">
          <div className="nes-container is-rounded">
            <h2 className="nes-text is-primary text-2xl mb-4">INITIALIZING SPACE</h2>
            <div className="nes-progress">
              <progress className="nes-progress is-primary" value="70" max="100"></progress>
            </div>
            <p className="text-sm mt-2">Loading 3D engine...</p>
          </div>
        </div>
      </div>
    )
  }
);

export default function SolarSystemPage() {
  return (
    <div className="min-h-screen bg-black">
      <Suspense fallback={
        <div className="fixed inset-0 bg-black flex items-center justify-center">
          <div className="text-center pixel-text">
            <div className="nes-container is-rounded">
              <h2 className="nes-text is-primary text-2xl mb-4">PREPARING LAUNCH</h2>
              <div className="animate-pulse text-lg">🚀</div>
            </div>
          </div>
        </div>
      }>
        <SolarSystemSimulation />
      </Suspense>
    </div>
  );
}