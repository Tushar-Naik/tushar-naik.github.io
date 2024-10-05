import React, {useEffect, useState} from 'react';

const aboutMe = <>
    Hello! I'm Tushar Naik, a software engineer passionate about designing scalable backend
    systems and solving complex computing problems. I've been grateful to have worked on several challenging projects in
    my career spanning over 10 years. I live in Bangalore, India, and I'm currently working as an Architect at <a
    href="https://phonepe.com">PhonePe.com</a>
    <br/>
    <br/>
    I sometimes enjoy building minimal frontend tools. Check them out in the tools section.<br/>
</>;


const Home = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const calculateOpacity = () => {
        // Start with 0.3 opacity, increase to 1 over 300px of scrolling
        return Math.min(0.3 + (scrollY / 300), 1);
    };

    const calculateBlur = () => {
        // Start with 5px blur, decrease to 0 over 300px of scrolling
        return Math.max(5 - (scrollY / 0.2), 0);
    };

    return (
        <section className="flex flex-col self-center mt-20 mb-20 max-w-full text-zinc-950 w-[1255px] max-md:mt-10">
            <h1 className="self-start text-4xl font-bold tracking-tighter leading-none">
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
        </section>
    );
};

export default Home;