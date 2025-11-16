'use client';

import { useEffect, useState } from 'react';

export default function GlobalShootingStars() {
    const [isNight, setIsNight] = useState(false);

    useEffect(() => {
        const checkTime = () => {
            const hour = new Date().getHours();
            setIsNight(hour >= 18 || hour < 6); // Night time: 6 PM to 6 AM
        };

        checkTime();
        const interval = setInterval(checkTime, 60000); // Check every minute

        return () => clearInterval(interval);
    }, []);

    if (!isNight) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {[...Array(12)].map((_, i) => (
                <span
                    key={`global-shooting-star-${i}`}
                    className="shooting-star"
                    style={{
                        top: `${Math.random() * 100}%`,
                        right: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 20}s`,
                        animationDuration: `${2 + Math.random() * 4}s`,
                    }}
                ></span>
            ))}
        </div>
    );
}