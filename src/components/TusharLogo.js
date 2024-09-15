import React from 'react';

const TusharLogo = ({ width = 100, height = 100, className = '' }) => (
    <svg width={width} height={height} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        {/* Circle shadow */}
        <circle cx="50" cy="50" r="45" fill="var(--logo-shadow-color)" opacity="0.2"/>

        {/* Main Circle */}
        <circle cx="50" cy="50" r="40" fill="var(--logo-main-color)"/>

        {/* Initial Letter 'T' */}
        <text x="50%" y="50%" textAnchor="middle" dy=".35em" fontFamily="Arial, sans-serif"
              fontSize="40" fill="var(--logo-text-color)">T</text>
    </svg>
);

export default TusharLogo;