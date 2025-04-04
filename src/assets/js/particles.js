class ParticleAnimation {
  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'particles-container';
    document.body.appendChild(this.container);
    
    this.particles = [];
    this.particleCount = 50;
    this.init();
    
    // Handle scroll for navbar
    this.handleNavbar();
  }

  init() {
    for (let i = 0; i < this.particleCount; i++) {
      this.createParticle();
    }
  }

  createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random initial position
    const x = Math.random() * window.innerWidth;
    const delay = Math.random() * 5; // Random delay up to 5 seconds
    const duration = 7 + Math.random() * 7; // Random duration between 7-14 seconds
    
    particle.style.left = `${x}px`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    
    this.container.appendChild(particle);
    this.particles.push(particle);
    
    // Remove and recreate particle after animation
    particle.addEventListener('animationend', () => {
      particle.remove();
      this.particles = this.particles.filter(p => p !== particle);
      this.createParticle();
    });
  }

  handleNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
}

// Initialize the animation when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ParticleAnimation();
}); 