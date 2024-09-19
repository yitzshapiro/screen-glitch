import React, { useEffect } from 'react';
import glitchGIF from '../assets/glitch.gif';

export interface ScreenGlitchProps {
  active: boolean;
}

const ScreenGlitch: React.FC<ScreenGlitchProps> = ({ active = false }) => {
  useEffect(() => {
    const svgId = 'glitch-svg';
    const filterId = 'glitch-filter';
    const scanlinesId = 'glitch-scanlines';
    const body = document.body;

    // Store references to dynamically created glitch segments
    const glitchSegments: HTMLElement[] = [];

    const createSVGFilter = () => {
      const svgNS = 'http://www.w3.org/2000/svg';
      const svgElem = document.createElementNS(svgNS, 'svg');
      svgElem.setAttribute('id', svgId);
      svgElem.setAttribute('style', 'position: absolute; width: 0; height: 0;');
      svgElem.innerHTML = `
        <defs>
          <filter id="${filterId}">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise">
              <animate attributeName="baseFrequency" dur="0.5s" values="0.02;0.05;0.02" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="30" xChannelSelector="R" yChannelSelector="G">
              <animate attributeName="scale" dur="0.1s" values="0;30;0" repeatCount="indefinite" />
            </feDisplacementMap>
          </filter>
        </defs>
      `;
      document.body.appendChild(svgElem);
    };

    const createScanlines = () => {
      if (!document.getElementById(scanlinesId)) {
        const scanlines = document.createElement('div');
        scanlines.id = scanlinesId;
        scanlines.style.position = 'fixed';
        scanlines.style.top = '0';
        scanlines.style.left = '0';
        scanlines.style.width = '100%';
        scanlines.style.height = '100%';
        scanlines.style.pointerEvents = 'none';
        scanlines.style.zIndex = '10001';
        scanlines.style.backgroundImage = 'linear-gradient(transparent 90%, rgba(0,0,0,0.1) 90%)';
        scanlines.style.backgroundSize = '100% 2px';
        scanlines.style.opacity = '0.3';
        document.body.appendChild(scanlines);
      }
    };

    const createGlitchSegments = () => {
      const numSegments = 10; // Increased number of segments
      for (let i = 0; i < numSegments; i++) {
        const segment = document.createElement('div');
        segment.className = 'glitch-wrapper';
        segment.style.position = 'fixed';

        // Random position and size for each segment
        const top = Math.random() * 100;
        const height = Math.random() * 10 + 5; // Height between 5% and 15%

        segment.style.top = `${top}%`;
        segment.style.left = '0';
        segment.style.width = '100%';
        segment.style.height = `${height}%`;
        segment.style.overflow = 'hidden';
        segment.style.pointerEvents = 'none';
        segment.style.zIndex = `${10002 + i}`; // Ensure it sits above other overlays
        body.appendChild(segment);
        createGlitchOverlay(segment);
      }
    };

    const createGlitchOverlay = (segment: HTMLElement) => {
      const glitch = document.createElement('div');
      glitch.className = 'glitch-segment';
      glitch.style.position = 'absolute';
      glitch.style.top = '0';
      glitch.style.left = '0';
      glitch.style.width = '100%';
      glitch.style.height = '100%';
      glitch.style.pointerEvents = 'none';
      glitch.style.zIndex = '9999';
      glitch.style.backgroundImage = `url(${glitchGIF})`;
      glitch.style.backgroundSize = 'cover';
      glitch.style.opacity = '0.5';
      glitch.style.mixBlendMode = 'overlay';
      glitch.style.display = 'none'; // Initially hidden
      segment.appendChild(glitch);
      glitchSegments.push(glitch);
    };

    const applyContentGlitch = (segment: HTMLElement) => {
      const glitchTransforms = [
        'translate(-10px, 0)',
        'translate(10px, 0)',
        'skewX(20deg)',
        'skewY(20deg)',
        'rotate(0.5deg)',
        'rotate(-0.5deg)',
        'scaleX(1.1)',
        'scaleY(0.9)',
      ];

      const randomTransform =
        glitchTransforms[Math.floor(Math.random() * glitchTransforms.length)];

      segment.style.transform = randomTransform;
      segment.style.transition = 'transform 0.05s ease';

      setTimeout(() => {
        segment.style.transform = '';
        segment.style.transition = '';
      }, 50);
    };

    const randomGlitch = () => {
      if (!active) return;

      // Randomly toggle glitches on different segments
      const glitchInterval = setInterval(() => {
        glitchSegments.forEach((glitch) => {
          const shouldGlitch = Math.random() > 0.8;
          const segment = glitch.parentElement;
          if (shouldGlitch && segment) {
            glitch.style.display = 'block';
            applyContentGlitch(segment);
            setTimeout(() => {
              glitch.style.display = 'none';
            }, Math.random() * 300 + 100); // Random duration between 100ms and 400ms
          }
        });
      }, Math.random() * 500 + 200); // Random interval between 200ms and 700ms

      return () => clearInterval(glitchInterval);
    };

    if (active) {
      createSVGFilter();
      createScanlines();
      createGlitchSegments();
      body.style.filter = `url(#${filterId})`;
      const cleanupGlitch = randomGlitch();

      return () => {
        body.style.filter = '';
        const svgElem = document.getElementById(svgId);
        if (svgElem) {
          svgElem.parentNode?.removeChild(svgElem);
        }
        const scanlines = document.getElementById(scanlinesId);
        if (scanlines) {
          scanlines.parentNode?.removeChild(scanlines);
        }
        // Remove glitch segments and their overlays
        glitchSegments.forEach((glitch) => {
          const segment = glitch.parentElement;
          if (segment) {
            segment.parentNode?.removeChild(segment);
          }
        });
        glitchSegments.length = 0;
        if (cleanupGlitch) cleanupGlitch();
      };
    }

    // Cleanup if not active
    return () => {};
  }, [active]);

  return null;
};

export default ScreenGlitch;
