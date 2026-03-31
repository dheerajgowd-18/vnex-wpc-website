/* ============================================================
   VNEX WPC — main.js
   Vanilla JavaScript: all shared interactive features
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ====================================================
     1. STICKY NAVBAR — transparent → white on scroll
        + smart top offset to eliminate scroll gap
     ==================================================== */
  const navbar = document.querySelector('.navbar');
  const topBar = document.querySelector('.top-bar');
  const SCROLL_THRESHOLD = 60;

  function updateNavbar() {
    if (!navbar) return;
    const topBarH = topBar ? topBar.offsetHeight : 0;

    if (window.scrollY > topBarH) {
      // Top bar has scrolled away — pin navbar flush to viewport top
      navbar.classList.add('scrolled');
      navbar.style.top = '0';
    } else {
      // Still at the top — sit below the top bar
      navbar.classList.remove('scrolled');
      navbar.style.top = topBarH + 'px';
    }
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar(); // run on load to set correct initial position


  /* ====================================================
     2. NEW ACCORDION HAMBURGER MENU & DROPDOWN
     ==================================================== */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileProductsToggle = document.getElementById('mobile-products-toggle');
  const mobileProductsMenu = document.getElementById('mobile-products-menu');
  const productsArrow = document.getElementById('products-arrow');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('active');
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  if (mobileProductsToggle && mobileProductsMenu) {
    mobileProductsToggle.addEventListener('click', () => {
      mobileProductsMenu.classList.toggle('open');
      if (productsArrow) {
        productsArrow.textContent = mobileProductsMenu.classList.contains('open') ? '▴' : '▾';
      }
    });
  }


  /* ====================================================
     4. ACTIVE NAV LINK DETECTION
     ==================================================== */
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link, .mobile-menu-links a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    // Normalize paths for comparison
    const linkPath = new URL(href, window.location.href).pathname;
    const isHome = (linkPath === '/' || linkPath.endsWith('/index.html')) &&
                   (currentPath === '/' || currentPath.endsWith('/index.html'));

    if (isHome ||
        (linkPath !== '/' && !linkPath.endsWith('/index.html') && currentPath.includes(linkPath.replace(/\/$/, '')))) {
      link.classList.add('active');
    }
  });


  /* ====================================================
     5. COUNT-UP ANIMATION (IntersectionObserver)
     ==================================================== */
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');

  if (statNumbers.length > 0) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          entry.target.classList.add('counted');
          animateCount(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => countObserver.observe(el));
  }

  function animateCount(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.floor(eased * target);
      el.textContent = current.toLocaleString() + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString() + suffix;
      }
    }
    requestAnimationFrame(step);
  }


  /* ====================================================
     6. TESTIMONIAL AUTO-SLIDER
     ==================================================== */
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dot');
  let currentSlide = 0;
  let sliderInterval = null;
  const SLIDE_INTERVAL = 4000;

  function goToSlide(index) {
    if (slides.length === 0) return;
    slides[currentSlide]?.classList.remove('active');
    dots[currentSlide]?.classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide]?.classList.add('active');
    dots[currentSlide]?.classList.add('active');
  }

  function startSlider() {
    if (slides.length === 0) return;
    sliderInterval = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, SLIDE_INTERVAL);
  }

  function stopSlider() {
    clearInterval(sliderInterval);
  }

  if (slides.length > 0) {
    goToSlide(0);
    startSlider();

    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        stopSlider();
        goToSlide(index);
        startSlider();
      });
    });

    // Pause on hover
    const testimonialSection = document.querySelector('.testimonials-section');
    if (testimonialSection) {
      testimonialSection.addEventListener('mouseenter', stopSlider);
      testimonialSection.addEventListener('mouseleave', startSlider);
    }
  }


  /* ====================================================
     7. FAQ ACCORDION
     ==================================================== */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const body = item.querySelector('.faq-body');
    if (!question || !body) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all open items
      faqItems.forEach(i => {
        i.classList.remove('open');
        const b = i.querySelector('.faq-body');
        if (b) b.classList.remove('open');
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
        body.classList.add('open');
      }
    });
  });


  /* ====================================================
     8. GALLERY FILTER TABS
     ==================================================== */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const galleryItems = document.querySelectorAll('.masonry-item');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.dataset.filter;

      galleryItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
          item.style.display = 'block';
          setTimeout(() => { item.style.opacity = '1'; }, 10);
        } else {
          item.style.opacity = '0';
          setTimeout(() => { item.style.display = 'none'; }, 300);
        }
      });
    });
  });


  /* ====================================================
     9. SCROLL REVEAL (IntersectionObserver)
     ==================================================== */
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));
  }


  /* ====================================================
     10. CONTACT FORM VALIDATION
     ==================================================== */
  const contactForm = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');
  const errorMsg = document.getElementById('formError');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      let valid = true;
      const requiredFields = contactForm.querySelectorAll('[required]');

      requiredFields.forEach(field => {
        field.classList.remove('error');
        if (!field.value.trim()) {
          field.classList.add('error');
          valid = false;
        }
      });

      // Email format validation
      const emailField = contactForm.querySelector('#email');
      if (emailField && emailField.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value.trim())) {
          emailField.classList.add('error');
          valid = false;
        }
      }

      // Phone format validation
      const phoneField = contactForm.querySelector('#phone');
      if (phoneField && phoneField.value.trim()) {
        const phoneRegex = /^[\d\s\+\-\(\)]{7,15}$/;
        if (!phoneRegex.test(phoneField.value.trim())) {
          phoneField.classList.add('error');
          valid = false;
        }
      }

      if (!valid) {
        if (errorMsg) {
          errorMsg.classList.add('show');
          errorMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        return;
      }

      // Clear messages
      if (errorMsg) errorMsg.classList.remove('show');
      if (successMsg) successMsg.classList.remove('show');

      // Submit via Formspree
      const formData = new FormData(contactForm);
      const action = contactForm.getAttribute('action');
      const submitBtn = contactForm.querySelector('.btn-submit');

      if (submitBtn) {
        submitBtn.textContent = 'Sending…';
        submitBtn.disabled = true;
      }

      try {
        const res = await fetch(action, {
          method: 'POST',
          body: formData,
          headers: { Accept: 'application/json' }
        });

        if (res.ok) {
          if (successMsg) {
            successMsg.classList.add('show');
            successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
          contactForm.reset();
        } else {
          throw new Error('Server error');
        }
      } catch {
        if (errorMsg) {
          errorMsg.textContent = '⚠ Something went wrong. Please try again or email us directly.';
          errorMsg.classList.add('show');
        }
      } finally {
        if (submitBtn) {
          submitBtn.textContent = 'Send Message';
          submitBtn.disabled = false;
        }
      }
    });

    // Remove error class on input
    contactForm.querySelectorAll('.form-control').forEach(field => {
      field.addEventListener('input', () => field.classList.remove('error'));
    });
  }


  /* ====================================================
     11. SMOOTH SCROLL for anchor links
     ==================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  /* ====================================================
     Hero Load Animation — staggered fade-up
     ==================================================== */
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    const children = heroContent.querySelectorAll('.hero-tag, h1, .hero-sub, .hero-btns');
    children.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
      el.style.transition = `opacity 0.7s ease ${i * 0.15}s, transform 0.7s ease ${i * 0.15}s`;
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 50 + i * 150);
    });
  }

}); // end DOMContentLoaded
