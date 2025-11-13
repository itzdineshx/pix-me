'use client';

import { useState } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import ToggleDayNight from './ToggleDayNight';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdClose } from 'react-icons/io';
import { CgGitFork } from 'react-icons/cg';
import { AiFillStar } from 'react-icons/ai';
import { ImBlog } from 'react-icons/im';

export default function Banner({ day, toggleDayNight }: { day: boolean; toggleDayNight: () => void }) {
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/projects', label: 'Projects' },
        { href: '/skills', label: 'Skills' },
        { href: '/experience', label: 'Experience' },
        { href: '/#education', label: 'Education' },
        { href: '/contact', label: 'Contact' },
    ];

    const socialComponent = () => {
        return (
            <div className="flex gap-2 items-center">
                <a href={`https://www.github.com/${siteConfig.contact.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub">
                    <i className="nes-icon github"></i>
                </a>
                {siteConfig.contact.medium && (
                    <a href={siteConfig.contact.medium}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Medium">
                        <i className="nes-icon medium"></i>
                    </a>
                )}
                <a href={siteConfig.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn">
                    <i className="nes-icon linkedin"></i>
                </a>
            </div>
        );
    };

    return (
        <div
            className={`w-screen ${isOpen ? 'p-2 h-auto text-4xl' : 'p-3 h-17 text-2xl'
                } bg-gray-800 bg-opacity-90 text-white flex flex-col md:flex-row justify-between items-center fixed top-0 left-0 z-50 transition-all duration-500 ease-in-out border-b-2 border-gray-500`}
        >
            <div className="flex justify-between items-center w-full md:w-auto">
                <div className="content-start">
                    <div className="flex flex-col">
                        <span className="font-extrabold text-sm md:text-lg">{siteConfig.profile.name}</span>
                        <i className="font-bold text-[6px] md:text-sm">{siteConfig.profile.tagline}</i>
                    </div>
                </div>
                <div className="content-end flex gap-2 md:hidden">
                    <ToggleDayNight day={day} toggle={toggleDayNight} />
                    <button
                        className="bg-gray-700 p-2 rounded text-white hover:bg-gray-600 transition duration-300 shadow-md"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <IoMdClose className="pixelated" /> : <GiHamburgerMenu className="pixelated" />}
                    </button>
                </div>
            </div>
            <div
                className={`${isOpen ? 'translate-x-0 visible' : '-translate-x-full invisible'
                    } transition-transform duration-500 ease-in-out flex flex-col gap-4 items-center bg-gray-800 w-full md:hidden`}
            >
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="text-white text-xs hover:text-yellow-400 transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        {link.label}
                    </Link>
                ))}
                <a
                    href="https://www.github.com/manishtiwari25/portfolio"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Fork on GitHub"
                >
                    <div className="flex gap-2 items-center">
                        <CgGitFork />
                        <span className="text-sm">Fork</span>
                    </div>
                </a>
                {siteConfig.contact.blog && (
                    <a
                        href={siteConfig.contact.blog}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Visit Blog"
                    >
                        <div className="flex gap-2 items-center">
                            <ImBlog />
                            <span className="text-sm">Blog</span>
                        </div>
                    </a>
                )}
                {socialComponent()}
            </div>
            <div className="hidden md:flex gap-2 items-center">
                <div className="flex gap-2 items-center">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-white text-xs hover:text-yellow-400 transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
                {socialComponent()}

                {siteConfig.contact.blog && (
                    <a
                        href={siteConfig.contact.blog}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Visit Blog"
                    >
                        <ImBlog />
                    </a>
                )}
                <a
                    href="https://www.github.com/manishtiwari25/portfolio"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Fork on GitHub"
                >
                    <CgGitFork />
                </a>
                <ToggleDayNight day={day} toggle={toggleDayNight} />
            </div>
        </div>
    );
}
