import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "./components/ui/card";
import {Button} from "./components/ui/button";
import {Switch} from "./components/ui/switch";
import {Moon, Sun} from 'lucide-react';

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

const aboutMe = <>
    Hello! I'm Tushar Naik, a software engineer passionate about designing scalable backend
    systems and solving complex computing problems. I've been grateful to have worked on several challenging projects in
    my career spanning over 10 years. I'm currently working as an Architect at <a href="https://phonepe.com">PhonePe.com</a> <br/>
    <br/>
    I sometimes enjoy building minimal frontend tools. The list below might find some use to you.<br/>
</>;

const AboutMePage = () => {
    const [darkMode, setDarkMode] = React.useState(false);

    return (
        <div className={`min-h-screen w-full ${darkMode ? 'dark' : ''}`}>
            <div className="bg-white dark:bg-gray-900 min-h-screen">
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <header className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tushar Naik</h1>
                        <div className="flex items-center space-x-2">
                            <Sun className="h-4 w-4 text-gray-500 dark:text-gray-400"/>
                            <Switch
                                checked={darkMode}
                                onCheckedChange={setDarkMode}
                                id="dark-mode"
                            />
                            <Moon className="h-4 w-4 text-gray-500 dark:text-gray-400"/>
                        </div>
                    </header>

                    <main>
                        <section className="mb-20">
                            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">About Me</h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                {aboutMe}
                            </p>
                        </section>
                        <section className="mb-20">
                            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Tools</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {tools.map((project, index) => (
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

                    <footer className="mt-12 text-center text-gray-500 dark:text-gray-400">
                        <p>© 2024 Tushar Naik. All rights reserved.</p>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default AboutMePage;
