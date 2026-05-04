(() => {
  const data = window.TEACHER_USB_SITES;
  if (!data) return;

  function init() {
    const searchInput = document.getElementById('siteSearch');
    const container = document.getElementById('siteContent');
    if (!searchInput || !container) return;

    const render = (term = '') => {
      const lower = term.trim().toLowerCase();
      const sections = data.categories
        .map((category) => ({
          ...category,
          items: category.items.filter((item) => {
            if (!lower) return true;
            return `${item.title} ${item.description}`.toLowerCase().includes(lower);
          })
        }))
        .filter((category) => category.items.length);

      container.innerHTML = sections.length
        ? sections.map(renderCategory).join('')
        : '<div class="empty-state">Nenhum site encontrado.</div>';
    };

    searchInput.addEventListener('input', (event) => render(event.target.value));
    render();
  }

  function renderCategory(category) {
    return `
      <section class="site-category" id="${category.id}">
        <div class="section-head">
          <div>
            <h3>${category.title}</h3>
            <p class="section-copy">Atalhos em cards para abrir rapidamente seus sites mais usados.</p>
          </div>
        </div>
        <div class="site-grid">
          ${category.items.map(renderCard).join('')}
        </div>
      </section>
    `;
  }

  function renderCard(item) {
    return `
      <a class="site-card" href="${item.href}" target="_blank" rel="noreferrer noopener">
        <div class="site-card-media">
          <img src="${item.image}" alt="${item.title}">
        </div>
        <div class="site-card-content">
          <span class="site-badge">Site</span>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <span>Abrir site</span>
        </div>
      </a>
    `;
  }

  document.addEventListener('DOMContentLoaded', init);
})();
