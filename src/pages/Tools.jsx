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

const Tools = () => {
    return (
        <main className="mt-10">
            <section className="flex flex-col self-center mt-20 mb-20 max-w-full text-zinc-950 w-[1255px] max-md:mt-10">
                <h1 className="self-start text-4xl font-bold tracking-tighter leading-none">
                    Tools
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
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

        </main>
    );
};

export default Tools;