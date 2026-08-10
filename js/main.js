/**
 * VENKAT PRAVEEN PORTFOLIO - VANILLA JAVASCRIPT SYSTEM 2026
 * Handcrafted for high performance, interactive case studies, custom cursor, and smooth animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  initPageLoader();
  initScrollProgress();
  initCustomCursor();
  initNavbar();
  initMobileMenu();
  initIntersectionObserver();
  initCaseStudyModal();
  initContactForm();
  initSmoothScroll();
  initCodeTypingAnimation();
  initHeroTitleTypingAnimation();
  initFlowgenDiagram();
  initTimelineProgress();
  initBackToTop();
});

/* 1. Initial Page Loader */
function initPageLoader() {
  const loader = document.getElementById('initialLoader');
  if (!loader) return;

  setTimeout(() => {
    loader.classList.add('loaded');
  }, 1100);
}

/* 2. Top Scroll Progress Indicator */
function initScrollProgress() {
  const progressBar = document.getElementById('scrollProgress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;
    const progress = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = `${progress}%`;
  });
}

/* 3. Desktop Custom Dual Cursor */
function initCustomCursor() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  });

  function renderCursorRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    requestAnimationFrame(renderCursorRing);
  }

  requestAnimationFrame(renderCursorRing);

  // Hover Effect for interactive elements
  const hoverables = document.querySelectorAll('a, button, input, textarea, select, .project-card, .service-card, .skill-category-card, .blog-card');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('active'));
    el.addEventListener('mouseleave', () => ring.classList.remove('active'));
  });
}

/* 4. Sticky Floating Navbar Shrink & Active Section Highlighting */
function initNavbar() {
  const navbar = document.getElementById('mainNavbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('nav-scrolled');
    } else {
      navbar.classList.remove('nav-scrolled');
    }

    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
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

/* 5. Mobile Popout Drawer Menu */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const overlay = document.querySelector('.sidebar-overlay');

  if (!toggleBtn || !navMenu) return;

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

  toggleBtn.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (overlay) overlay.addEventListener('click', closeMenu);
  navLinks.forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) closeMenu();
  });
}

/* 6. Intersection Observer for Scroll Reveal Animations */
function initIntersectionObserver() {
  const fadeElements = document.querySelectorAll('.fade-in-up');
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
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

/* 7. Detailed Case Study Modal Data & Interactive Renderer */
const caseStudiesData = {
  toxicity_detector: {
    title: 'Social Media Abuse & Toxicity Detector',
    category: 'AI / Natural Language Processing',
    problem: 'Online platforms suffer from massive spam, hate speech, and abusive text that manual content moderation cannot handle in real-time.',
    solution: 'Engineered a fine-tuned Natural Language Processing pipeline using Hugging Face transformer models and FastAPI endpoints to detect toxic comments with high accuracy.',
    keyDeliverables: [
      'Multi-class toxicity classification (Toxicity, Insult, Identity Attack)',
      'FastAPI low-latency inference endpoint (<150ms)',
      'Interactive moderation dashboard for real-time flagging',
      'PyTorch model fine-tuning pipeline on custom text datasets'
    ],
    metrics: [
      { val: '94%+', lbl: 'Classification Accuracy' },
      { val: '<150ms', lbl: 'API Response Time' },
      { val: '100k+', lbl: 'Comments Filtered' }
    ],
    tech: ['Python', 'FastAPI', 'Hugging Face', 'NLP', 'PyTorch', 'JavaScript']
  },
  victory_vault: {
    title: 'Victory Vault — Gaming Tournament Platform',
    category: 'Full Stack Web Application',
    problem: 'Esports organizers waste hours manually managing player registrations, bracket progression, match schedules, and prize allocations.',
    solution: 'Built an automated gaming tournament management suite with dynamic bracket generation, team rosters, real-time match results, and MongoDB database syncing.',
    keyDeliverables: [
      'Automated single & double elimination bracket generator',
      'Player registration & team roster management system',
      'Real-time match scoring and tournament leaderboard',
      'Responsive React/Vite web interface'
    ],
    metrics: [
      { val: '80%', lbl: 'Faster Tournament Setup' },
      { val: '500+', lbl: 'Active Gamers Onboarded' },
      { val: '100%', lbl: 'Automated Brackets' }
    ],
    tech: ['JavaScript', 'HTML5', 'CSS3', 'React/Vite', 'MongoDB']
  },
  ai_agent: {
    title: 'Context-Aware AI Conversational Agent',
    category: 'Artificial Intelligence',
    problem: 'Generic chatbots lack context awareness, leading to disjointed responses and inability to handle complex multi-turn user intent.',
    solution: 'Designed an intelligent conversational agent leveraging Google Gemini API, Hugging Face embeddings, and vector RAG retrieval to provide human-like domain answers.',
    keyDeliverables: [
      'Multi-turn context memory window management',
      'Vector database RAG pipeline for custom knowledge bases',
      'FastAPI asynchronous streaming response handler',
      'Safety guardrails and fallback mechanisms'
    ],
    metrics: [
      { val: '<500ms', lbl: 'Average Latency' },
      { val: '98%', lbl: 'Context Accuracy' },
      { val: '24/7', lbl: 'Autonomous Uptime' }
    ],
    tech: ['Python', 'NLP', 'AI', 'FastAPI', 'Hugging Face', 'Gemini API']
  },
  hostel_system: {
    title: 'Hostel Management System',
    category: 'Enterprise Management System',
    problem: 'University hostels rely on manual paper logs for room allocation, rent fee collection tracking, and maintenance tickets, leading to lost records.',
    solution: 'Created a centralized web application featuring an interactive room allocation matrix, automated fee payment tracking, student passes, and admin complaint workflows.',
    keyDeliverables: [
      'Interactive room availability matrix and student assignment',
      'Fee payment status log and automated receipt generation',
      'Maintenance ticket submission and resolution pipeline',
      'Admin analytics dashboard for occupancy metrics'
    ],
    metrics: [
      { val: '95%', lbl: 'Occupancy Tracking' },
      { val: '0', lbl: 'Lost Records' },
      { val: '24 hrs', lbl: 'Avg Ticket Resolution' }
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'FastAPI', 'SQLite']
  },
  realtime_quiz: {
    title: 'Real-Time Quiz System',
    category: 'Full Stack Web Application',
    problem: 'Educational testing platforms require synchronized real-time countdown timers, randomized question banks, and instantaneous result processing.',
    solution: 'Engineered a Flask-backed online testing system with server-side time enforcement, PostgreSQL database storage, and immediate student score analytics.',
    keyDeliverables: [
      'Server-side enforced countdown timer preventing local browser bypass',
      'Randomized question bank distribution engine',
      'PostgreSQL data schema for storing user score histories',
      'Responsive student quiz interface'
    ],
    metrics: [
      { val: '100%', lbl: 'Timer Integrity' },
      { val: '<100ms', lbl: 'Score Calculation' },
      { val: '1,000+', lbl: 'Quiz Sessions Completed' }
    ],
    tech: ['Python', 'Flask', 'PostgreSQL', 'HTML5', 'CSS3', 'JavaScript']
  },
  whatsapp_automation: {
    title: 'WhatsApp Business Automation System',
    category: 'Business Workflow Automation',
    problem: 'Local businesses lose prospective sales leads due to delayed manual responses outside working hours.',
    solution: 'Constructed an n8n automated workflow triggered by incoming WhatsApp messages, auto-qualifying inbound leads with AI and syncing records into Supabase CRM.',
    keyDeliverables: [
      'Instant automated WhatsApp response triggers (<5s)',
      'AI lead qualification and intent tagging',
      'Supabase database CRM record synchronization',
      'Seamless handoff to human support representatives'
    ],
    metrics: [
      { val: '<5s', lbl: 'Lead Response Time' },
      { val: '+180%', lbl: 'Qualified Lead Capture' },
      { val: '24/7', lbl: 'Automated Operations' }
    ],
    tech: ['n8n', 'WhatsApp API', 'Automation', 'AI', 'Supabase']
  }
};

function initCaseStudyModal() {
  const modalOverlay = document.querySelector('.modal-overlay');
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
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) closeModal();
  });
}

function renderModalContent(data) {
  const modalTitle = document.querySelector('.modal-title');
  const modalBody = document.querySelector('.modal-body');

  modalTitle.textContent = data.title;
  
  const techBadgesHtml = data.tech.map(t => `<span class="tech-badge">${t}</span>`).join(' ');
  const deliverablesHtml = data.keyDeliverables.map(item => `<li><i class="fas fa-check-circle" style="color: var(--color-accent-blue); margin-right: 8px;"></i>${item}</li>`).join('');
  const metricsHtml = data.metrics.map(m => `
    <div class="modal-metric-card">
      <div class="modal-metric-val">${m.val}</div>
      <div class="modal-metric-lbl">${m.lbl}</div>
    </div>
  `).join('');

  modalBody.innerHTML = `
    <div style="color: var(--color-accent-blue); font-weight: 800; font-size: 0.85rem; margin-bottom: 8px;">${data.category}</div>
    <div class="project-tech-badges" style="margin-bottom: 16px;">${techBadgesHtml}</div>
    
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
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; font-size: 0.92rem; color: var(--color-text-muted);">
        ${deliverablesHtml}
      </ul>
    </div>

    <div>
      <h4 class="modal-section-title">Measured Results</h4>
      <div class="modal-metrics-grid">
        ${metricsHtml}
      </div>
    </div>
  `;
}

/* 8. Contact Form Handling & Toast Feedback */
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

    toast.style.display = 'block';
    toast.textContent = `Thank you, ${name}! Your inquiry has been sent successfully. I will get back to you within 24 hours.`;

    form.reset();

    setTimeout(() => {
      toast.style.display = 'none';
    }, 5000);
  });
}

/* 9. Smooth Scroll for Links */
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

/* 10. Code Editor Typing Letter Animation */
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
      { text: '"Flowgen AI"', class: "c-str" },
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

/* 11. Hero Title Typewriter ("Hi, I'm Venkat Praveen") */
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

/* 12. Flowgen Diagram Interactive Step Highlight */
function initFlowgenDiagram() {
  const nodes = document.querySelectorAll('.diagram-node');
  if (!nodes.length) return;

  let activeIndex = 0;
  setInterval(() => {
    nodes.forEach(n => n.classList.remove('active'));
    nodes[activeIndex].classList.add('active');
    activeIndex = (activeIndex + 1) % nodes.length;
  }, 1800);
}

/* 13. Timeline Progress Line Animation */
function initTimelineProgress() {
  const timelineSection = document.querySelector('.journey-section');
  const line = document.getElementById('timelineLine');
  if (!timelineSection || !line) return;

  window.addEventListener('scroll', () => {
    const rect = timelineSection.getBoundingClientRect();
    const sectionHeight = timelineSection.offsetHeight;
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      const scrolled = windowHeight - rect.top;
      const percent = Math.min(Math.max((scrolled / (sectionHeight + windowHeight * 0.5)) * 100, 0), 100);
      
      let fill = line.querySelector('.timeline-line-fill');
      if (!fill) {
        fill = document.createElement('div');
        fill.className = 'timeline-line-fill';
        line.appendChild(fill);
      }
      fill.style.height = `${percent}%`;
    }
  });
}

/* 14. Floating Back to Top Button */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
