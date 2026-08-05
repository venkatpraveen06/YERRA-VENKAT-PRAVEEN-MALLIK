/**
 * Venkat Praveen Portfolio - Vanilla JavaScript Functionality
 * Handcrafted for responsiveness, interactive case studies, and scroll performance.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initIntersectionObserver();
  initStatsCounter();
  initCaseStudyModal();
  initContactForm();
  initSmoothScroll();
  initCodeTypingAnimation();
  initHeroTitleTypingAnimation();
});

/* 1. Sticky Navbar Shrink on Scroll */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Shrink navbar
    if (window.scrollY > 40) {
      navbar.classList.add('nav-scrolled');
    } else {
      navbar.classList.remove('nav-scrolled');
    }

    // Active Section Link Highlight
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* 2. Mobile Popout Sidebar Navigation */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const overlay = document.querySelector('.sidebar-overlay');

  if (toggleBtn && navMenu) {
    function openMenu() {
      toggleBtn.classList.add('active');
      navMenu.classList.add('active');
      if (overlay) overlay.classList.add('active');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      toggleBtn.classList.remove('active');
      navMenu.classList.remove('active');
      if (overlay) overlay.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    function toggleMenu() {
      const isExpanded = navMenu.classList.contains('active');
      if (isExpanded) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    toggleBtn.addEventListener('click', toggleMenu);

    if (overlay) {
      overlay.addEventListener('click', closeMenu);
    }

    navLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMenu();
      }
    });
  }
}

/* 3. Intersection Observer for Fade-in Animations */
function initIntersectionObserver() {
  const fadeElements = document.querySelectorAll('.fade-in-up');
  
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => observer.observe(el));
}

/* 4. Stats Counter Animation */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  let animated = false;

  const statsSection = document.querySelector('.quick-stats');
  if (!statsSection) return;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !animated) {
      animated = true;
      statNumbers.forEach(stat => {
        const target = parseFloat(stat.getAttribute('data-target'));
        const prefix = stat.getAttribute('data-prefix') || '';
        const suffix = stat.getAttribute('data-suffix') || '';
        const isDecimal = target % 1 !== 0;

        let count = 0;
        const duration = 1500; // ms
        const increment = target / (duration / 16);

        const timer = setInterval(() => {
          count += increment;
          if (count >= target) {
            stat.textContent = `${prefix}${isDecimal ? target.toFixed(1) : Math.floor(target)}${suffix}`;
            clearInterval(timer);
          } else {
            stat.textContent = `${prefix}${isDecimal ? count.toFixed(1) : Math.floor(count)}${suffix}`;
          }
        }, 16);
      });
    }
  }, { threshold: 0.5 });

  observer.observe(statsSection);
}

/* 5. Detailed Case Study Modal Data & Interactive Renderer */
const caseStudiesData = {
  restaurantos: {
    title: 'RestaurantOS — AI-Powered Management System',
    category: 'Full Stack & AI Automation',
    problem: 'Traditional restaurant point-of-sale systems are fragmented, requiring separate tools for order taking, kitchen synchronization, and customer marketing.',
    solution: 'Engineered an end-to-end solution combining a responsive customer web app with QR ordering, real-time Kitchen Display System (KDS), and automated WhatsApp order confirmations powered by FastAPI and PostgreSQL.',
    keyDeliverables: [
      'Digital QR Menu with real-time inventory updates',
      'WebSocket-powered Kitchen Dashboard for immediate order firing',
      'Automated WhatsApp bot for delivery status and customer feedback',
      'Admin analytics dashboard with revenue breakdown'
    ],
    metrics: [
      { val: '45%', lbl: 'Faster Order Turnaround' },
      { val: '100%', lbl: 'Automated Receipts' },
      { val: '3.2x', lbl: 'Repeat Customer Ratio' }
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'FastAPI', 'PostgreSQL', 'WhatsApp API']
  },
  auracare: {
    title: 'Teja Chest Hospital — Enterprise Hospital Management System',
    category: 'Healthcare Software',
    problem: 'Hospitals struggle with long queue wait times, complex medical record management, and disjointed scheduling between doctors and admin departments.',
    solution: 'Built a HIPAA-compliant medical portal featuring real-time patient queue tracking, electronic health record (EHR) management, and multi-tier role-based access for doctors, nurses, and administrators.',
    keyDeliverables: [
      'Patient Registration & Electronic Health Records (EHR)',
      'Doctor appointment scheduler with automated SMS reminders',
      'Lab test result reporting and digital prescription generation',
      'Role-based admin access control (RBAC)'
    ],
    metrics: [
      { val: '60%', lbl: 'Reduced Wait Times' },
      { val: '99.9%', lbl: 'EHR System Uptime' },
      { val: '12k+', lbl: 'Monthly Active Records' }
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Python', 'FastAPI', 'SQLite / PostgreSQL']
  },
  ramanujan: {
    title: 'Ramanujan Academy — Education Management Portal',
    category: 'EdTech Platform',
    problem: 'Educational institutions face friction managing student admissions, online fee collections, assignment distribution, and attendance records manually.',
    solution: 'Designed a unified learning management and administration portal allowing seamless faculty grading, instant fee payment integration, and student progress tracking.',
    keyDeliverables: [
      'Online student admission workflow and document upload',
      'Faculty portal for attendance marking and grade submission',
      'Automated fee payment receipt generator',
      'Interactive student analytics dashboard'
    ],
    metrics: [
      { val: '85%', lbl: 'Paperless Admin' },
      { val: '5,000+', lbl: 'Enrolled Students' },
      { val: '98%', lbl: 'On-Time Fee Rate' }
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'REST APIs', 'Supabase']
  },
  interior: {
    title: 'The Prism Interiors — Architectural Portfolio Platform',
    category: 'Design & Web Apps',
    problem: 'Boutique architectural and interior design firms need immersive visual portfolios that convert high-end residential visitors into active design consultations.',
    solution: 'Crafted a sleek, image-optimized portfolio platform with fluid CSS grid layouts, dynamic project filtering, lead capture forms, and fast image optimization.',
    keyDeliverables: [
      'Interactive project gallery with category filtering',
      'High-resolution progressive image loading',
      'Custom lead inquiry & consultation scheduler',
      'SEO-optimized architecture service pages'
    ],
    metrics: [
      { val: '99/100', lbl: 'Lighthouse Score' },
      { val: '+140%', lbl: 'Inquiry Conversion' },
      { val: '1.1s', lbl: 'First Contentful Paint' }
    ],
    tech: ['HTML5', 'CSS3 (Grid/Flexbox)', 'Vanilla JS', 'Vercel']
  },
  smarthostel: {
    title: 'Smart Hostel — Student Lodging & Fee System',
    category: 'Property Management',
    problem: 'Property managers spend excessive manual hours tracking room occupancy, recurring monthly rent collection, and student maintenance grievances.',
    solution: 'Developed an all-in-one hostel management suite providing interactive floor plan room allocation, fee tracking alerts, and student grievance ticket resolution.',
    keyDeliverables: [
      'Interactive room allocation matrix',
      'Automated fee due date notifications',
      'Student maintenance complaint ticketing system',
      'Financial revenue & expense reporting'
    ],
    metrics: [
      { val: '94%', lbl: 'Average Occupancy Rate' },
      { val: '0', lbl: 'Lost Fee Records' },
      { val: '24 hrs', lbl: 'Avg Complaint Resolution' }
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'FastAPI', 'SQLite']
  },
  businessflow: {
    title: 'Balaramayya Supermarket — E-Commerce & Retail Management Platform',
    category: 'Retail & E-Commerce Web Apps',
    problem: 'Traditional local supermarkets struggle with manual order taking, delayed neighborhood delivery dispatch, and lack of digital stock updates for retail & wholesale customers.',
    solution: 'Engineered a high-performance e-commerce platform featuring dual wholesale/retail pricing tiers, automated WhatsApp order receipts, fast 30-minute delivery dispatch, and real-time inventory management.',
    keyDeliverables: [
      'Customer online shopping portal with fresh produce & staple catalog',
      'WhatsApp order confirmation & automated receipt delivery',
      'Wholesale bulk pricing engine & flash sale management',
      'Store inventory management & sales reporting dashboard'
    ],
    metrics: [
      { val: '1,200+', lbl: 'Daily Products Listed' },
      { val: '30 min', lbl: 'Fast Delivery Dispatch' },
      { val: '+180%', lbl: 'Online Order Growth' }
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'FastAPI', 'PostgreSQL', 'WhatsApp API']
  }
};

function initCaseStudyModal() {
  const modalOverlay = document.querySelector('.modal-overlay');
  const modalContainer = document.querySelector('.modal-container');
  const closeBtn = document.querySelector('.modal-close');
  const caseStudyBtns = document.querySelectorAll('.btn-case-study');

  if (!modalOverlay) return;

  caseStudyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const data = caseStudiesData[projectId];

      if (data) {
        renderModalContent(data);
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

function renderModalContent(data) {
  const modalTitle = document.querySelector('.modal-title');
  const modalBody = document.querySelector('.modal-body');

  modalTitle.textContent = data.title;
  
  const techBadgesHtml = data.tech.map(t => `<span class="tech-badge">${t}</span>`).join(' ');
  const deliverablesHtml = data.keyDeliverables.map(item => `<li><i class="fas fa-check-circle" style="color: var(--color-blue); margin-right: 8px;"></i>${item}</li>`).join('');
  const metricsHtml = data.metrics.map(m => `
    <div class="modal-metric-card">
      <div class="modal-metric-val">${m.val}</div>
      <div class="modal-metric-lbl">${m.lbl}</div>
    </div>
  `).join('');

  modalBody.innerHTML = `
    <div class="modal-category" style="color: var(--color-blue); font-weight: 700; font-size: 0.9rem;">${data.category}</div>
    <div class="project-tech-badges">${techBadgesHtml}</div>
    
    <div>
      <h4 class="modal-section-title">The Challenge</h4>
      <p class="modal-text">${data.problem}</p>
    </div>

    <div>
      <h4 class="modal-section-title">The Solution</h4>
      <p class="modal-text">${data.solution}</p>
    </div>

    <div>
      <h4 class="modal-section-title">Key Technical Deliverables</h4>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; font-size: 0.95rem; color: var(--color-text-muted);">
        ${deliverablesHtml}
      </ul>
    </div>

    <div>
      <h4 class="modal-section-title">Measured Impact</h4>
      <div class="modal-metrics-grid">
        ${metricsHtml}
      </div>
    </div>
  `;
}

/* 6. Contact Form Validation & Toast Feedback */
function initContactForm() {
  const form = document.querySelector('.contact-form');
  const toast = document.querySelector('.form-toast');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    if (!name || !email || !message) {
      alert('Please fill out all required fields.');
      return;
    }

    // Display feedback toast
    toast.style.display = 'block';
    toast.textContent = `Thank you, ${name}! Your message has been sent successfully. I will get back to you within 24 hours.`;

    form.reset();

    setTimeout(() => {
      toast.style.display = 'none';
    }, 5000);
  });
}

/* 7. Smooth Scroll for Links */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/* 8. Code Editor Typing Letter Animation */
function initCodeTypingAnimation() {
  const codeContainer = document.querySelector('.code-lines');
  if (!codeContainer) return;

  const lines = [
    [
      { text: "from ", class: "c-kw" },
      { text: "fastapi ", class: "" },
      { text: "import ", class: "c-kw" },
      { text: "FastAPI, Depends", class: "" }
    ],
    [
      { text: "from ", class: "c-kw" },
      { text: "ai_agent ", class: "" },
      { text: "import ", class: "c-kw" },
      { text: "GeminiBot", class: "" }
    ],
    [],
    [
      { text: "app = ", class: "" },
      { text: "FastAPI", class: "c-fn" },
      { text: "(title=", class: "" },
      { text: '"BusinessFlow"', class: "c-str" },
      { text: ")", class: "" }
    ],
    [
      { text: "agent = ", class: "" },
      { text: "GeminiBot", class: "c-fn" },
      { text: "()", class: "" }
    ],
    [],
    [
      { text: "# Auto qualify inbound leads", class: "c-cm" }
    ],
    [
      { text: "@app.post", class: "c-kw" },
      { text: "(", class: "" },
      { text: '"/api/v1/lead"', class: "c-str" },
      { text: ")", class: "" }
    ],
    [
      { text: "async def ", class: "c-kw" },
      { text: "handle_lead", class: "c-fn" },
      { text: "(payload: dict):", class: "" }
    ],
    [
      { text: "  res = ", class: "" },
      { text: "await ", class: "c-kw" },
      { text: "agent.", class: "" },
      { text: "analyze", class: "c-fn" },
      { text: "(payload)", class: "" }
    ],
    [
      { text: "  ", class: "" },
      { text: "return ", class: "c-kw" },
      { text: "{\"", class: "" },
      { text: "status", class: "c-str" },
      { text: "\": \"", class: "" },
      { text: "qualified", class: "c-str" },
      { text: "\", \"", class: "" },
      { text: "data", class: "c-str" },
      { text: "\": res}", class: "" }
    ]
  ];

  let currentLineIndex = 0;
  let currentTokenIndex = 0;
  let currentCharIndex = 0;

  const cursor = document.createElement('span');
  cursor.className = 'code-cursor';

  function render() {
    codeContainer.innerHTML = '';

    for (let l = 0; l <= currentLineIndex; l++) {
      const lineDiv = document.createElement('div');
      const lineData = lines[l];

      if (!lineData || lineData.length === 0) {
        lineDiv.innerHTML = '&nbsp;';
      } else {
        for (let t = 0; t < lineData.length; t++) {
          if (l < currentLineIndex || (l === currentLineIndex && t < currentTokenIndex)) {
            const span = document.createElement('span');
            if (lineData[t].class) span.className = lineData[t].class;
            span.textContent = lineData[t].text;
            lineDiv.appendChild(span);
          } else if (l === currentLineIndex && t === currentTokenIndex) {
            const span = document.createElement('span');
            if (lineData[t].class) span.className = lineData[t].class;
            span.textContent = lineData[t].text.substring(0, currentCharIndex);
            lineDiv.appendChild(span);
          }
        }
      }

      if (l === currentLineIndex) {
        lineDiv.appendChild(cursor);
      }

      codeContainer.appendChild(lineDiv);
    }
  }

  function step() {
    render();

    const currentLine = lines[currentLineIndex];

    if (!currentLine || currentLine.length === 0) {
      currentLineIndex++;
      currentTokenIndex = 0;
      currentCharIndex = 0;
      if (currentLineIndex >= lines.length) {
        setTimeout(resetAndLoop, 4500);
        return;
      }
      setTimeout(step, 140);
      return;
    }

    const currentToken = currentLine[currentTokenIndex];
    if (currentCharIndex < currentToken.text.length) {
      currentCharIndex++;
      const delay = Math.random() * 25 + 25;
      setTimeout(step, delay);
    } else {
      currentTokenIndex++;
      currentCharIndex = 0;
      if (currentTokenIndex >= currentLine.length) {
        currentLineIndex++;
        currentTokenIndex = 0;
        if (currentLineIndex >= lines.length) {
          setTimeout(resetAndLoop, 4500);
          return;
        }
        setTimeout(step, 120);
      } else {
        setTimeout(step, 30);
      }
    }
  }

  function resetAndLoop() {
    currentLineIndex = 0;
    currentTokenIndex = 0;
    currentCharIndex = 0;
    step();
  }

  step();
}

/* 9. Hero Title Typewriter Animation ("Hi, I'm Venkat Praveen") */
function initHeroTitleTypingAnimation() {
  const greetingEl = document.querySelector('.hero-greeting-text');
  const nameEl = document.querySelector('.hero-name-text');
  if (!greetingEl || !nameEl) return;

  const greetingText = "Hi, I'm";
  const nameText = "Venkat Praveen";

  let greetingCharIndex = 0;
  let nameCharIndex = 0;

  greetingEl.textContent = '';
  nameEl.textContent = '';

  function typeGreeting() {
    if (greetingCharIndex < greetingText.length) {
      greetingCharIndex++;
      greetingEl.textContent = greetingText.substring(0, greetingCharIndex);
      setTimeout(typeGreeting, 70);
    } else {
      setTimeout(typeName, 150);
    }
  }

  function typeName() {
    if (nameCharIndex < nameText.length) {
      nameCharIndex++;
      nameEl.textContent = nameText.substring(0, nameCharIndex);
      setTimeout(typeName, 85);
    }
  }

  typeGreeting();
}
