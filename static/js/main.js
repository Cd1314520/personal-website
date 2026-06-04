/* ============================================================
   CHRIS DONG — PORTFOLIO INTERACTIVITY
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ===== Navbar Scroll Effect =====
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();


  // ===== Mobile Navigation =====
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const navOverlay = document.getElementById('nav-overlay');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('active', isOpen);
      if (navOverlay) navOverlay.classList.toggle('show', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on overlay click
    if (navOverlay) {
      navOverlay.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        navOverlay.classList.remove('show');
        document.body.style.overflow = '';
      });
    }

    // Close on link click (mobile)
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        if (navOverlay) navOverlay.classList.remove('show');
        document.body.style.overflow = '';
      });
    });
  }


  // ===== Typed Text Effect =====
  const typedElement = document.getElementById('typed-text');
  if (typedElement) {
    const phrases = [
      'Electrical Engineering Student',
      'AI Workflow Designer',
      'Arduino & Robotics Developer',
      'Full-Stack Tinkerer',
      'Aspiring Developer'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function type() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40;
      } else {
        typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 80;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 400;
      }

      setTimeout(type, typeSpeed);
    }

    setTimeout(type, 1200);
  }


  // ===== Portfolio Filter =====
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter cards
      projectCards.forEach(card => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.style.display = '';
          card.style.opacity = '0';
          card.style.transform = 'translateY(16px)';
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(16px)';
          setTimeout(() => { card.style.display = 'none'; }, 350);
        }
      });
    });
  });


  // ===== Contact Form AJAX =====
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('.form-submit');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      const formData = {
        name: contactForm.querySelector('#name').value,
        email: contactForm.querySelector('#email').value,
        subject: contactForm.querySelector('#subject')?.value || '',
        message: contactForm.querySelector('#message').value
      };

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (data.success) {
          showToast(data.message, 'success');
          contactForm.reset();
        } else {
          showToast(data.message || 'Something went wrong.', 'error');
        }
      } catch (err) {
        showToast('Network error. Please try again.', 'error');
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }


  // ===== Toast Notification =====
  function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.className = 'toast show ' + type;

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }


  // ===== Scroll-triggered Animations =====
  const fadeElements = document.querySelectorAll('.fade-in');
  if (fadeElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));
  }

});

// Image Modal Logic
document.addEventListener("DOMContentLoaded", function() {
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("image-modal-img");
  const closeBtn = document.getElementById("image-modal-close");

  if(modal && modalImg && closeBtn) {
    document.querySelectorAll(".clickable-img").forEach(img => {
      img.onclick = function() {
        modal.style.display = "block";
        modalImg.src = this.src;
      }
    });

    closeBtn.onclick = function() {
      modal.style.display = "none";
    }

    modal.onclick = function(e) {
      if(e.target === modal) {
        modal.style.display = "none";
      }
    }
  }

  // Read More Logic
  document.querySelectorAll(".read-more-btn").forEach(btn => {
    btn.onclick = function() {
      const content = this.previousElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
        this.innerHTML = "Read More &darr;";
      } else {
        content.style.display = "block";
        this.innerHTML = "Show Less &uarr;";
      }
    }
  });
});

