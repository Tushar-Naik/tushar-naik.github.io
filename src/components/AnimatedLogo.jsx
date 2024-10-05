import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const draw = keyframes`
    to {
        stroke-dashoffset: 0;
    }
`;

const StyledSVG = styled.svg`
  .path {
    stroke-dasharray: 60;
    stroke-dashoffset: 60;
    animation: ${draw} 2s forwards;
  }

  .path:nth-child(1) { animation-delay: 0s; }
  .path:nth-child(2) { animation-delay: 0.4s; }
  .path:nth-child(3) { animation-delay: 0.8s; }
  .path:nth-child(4) { animation-delay: 1.2s; }
  .path:nth-child(5) { animation-delay: 1.6s; }
`;

const AnimatedLogo = () => {
    const [key, setKey] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setKey(prevKey => prevKey + 1);
        }, 5000); // Restart animation every 10 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <StyledSVG key={key} width="32" height="32" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="path" d="M12.855 6.10742L5.85498 19.1074" stroke="#09090B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path className="path" d="M14.855 9.10742L9.85498 19.1074" stroke="#09090B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path className="path" d="M19.855 9.10742L14.855 19.1074" stroke="#09090B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path className="path" d="M14.855 9.10739L14.855 19.1074" stroke="#09090B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path className="path" d="M22.855 6.10742L6.85498 6.10742" stroke="#09090B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </StyledSVG>
    );
};

export default AnimatedLogo;