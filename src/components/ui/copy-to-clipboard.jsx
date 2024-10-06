import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { FiCopy } from 'react-icons/fi';

export function CopyToClipboard({ content }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(content).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }).catch((err) => {
            console.error('Failed to copy text: ', err);
        });
    };

    return (
        <button
            onClick={handleCopy}
            className={cn(
                'absolute top-2 right-2 p-2 rounded-lg',
                'bg-gray-700 hover:bg-gray-600 text-white transition'
            )}
        >
            {copied ? 'Copied!' : <FiCopy className="w-5 h-5" />}
        </button>
    );
}

export default CopyToClipboard;