import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedLogo from './AnimatedLogo';
import {GitHubIcon, InstagramIcon, LinkedInIcon, TwitterXIcon} from './icons/SocialIcons';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navLinks = [
        { to: "/blogs", text: "Blogs" },
        { to: "/tools", text: "Tools" },
        { to: "/projects", text: "Projects" },
    ];

    const socialLinks = [
        { href: "https://github.com/Tushar-Naik", icon: GitHubIcon },
        { href: "https://www.instagram.com/tushar.k.naik/", icon: InstagramIcon },
        { href: "https://www.linkedin.com/in/Tushar-Naik/", icon: LinkedInIcon },
        { href: "https://x.com/tushar_knaik", icon: TwitterXIcon },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${isScrolled && !isMenuOpen ? 'bg-white bg-opacity-80 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <Link to="/" className="flex items-center gap-2.5 text-base font-bold text-zinc-950">
                        <AnimatedLogo/>
                        <span>tushar.naik</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link key={link.to} to={link.to}
                                  className="text-sm text-zinc-350 transition-colors hover:text-foreground/80 text-foreground/60">
                                {link.text}
                            </Link>
                        ))}
                    </nav>

                    {/* Social Icons */}
                    <div className="hidden md:flex items-center gap-4">
                        {socialLinks.map((link) => (
                            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer"
                               className="text-zinc-350 hover:text-zinc-600">
                                <link.icon/>
                            </a>
                        ))}
                    </div>

                    {/* Hamburger Menu for Mobile */}
                    <button onClick={toggleMenu} className="md:hidden text-zinc-350 hover:text-zinc-600 z-50">
                        <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round"
                             strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu - Right Side */}
                <div
                    className={`fixed top-0 right-0 bottom-0 w-48 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex flex-col h-full justify-between py-6 px-4">
                        <nav className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className="text-sm text-zinc-800 transition-colors hover:text-zinc-600"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.text}
                                </Link>
                            ))}
                        </nav>
                        <div className="flex justify-center gap-4">
                            {socialLinks.map((link) => (
                                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer"
                                   className="text-zinc-800 hover:text-zinc-600">
                                    <link.icon/>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Overlay */}
                {isMenuOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                        onClick={toggleMenu}
                    ></div>
                )}
            </div>
        </header>
    );
};

export default Header;