import React, {useCallback, useEffect, useRef, useState} from 'react';
import MemoryCardGame from '../components/core/MemoryCardGame';
import {Button} from "../components/ui/button";
import {Link} from 'react-router-dom';
import {format} from 'date-fns';
import {Badge} from "../components/ui/badge";
import {ArrowRight} from "lucide-react";
import {Separator} from "../components/ui/separator";

const aboutMe = <>
    Namaskara! <br/>
    I'm Tushar Naik, a software engineer passionate about designing, building scalable backend systems and solving
    complex computing problems.<br/>
    I live in Bangalore, India, and I'm currently working as an Architect at <a href="https://phonepe.com">PhonePe.com</a>.
    <br/><br/>
    Occasionally, I like to try my hand at frontend stuff (this site for example and a few more utilities). Feel free to
    check them out in the <a href="/tools">tools</a> section.
    <br/><br/>
    And yes, there's a hidden easter egg on this page!
</>;

const Home = () => {
    const [scrollY, setScrollY] = useState(0);
    const [scrollCount, setScrollCount] = useState(0);
    const [recentPosts, setRecentPosts] = useState([]);
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

    useEffect(() => {
        const fetchBlogPosts = async () => {
            try {
                // This assumes you have a JSON file listing all blog posts
                const response = await fetch('/blog-posts/index.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch blog posts');
                }
                const posts = await response.json();

                // Sort by date and take the most recent 3
                const sortedPosts = posts.sort((a, b) =>
                    new Date(b.date) - new Date(a.date)
                ).slice(0, 3);

                setRecentPosts(sortedPosts);
            } catch (error) {
                console.error('Error fetching blog posts:', error);
            }
        };
        fetchBlogPosts();
    }, []);

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

            {/* Recent Posts Section */}
            <div className="mt-24">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold tracking-tight">Recent Writing</h2>
                    <Link
                        to="/blogs"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
                    >
                        View all posts <ArrowRight className="h-4 w-4"/>
                    </Link>
                </div>
                <Separator className="mb-8"/>

                <div className="space-y-1">
                    {recentPosts.map((post) => (
                        <Link
                            key={post.slug}
                            to={`/blogs/${post.slug}`}
                            className="block group"
                        >
                            <article className="p-4 -mx-4 rounded-lg transition-colors hover:bg-accent">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-medium text-lg">
                                        {post.title}
                                    </h3>
                                    <time className="text-sm text-muted-foreground tabular-nums">
                                        {format(new Date(post.date), 'MMM dd, yyyy')}
                                    </time>
                                </div>
                                <div className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                                    {post.excerpt}
                                </div>
                                <div className="flex gap-2 mt-3">
                                    {post.tags.map((tag) => (
                                        <Badge
                                            key={tag}
                                            variant="secondary"
                                            className="text-xs px-1.5 py-0 text-muted-foreground"
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </div>
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
                        backgroundImage: `url('/images/tushar.png')`,
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