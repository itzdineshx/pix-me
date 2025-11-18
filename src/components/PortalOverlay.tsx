'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Canvas } from '@react-three/fiber';
import { siteConfig } from '@/config/site';
import { useRef } from 'react';
import * as THREE from 'three';

// Pixelated Spacecraft Component matching the fighter jet design
function Spacecraft() {
    const meshRef = useRef<THREE.Group>(null);
    
    return (
        <group ref={meshRef} rotation={[0, 0, 0]} scale={1.2}>
            {/* Main fuselage - light blue body */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.6, 2.4, 0.3]} />
                <meshStandardMaterial color="#87CEEB" roughness={0.8} />
            </mesh>
            
            {/* Cockpit window - darker blue glass */}
            <mesh position={[0, 0.6, 0.16]}>
                <boxGeometry args={[0.3, 0.8, 0.05]} />
                <meshStandardMaterial color="#4682B4" emissive="#4682B4" emissiveIntensity={0.3} />
            </mesh>
            
            {/* Nose cone - orange/red gradient */}
            <mesh position={[0, 1.4, 0]}>
                <boxGeometry args={[0.4, 0.4, 0.2]} />
                <meshStandardMaterial color="#FF4500" roughness={0.7} />
            </mesh>
            <mesh position={[0, 1.6, 0]}>
                <boxGeometry args={[0.2, 0.3, 0.15]} />
                <meshStandardMaterial color="#FF6347" roughness={0.7} />
            </mesh>
            
            {/* Main delta wings - orange gradient with yellow/red tips */}
            <mesh position={[0, -0.2, 0]} rotation={[0, 0, 0]}>
                <boxGeometry args={[3.2, 0.1, 2.4]} />
                <meshStandardMaterial color="#FF8C00" roughness={0.7} />
            </mesh>
            
            {/* Wing tips gradient - darker orange to red */}
            {[-1.6, 1.6].map((x, i) => (
                <mesh key={i} position={[x, -0.2, -0.8]}>
                    <boxGeometry args={[0.6, 0.08, 1.0]} />
                    <meshStandardMaterial color="#DC143C" roughness={0.7} />
                </mesh>
            ))}
            
            {/* Vertical stabilizers - dark blue/gray */}
            {[-0.6, 0.6].map((x, i) => (
                <mesh key={`stab-${i}`} position={[x, -0.6, 0.05]}>
                    <boxGeometry args={[0.2, 1.2, 0.25]} />
                    <meshStandardMaterial color="#2F4F4F" roughness={0.6} />
                </mesh>
            ))}
            
            {/* Engine exhausts - red/orange */}
            {[-0.4, 0.4].map((x, i) => (
                <mesh key={`engine-${i}`} position={[x, -1.3, 0]}>
                    <boxGeometry args={[0.25, 0.4, 0.25]} />
                    <meshStandardMaterial color="#8B0000" emissive="#FF4500" emissiveIntensity={0.5} />
                </mesh>
            ))}
            
            {/* Engine glow effects */}
            <pointLight position={[0, -1.5, 0]} color="#FF6600" intensity={2} distance={2} />
            {[-0.4, 0.4].map((x, i) => (
                <mesh key={`glow-${i}`} position={[x, -1.6, 0]}>
                    <boxGeometry args={[0.2, 0.3, 0.2]} />
                    <meshStandardMaterial color="#FF8800" emissive="#FF6600" emissiveIntensity={1.2} transparent opacity={0.8} />
                </mesh>
            ))}
            
            {/* Side detail stripes - red */}
            {[-0.35, 0.35].map((x, i) => (
                <mesh key={`stripe-${i}`} position={[x, 0.2, 0.16]}>
                    <boxGeometry args={[0.08, 1.2, 0.05]} />
                    <meshStandardMaterial color="#DC143C" />
                </mesh>
            ))}
        </group>
    );
}

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
                                priority
                            />
                            <motion.div
                                animate={{
                                    y: [0, -12, 0]
                                }}
                                transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="relative w-32 h-32"
                            >
                                <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
                                    <ambientLight intensity={0.5} />
                                    <directionalLight position={[5, 5, 5]} intensity={1} />
                                    <pointLight position={[-5, -5, -5]} intensity={0.5} color="#4444ff" />
                                    <Spacecraft />
                                </Canvas>
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
                        className="w-64 h-64"
                        initial={{ y: 0, scale: 1 }}
                        animate={{ 
                            y: -2000,
                            scale: [1, 1.8, 2.5]
                        }}
                        transition={{
                            duration: 0.8,
                            ease: "easeIn"
                        }}
                    >
                        <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
                            <ambientLight intensity={0.5} />
                            <directionalLight position={[5, 5, 5]} intensity={1.5} />
                            <pointLight position={[0, -2, 0]} intensity={3} color="#ff6600" />
                            <Spacecraft />
                        </Canvas>
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
