import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import Projects from './pages/Projects';
import Header from './components/Header';
import Footer from './components/Footer';
import Tools from "./pages/Tools";

const AppRoutes = () => {
    return (
        <Router>
            <div className={`min-h-screen w-full`}>
                <div className="bg-white dark:bg-gray-900 min-h-screen">
                    <div className="max-w-4xl mx-auto px-4 py-8">
                        <Header/>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/blogs" element={<Blogs/>}/>
                            <Route path="/tools" element={<Tools/>}/>
                            <Route path="/projects" element={<Projects/>}/>
                        </Routes>
                        <Footer/>
                    </div>
                </div>
            </div>
        </Router>
    );
};

export default AppRoutes;