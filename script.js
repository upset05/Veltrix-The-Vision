document.addEventListener('DOMContentLoaded', () => {
  // --- 0. Image Preloader ---
  const imagesToPreload = [
    'assets/vtu-home.png',
    'assets/vtu-dashboard.png',
    'assets/vtu-admin.png',
    'assets/core-screenshots/v0.1-genesis.png',
    'assets/core-screenshots/v0.2-awakening.png',
    'assets/core-screenshots/v0.3-communication.png',
    'assets/core-screenshots/v0.4-memory.png',
    'assets/core-screenshots/v0.5-personality.png',
    'assets/core-screenshots/v0.6-command-center.png',
    'assets/core-screenshots/v0.7-fact-management.png',
    'assets/core-screenshots/v0.8-modular-architecture.png',
    'assets/core-screenshots/v0.9-knowledge-files.png',
    'assets/core-screenshots/v0.95-productivity-natural-input.png',
    'assets/core-screenshots/v1.0-even-dots-can-dream.png'
  ];

  imagesToPreload.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  // --- 1. Navigation Active Link Tracking ---
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 150) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });

  // --- 2. Interactive Pricing Preview ---
  const netTabs = document.querySelectorAll('.net-tab');
  const planSelect = document.getElementById('pricing-plan');
  const priceDisplay = document.getElementById('calc-price');

  const pricingData = {
    MTN: [
      { text: "1GB SME (₦285)", val: 285 },
      { text: "2GB SME (₦570)", val: 570 },
      { text: "3GB SME (₦855)", val: 855 },
      { text: "5GB SME (₦1425)", val: 1425 }
    ],
    Airtel: [
      { text: "1GB CG (₦300)", val: 300 },
      { text: "2GB CG (₦600)", val: 600 },
      { text: "5GB CG (₦1500)", val: 1500 }
    ],
    Glo: [
      { text: "1GB CG (₦290)", val: 290 },
      { text: "2GB CG (₦580)", val: 580 }
    ],
    "9Mobile": [
      { text: "1GB CG (₦280)", val: 280 },
      { text: "2GB CG (₦560)", val: 560 }
    ]
  };

  const updatePlans = (network) => {
    if (planSelect && priceDisplay) {
      planSelect.innerHTML = '';
      const plans = pricingData[network];
      plans.forEach(plan => {
        const opt = document.createElement('option');
        opt.value = plan.val;
        opt.textContent = plan.text;
        planSelect.appendChild(opt);
      });
      priceDisplay.textContent = `₦${plans[0].val}`;
    }
  };

  if (netTabs.length > 0) {
    netTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        netTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        updatePlans(tab.getAttribute('data-network'));
      });
    });
  }

  if (planSelect && priceDisplay) {
    planSelect.addEventListener('change', (e) => {
      priceDisplay.textContent = `₦${e.target.value}`;
    });
  }

  // --- 3. Veltrix Core Timeline Slider ---
  const timelineSteps = document.querySelectorAll('.timeline-step');
  const activeVersionTitle = document.getElementById('active-version-title');
  const activeScreenshot = document.getElementById('active-screenshot');
  const activeDetailsTitle = document.getElementById('active-details-title');
  const activeDetailsDesc = document.getElementById('active-details-desc');

  const versionsMap = {
    'v0.1': {
      title: 'v0.1 - Genesis',
      img: 'assets/core-screenshots/v0.1-genesis.png',
      descTitle: 'Genesis Protocol',
      desc: 'A single white dot centered on a black screen. This pulsing dot represents potential, waiting for active connection.'
    },
    'v0.2': {
      title: 'v0.2 - Awakening',
      img: 'assets/core-screenshots/v0.2-awakening.png',
      descTitle: 'Awakening System',
      desc: 'The white dot becomes clickable. Interaction opens up a responsive dashboard indicating "Core Online".'
    },
    'v0.3': {
      title: 'v0.3 - Communication',
      img: 'assets/core-screenshots/v0.3-communication.png',
      descTitle: 'Communication Interface',
      desc: 'An input system is added. Users can submit messages to the Core dot and receive basic CLI responses.'
    },
    'v0.4': {
      title: 'v0.4 - Memory',
      img: 'assets/core-screenshots/v0.4-memory.png',
      descTitle: 'Persistent Memory Modules',
      desc: 'LocalStorage persistence is introduced, enabling the Core dot to remember previous user discussions and inputs.'
    },
    'v0.5': {
      title: 'v0.5 - Knowledge',
      img: 'assets/core-screenshots/v0.5-personality.png', // Fallback path if missing
      descTitle: 'Knowledge Categories',
      desc: 'Loading and formatting categories of knowledge (identity, anime, personal facts, business principles).'
    },
    'v0.6': {
      title: 'v0.6 - Personality',
      img: 'assets/core-screenshots/v0.6-command-center.png', // Fallback path if missing
      descTitle: 'Personality Engine & Themes',
      desc: 'A core mood selector and visual color theme generator. The user can switch Core skin and color states.'
    },
    'v0.7': {
      title: 'v0.7 - Fact Management',
      img: 'assets/core-screenshots/v0.7-fact-management.png',
      descTitle: 'Fact Processing',
      desc: 'Enables interactive learning. Core can learn new user facts dynamically via commands, list learned keys, export reports, and forget facts.'
    },
    'v0.8': {
      title: 'v0.8 - Modular Core',
      img: 'assets/core-screenshots/v0.8-modular-architecture.png',
      descTitle: 'Architecture Modernization',
      desc: 'Code refactored out of a single monolith into clean, modular JS files for memory, commands, identity, themes, and application wiring.'
    },
    'v0.9': {
      title: 'v0.9 - Knowledge Files',
      img: 'assets/core-screenshots/v0.9-knowledge-files.png',
      descTitle: 'Dynamic Knowledge Files',
      desc: 'Core loads structure definitions from external JSON databases (anime, personal, business) dynamically, and stores session overrides.'
    },
    'v0.95': {
      title: 'v0.95 - Productivity',
      img: 'assets/core-screenshots/v0.95-productivity-natural-input.png',
      descTitle: 'Productivity Suite & Natural Input',
      desc: 'Adds notes storage, task completion tracking, global memory search capabilities, and natural voice/text command mapping.'
    },
    'v1.0': {
      title: 'v1.0 - Even Dots Can Dream',
      img: 'assets/core-screenshots/v1.0-even-dots-can-dream.png',
      descTitle: 'Alpha Launch: "Even Dots Can Dream"',
      desc: 'Official production Alpha package. Combines the complete modular workspace, comprehensive release diagnostics, helper reports, and full git commit integrity.'
    }
  };

  timelineSteps.forEach(step => {
    step.addEventListener('click', () => {
      timelineSteps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');

      const vData = versionsMap[step.getAttribute('data-version')];
      if (vData) {
        activeVersionTitle.textContent = vData.title;
        activeScreenshot.src = vData.img;
        activeDetailsTitle.textContent = vData.descTitle;
        activeDetailsDesc.textContent = vData.desc;
      }
    });
  });

  // --- 4. Interactive Core Terminal Sandbox ---
  const termBody = document.getElementById('term-body');
  const termInput = document.getElementById('term-input');

  let simulatorMemory = [];
  let simulatorNotes = ["Review presentation", "Verify screenshot scripts"];
  let simulatorTasks = [{ text: "Compile ecosystem summary", completed: false }];
  let simulatorFacts = { favorite_anime: "One Piece" };
  let currentMood = "Focused";
  let currentState = "ONLINE";

  const addLine = (text, className = '') => {
    const p = document.createElement('p');
    p.className = `term-line ${className}`;
    p.textContent = text;
    termBody.appendChild(p);
    termBody.scrollTop = termBody.scrollHeight;
  };

  const commandHandler = (inputVal) => {
    const normalized = inputVal.trim().toLowerCase();
    
    if (!normalized) return;
    
    addLine(`> ${inputVal}`, 'text-emerald');
    
    // Save to memory
    simulatorMemory.push(inputVal);

    if (normalized === 'hello') {
      addLine('Greetings David. Veltrix Core is online.');
    } else if (normalized === 'who are you') {
      addLine('I am Veltrix Core, version 1.0.0-alpha.');
    } else if (normalized === '/help' || normalized === 'help') {
      addLine(`Available Simulator Commands:
hello - Core greeting
who are you - Engine ID
/release - Release notes
/about - Identity report
/status - Session diagnostics
/report - Overall ecosystem report
/notes - List notes
/note [text] - Add a note
/tasks - List tasks
/task [text] - Add a task
learn [key] [value] - Learn facts
recall [key] - Recall fact
/facts - List learned keys
/uptime - System session time
/coffee - caffeine boost`);
    } else if (normalized === '/release') {
      addLine(`VELTRIX CORE
Version: 1.0.0-alpha
Release Name: Even Dots Can Dream
The journey from a white dot to a modular workspace with:
* Memory
* Knowledge Base
* Personality and Themes
* Task & Notes Tracking`);
    } else if (normalized === '/about' || normalized === 'about') {
      addLine(`VELTRIX CORE REPORT
Version: 1.0.0-alpha
Creator: The Accountant
State: ${currentState}
Mood: ${currentMood}
Theme: dark-purple
Knowledge Categories Loaded: 5`);
    } else if (normalized === '/status' || normalized === 'status') {
      addLine(`VELTRIX CORE STATUS
State: ${currentState}
Mood: ${currentMood}
Notes Stored: ${simulatorNotes.length}
Tasks Stored: ${simulatorTasks.length}
Learned Facts: ${Object.keys(simulatorFacts).length}`);
    } else if (normalized === '/report' || normalized === 'report') {
      addLine(`VELTRIX CORE FULL REPORT
=========================
Uptime: 340 seconds
Memory Entries: ${simulatorMemory.length}
Notes: ${simulatorNotes.length}
Tasks: ${simulatorTasks.length} (Completed: ${simulatorTasks.filter(t=>t.completed).length})
Facts: ${Object.keys(simulatorFacts).length}
Active State: ${currentState}
Active Mood: ${currentMood}`);
    } else if (normalized === '/notes' || normalized === 'show notes') {
      if (simulatorNotes.length === 0) {
        addLine('No notes stored.');
      } else {
        addLine('Notes:\n' + simulatorNotes.map((n, i) => `${i + 1}. ${n}`).join('\n'));
      }
    } else if (normalized.startsWith('/note ')) {
      const note = inputVal.slice(6).trim();
      simulatorNotes.push(note);
      addLine(`Note saved: "${note}"`);
    } else if (normalized === '/tasks' || normalized === 'show tasks') {
      if (simulatorTasks.length === 0) {
        addLine('No tasks stored.');
      } else {
        addLine('Tasks:\n' + simulatorTasks.map((t, i) => `${i + 1}. [${t.completed ? 'x' : ' '}] ${t.text}`).join('\n'));
      }
    } else if (normalized.startsWith('/task ')) {
      const taskText = inputVal.slice(6).trim();
      simulatorTasks.push({ text: taskText, completed: false });
      addLine(`Task added: "${taskText}"`);
    } else if (normalized === '/facts' || normalized === 'facts') {
      addLine('Learned keys:\n' + Object.keys(simulatorFacts).join(', '));
    } else if (normalized.startsWith('learn ')) {
      const parts = inputVal.slice(6).trim().split(' ');
      const key = parts[0];
      const val = parts.slice(1).join(' ').trim();
      if (!key || !val) {
        addLine('Format: learn [key] [value]');
      } else {
        simulatorFacts[key] = val;
        addLine(`Learned fact: ${key} = ${val}`);
      }
    } else if (normalized.startsWith('recall ')) {
      const key = inputVal.slice(7).trim();
      if (simulatorFacts[key]) {
        addLine(`${key} is: ${simulatorFacts[key]}`);
      } else {
        addLine(`Fact "${key}" not found.`);
      }
    } else if (normalized === '/uptime') {
      addLine('System Uptime: 420 seconds');
    } else if (normalized === '/coffee') {
      addLine('Caffeine injection active. Performance +15%.');
    } else {
      addLine('Unknown command. Type /help to see commands.');
    }
  };

  if (termInput) {
    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = termInput.value;
        commandHandler(val);
        termInput.value = '';
      }
    });
  }

  // --- 5. VTU View Toggle (Pricing vs Screenshots) ---
  const vtuToggleBtns = document.querySelectorAll('.vtu-toggle-btn');
  const vtuTabContents = document.querySelectorAll('.vtu-tab-content');

  vtuToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      vtuToggleBtns.forEach(b => b.classList.remove('active'));
      vtuTabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const viewId = `vtu-${btn.getAttribute('data-vtu-view')}-view`;
      const targetContent = document.getElementById(viewId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // --- 6. VTU Live Gallery Controls ---
  const galleryImg = document.getElementById('gallery-img');
  const galleryDots = document.querySelectorAll('.gallery-dot');

  galleryDots.forEach(dot => {
    dot.addEventListener('click', () => {
      galleryDots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');

      const imgSrc = dot.getAttribute('data-img');
      const imgAlt = dot.getAttribute('data-alt');
      if (galleryImg) {
        galleryImg.src = imgSrc;
        galleryImg.alt = imgAlt;
      }
    });
  });
});
