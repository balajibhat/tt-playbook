// Ten Thousand — Playbook Layout Engine
// Injects sidebar navigation into every page

const NAV = [
  { section: 'Overview' },
  { label: 'Home', icon: '\u2302', href: 'index.html', id: 'home' },
  { label: 'Metric Glossary', icon: '\u0023', href: 'pages/metrics.html', id: 'metrics' },

  { section: 'People & Process' },
  { label: 'Roles & Ownership', icon: '\u263A', href: 'pages/roles.html', id: 'roles' },
  { label: 'Weekly Rhythm', icon: '\u29D6', href: 'pages/weekly-rhythm.html', id: 'weekly-rhythm' },
  { label: 'Client Call Prep', icon: '\u260E', href: 'pages/client-call.html', id: 'client-call' },

  { section: 'Playbooks' },
  { label: 'Campaign Buckets', icon: '\u25CE', href: 'pages/campaigns.html', id: 'campaigns' },
  { label: 'Creative Triage', icon: '\u2704', href: 'pages/creative.html', id: 'creative' },

  { section: 'Reference' },
  { label: 'Data Sources', icon: '\u26C1', href: 'pages/data-sources.html', id: 'data-sources' },
];

function getBasePath() {
  const path = window.location.pathname;
  if (path.includes('/pages/')) return '../';
  return '';
}

function buildSidebar(activeId) {
  const base = getBasePath();
  const sidebar = document.createElement('aside');
  sidebar.className = 'sidebar';
  sidebar.id = 'sidebar';

  let html = `
    <div class="sidebar-brand">
      <h1>Ten Thousand</h1>
      <div class="badge">Team Ops Playbook</div>
    </div>
    <nav>
  `;

  let sectionOpen = false;
  for (const item of NAV) {
    if (item.section) {
      if (sectionOpen) html += `</div>`;
      html += `<div class="nav-section"><div class="nav-section-label">${item.section}</div>`;
      sectionOpen = true;
      continue;
    }
    const isActive = item.id === activeId;
    const href = base + item.href;
    html += `<a class="nav-link${isActive ? ' active' : ''}" href="${href}">
      <span class="nav-icon">${item.icon}</span>
      ${item.label}
    </a>`;
  }

  if (sectionOpen) html += `</div>`;
  html += `</nav>`;
  sidebar.innerHTML = html;
  return sidebar;
}

function buildMobileHeader() {
  const header = document.createElement('div');
  header.className = 'mobile-header';
  header.innerHTML = `
    <h1>Ten Thousand Playbook</h1>
    <button class="menu-btn" onclick="document.getElementById('sidebar').classList.toggle('open')">Menu</button>
  `;
  return header;
}

function initLayout(activeId) {
  const body = document.body;
  const content = body.innerHTML;

  body.innerHTML = '';
  const layout = document.createElement('div');
  layout.className = 'layout';

  layout.appendChild(buildMobileHeader());
  layout.appendChild(buildSidebar(activeId));

  const main = document.createElement('main');
  main.className = 'main';
  main.innerHTML = content;
  layout.appendChild(main);

  body.appendChild(layout);

  // Close sidebar on mobile when a link is clicked
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('sidebar').classList.remove('open');
    });
  });
}
