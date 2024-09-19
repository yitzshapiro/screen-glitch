import React, { useEffect } from 'react';

export interface ScreenGlitchProps {
  active: boolean;
}

const ScreenGlitch: React.FC<ScreenGlitchProps> = ({ active = false }) => {
  useEffect(() => {
    const svgId = 'glitch-svg';
    const filterId = 'glitch-filter';
    const body = document.body;

    if (active) {
      if (!document.getElementById(svgId)) {
        const svgNS = 'http://www.w3.org/2000/svg';
        const svgElem = document.createElementNS(svgNS, 'svg');
        svgElem.setAttribute('id', svgId);
        svgElem.setAttribute('style', 'position: absolute; width: 0; height: 0;');
        svgElem.innerHTML = `
          <defs>
            <filter id="${filterId}">
              <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="5" result="noise">
                <animate attributeName="baseFrequency" dur="10s" values="0.02;0.05;0.02" repeatCount="indefinite" />
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="30" xChannelSelector="R" yChannelSelector="G">
                <animate attributeName="scale" dur="0.5s" values="0;50;0" repeatCount="indefinite" />
              </feDisplacementMap>
            </filter>
          </defs>
        `;
        document.body.appendChild(svgElem);
      }
      body.style.filter = `url(#${filterId})`;
    } else {
      body.style.filter = '';
      const svgElem = document.getElementById(svgId);
      if (svgElem) {
        svgElem.parentNode?.removeChild(svgElem);
      }
    }

    return () => {
      body.style.filter = '';
      const svgElem = document.getElementById(svgId);
      if (svgElem) {
        svgElem.parentNode?.removeChild(svgElem);
      }
    };
  }, [active]);

  return null;
};

export default ScreenGlitch;
