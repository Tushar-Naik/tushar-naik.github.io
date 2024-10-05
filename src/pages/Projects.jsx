import React from 'react';

const Projects = () => {
    return (
        <section className="flex flex-col self-center mt-20 max-w-full text-zinc-950 w-[1255px] max-md:mt-10">
            <h1 className="self-start text-4xl font-bold tracking-tighter leading-none">
                About me
            </h1>
            <p className="self-start mt-8 text-2xl font-light leading-7 max-md:max-w-full">
                Hello! I'm Tushar Naik, a software engineer passionate about designing scalable backend systems and solving complex computing problems. I've been grateful to have worked on several challenging projects in my career spanning over 10 years. I'm currently working as an Architect at PhonePe.com
                <br />
                <br />
                I sometimes enjoy building minimal frontend tools. The list below might find some use to
            </p>
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c808885133ce7ca51f1067864812c430f13810487708fb0cf0abe104191dcdaf?placeholderIfAbsent=true&apiKey=8fcf9513f60c4af5b059c6e2158ad4f4" alt="Illustration related to software engineering" className="object-contain self-end mt-28 max-w-full aspect-[1.69] w-[1200px] max-md:mt-10" />
        </section>
    );
};

export default Projects;