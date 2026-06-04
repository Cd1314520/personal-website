/* ============================================================
   CHRIS DONG — 3D CREATOR PORTFOLIO INTERACTIVITY
   Optimized Vanilla JS transitions and interactive elements
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================
  // 1. FADE-IN ANIMATION OBSERVER
  // ==========================================================
  const fadeElements = document.querySelectorAll('.landing-fade');
  if (fadeElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.getAttribute('data-delay') || '0s';
          const duration = el.getAttribute('data-duration') || '0.7s';
          
          el.style.transitionDelay = delay;
          el.style.transitionDuration = duration;
          el.classList.add('active');
          
          observer.unobserve(el);
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));
  }

  // ==========================================================
  // 2. HERO PORTRAIT MAGNET EFFECT
  // ==========================================================
  const magnetContainer = document.querySelector('.hero-portrait-container');
  const magnetElement = document.querySelector('.hero-portrait-magnet');

  if (magnetContainer && magnetElement) {
    const padding = 150; // Active boundary distance
    const strength = 3;  // Divisor for distance (higher = weaker/slower)
    
    // Set transitions in CSS styles dynamically
    magnetElement.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';

    document.addEventListener('mousemove', (e) => {
      const rect = magnetContainer.getBoundingClientRect();
      const containerCenterX = rect.left + rect.width / 2;
      const containerCenterY = rect.top + rect.height / 2;

      // Distance from mouse to center of portrait
      const deltaX = e.clientX - containerCenterX;
      const deltaY = e.clientY - containerCenterY;
      const distance = Math.hypot(deltaX, deltaY);

      // Width/Height for boundary
      const boundaryWidth = rect.width / 2 + padding;
      const boundaryHeight = rect.height / 2 + padding;

      if (Math.abs(deltaX) < boundaryWidth && Math.abs(deltaY) < boundaryHeight) {
        // Inside magnetic field: use active transition and translate
        magnetElement.style.transition = 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
        const moveX = deltaX / strength;
        const moveY = deltaY / strength;
        magnetElement.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      } else {
        // Outside magnetic field: reset transform smoothly
        magnetElement.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
        magnetElement.style.transform = 'translate3d(0, 0, 0)';
      }
    });
  }

  // ==========================================================
  // 4. ABOUT SECTION CHARACTER-BY-CHARACTER TEXT REVEAL
  // ==========================================================
  const aboutText = document.getElementById('about-reveal-text');
  if (aboutText) {
    const rawText = aboutText.textContent.trim();
    aboutText.textContent = ''; // Clear text to inject spans
    
    // Split into characters and wrap in spans
    const chars = Array.from(rawText).map(char => {
      const span = document.createElement('span');
      span.className = 'char-span';
      span.textContent = char;
      // Handle space visibility
      if (char === ' ') {
        span.innerHTML = '&nbsp;';
      }
      aboutText.appendChild(span);
      return span;
    });

    const aboutSection = document.querySelector('.about-section');
    const handleAboutScroll = () => {
      const rect = aboutText.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate start and end positions relative to viewport
      // start: top of element is at 80% viewport height
      // end: bottom of element is at 20% viewport height
      const startScroll = window.scrollY + rect.top - windowHeight * 0.8;
      const endScroll = window.scrollY + rect.bottom - windowHeight * 0.2;
      const currentScroll = window.scrollY;

      // Calculate progress between 0 and 1
      let progress = (currentScroll - startScroll) / (endScroll - startScroll);
      progress = Math.max(0, Math.min(1, progress));

      // Reveal characters based on progress
      const totalChars = chars.length;
      chars.forEach((span, index) => {
        // Individual character threshold
        const charThreshold = index / totalChars;
        if (progress > charThreshold) {
          // Linear interpolation for character opacity as it gets revealed
          const charProgress = (progress - charThreshold) * 10; // rate of transition
          const opacity = 0.2 + 0.8 * Math.min(1, charProgress);
          span.style.opacity = opacity;
        } else {
          span.style.opacity = '0.2';
        }
      });
    };

    window.addEventListener('scroll', handleAboutScroll, { passive: true });
    handleAboutScroll();
  }

  // ==========================================================
  // 5. STICKY PROJECT CARDS SCALING
  // ==========================================================
  const projectCards = document.querySelectorAll('.project-card-sticky');
  const cardWrappers = document.querySelectorAll('.project-card-wrapper');

  if (projectCards.length > 0 && cardWrappers.length > 0) {
    const totalCards = projectCards.length;

    // Apply initial indices and static top offset offsets
    projectCards.forEach((card, index) => {
      const topOffset = 96 + index * 28; // matching 24px/32px sticky spacing
      card.style.top = `${topOffset}px`;
    });

    const handleCardStacking = () => {
      cardWrappers.forEach((wrapper, index) => {
        const card = projectCards[index];
        const rect = wrapper.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();
        
        // Target scale calculation: 1 - (totalCards - 1 - index) * 0.03
        const targetScale = 1 - (totalCards - 1 - index) * 0.03;
        
        // Check how much the wrapper has scrolled past its sticky top position
        // Sticky position is when the wrapper's top relative to viewport matches card top offset
        const topOffset = 96 + index * 28;
        const scrolledPast = topOffset - rect.top;
        const totalScrollableHeight = rect.height - cardRect.height;
        
        if (scrolledPast > 0 && totalScrollableHeight > 0) {
          let progress = scrolledPast / totalScrollableHeight;
          progress = Math.max(0, Math.min(1, progress));
          
          // Interpolate scale from 1 down to targetScale
          const currentScale = 1 - (1 - targetScale) * progress;
          card.style.transform = `scale(${currentScale})`;
          
          // Dim card slightly as it stacks underneath (optional, premium touch)
          const opacity = 1 - 0.15 * progress;
          card.style.opacity = opacity;
        } else {
          // Reset when not scrolled past
          card.style.transform = 'scale(1)';
          card.style.opacity = '1';
        }
      });
    };

    window.addEventListener('scroll', handleCardStacking, { passive: true });
    handleCardStacking();
  }

});
