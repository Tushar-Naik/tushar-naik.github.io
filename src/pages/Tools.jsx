import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../components/ui/card";
import {Button} from "../components/ui/button";
const tools = [
    {
        title: "Team Generator",
        description: "A tool to automatically create balanced teams",
        link: "/team-gen"
    },
];

const projects = [
    {
        title: "Python UI-me",
        description: "A simple python decorator, to build UI forms out of your everyday python functions",
        link: "https://github.com/livetheoogway/python-uime"
    },
    {
        title: "CRUD Store",
        description: "Collection of CRUD components implementing a clean interface",
        link: "https://github.com/livetheoogway/crud-store"
    },
    {
        title: "Forage",
        description: "In-memory Search made Easy",
        link: "https://github.com/livetheoogway/forage"
    },
];

const Tools = () => {
    return (
        <main className="mt-10">
            <section className="flex flex-col self-center mt-20 mb-20 max-w-full text-zinc-950 w-[1255px] max-md:mt-10">
                <h1 className="self-start text-4xl font-bold tracking-tighter leading-none">
                    Tools
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    {tools.map((project, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle>{project.title}</CardTitle>
                                <CardDescription>{project.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button onClick={() => window.location.href = project.link}>
                                    Use Tool
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <section className="mb-20">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle>{project.title}</CardTitle>
                                <CardDescription>{project.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button onClick={() => window.location.href = project.link}>
                                    View Project
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>


        </main>
    );
};

export default Tools;