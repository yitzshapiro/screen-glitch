import React, { useEffect } from 'react';
import './ScreenGlitch.css';

const glitchGif1 = new URL('../assets/glitch1.gif', import.meta.url).href;
const glitchGif2 = new URL('../assets/glitch2.gif', import.meta.url).href;
const brokenGlass = new URL('../assets/broken-glass.png', import.meta.url).href;

export interface ScreenGlitchProps {
  active: boolean;
}
const glitchGifs = [glitchGif1, glitchGif2];

const ScreenGlitch: React.FC<ScreenGlitchProps> = ({ active = false }) => {
  useEffect(() => {
    const svgId = 'glitch-svg';
    const filterId = 'glitch-filter';
    const scanlinesId = 'glitch-scanlines';
    const brokenGlassId = 'broken-glass-overlay';
    const body = document.body;

    const glitchSegments: HTMLElement[] = [];

    const createSVGFilter = () => {
      const svgNS = 'http://www.w3.org/2000/svg';
      const svgElem = document.createElementNS(svgNS, 'svg');
      svgElem.setAttribute('id', svgId);
      svgElem.setAttribute('style', 'position: absolute; width: 0; height: 0;');
      svgElem.innerHTML = `
        <defs>
          <filter id="${filterId}">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" />
            <feColorMatrix type="matrix" values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 1 0"/>
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
        scanlines.style.backgroundSize = '100% 1px';
        scanlines.style.opacity = '0.4';
        scanlines.style.animation = 'scanline 1s linear infinite';
        document.body.appendChild(scanlines);
      }
    };

    const createGlitchSegments = () => {
      const numSegments = 15; // change for more or less glitches
      for (let i = 0; i < numSegments; i++) {
        const segment = document.createElement('div');
        segment.className = 'glitch-wrapper';

        const randomWidth = Math.random() * 60 + 40;
        const randomHeight = Math.random() * 60 + 40;
        const randomTop = Math.random() * 100;
        const randomLeft = Math.random() * 100;

        const shapes = [
          'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', // Rectangle
          'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', // Rectangle (duplicate for higher chance)
          'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', // Rectangle (duplicate for higher chance)
          'polygon(25% 0%, 75% 0%, 75% 100%, 25% 100%)', // Vertical rectangle
          'polygon(0% 25%, 100% 25%, 100% 75%, 0% 75%)', // Horizontal rectangle
        ];
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];

        const randomDisplacement = Math.random() * 20 - 10;

        segment.style.position = 'fixed';
        segment.style.top = `${randomTop}%`;
        segment.style.left = `${randomLeft}%`;
        segment.style.width = `${randomWidth}%`;
        segment.style.height = `${randomHeight}%`;
        segment.style.overflow = 'hidden';
        segment.style.pointerEvents = 'none';
        segment.style.zIndex = `${10002 + i}`;
        segment.style.clipPath = randomShape;
        segment.style.opacity = `${Math.random() * 0.7 + 0.3}`;
        segment.style.transform = `translateX(${randomDisplacement}%) rotate(${Math.random() * 10 - 5}deg)`;
        segment.style.backgroundColor = 'rgba(0,0,0,0.1)';
        body.appendChild(segment);
        createGlitchOverlay(segment, glitchGifs[i % 2]);
      }
    };

    const createGlitchOverlay = (segment: HTMLElement, glitchGif: string) => {
      const glitch = document.createElement('div');
      glitch.className = 'glitch-segment';
      glitch.style.position = 'absolute';
      glitch.style.top = '0';
      glitch.style.left = '0';
      glitch.style.width = '100%';
      glitch.style.height = '100%';
      glitch.style.pointerEvents = 'none';
      glitch.style.zIndex = '9999';
      glitch.style.backgroundImage = `url(${glitchGif})`;
      glitch.style.backgroundSize = 'cover';
      glitch.style.opacity = '0.8';
      glitch.style.mixBlendMode = 'overlay';
      glitch.style.display = 'none';
      glitch.style.animation = `glitchAnimation ${Math.random() * 3 + 2}s infinite`;
      segment.appendChild(glitch);
      glitchSegments.push(glitch);
    };

    const createBrokenScreenOverlay = () => {
      if (!document.getElementById(brokenGlassId)) {
        const brokenOverlay = document.createElement('img');
        brokenOverlay.id = brokenGlassId;
        brokenOverlay.src = brokenGlass;
        brokenOverlay.style.position = 'fixed';
        brokenOverlay.style.top = '0';
        brokenOverlay.style.left = '0';
        brokenOverlay.style.width = '100%';
        brokenOverlay.style.height = '100%';
        brokenOverlay.style.pointerEvents = 'none';
        brokenOverlay.style.zIndex = '10003';
        brokenOverlay.style.opacity = '0.5';
        brokenOverlay.style.mixBlendMode = 'multiply';
        brokenOverlay.style.display = 'none';
        document.body.appendChild(brokenOverlay);
      }
    };

    const toggleBrokenScreen = () => {
      const brokenOverlay = document.getElementById(brokenGlassId);
      if (brokenOverlay) {
        brokenOverlay.style.display = 'block';
      }
    };

    const applyWholeScreenSkew = () => {
      const skewX = Math.random() * 40 - 20;
      const skewY = Math.random() * 40 - 20;
      const translateX = Math.random() * 40 - 20;
      const translateY = Math.random() * 40 - 20;
      const scale = 1 + (Math.random() * 0.4 - 0.2);

      document.body.style.transform = `skew(${skewX}deg, ${skewY}deg) translate(${translateX}px, ${translateY}px) scale(${scale})`;
      document.body.style.transition = 'transform 0.1s';

      setTimeout(() => {
        document.body.style.transform = '';
        document.body.style.transition = '';
      }, 200 + Math.random() * 300);
    };

    const applyDOMGlitches = () => {
      const elements = document.body.querySelectorAll('*');
      const randomElements = Array.from(elements).sort(() => 0.5 - Math.random()).slice(0, 20);

      randomElements.forEach((el) => {
        const element = el as HTMLElement;
        const originalTransform = element.style.transform;
        const originalFilter = element.style.filter;

        const shiftX = Math.random() * 40 - 20;
        const shiftY = Math.random() * 40 - 20;
        const skewX = Math.random() * 40 - 20;
        const skewY = Math.random() * 40 - 20;
        const blur = Math.random() * 5;

        element.style.transform = `translate(${shiftX}px, ${shiftY}px) skew(${skewX}deg, ${skewY}deg)`;
        element.style.filter = `blur(${blur}px)`;

        setTimeout(() => {
          element.style.transform = originalTransform;
          element.style.filter = originalFilter;
        }, 100 + Math.random() * 200);
      });
    };

    const randomGlitch = () => {
      if (!active) return;

      toggleBrokenScreen();

      const glitchInterval = setInterval(() => {
        glitchSegments.forEach((glitch) => {
          const shouldGlitch = Math.random() > 0.7;
          if (shouldGlitch) {
            glitch.style.display = 'block';
            
            const segment = glitch.parentElement;
            if (segment) {
              const shiftX = Math.random() * 20 - 10;
              const shiftY = Math.random() * 20 - 10;
              const blur = Math.random() * 5;
              segment.style.transform = `translate(${shiftX}px, ${shiftY}px)`;
              segment.style.filter = `blur(${blur}px)`;
            }

            setTimeout(() => {
              glitch.style.display = 'none';
              if (segment) {
                segment.style.transform = '';
                segment.style.filter = '';
              }
            }, 200 + Math.random() * 500);
          }
        });

        if (Math.random() > 0.7) {
          applyWholeScreenSkew();
        }

        applyDOMGlitches();
      }, 200 + Math.random() * 300);

      return () => clearInterval(glitchInterval);
    };

    if (active) {
      createSVGFilter();
      createScanlines();
      createGlitchSegments();
      createBrokenScreenOverlay();
      body.style.filter = `url(#${filterId})`;
      const cleanupGlitch = randomGlitch();

      return () => {
        // clean up
        body.style.filter = '';
        body.style.transform = '';
        body.style.transition = '';

        [svgId, scanlinesId, brokenGlassId].forEach(id => {
          const elem = document.getElementById(id);
          if (elem) elem.remove();
        });
        
        glitchSegments.forEach(glitch => {
          const segment = glitch.parentElement;
          if (segment) segment.remove();
        });
        glitchSegments.length = 0;

        document.body.querySelectorAll('*').forEach((el) => {
          const element = el as HTMLElement;
          element.style.transform = '';
          element.style.filter = '';
          element.style.transition = '';
          element.style.opacity = '';
          element.style.mixBlendMode = '';
        });

        if (cleanupGlitch) cleanupGlitch();
      };
    }

    // Cleanup if not active
    return () => {};
  }, [active]);

  return null;
};

export default ScreenGlitch;
