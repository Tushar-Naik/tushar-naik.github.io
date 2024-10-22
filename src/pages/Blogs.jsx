import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Badge} from "../components/ui/badge";
import {format} from "date-fns";


const Blogs = () => {

    const [recentPosts, setRecentPosts] = useState([]);

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

    return (
        <section className="mt-10">
            <div className="flex flex-col self-center mt-20 mb-20 max-w-full text-zinc-950 w-[1255px] max-md:mt-10">
                <h1 className="text-4xl font-bold mb-6 self-start tracking-tighter leading-none">Blog Posts</h1>
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
        </section>
    );
};

export default Blogs;
