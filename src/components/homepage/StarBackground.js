import React, { useEffect, useRef } from 'react';
import '../../assets/css/StarBackground.css';

const StarBackground = () => {
  const backgroundRef = useRef(null);

  const createStar = (layer) => {
    const star = document.createElement('div');
    star.className = `star ${Math.random() < 0.5 ? 'parallax' : ''} ${
      Math.random() < 0.3 ? 'large' : Math.random() < 0.7 ? 'medium' : 'small'
    }`;
    
    // Random position
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    
    // Random animation delay
    star.style.animationDelay = `${Math.random() * 10}s`;
    
    return star;
  };

  useEffect(() => {
    if (!backgroundRef.current) return;

    // Create star layers
    const layers = [1, 2, 3].map(layerNum => {
      const layer = document.createElement('div');
      layer.className = `star-layer-${layerNum}`;
      return layer;
    });

    // Add stars to each layer
    layers.forEach(layer => {
      const numStars = Math.floor(window.innerWidth / 8); // Adjust density based on screen width
      for (let i = 0; i < numStars; i++) {
        layer.appendChild(createStar(layer));
      }
      backgroundRef.current.appendChild(layer);
    });

    // Cleanup
    return () => {
      if (backgroundRef.current) {
        backgroundRef.current.innerHTML = '';
      }
    };
  }, []);

  return <div ref={backgroundRef} className="star-background" />;
};

export default StarBackground; 