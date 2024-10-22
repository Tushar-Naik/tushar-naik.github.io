import React, {useCallback, useEffect, useRef, useState} from 'react';
import MemoryCardGame from '../components/core/MemoryCardGame';
import {Button} from "../components/ui/button";

const aboutMe = <>
    Hello! I'm Tushar Naik, a software engineer passionate about designing scalable backend systems and solving complex
    computing problems.
    I live in Bangalore, India, and I'm currently working as an Architect at <a href="https://phonepe.com">PhonePe.com</a>.
    <br/><br/>
    Occasionally, I enjoy building minimalist frontend tools. Feel free to check them out in the <a href="/tools">tools</a> section.
    <br/>
    And yes, there's a hidden easter egg on this page!
</>;

const Home = () => {
    const [scrollY, setScrollY] = useState(0);
    const [scrollCount, setScrollCount] = useState(0);
    const [showEasterEgg, setShowEasterEgg] = useState(false);
    const [easterEggDiscovered, setEasterEggDiscovered] = useState(false);
    const scrollTimeout = useRef(null);

    const handleScroll = useCallback(() => {
        setScrollY(window.scrollY);

        const scrollPosition = window.scrollY + window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // Check if we're at the bottom of the page
        if (documentHeight - scrollPosition < 10) {
            // Clear any existing timeout
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }

            // Set a new timeout
            scrollTimeout.current = setTimeout(() => {
                setScrollCount(prevCount => {
                    console.log("Scroll attempt:", prevCount + 1);
                    if (prevCount + 1 >= 5 && !easterEggDiscovered) {
                        setShowEasterEgg(true);
                        setEasterEggDiscovered(true);
                    }
                    return prevCount + 1;
                });
            }, 500); // 500ms delay
        } else {
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }
        }
    }, [easterEggDiscovered]);

    const handleEscapeKey = useCallback((event) => {
        if (event.key === 'Escape') {
            setShowEasterEgg(false);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('keydown', handleEscapeKey);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('keydown', handleEscapeKey);
        };
    }, [handleScroll, handleEscapeKey]);

    const calculateOpacity = () => {
        return Math.min(0.3 + (scrollY / 300), 1);
    };

    const calculateBlur = () => {
        return Math.max(5 - (scrollY / 0.2), 0);
    };

    const handleCloseEasterEgg = () => {
        setShowEasterEgg(false);
    };

    console.log(scrollCount);

    return (
        <section className="flex flex-col self-center mt-20 mb-20 max-w-full text-zinc-950 w-[1255px] max-md:mt-10">
            <h1 className="self-start text-5xl font-bold tracking-tighter leading-none">
                About me
            </h1>
            <p className="self-start mt-8 text-lg font-light text-foreground leading-7 max-md:max-w-full ">
                {aboutMe}
            </p>
            <div className="relative w-full mt-28 max-md:mt-10 overflow-hidden" style={{height: '600px'}}>
                <div className="absolute inset-0 z-10 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white"
                         style={{width: '100%'}}></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"
                         style={{height: '100%'}}></div>
                </div>
                <div
                    className="w-full h-full bg-cover bg-center transition-all duration-300 ease-out"
                    style={{
                        backgroundImage: `url('https://cdn.builder.io/api/v1/image/assets/TEMP/c808885133ce7ca51f1067864812c430f13810487708fb0cf0abe104191dcdaf?placeholderIfAbsent=true&apiKey=8fcf9513f60c4af5b059c6e2158ad4f4')`,
                        opacity: calculateOpacity(),
                        filter: `blur(${calculateBlur()}px)`,
                        transform: `translateY(${scrollY * 0.3}px)`,
                        boxShadow: `
                                inset 20px 20px 20px 0 rgba(255,255,255,0.9),
                                inset -20px -20px 20px 0 rgba(255,255,255,0.9),
                                inset 20px -20px 20px 0 rgba(255,255,255,0.9),
                                inset -20px 20px 20px 0 rgba(255,255,255,0.9)
                            `
                    }}
                />
            </div>

            <div className="relative w-full mt-28 max-md:mt-10 overflow-hidden" style={{height: '100px'}}>
                <div className="absolute inset-0 z-10 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white"
                         style={{width: '100%'}}></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"
                         style={{height: '100%'}}></div>
                </div>
            </div>

            {showEasterEgg && (
                <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex flex-col items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
                        <h2 className="text-2xl font-bold mb-4">Easter Egg Found!</h2>
                        <p className="mb-4">
                            Aah, well done. Here you go...</p>
                        <MemoryCardGame/>
                        <Button onClick={handleCloseEasterEgg} className="mt-10 ">
                            Close
                        </Button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Home;