import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full py-6 mt-12 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-sm text-zinc-500">
                    © {new Date().getFullYear()} Tushar Naik.
                </p>
            </div>
        </footer>
    );
};

export default Footer;