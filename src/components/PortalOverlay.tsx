'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { siteConfig } from '@/config/site';

interface PortalOverlayProps {
    day: boolean;
    onEnter: () => void;
}

export default function PortalOverlay({ day, onEnter }: PortalOverlayProps) {
    const [clicked, setClicked] = useState(false);
    const router = useRouter();

    const handleClick = () => {
        setClicked(true);
        // Navigate to solar system after animation
        setTimeout(() => {
            router.push('/solar-system');
        }, 800);
    };

    // Generate ring of blocks
    const ringOffsets = Array.from({ length: 16 }).map((_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        const radius = 50;
        return {
            x: Math.round(Math.cos(angle) * radius),
            y: Math.round(Math.sin(angle) * radius),
        };
    });

    return (
        <AnimatePresence>
            {!clicked && (
                <motion.div
                    className="fixed inset-0 bg-gradient-to-b flex flex-col justify-center items-center z-50 px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className={`relative z-10 nes-container ${day ? "" : "is-dark"} is-centered is-rounded with-title bg-white w-full max-w-md p-6 shadow-lg`}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="title font-pixel text-lg">👋 Welcome!</p>
                        <div className="text-center mb-4 flex items-end justify-center gap-8">
                            <Image
                                src="/avatar.png"
                                width={200}
                                height={200}
                                className="pixelated"
                                alt="Avatar"
                            />
                            <motion.div
                                animate={{
                                    y: [0, -8, 0]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="relative"
                            >
                                <div className="text-6xl">🚀</div>
                                <motion.div
                                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-orange-400 rounded-full blur-md"
                                    animate={{
                                        opacity: [0.6, 1, 0.6],
                                        scale: [0.8, 1.2, 0.8]
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                            </motion.div>
                        </div>
                        <p className="mb-4 font-pixel text-center">
                            I'm <span className="text-green-700">{siteConfig.profile.name}</span>. Ready for a cosmic journey?
                        </p>
                        <div className="text-center mt-4">
                            <button
                                className="nes-btn is-success font-pixel"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleClick();
                                }}
                            >
                                EXPLORE MY WORK
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {clicked && (
                <motion.div
                    className="fixed inset-0 bg-black flex justify-center items-center z-50 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                >
                    <motion.div
                        className="text-9xl"
                        initial={{ y: 0, scale: 1 }}
                        animate={{ 
                            y: -2000,
                            scale: [1, 1.5, 2],
                            rotate: [0, -10, 10, 0]
                        }}
                        transition={{
                            duration: 0.8,
                            ease: "easeIn"
                        }}
                    >
                        🚀
                    </motion.div>
                    <motion.div
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-64 bg-gradient-to-t from-orange-500 via-yellow-400 to-transparent"
                        initial={{ opacity: 0, scaleY: 0 }}
                        animate={{ 
                            opacity: [0, 1, 0.8, 0],
                            scaleY: [0, 1.5, 2, 2.5]
                        }}
                        transition={{
                            duration: 0.8,
                            ease: "easeOut"
                        }}
                    />
                    {/* Particle effects */}
                    {Array.from({ length: 20 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                            style={{ 
                                left: '50%',
                                top: '50%'
                            }}
                            initial={{ x: 0, y: 0, opacity: 1 }}
                            animate={{ 
                                x: (Math.random() - 0.5) * 200,
                                y: Math.random() * 300 + 100,
                                opacity: 0,
                                scale: [1, 0.5, 0]
                            }}
                            transition={{
                                delay: i * 0.02,
                                duration: 0.6,
                                ease: 'easeOut'
                            }}
                        />
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
