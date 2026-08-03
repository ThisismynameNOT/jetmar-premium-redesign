import { projects, services, type Project, type ProjectCategory } from './data.js';
import { filterProjects, validateQuote } from './lib.js';

const qs = <T extends Element>(selector: string, root: ParentNode = document) => root.querySelector<T>(selector);
const qsa = <T extends Element>(selector: string, root: ParentNode = document) => [...root.querySelectorAll<T>(selector)];

function renderServices(): void {
  const grid = qs<HTMLElement>('#serviceGrid');
  if (!grid) return;
  grid.innerHTML = services.map(service => `
    <article class="service-card" data-service="${service.id}">
      <div class="service-number">${service.number}</div>
      <div>
        <h3>${service.title}</h3>
        <p>${service.summary}</p>
        <button class="service-link" type="button" data-service-open="${service.id}">Detail služby <span>↗</span></button>
      </div>
    </article>`).join('');
}

function renderProjects(category: ProjectCategory | 'all' = 'all'): void {
  const grid = qs<HTMLElement>('#projectGrid');
  if (!grid) return;
  grid.innerHTML = filterProjects(projects, category).map((project, index) => `
    <button class="project-card ${index === 0 ? 'project-card--feature' : ''}" type="button" data-project="${project.id}">
      <img src="${project.image}" alt="Grafická prezentace reference ${project.title}" loading="lazy">
      <span class="project-index">${String(index + 1).padStart(2, '0')}</span>
      <span class="project-category">${project.tone}</span>
      <div class="project-copy">
        <small>${project.location} · ${project.year}</small>
        <h3>${project.title}</h3>
        <p>${project.scope}</p>
      </div>
    </button>`).join('');
}

function openProject(project: Project, opener: HTMLElement): void {
  const dialog = qs<HTMLDialogElement>('#projectDialog');
  if (!dialog) return;
  const content = qs<HTMLElement>('[data-project-dialog-content]', dialog);
  if (!content) return;
  content.innerHTML = `
    <div class="project-dialog-media"><img src="${project.image}" alt="Grafická prezentace reference ${project.title}"></div>
    <div class="project-dialog-copy">
      <p class="eyebrow">${project.location} · ${project.year}</p>
      <h2>${project.title}</h2>
      <p class="project-dialog-scope">${project.scope}</p>
      <p>Reference je převzata z veřejně dostupného seznamu společnosti JETMAR A PARTNER. Obrázek v této demonstrační verzi je redakční vizualizace a před ostrým spuštěním bude nahrazen firemní fotografií.</p>
      <button class="button button--copper" type="button" data-open-quote>Nezávazně poptat podobnou realizaci</button>
    </div>`;
  dialog.dataset.opener = opener.id;
  dialog.showModal();
  qs<HTMLElement>('[data-dialog-close]', dialog)?.focus();
}

function bindNavigation(): void {
  const toggle = qs<HTMLButtonElement>('#menuToggle');
  const nav = qs<HTMLElement>('#mobileNav');
  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    nav?.toggleAttribute('hidden', !open);
    document.body.classList.toggle('nav-open', open);
  });
  nav?.addEventListener('click', event => {
    if ((event.target as HTMLElement).closest('a')) {
      toggle?.setAttribute('aria-expanded', 'false');
      nav.hidden = true;
      document.body.classList.remove('nav-open');
    }
  });
}

function bindBeforeAfter(): void {
  const range = qs<HTMLInputElement>('#comparisonRange');
  const overlay = qs<HTMLElement>('#comparisonAfter');
  const output = qs<HTMLOutputElement>('#comparisonOutput');
  const update = () => {
    const value = Number(range?.value ?? 50);
    overlay?.style.setProperty('--reveal', `${value}%`);
    if (output) output.textContent = `${value}%`;
  };
  range?.addEventListener('input', update);
  update();
}

function bindQuote(): void {
  const dialog = qs<HTMLDialogElement>('#quoteDialog');
  const form = qs<HTMLFormElement>('#quoteForm');
  document.addEventListener('click', event => {
    if ((event.target as HTMLElement).closest('[data-open-quote]')) dialog?.showModal();
  });
  form?.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(form);
    const values = {
      buildingType: String(formData.get('buildingType') ?? ''),
      roofType: String(formData.get('roofType') ?? ''),
      area: Number(formData.get('area')),
      problem: String(formData.get('problem') ?? ''),
      district: String(formData.get('district') ?? ''),
      timeframe: String(formData.get('timeframe') ?? ''),
      name: String(formData.get('name') ?? ''),
      phone: String(formData.get('phone') ?? ''),
      email: String(formData.get('email') ?? '')
    };
    const errors = validateQuote(values);
    qsa<HTMLElement>('[data-error]', form).forEach(node => { node.textContent = ''; });
    Object.entries(errors).forEach(([key, message]) => {
      const node = qs<HTMLElement>(`[data-error="${key}"]`, form);
      if (node) node.textContent = message;
    });
    if (Object.keys(errors).length) return;
    form.innerHTML = `
      <div class="success-state" role="status">
        <span>✓</span>
        <p class="eyebrow">Demonstrační odeslání</p>
        <h2>Děkujeme. Zadání je připravené.</h2>
        <p>V produkční verzi bude poptávka bezpečně doručena do firemního e-mailu nebo CRM. Tato ukázka žádná osobní data neodesílá.</p>
        <button class="button button--dark" type="button" data-dialog-close>Zavřít</button>
      </div>`;
  });
}

function bindDialogs(): void {
  qsa<HTMLDialogElement>('dialog').forEach(dialog => {
    dialog.addEventListener('click', event => {
      const target = event.target as HTMLElement;
      if (target === dialog || target.closest('[data-dialog-close]')) dialog.close();
    });
    dialog.addEventListener('close', () => {
      const openerId = dialog.dataset.opener;
      if (openerId) document.getElementById(openerId)?.focus();
    });
  });
}

function bindInteractions(): void {
  qs('#projectFilters')?.addEventListener('click', event => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-filter]');
    if (!button) return;
    qsa('[data-filter]').forEach(item => item.classList.remove('is-active'));
    button.classList.add('is-active');
    renderProjects(button.dataset.filter as ProjectCategory | 'all');
  });
  qs('#projectGrid')?.addEventListener('click', event => {
    const card = (event.target as HTMLElement).closest<HTMLElement>('[data-project]');
    if (!card) return;
    if (!card.id) card.id = `project-${card.dataset.project}`;
    const project = projects.find(item => item.id === card.dataset.project);
    if (project) openProject(project, card);
  });
  qs('#serviceGrid')?.addEventListener('click', event => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-service-open]');
    if (!button) return;
    const service = services.find(item => item.id === button.dataset.serviceOpen);
    const dialog = qs<HTMLDialogElement>('#serviceDialog');
    const content = dialog && qs<HTMLElement>('[data-service-dialog-content]', dialog);
    if (!service || !dialog || !content) return;
    content.innerHTML = `<p class="eyebrow">${service.number} · služba</p><h2>${service.title}</h2><p>${service.detail}</p><button class="button button--copper" type="button" data-open-quote>Poptat řešení</button>`;
    dialog.showModal();
  });
}

renderServices();
renderProjects();
bindNavigation();
bindBeforeAfter();
bindQuote();
bindDialogs();
bindInteractions();
