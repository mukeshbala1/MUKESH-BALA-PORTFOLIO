/* ================================================================
   MUKESH BALA PORTFOLIO — app.js
   ✅ Loader animation
   ✅ Custom cursor (magnetic)
   ✅ Nav scroll effect + mobile menu
   ✅ Counter animation
   ✅ Project modal
   ✅ 3D Carousel with momentum
   ✅ Cert popup modal
   ✅ Real email via Web3Forms (mukeshbala95133@gmail.com)
   ✅ Scroll reveal
   ✅ Mobile swipe carousel for certs
   ================================================================ */

/* ────────────────────────────────────────
   WEB3FORMS KEY
   ──────────────────────────────────────── */
const WEB3_KEY = 'e93cc678-22dd-4225-be9c-2eb79df19736';


/* ════════════════════════════════════════
   THEME CONTROLLER (Dark & Light Mode)
════════════════════════════════════════ */
(function initTheme() {
  function getActiveTheme() {
    return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function setTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {}

    const label = document.querySelector('.mm-theme-btn .theme-label');
    if (label) {
      label.textContent = theme === 'light' ? 'Dark Mode' : 'Light Mode';
    }
  }

  // Restore saved preference
  try {
    const saved = localStorage.getItem('theme');
    if (saved) setTheme(saved);
  } catch (e) {}

  function bindThemeButtons() {
    const toggles = document.querySelectorAll('#themeToggle, #mmThemeToggle');
    toggles.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const current = getActiveTheme();
        setTheme(current === 'light' ? 'dark' : 'light');
      });
    });

    const label = document.querySelector('.mm-theme-btn .theme-label');
    if (label) {
      label.textContent = getActiveTheme() === 'light' ? 'Dark Mode' : 'Light Mode';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindThemeButtons);
  } else {
    bindThemeButtons();
  }
})();


/* ════════════════════════════════════════
   1. LOADER
════════════════════════════════════════ */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  const fill   = document.getElementById('loaderFill');
  if (!loader || !fill) return;

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 18 + 8;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('hidden');
        document.querySelectorAll('.reveal-line').forEach(el => {
          el.style.animationPlayState = 'running';
        });
      }, 300);
    }
    fill.style.width = progress + '%';
  }, 90);
});


/* ════════════════════════════════════════
   2. CUSTOM CURSOR
════════════════════════════════════════ */
(function() {
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;

  let fx = 0, fy = 0;
  let cx = 0, cy = 0;

  document.addEventListener('mousemove', (e) => {
    cx = e.clientX; cy = e.clientY;
    cursor.style.left = cx + 'px';
    cursor.style.top  = cy + 'px';
  });

  function animFollower() {
    fx += (cx - fx) * 0.1;
    fy += (cy - fy) * 0.1;
    follower.style.left = fx + 'px';
    follower.style.top  = fy + 'px';
    requestAnimationFrame(animFollower);
  }
  animFollower();

  document.querySelectorAll('a, button, .work-item, .pg-card, .fbtn, .gc, .cf-submit, .social-pill, .nav-cta').forEach(el => {
    el.addEventListener('mouseenter', () => {
      follower.style.width  = '60px';
      follower.style.height = '60px';
      follower.style.borderColor = 'rgba(212,168,83,0.8)';
      follower.style.background  = 'rgba(212,168,83,0.06)';
    });
    el.addEventListener('mouseleave', () => {
      follower.style.width  = '38px';
      follower.style.height = '38px';
      follower.style.borderColor = 'rgba(212,168,83,0.5)';
      follower.style.background  = 'transparent';
    });
  });
})();


/* ════════════════════════════════════════
   3. NAV SCROLL + MOBILE MENU
════════════════════════════════════════ */
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  if (!nav) return;
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

const navToggle  = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

function closeMobileMenu() {
  if (mobileMenu) mobileMenu.classList.remove('open');
  if (navToggle) {
    navToggle.querySelectorAll('span').forEach((s,i) => {
      s.style.transform  = 'none';
      s.style.opacity    = '1';
      s.style.marginTop  = '';
    });
  }
}

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = mobileMenu && mobileMenu.classList.toggle('open');
    const spans  = navToggle.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
      spans[1].style.transform = 'translateY(-6.5px) rotate(-45deg)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.transform = 'none';
    }
  });
}

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* ════════════════════════════════════════
   4. COUNTER ANIMATION
════════════════════════════════════════ */
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el     = entry.target;
      const target = parseInt(el.dataset.count);
      animateCounter(el, target);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-n').forEach(el => counterObserver.observe(el));


/* ════════════════════════════════════════
   5. SCROLL REVEAL
════════════════════════════════════════ */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.07 });

document.querySelectorAll('.work-item, .cil-item, .focus-item, .tech-stack span, .about-body').forEach((el, i) => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(22px)';
  el.style.transition = `opacity 0.55s ease ${i * 0.05}s, transform 0.55s ease ${i * 0.05}s`;
  revealObs.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.textContent = '.visible { opacity:1 !important; transform:translateY(0) !important; }';
  document.head.appendChild(style);
});


/* ════════════════════════════════════════
   6. PROJECT MODAL
════════════════════════════════════════ */
const projectData = {
  cart: {
    tag:   'Full Stack',
    title: 'E-Commerce in Java',
    short: 'MVC-based full-stack e-commerce web application.',
    long:  'Built using Advanced Java (Servlets & JSP) following MVC architecture. Modules include user authentication, product management, shopping cart, order processing, and MySQL-backed persistent storage.',
    tech:  ['Java','Servlet','JSP','MySQL','HTML','CSS','JavaScript','MVC'],
    link:  'https://github.com/mukeshbala1/E-commerce.git'
  },
  crop: {
    tag:   'Web App',
    title: 'SMART-KISHAN WebApp',
    short: 'Full-stack smart agriculture platform for farmers.',
    long:  'Helps farmers manage crop information, get real-time insights, and access farming tools. Built with HTML, CSS, JavaScript frontend and Node.js + MongoDB backend for data management.',
    tech:  ['HTML','CSS','JavaScript','Node.js','MongoDB','Express'],
    link:  'https://github.com/mukeshbala1/SMART-KISHAN.git'
  },
  car: {
    tag:   'Machine Learning',
    title: 'Car Price Predictor',
    short: 'Regression ML model estimating used car prices.',
    long:  'Preprocessed and cleaned CSV datasets, trained regression model using scikit-learn in Python, and serialized with Pickle for seamless web deployment integration.',
    tech:  ['Python','Scikit-learn','Pandas','Flask','Pickle','CSV'],
    link:  'https://github.com/mukeshbala1/Car-Price-Predictor.git'
  },
  // farm: {
  //   tag:   'AI / ML',
  //   title: 'Crop Recommendation System',
  //   short: 'ML system recommending optimal crops from soil data.',
  //   long:  'Analyzes soil and environmental parameters — N, P, K, temperature, humidity, pH, rainfall — and recommends the most suitable crop. Includes a responsive web frontend for ease of use by farmers.',
  //   tech:  ['Python','Scikit-learn','Flask','HTML','CSS','ML'],
  //   link:  'https://github.com/mukeshbala1/crop-recommendation-app.git'
  // },
  medical: {
    tag:   'AI / ML',
    title: 'AI-Patient-Flow',
    short: 'AI-powered patient flow optimization system.',
    long:  'Predicts patient volumes and suggests optimal resource allocation to reduce hospital wait times and improve operational efficiency using data-driven AI decision making.',
    tech:  ['Python','AI','Flask','Data Analysis','Healthcare Analytics'],
    link:  'https://github.com/mukeshbala1/AI-PATIENT-FLOW.git'
  },
  portfolio: {
    tag:   'Mukesh Bala Portfolio',
    title: 'My Portfolio Website',
    short: 'Responsive personal portfolio website.',
    long:  'Personal portfolio showcasing projects, skills, achievements, and contact info with smooth animations and modern UI.',
    tech:  ['HTML','CSS','JavaScript'],
    link:  'https://github.com/mukeshbala1/portfolio_by_mukesh.git'
  },
  // amazon: {
  //   tag:   'Amazon ML Challenge',
  //   title: 'Amazon Product Recommendation System',
  //   short: 'ML model for Amazon product recommendation engine.',
  //   long:  'Developed a machine learning recommendation system for Amazon products using collaborative filtering and deep learning techniques. The model analyzes user behavior and product attributes to suggest relevant products.',
  //   tech:  ['Python','TensorFlow','Pandas','Scikit-learn','Data Analysis'],
  //   link:  'https://github.com/mukeshbala1/AMAZON-PROJECT.git'
  // },
  cartify: {
    tag:   'E-Commerce Project',
    title: 'Cartify – E-Commerce Platform',
    short: 'Full-stack e-commerce web application.',
    long:  'Cartify is a full-stack e-commerce web application where users can browse products, add items to cart, manage orders, and authenticate securely. Built with modern technologies to provide a smooth and responsive online shopping experience.',
    tech:  ['React','Node.js','Express','MongoDB','JWT'],
    link:  'https://cartify-sigma.vercel.app'
  },
  cyraAnalytics: {
    tag:   'Analytics',
    title: 'Report Analytics Dashboard',
    short: 'Interactive data analytics and reporting dashboard.',
    long:  'Comprehensive analytics platform with real-time charts, filterable data tables, and exportable reports. Designed for business intelligence and informed decision-making support.',
    tech:  ['Python','Flask','Chart.js','MySQL','Data Visualization'],
    link:  'https://github.com/mukeshbala1/Cyra-Analytics.git'
  },
  mukeshPortfolio: {
  tag:   'Portfolio',
  title: 'Mukesh Bala Portfolio',
  short: 'This portfolio — dark luxury editorial design.',
  long:  'Built from scratch with pure HTML, CSS & JavaScript. Features custom cursor, loader animation, 3D rotating certification carousel, project modals, real email via Web3Forms, scroll reveal animations, and a fully responsive layout.',
  tech:  ['HTML','CSS','JavaScript','Web3Forms','3D CSS Transforms'],
  link:  'https://github.com/mukeshbala1/MUKESH-BALA-PORTFOLIO.git' 
},
  auctionArena: {
  tag:   'Live Multiplayer',
  title: 'Auction Arena Platform',
  short: 'Real-time sports auction platform with live bidding.',
  long:  'A full-stack multiplayer sports auction platform (IPL, Kabaddi, Football). Features include live socket-based bidding, synchronized server-side timers to prevent desync, a female AI voice announcer for live bids, smart purse/overseas cap enforcement, and Gemini AI-powered post-auction squad analysis with Excel export.',
  tech:  ['React', 'Node.js', 'Socket.io', 'Supabase', 'Tailwind CSS'],
  link:  'https://auctionarena.org' 
},
  matrimonyApp: {
  tag:   'Full-Stack App',
  title: 'Matrimony Matchmaking App',
  short: 'A comprehensive matchmaking platform featuring real-time online chat and connection interest-sending.',
  long:  'A fully-featured matchmaking application designed for seamless partner discovery. Features include dynamic user profiles, a dedicated online chat system for direct communication, the ability to send and receive connection "interests", and activity tracking. The modular backend is powered by Node.js with Cloudinary for robust media management, while the responsive frontend is custom-built with pure HTML, CSS, and JavaScript.',
  tech:  ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Cloudinary', 'RESTful APIs'],
  link:  'https://matrimony-app-beryl.vercel.app' 
},
  kavach: {
    tag:   'IoT & RF Security',
    title: 'KAVACH – RF Network Monitor & Intrusion Detection',
    short: 'End-to-end IoT & Mobile RF spectrum monitor & rogue signal detector for 2.4 GHz ISM band.',
    long:  'KAVACH is an end-to-end IoT and Mobile RF Network Monitoring & Intrusion Detection System engineered to continuously scan, analyze, and detect unauthorized or rogue radio frequency transmissions across the 2.4 GHz ISM band (2.400 GHz to 2.525 GHz). An ESP32 edge microcontroller sweeps 126 RF channels via an NRF24L01+ transceiver, measures carrier presence and RSSI, and renders live connection metrics on an SSD1306 OLED screen. Real-time telemetry is streamed via secure REST APIs to Google Firebase Realtime Database and synchronized with a native Android dashboard featuring custom Canvas time-series dBm signal charts, a 45-bar dynamic spectrum visualizer, a 15-second heartbeat watchdog, and automated threat classification.',
    tech:  ['ESP32 DevKit v1', 'NRF24L01+ (PA+LNA)', 'C/C++ (Arduino)', 'Android (Java)', 'Firebase Realtime DB', 'SSD1306 OLED', 'SPI / I2C', 'Material 3', 'REST API'],
    link:  'https://github.com/mukeshbala1/Network-monitor'
  }
};

const pModalOverlay = document.getElementById('pModalOverlay');
const pModal        = document.getElementById('pModal');
const pModalClose   = document.getElementById('pModalClose');

function openProjectModal(p) {
  if (!p || !pModalOverlay) return;

  const pmTag   = document.getElementById('pmTag');
  const pmTitle = document.getElementById('pmTitle');
  const pmShort = document.getElementById('pmShort');
  const pmLong  = document.getElementById('pmLong');
  const pmLink  = document.getElementById('pmLink');
  const techEl  = document.getElementById('pmTech');

  if (pmTag)   pmTag.textContent   = p.tag;
  if (pmTitle) pmTitle.textContent = p.title;
  if (pmShort) pmShort.textContent = p.short;
  if (pmLong)  pmLong.textContent  = p.long;

  if (pmLink && p.link) {
    pmLink.href = p.link;
    const isGh = p.link.includes('github.com');
    pmLink.innerHTML = isGh
      ? '<i class="fab fa-github"></i> View on GitHub'
      : '<i class="fas fa-arrow-up-right-from-square"></i> Visit Live Project';
  }

  if (techEl && p.tech) {
    techEl.innerHTML = p.tech.map(t => `<span>${t}</span>`).join('');
  }

  pModalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

document.querySelectorAll('.work-item, .pg-card').forEach(item => {
  item.addEventListener('click', () => {
    const key = item.dataset.project;
    if (key && projectData[key]) {
      openProjectModal(projectData[key]);
    }
  });
});

if (pModalClose) {
  pModalClose.addEventListener('click', () => {
    pModalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  });
}

if (pModalOverlay) {
  pModalOverlay.addEventListener('click', (e) => {
    if (e.target === pModalOverlay) {
      pModalOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}


/* ════════════════════════════════════════
   7. 3D CAROUSEL (Desktop only)
════════════════════════════════════════ */
(function() {
  const container = document.getElementById('drag-container');
  const pivot     = document.getElementById('pivot');
  if (!container || !pivot) return;

  // Dynamically distribute active cards seamlessly across a 360deg circle with zero gaps
  function setupCarouselGeometry() {
    const cards = Array.from(pivot.querySelectorAll('.gc'));
    const total = cards.length;
    if (total === 0) return;
    const angleStep = 360 / total;
    pivot.style.setProperty('--total-cards', total);
    pivot.style.setProperty('--angle-step', `${angleStep}deg`);
    cards.forEach((card, idx) => {
      card.style.setProperty('--i', idx);
      card.style.transform = `rotateY(${idx * angleStep}deg) translateZ(var(--cr))`;
      card.setAttribute('onclick', `openCertModal(${idx})`);
    });
  }
  setupCarouselGeometry();
  window.addEventListener('resize', setupCarouselGeometry);

  let angle      = 0;
  let isDragging = false;
  let startX     = 0;
  let prevX      = 0;
  let momentum   = 0;
  let autoSpeed  = 0.09;
  let lastTime   = null;
  let rafId;

  function animate(ts) {
    if (!isDragging) {
      if (lastTime !== null) {
        const delta = (ts - lastTime) / 16.67;
        angle   -= (autoSpeed + momentum) * delta;
        momentum *= 0.95;
      }
      lastTime = ts;
      pivot.style.transform = `rotateY(${angle}deg)`;
    }
    rafId = requestAnimationFrame(animate);
  }

  rafId = requestAnimationFrame(animate);

  container.addEventListener('mousedown', e => {
    isDragging = true; startX = e.pageX; prevX = e.pageX;
    momentum = 0; lastTime = null;
    e.preventDefault();
  });

  window.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const dx = e.pageX - startX;
    momentum = (e.pageX - prevX) * 0.12;
    angle   += dx * 0.18;
    prevX    = e.pageX; startX = e.pageX;
    pivot.style.transform = `rotateY(${angle}deg)`;
  });

  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false; lastTime = null;
  });

  container.addEventListener('touchstart', e => {
    isDragging = true;
    startX = prevX = e.touches[0].pageX;
    momentum = 0; lastTime = null;
  }, { passive: true });

  window.addEventListener('touchmove', e => {
    if (!isDragging) return;
    const dx = e.touches[0].pageX - startX;
    momentum = (e.touches[0].pageX - prevX) * 0.12;
    angle   += dx * 0.18;
    prevX    = e.touches[0].pageX; startX = e.touches[0].pageX;
    pivot.style.transform = `rotateY(${angle}deg)`;
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false; lastTime = null;
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { cancelAnimationFrame(rafId); }
    else { lastTime = null; rafId = requestAnimationFrame(animate); }
  });
})();


/* ════════════════════════════════════════
   8. CERT MODAL DATA + LOGIC
════════════════════════════════════════ */
const certsData = [
  { category:'WEB DEVELOPMENT', title:'React Portfolio Bootcamp', provider:'DevTown × Microsoft Student Chapter', color:'#c084fc',
    description:'Completed hands-on bootcamp building portfolio projects using React, modern UI practices, and component-based architecture.',
    technologies:['React','JavaScript','HTML','CSS'], linkedinUrl:'https://www.linkedin.com/posts/activity-7331945250313175041-5jTI?utm_source=share&utm_medium=member_desktop&rcm=ACoAADnzwmEBlPSGS1jS2pZ2OA4hy6uQAA6S4wE' },

  { category:'HACKATHON', title:'Smart India Hackathon', provider:'GIET University', color:'#60a5fa',
    description:'Shortlisted among 40+ teams in the SIH Internal Round. Built innovative solutions, demonstrated strong problem-solving and teamwork under competitive conditions.',
    technologies:['Innovation','Teamwork','Problem Solving'], linkedinUrl:'https://www.linkedin.com/posts/sweta-panda-220920294_hackathon-teamwork-innovation-ugcPost-7236796244428218368-7nnq?utm_source=share&utm_medium=member_desktop&rcm=ACoAADnzwmEBlPSGS1jS2pZ2OA4hy6uQAA6S4wE' },

  { category:'PROGRAMMING', title:'C++ and SQL Certification', provider:'Data Infotech Computer Education', color:'#f87171',
    description:'Completed certification covering core C++ programming concepts and SQL database fundamentals including queries, joins, and schema design.',
    technologies:['C++','SQL','OOP','Database Design'], linkedinUrl:'https://www.linkedin.com/posts/activity-7122228247295135745-GlV5?utm_source=share&utm_medium=member_desktop&rcm=ACoAADnzwmEBlPSGS1jS2pZ2OA4hy6uQAA6S4wE' },

  { category:'CYBER SECURITY', title:'Cyber Security Workshop', provider:'Cyberyaan × GIET University', color:'#38bdf8',
    description:'Attended hands-on workshop covering cyber security fundamentals, threat vectors, network security practices, and defensive strategies.',
    technologies:['Cyber Security','Networking','Threat Analysis','Defense'], linkedinUrl:'https://www.linkedin.com/posts/activity-7122227811792125952-jGjL?utm_source=share&utm_medium=member_desktop&rcm=ACoAADnzwmEBlPSGS1jS2pZ2OA4hy6uQAA6S4wE' },

  { category:'HACKATHON', title:'Hacknovation 2.0 — Participant', provider:'GIET University', color:'#fb923c',
    description:'Participated in Hacknovation 2.0 demonstrating innovation, teamwork, and rapid prototyping skills under time pressure before industry judges.',
    technologies:['Rapid Prototyping','Innovation','Teamwork'], linkedinUrl:'https://www.linkedin.com/posts/activity-7431773475226206208-Sx-m?utm_source=share&utm_medium=member_desktop&rcm=ACoAADnzwmEBlPSGS1jS2pZ2OA4hy6uQAA6S4wE' },

  { category:'AI / CLOUD', title:'Oracle Cloud AI Foundations Associate', provider:'Oracle University', color:'#f97316',
    description:'Earned Oracle certification covering AI fundamentals, machine learning workflows, Oracle Cloud Infrastructure (OCI) basics, and AI service integration.',
    technologies:['AI Fundamentals','OCI','Cloud','Machine Learning','Oracle'], linkedinUrl:'https://www.linkedin.com/posts/activity-7431775945189048321-2C4h?utm_source=share&utm_medium=member_desktop&rcm=ACoAADnzwmEBlPSGS1jS2pZ2OA4hy6uQAA6S4wE' },

  { category:'IOT', title:'Industry 4.0 and Industrial IoT', provider:'NPTEL', color:'#fbbf24',
    description:'Completed IIT-delivered NPTEL course on Industry 4.0, smart manufacturing, cyber-physical systems, and Industrial IoT architecture fundamentals.',
    technologies:['IoT','Industry 4.0','Smart Manufacturing','CPS','Automation'], linkedinUrl:'https://www.linkedin.com/posts/activity-7399921786194407424-qEZu?utm_source=share&utm_medium=member_desktop&rcm=ACoAADnzwmEBlPSGS1jS2pZ2OA4hy6uQAA6S4wE' },

  { category:'PYTHON', title:'The Joy of Computing Using Python', provider:'NPTEL', color:'#4ade80',
    description:'Learned Python fundamentals, computational thinking, and algorithmic problem solving through IIT-delivered NPTEL course with graded programming assignments.',
    technologies:['Python','Computational Thinking','Algorithms','Data Structures'], linkedinUrl:'https://www.linkedin.com/posts/activity-7385959348973445120-mc3m?utm_source=share&utm_medium=member_desktop&rcm=ACoAADnzwmEBlPSGS1jS2pZ2OA4hy6uQAA6S4wE' },

  { category:'PROJECT', title:'Projectathon — 1st Prize Winner', provider:'GIET University', color:'#e879f9',
    description:'Awarded 1st prize for delivering an innovative project with technical excellence, creative problem solving, and impactful presentation to faculty and industry judges.',
    technologies:['Project Development','Presentation','Innovation','Teamwork'], linkedinUrl:'https://www.linkedin.com/posts/activity-7373561680045203456-gMYb?utm_source=share&utm_medium=member_desktop&rcm=ACoAADnzwmEBlPSGS1jS2pZ2OA4hy6uQAA6S4wE' },

  { category:'INTERNSHIP', title:'Industry Exposure Program Internship', provider:'Hebble Academy', color:'#2dd4bf',
    description:'Virtual internship with hands-on experience in Python development, AWS services, Git version control workflows, and cloud-based project deployment.',
    technologies:['Python','AWS','Git','Cloud','Linux','CI/CD'], linkedinUrl:'https://www.linkedin.com/posts/activity-7358041139960049664-MOup?utm_source=share&utm_medium=member_desktop&rcm=ACoAADnzwmEBlPSGS1jS2pZ2OA4hy6uQAA6S4wE' },

  { category:'DATA ANALYTICS', title:'Remote Sensing Data Analytics', provider:'ISRO — IIRS', color:'#22d3ee',
    description:"Completed ISRO's course on remote sensing data analytics for crop production forecasting and geospatial insights, offered by the Indian Institute of Remote Sensing.",
    technologies:['Remote Sensing','GIS','Geospatial','Data Analytics','Python'], linkedinUrl:'https://www.linkedin.com/posts/activity-7356929231903186946-4KkY?utm_source=share&utm_medium=member_desktop&rcm=ACoAADnzwmEBlPSGS1jS2pZ2OA4hy6uQAA6S4wE' },

  // { category:'CLOUD', title:'AWS Developer Certification Training', provider:'Infosys Springboard', color:'#f59e0b',
  //   description:'Completed AWS Developer certification training — cloud-native application development, Lambda functions, S3, DynamoDB, API Gateway, and core AWS services.',
  //   technologies:['AWS','Lambda','S3','DynamoDB','API Gateway','Cloud'], linkedinUrl:'https://www.linkedin.com/posts/activity-7343900108851167232-k33B?utm_source=share&utm_medium=member_desktop&rcm=ACoAADnzwmEBlPSGS1jS2pZ2OA4hy6uQAA6S4wE' },

  { category:'BUSINESS', title:'Introduction to Corporate Actions', provider:'TCS iON', color:'#818cf8',
    description:'Completed course on financial corporate actions, business processes, and their impact on investors and financial markets from a technology and operations perspective.',
    technologies:['Finance','Corporate Finance','Business','FinTech'], linkedinUrl:'https://www.linkedin.com/posts/activity-7329529703373905921-cz5x?utm_source=share&utm_medium=member_desktop&rcm=ACoAADnzwmEBlPSGS1jS2pZ2OA4hy6uQAA6S4wE' },

  { category:'PROGRAMMING', title:'Python + MySQL Internship', provider:'GIET University', color:'#f43f5e',
    description:'Internship focused on Python programming with MySQL integration — CRUD operations, stored procedures, database schema design, and mini project delivery.',
    technologies:['Python','MySQL','CRUD','Database Design','Stored Procedures'], linkedinUrl:'https://www.linkedin.com/posts/activity-7245416537883320321-TQ86?utm_source=share&utm_medium=member_desktop&rcm=ACoAADnzwmEBlPSGS1jS2pZ2OA4hy6uQAA6S4wE' },

  // { category:'DATA SCIENCE', title:'Data Science 101', provider:'IBM SkillsBuild', color:'#ec4899',
  //   description:'Foundational IBM course covering data science concepts, analytics workflows, open-source tools (Jupyter, pandas, NumPy), and real-world industry use cases.',
  //   technologies:['Data Science','Analytics','Python','Jupyter','Pandas','IBM'], linkedinUrl:'https://www.linkedin.com/posts/activity-7339183294091051008-YoPA?utm_source=share&utm_medium=member_desktop&rcm=ACoAADnzwmEBlPSGS1jS2pZ2OA4hy6uQAA6S4wE' },

  // { category:'DATA ANALYTICS', title:'Data Analytics Job Simulation', provider:'Deloitte (Forage)', color:'#34d399',
  //   description:'Deloitte virtual job simulation — hands-on data analysis, forensic technology application, and deriving actionable business insights from real industry datasets.',
  //   technologies:['Data Analysis','Business Analytics','Excel','Tableau','Forensic Tech'], linkedinUrl:'https://www.linkedin.com/posts/activity-7342225518211043330-I8n2?utm_source=share&utm_medium=member_desktop&rcm=ACoAADnzwmEBlPSGS1jS2pZ2OA4hy6uQAA6S4wE' },

  { category:'DESIGN & UX', title:'UX Design Foundations', provider:'Google (Coursera)', color:'#a3e635',
    description:'Google UX Design course covering user research, wireframing, prototyping, usability testing, accessibility, and the end-to-end user-centered design process.',
    technologies:['UX Design','User Research','Wireframing','Prototyping','Accessibility','Design Thinking'], linkedinUrl:'https://www.linkedin.com/posts/activity-7423773435803226113-WXix?utm_source=share&utm_medium=member_desktop&rcm=ACoAADnzwmEBlPSGS1jS2pZ2OA4hy6uQAA6S4wE' },

  { category:'AI / ML', title:'AI-ML Virtual Internship', provider:'AICTE × Google for Developers × EduSkills', color:'#5f969f',
    description:'Completed 10-week AICTE Virtual Internship in Artificial Intelligence & Machine Learning, supported by Google for Developers India Edu Program. Achieved Grade O (Outstanding: 90–100). Hosted at GIET University, January–March 2026.',
    technologies:['Artificial Intelligence','Machine Learning','Python','Deep Learning','Google for Developers'], linkedinUrl:'https://www.linkedin.com/posts/activity-7438811853989969920-kOGn?utm_source=share&utm_medium=member_desktop&rcm=ACoAADnzwmEBlPSGS1jS2pZ2OA4hy6uQAA6S4wE' },

  { category:'Data Science', title:'Data Analytics with Python', provider:'NPTEL × IIT Roorkee', color:'#6e5431',
    description:'Successfully completed the 12-week course "Data Analytics with Python" funded by the Ministry of Education, Govt. of India. Achieved a consolidated score of 55% with 4 recommended credits. January–April 2026.',
    technologies:['Python', 'Data Analytics', 'NPTEL', 'Swayam'], linkedinUrl:'https://www.linkedin.com/posts/mukeshbala143_nptel-iitroorkee-python-share-7468004433218543616-SrY2/?utm_source=share&utm_medium=member_desktop&rcm=ACoAADnzwmEBlPSGS1jS2pZ2OA4hy6uQAA6S4wE' },

  { category:'Generative AI', title:'Prompt Engineering', provider:'Infosys Springboard', color:'#34627c',
    description:'Successfully completed the "Prompt Engineering" course through Infosys Springboard. Acquired skills in crafting effective prompts for Generative AI applications. Issued on May 27, 2026.',
    technologies:['Prompt Engineering', 'Generative AI', 'Infosys Springboard', 'LLMs'], linkedinUrl:'https://www.linkedin.com/posts/mukeshbala143_infosysspringboard-promptengineering-generativeai-share-7468004822730895360-eT1j/?utm_source=share&utm_medium=member_desktop&rcm=ACoAADnzwmEBlPSGS1jS2pZ2OA4hy6uQAA6S4wE' }, 
    
  {
  category: 'Web Development',title: 'MERN Full Stack Development with Project',provider: 'AICTE × EduSkills × National Internship Portal',color: '#4b8025',
  description: 'Successfully completed the 8-week MERN Full Stack Development with Project Virtual Internship organized by AICTE and EduSkills. Gained hands-on experience in building full-stack web applications using the MERN stack and working on real-world development projects.',
  technologies: ['MongoDB','Express.js','React.js','Node.js','JavaScript','REST API'], linkedinUrl: 'https://www.linkedin.com/posts/mukeshbala143_excited-to-share-another-milestone-in-share-7485959624450523137-CTCy/?utm_source=share&utm_medium=member_desktop&rcm=ACoAADnzwmEBlPSGS1jS2pZ2OA4hy6uQAA6S4wE'},
  
  {
  category: 'UI/UX Design',title: 'Design Fundamentals with AI',provider: 'Adobe × YuWaah × UNICEF',color: '#FF0000',
  description: 'Successfully completed the Design Fundamentals with AI course offered by Adobe through the YuWaah Passport to Earning initiative in collaboration with UNICEF. Achieved a score of 97.5% while learning AI-assisted design, creativity, and design thinking.',
  technologies: [ 'Adobe', 'AI Design', 'UI/UX Design', 'Design Thinking', 'Generative AI'], linkedinUrl: 'https://www.linkedin.com/posts/mukeshbala143_adobe-ai-design-share-7482875077496131584-AyFI/?utm_source=share&utm_medium=member_desktop&rcm=ACoAADnzwmEBlPSGS1jS2pZ2OA4hy6uQAA6S4wE'},
];

function openCertModal(index) {
  const d       = certsData[index];
  const overlay = document.getElementById('certOverlay');
  const modal   = document.getElementById('certModal');
  if (!overlay || !modal || !d) return;

  modal.style.setProperty('--aclr', d.color);
  document.getElementById('cmBar').style.background   = d.color;
  document.getElementById('cmCat').textContent         = d.category;
  document.getElementById('cmTitle').textContent       = d.title;
  document.getElementById('cmProv').innerHTML          = `<i class="fas fa-building" style="margin-right:5px;opacity:0.35"></i>${d.provider}`;
  document.getElementById('cmDesc').textContent        = d.description;
  document.getElementById('cmTags').innerHTML          = d.technologies.map(t => `<span class="tag">${t}</span>`).join('');

  document.getElementById('cmFooter').innerHTML = d.linkedinUrl
    ? `<a class="am-btn am-btn--linkedin" href="${d.linkedinUrl}" target="_blank" rel="noopener"><i class="fab fa-linkedin"></i> View on LinkedIn</a>`
    : `<p style="color:rgba(244,240,236,0.25);font-size:0.78rem;">No certificate link available.</p>`;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCertModal() {
  const overlay = document.getElementById('certOverlay');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

function handleCertOverlay(e) {
  if (e.target === document.getElementById('certOverlay')) closeCertModal();
}


/* ════════════════════════════════════════
   9. CONTACT FORM — REAL EMAIL via Web3Forms
════════════════════════════════════════ */
const contactForm = document.getElementById('contactForm');
const cfSubmit    = document.getElementById('cfSubmit');
const cfBtnText   = document.getElementById('cfBtnText');
const cfBtnLoad   = document.getElementById('cfBtnLoad');
const cfSuccess   = document.getElementById('cfSuccess');
const cfError     = document.getElementById('cfError');
const cfErrorMsg  = document.getElementById('cfErrorMsg');

function showCfState(state) {
  cfBtnText.style.display = state === 'loading' ? 'none'  : 'flex';
  cfBtnLoad.style.display = state === 'loading' ? 'flex'  : 'none';
  cfSuccess.style.display = state === 'success' ? 'flex'  : 'none';
  cfError.style.display   = state === 'error'   ? 'flex'  : 'none';
  if (cfSubmit) cfSubmit.disabled = state === 'loading';
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function markError(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('error');
  el.addEventListener('input', () => el.classList.remove('error'), { once:true });
}

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name    = document.getElementById('cfName')?.value.trim();
    const email   = document.getElementById('cfEmail')?.value.trim();
    const subject = document.getElementById('cfSubject')?.value.trim();
    const message = document.getElementById('cfMessage')?.value.trim();

    let valid = true;
    if (!name    || name.length < 2)      { markError('cfName');    valid = false; }
    if (!email   || !validateEmail(email)) { markError('cfEmail');   valid = false; }
    if (!message || message.length < 10)  { markError('cfMessage'); valid = false; }

    if (!valid) {
      showCfState('error');
      if (cfErrorMsg) cfErrorMsg.textContent = 'Please fill in all required fields correctly.';
      return;
    }

    showCfState('loading');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method:  'POST',
        headers: { 'Content-Type':'application/json', 'Accept':'application/json' },
        body: JSON.stringify({
          access_key:  WEB3_KEY,
          name,
          email,
          subject:     subject || `Portfolio contact from ${name}`,
          message,
          from_name:   'Mukesh Bala Portfolio',
          replyto:     email,
          botcheck:    ''
        })
      });

      const result = await res.json();

      if (result.success) {
        showCfState('success');
        contactForm.reset();
        setTimeout(() => showCfState('idle'), 6000);
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err) {
      showCfState('error');
      if (cfErrorMsg) cfErrorMsg.textContent = 'Something went wrong. Email me at mukeshbala95133@gmail.com';
      console.error('Form error:', err);
      setTimeout(() => showCfState('idle'), 6000);
    }
  });
}


/* ════════════════════════════════════════
   10. PARALLAX ORBS
════════════════════════════════════════ */
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  document.querySelectorAll('.hero-orb').forEach((orb, i) => {
    orb.style.transform = `translateY(${scrolled * (i === 0 ? 0.04 : 0.06)}px)`;
  });
}, { passive:true });


/* ════════════════════════════════════════
   11. ESC KEY CLOSES ALL MODALS
════════════════════════════════════════ */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeCertModal();
    const pmo = document.getElementById('pModalOverlay');
    if (pmo) { pmo.classList.remove('open'); document.body.style.overflow = ''; }
  }
});


/* ════════════════════════════════════════
   12. MOBILE CERT SWIPE CAROUSEL
   Builds a horizontal swipe slider from certsData
   Shown only on mobile (≤768px via CSS)
════════════════════════════════════════ */
(function buildMobileCerts() {
  const wrap  = document.querySelector('.mobile-cert-track-wrap');
  if (!wrap) return;

  const track = wrap.querySelector('.mobile-cert-track');
  const dots  = wrap.querySelector('.mobile-cert-dots');
  if (!track || !dots) return;

  certsData.forEach((d, i) => {
    // Card
    const card = document.createElement('div');
    card.className = 'mobile-cert-card';
    card.style.borderColor = d.color + '33';
    card.innerHTML = `
      <div class="gc-icon" style="border:1px solid ${d.color};color:${d.color};box-shadow:0 0 16px ${d.color}33;background:rgba(0,0,0,0.2);">
        <i class="fas fa-star"></i>
      </div>
      <span class="gc-cat" style="color:${d.color};">${d.category}</span>
      <h3>${d.title}</h3>
      <p>${d.provider}</p>
      <div class="gc-bar" style="background:${d.color};box-shadow:0 0 10px ${d.color};"></div>
    `;
    card.addEventListener('click', () => openCertModal(i));
    track.appendChild(card);

    // Dot
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dots.appendChild(dot);
  });

  // Update active dot on scroll
  const dotEls = dots.querySelectorAll('span');
  track.addEventListener('scroll', () => {
    const idx = Math.round(track.scrollLeft / (track.scrollWidth / certsData.length));
    dotEls.forEach((d, i) => d.classList.toggle('active', i === idx));
  }, { passive: true });
})();


/* ════════════════════════════════════════
   CONSOLE EASTER EGG
════════════════════════════════════════ */
console.log('%c✦ Mukesh Bala', 'font-size:24px;font-weight:700;color:#d4a853;font-family:Georgia,serif;');
console.log('%cUI/UX Designer & Full Stack Developer', 'font-size:13px;color:#22d3ee;');
console.log('%c→ linkedin.com/in/mukeshbala1', 'font-size:12px;color:#a3e635;');
console.log('%c→ github.com/mukeshbala1', 'font-size:12px;color:#f87171;');