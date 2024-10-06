import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import {cn} from '../components/lib/utils';
import {Separator} from '../components/ui/separator';
import {format} from 'date-fns';
import {Badge} from '../components/ui/badge';
import 'highlight.js/styles/github-dark-dimmed.min.css'; // Importing highlight.js theme
import {CopyToClipboard} from '../components/ui/copy-to-clipboard';
import {clsx} from "clsx";


const CustomCodeBlock = ({node, inline, className, children, ...props}) => {
    const language = /language-(\w+)/.exec(className || '')?.[1];
    return !inline ? (
        <pre className={clsx(
            "bg-gray-900 text-gray-100 p-4 rounded-md shadow-md overflow-auto",
            className
        )}>
      <code {...props} className={clsx("language-", language)}>
        {children}
      </code>
    </pre>
    ) : (
        <code className="bg-gray-800 text-green-400 p-1 rounded-sm">
            {children}
        </code>
    );
};


function BlogPost() {
    const {slug} = useParams();
    const [markdownContent, setMarkdownContent] = useState('');
    const [metadata, setMetadata] = useState(null);

    useEffect(() => {
        async function fetchMarkdown() {
            try {
                const response = await fetch(`/blog-posts/${slug}.md`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const text = await response.text();
                const [_, meta, content] = text.split(/---\n/);
                setMetadata(JSON.parse(meta));
                setMarkdownContent(content);
            } catch (error) {
                console.error('Failed to fetch markdown content:', error);
                setMarkdownContent('# Not Found \n The requested blog post could not be found.');
            }
        }

        fetchMarkdown();
    }, [slug]);

    return (
        <div className={cn('container mx-auto px-4 py-8 md:py-12', 'prose dark:prose-invert text-sm')}>
            {metadata && (
                <div className="mb-4 mt-10">
                    <div className="flex justify-end">
                        <h1 className="text-4xl font-bold mb-2 justify-end">{metadata.title}</h1>
                    </div>

                    <div className="flex justify-end text-sm text-gray-600 mb-4">
                        <span>{metadata.author}</span>
                        <span className="mx-2">•</span>
                        <time dateTime={metadata.date}>{format(new Date(metadata.date), 'MMMM d, yyyy')}</time>
                        <span className="mx-2">•</span>
                        <span>{metadata.readingTime} min read</span>
                    </div>
                    <div className="flex justify-end flex-wrap gap-2">
                        {metadata.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>
            )}
            <Separator className="my-10"/>

            <article>
                <ReactMarkdown
                    rehypePlugins={[rehypeRaw, rehypeHighlight]}
                    components={{
                        code({node, inline, className, children, ...props}) {
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
                                    {children}
                                </code>
                            );
                        },
                    }}>
                    {markdownContent}
                </ReactMarkdown>

            </article>
        </div>
    );
}

export default BlogPost;