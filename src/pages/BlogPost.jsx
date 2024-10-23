import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import {cn} from '../components/lib/utils';
import {Separator} from '../components/ui/separator';
import {format} from 'date-fns';
import {Badge} from '../components/ui/badge';
import 'highlight.js/styles/github-dark-dimmed.min.css';
import {CopyToClipboard} from '../components/ui/copy-to-clipboard';

function BlogPost() {
    const {slug} = useParams();
    const [markdownContent, setMarkdownContent] = useState('');
    const [metadata, setMetadata] = useState(null);
    const [headings, setHeadings] = useState([]);

    useEffect(() => {
        async function fetchMarkdown() {
            try {
                const response = await fetch(`/blog-posts/${slug}.md`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const text = await response.text();
                const [, meta, content] = text.split(/---\n/);
                setMetadata(JSON.parse(meta));
                setMarkdownContent(content);

                // Extract headings for table of contents, excluding code blocks
                const lines = content.split('\n');
                let inCodeBlock = false;
                const headingsFound = [];

                lines.forEach(line => {
                    if (line.startsWith('```')) {
                        inCodeBlock = !inCodeBlock;
                        return;
                    }

                    if (!inCodeBlock && /^#{1,3}\s/.test(line)) {
                        const level = line.match(/^#+/)[0].length;
                        const text = line.replace(/^#+\s/, '');
                        headingsFound.push({
                            level,
                            text,
                            id: text.toLowerCase()
                                .replace(/[^a-z0-9]+/g, '-')
                                .replace(/(^-|-$)/g, '')
                        });
                    }
                });

                setHeadings(headingsFound);
            } catch (error) {
                console.error('Failed to fetch markdown content:', error);
                setMarkdownContent('# Not Found \n The requested blog post could not be found.');
            }
        }

        fetchMarkdown();
    }, [slug]);

    const TableOfContents = () => (
        <div
            className="hidden xl:block fixed left-[max(1rem,calc(50%-45rem))] top-28 w-64 overflow-y-auto max-h-[calc(100vh-9rem)]">
            <div className="text-sm opacity-30 hover:opacity-100 transition-opacity duration-500">
                <div className="font-medium mb-4 mt-16 text-lg tracking-tighter">On this page</div>
                <div className="space-y-2">
                    {headings.map((heading, index) => (
                        <a
                            key={index}
                            href={`#${heading.id}`}
                            className={cn(
                                "block font-extralight text-muted-foreground hover:text-foreground transition-colors",
                                heading.level === 1 ? "" : "ml-2"
                            )}
                            style={{
                                paddingLeft: `${(heading.level - 1) * 0.75}rem`
                            }}>
                            {heading.text}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <>
            {metadata && metadata.toc === true && <TableOfContents/>}
            <div className={cn('container mx-auto px-4 py-8 md:py-12', 'prose dark:prose-invert text-sm')}>
                {metadata && (
                    <div className="mb-4 mt-10">
                        <div className="flex">
                            <h1 className="text-5xl font-bold tracking-tighter mb-2">{metadata.title}</h1>
                        </div>

                        <div className="flex text-sm text-gray-600 mb-4">
                            <span>{metadata.author}</span>
                            <span className="mx-2">•</span>
                            <time dateTime={metadata.date}>{format(new Date(metadata.date), 'MMMM d, yyyy')}</time>
                            <span className="mx-2">•</span>
                            <span>{metadata.readingTime} min read</span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {metadata.tags.map((tag) => (
                                <Badge key={tag} variant="secondary">
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                        <div className="mt-8 line-clamp-2 text-sm text-muted-foreground">
                            {metadata.excerpt}
                        </div>
                    </div>
                )}
                <Separator className="my-10"/>

                <article>
                    <ReactMarkdown
                        rehypePlugins={[rehypeRaw, rehypeHighlight, rehypeSlug]}
                        components={{
                            h1: ({node, ...props}) => <h1 className="text-4xl tracking-tighter font-bold mt-6 mb-4" {...props} />,
                            h2: ({node, ...props}) => <h2 className="text-3xl font-semibold  text-green-900 mt-5 mb-3" {...props} />,
                            h3: ({node, ...props}) => <h3 className="text-2xl font-medium text-green-900  mt-4 mb-2" {...props} />,
                            h4: ({node, ...props}) => <h4 className="text-xl font-medium text-green-900 mt-3 mb-2" {...props} />,
                            h5: ({node, ...props}) => <h5 className="text-lg font-medium text-green-900 mt-3 mb-2" {...props} />,
                            h6: ({node, ...props}) => <h6 className="text-base font-medium mt-3 mb-2" {...props} />,
                            p: ({node, ...props}) => <p className="text-lg font-light" {...props} />,
                            li: ({node, ...props}) => <li className="text-lg font-light ml-8" {...props} />,
                            img: ({node, ...props}) => <img className="max-w-full h-auto my-4" {...props} alt={props.alt || "Blog post illustration"}/>,
                            code: ({node, inline, className, children, ...props}) => {
                                const match = /language-(\w+)/.exec(className || '');
                                return !inline && match ? (
                                    <div className="relative group">
                                        <CopyToClipboard content={String(children).replace(/\n$/, '')}/>
                                        <code {...props} className={className}>
                                            {children}
                                        </code>
                                    </div>
                                ) : (
                                    <code
                                        className={cn('bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm', className)} {...props}>
                                        {children.replace("`", "")}
                                    </code>
                                );
                            },
                        }}>
                        {markdownContent}
                    </ReactMarkdown>
                </article>
            </div>
        </>
    );
}

export default BlogPost;