/**
 * VENKAT PRAVEEN PORTFOLIO - VANILLA JAVASCRIPT SYSTEM 2026
 * Handcrafted for high performance, interactive case studies, article popups, custom cursor, and smooth animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  initPageLoader();
  initScrollProgress();
  initCustomCursor();
  initNavbar();
  initMobileMenu();
  initIntersectionObserver();
  initCaseStudyModal();
  initArticleModal();
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

/* 8. TechPlus Articles Data & Interactive Article Reader Modal */
const articlesData = {
  article_1: {
    title: 'Building AI Applications with Python',
    badge: 'TechPlus Article • AI Engineering',
    readTime: '6 min read',
    author: 'Venkat Praveen',
    role: 'Founder @ Flowgen',
    date: 'September 2026',
    img: 'images/article_ai_python.svg',
    overview: 'Modern AI applications require more than just passing prompts to an API. Building production-grade AI systems requires asynchronous model inference, vector database RAG architectures, and multi-tier fallback safety guards.',
    sections: [
      {
        heading: '1. Asynchronous Model Inference with FastAPI',
        text: 'Synchronous blocking calls to large language models or NLP transformers can bring web servers to a crawl. By leveraging FastAPI’s async endpoints and background task queues, long-running model evaluations execute cleanly without blocking incoming HTTP connections.'
      },
      {
        heading: '2. Vector Database Caching & Retrieval',
        text: 'Re-evaluating identical semantic queries on LLM endpoints adds unnecessary latency and cloud costs. Implementing vector similarity search with embeddings allows retrieving pre-computed responses for semantically equivalent user inputs in under 20ms.'
      },
      {
        heading: '3. Production Fallbacks & Guardrails',
        text: 'Inference pipelines should never fail silently. Implementing strict response validation schemas, output token limits, and secondary fallback models ensures 99.9% application uptime.'
      }
    ],
    takeaways: [
      'Isolate AI model processing from primary HTTP worker loops',
      'Leverage vector search caching for sub-50ms intent retrieval',
      'Enforce strict input/output schemas for zero-trust data safety'
    ]
  },
  article_2: {
    title: 'How WhatsApp Automation Can Transform Small Businesses',
    badge: 'TechPlus Article • Business Automation',
    readTime: '5 min read',
    author: 'Venkat Praveen',
    role: 'Founder @ Flowgen',
    date: 'August 2026',
    img: 'images/article_whatsapp_automation.svg',
    overview: 'Local businesses lose up to 60% of potential customer leads due to delayed manual replies outside standard office hours. WhatsApp automation changes the game by responding instantly 24/7.',
    sections: [
      {
        heading: '1. The 5-Minute Lead Conversion Rule',
        text: 'Studies show that contacting an inbound lead within 5 minutes increases conversion probability by 391%. Automated WhatsApp webhook triggers ensure every customer inquiry receives a helpful reply in under 5 seconds.'
      },
      {
        heading: '2. Autonomous n8n Lead Qualification Workflows',
        text: 'Instead of spending manual staff hours collecting basic details, n8n workflows ask qualifying questions (budget, project type, timeline) and sync structured answers directly into Supabase CRM.'
      },
      {
        heading: '3. Seamless Human Agent Handoff',
        text: 'When a lead indicates high intent or requests a phone call, the automated bot immediately notifies staff via real-time alerts for live agent intervention.'
      }
    ],
    takeaways: [
      'Sub-5s WhatsApp responses capture buyer intent instantly',
      'Automated qualification saves 15+ hours of weekly manual work',
      'Direct Supabase CRM syncing eliminates lost customer records'
    ]
  },
  article_3: {
    title: 'Understanding NLP in Real-World Applications',
    badge: 'TechPlus Article • Natural Language Processing',
    readTime: '8 min read',
    author: 'Venkat Praveen',
    role: 'Founder @ Flowgen',
    date: 'August 2026',
    img: 'images/article_nlp_apps.svg',
    overview: 'Natural Language Processing powers modern moderation, intent detection, and content recommendation engines. Here is an inside look at fine-tuning NLP transformer models on noisy social text.',
    sections: [
      {
        heading: '1. Preprocessing Noisy Social Media Text',
        text: 'Real-world social media text is filled with intentional typos, slang, code-mixing, and emojis. Subword tokenization (Byte-Pair Encoding) allows transformer models to process unseen vocabulary without falling back to unknown token errors.'
      },
      {
        heading: '2. Multi-Class PyTorch Classification Heads',
        text: 'Standard binary classifiers miss nuance. By engineering multi-label classification heads on top of Hugging Face transformers, a single inference pass can score toxicity, severe toxicity, insults, and identity attacks simultaneously.'
      },
      {
        heading: '3. Threshold Optimization for Low False Positives',
        text: 'In production content moderation, false positives frustrate users while false negatives undermine safety. Precision-recall threshold tuning balances detection accuracy with user experience.'
      }
    ],
    takeaways: [
      'Subword tokenizers handle informal internet slang gracefully',
      'Multi-label heads evaluate multiple abuse dimensions in 1 pass',
      'PR curve thresholding prevents aggressive false positive flags'
    ]
  },
  article_4: {
    title: 'From Student Developer to AI Engineer',
    badge: 'TechPlus Article • Career & Engineering',
    readTime: '7 min read',
    author: 'Venkat Praveen',
    role: 'Founder @ Flowgen',
    date: 'July 2026',
    img: 'images/article_student_to_ai.svg',
    overview: 'Transitioning from academic computer science projects to production AI engineering requires shifting from script writing to building resilient, scalable software systems.',
    sections: [
      {
        heading: '1. Beyond Code: System Architecture & Reliability',
        text: 'Academic projects evaluate code by correctness on test cases. Production engineering evaluates systems by reliability under load, database normalization, Docker containerization, and zero downtime.'
      },
      {
        heading: '2. Building Real-World Systems that Solve Problems',
        text: 'Instead of building generic tutorial apps, focus on building end-to-end products that address operational friction—such as hostel matrices, gaming tournament brackets, or automated lead capture.'
      },
      {
        heading: '3. The Entrepreneurial Advantage',
        text: 'Founding Flowgen forced a key perspective shift: code is a tool to create business value. Understanding client goals makes you a significantly better engineer.'
      }
    ],
    takeaways: [
      'Prioritize modular design, API docs, and Docker containerization',
      'Build end-to-end software solving concrete operational bottlenecks',
      'Focus on business impact and client outcome over theoretical code'
    ]
  },
  article_5: {
    title: 'How Businesses Can Automate Lead Follow-Ups',
    badge: 'TechPlus Article • Lead Generation & CRM',
    readTime: '5 min read',
    author: 'Venkat Praveen',
    role: 'Founder @ Flowgen',
    date: 'June 2026',
    img: 'images/article_lead_automation.svg',
    overview: 'Single contact attempts result in lost revenue. Implementing automated 24/7 follow-up sequences transforms cold website visitors into warm business clients.',
    sections: [
      {
        heading: '1. Multi-Channel Follow-Up Architecture',
        text: 'Relying solely on email follow-ups yields a low 15% open rate. Combining automated WhatsApp messages with email reminders increases client engagement to over 85%.'
      },
      {
        heading: '2. Dynamic Lead Scoring & Intent Tagging',
        text: 'Webhooks trigger n8n workflows that calculate a lead score based on project type, timeline urgency, and budget, prioritizing high-value prospects for priority outreach.'
      },
      {
        heading: '3. Automated Reminder Triggers',
        text: 'Scheduled background triggers automatically send polite follow-ups at 24 hours, 48 hours, and 5 days, ensuring no prospect falls through the cracks.'
      }
    ],
    takeaways: [
      'Multi-channel WhatsApp + Email follow-ups achieve 85%+ open rates',
      'n8n lead scoring prioritizes high-budget client inquiries',
      'Automated drip sequences guarantee 100% follow-up execution'
    ]
  }
};

function initArticleModal() {
  const modalOverlay = document.querySelector('.modal-overlay');
  const articleBtns = document.querySelectorAll('.btn-read-article');

  if (!modalOverlay || !articleBtns.length) return;

  articleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const articleId = btn.getAttribute('data-article');
      const article = articlesData[articleId];

      if (article) {
        renderArticleModalContent(article);
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });
}

function renderArticleModalContent(article) {
  const modalTitle = document.querySelector('.modal-title');
  const modalBody = document.querySelector('.modal-body');

  modalTitle.textContent = article.title;

  const sectionsHtml = article.sections.map(s => `
    <div style="margin-bottom: 20px;">
      <h4 class="modal-section-title" style="color: var(--color-text); font-size: 1.05rem; margin-bottom: 8px;">${s.heading}</h4>
      <p class="modal-text" style="color: var(--color-text-muted); line-height: 1.65; font-size: 0.93rem;">${s.text}</p>
    </div>
  `).join('');

  const takeawaysHtml = article.takeaways.map(t => `
    <li style="display: flex; align-items: flex-start; gap: 10px; font-size: 0.9rem; color: var(--color-text); font-weight: 600;">
      <i class="fas fa-check-circle" style="color: var(--color-accent-blue); margin-top: 3px;"></i>
      <span>${t}</span>
    </li>
  `).join('');

  modalBody.innerHTML = `
    <img src="${article.img}" alt="${article.title}" class="modal-article-banner">

    <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; margin-bottom: 14px;">
      <span class="project-category-badge" style="font-size: 0.8rem;">${article.badge}</span>
      <span style="font-size: 0.82rem; font-weight: 700; color: var(--color-text-muted);"><i class="far fa-clock" style="margin-right: 4px;"></i> ${article.readTime}</span>
    </div>

    <div style="font-size: 0.85rem; font-weight: 700; color: var(--color-accent-blue-dark); margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid var(--color-border); display: flex; align-items: center; justify-content: space-between;">
      <span><i class="fas fa-user-edit" style="color: var(--color-accent-blue); margin-right: 6px;"></i> By <strong>${article.author}</strong> (${article.role})</span>
      <span style="color: var(--color-text-muted); font-weight: 600;">${article.date}</span>
    </div>

    <div style="background-color: rgba(37, 99, 235, 0.06); border-left: 4px solid var(--color-accent-blue); padding: 18px; border-radius: var(--radius-sm); margin-bottom: 24px;">
      <p style="font-size: 0.96rem; font-weight: 600; color: var(--color-text); line-height: 1.65; margin: 0; font-style: italic;">
        "${article.overview}"
      </p>
    </div>

    ${sectionsHtml}

    <div style="background-color: var(--surface-soft); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 20px; margin-top: 28px;">
      <h4 class="modal-section-title" style="margin-top: 0; font-size: 1rem; margin-bottom: 14px;"><i class="fas fa-lightbulb" style="color: var(--color-accent-blue); margin-right: 8px;"></i> Key Engineering Takeaways</h4>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 10px; margin: 0; padding: 0;">
        ${takeawaysHtml}
      </ul>
    </div>
  `;
}

/* 9. Contact Form Handling & Toast Feedback */
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

/* 10. Smooth Scroll for Links */
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

/* 11. Code Editor Typing Letter Animation */
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

/* 12. Hero Title Typewriter ("Hi, I'm Venkat Praveen") */
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

/* 13. Flowgen Diagram Interactive Step Highlight */
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

/* 14. Timeline Progress Line Animation */
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

/* 15. Floating Back to Top Button */
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
