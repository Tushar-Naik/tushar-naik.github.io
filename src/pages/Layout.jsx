import React from 'react';
import Header from '../components/Header';
import Home from './Home';
import Footer from '../components/Footer';

const Layout = () => {
    return (
        <div className="flex flex-col pb-8 bg-white">
            <Header />
            <main>
                <Home />
            </main>
            <Footer />
            <style jsx>{`
                builder-component {
                    max-width: none !important;
                }
            `}</style>
        </div>
    );
};

export default Layout;