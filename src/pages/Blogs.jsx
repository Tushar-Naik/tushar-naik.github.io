import React from 'react';
import {Link} from 'react-router-dom';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../components/ui/card";
import {Badge} from "../components/ui/badge";

// This would typically come from your backend or a static file
const blogPosts = [
    {
        id: 1,
        title: "The Terminal",
        date: "2024-10-21",
        tags: ["Shell", "Bash",  "Scripting", "Programming"],
        slug: "terminal-blog"
    },
    // Add more blog posts here
];

const Blogs = () => {
    return (
        <section className="mt-10">
            <div className="flex flex-col self-center mt-20 mb-20 max-w-full text-zinc-950 w-[1255px] max-md:mt-10">
                <h1 className="text-4xl font-bold mb-6 self-start tracking-tighter leading-none">Blog Posts</h1>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {blogPosts.map((post) => (
                        <Card key={post.id}>
                            <CardHeader>
                                <CardTitle>
                                    <Link to={`/blogs/${post.slug}`} className="hover:underline">
                                        {post.title}
                                    </Link>
                                </CardTitle>
                                <CardDescription>{post.date}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blogs;
