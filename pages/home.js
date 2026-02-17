// ====================================
// JASUKE HUB - HOME PAGE
// ====================================

let currentCategory = 'all';
let searchQuery = '';

function renderHomePage() {
    const categories = [
        'All',
        'VR Development',
        'AR Development',
        '3D Modeling',
        'Animation',
        '360 Content'
    ];

    // Filter services
    let filteredServices = MOCK_SERVICES;

    if (currentCategory !== 'all') {
        filteredServices = filteredServices.filter(s =>
            s.category.toLowerCase() === currentCategory.toLowerCase()
        );
    }

    if (searchQuery) {
        filteredServices = filteredServices.filter(s =>
            s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    return `
    <!-- Hero Section -->
    <section style="background: var(--gradient-dark); padding: var(--spacing-2xl) 0;">
      <div class="container text-center">
        <h1 class="animate-fade-in" style="font-family: var(--font-display); font-size: var(--text-4xl); font-weight: 900; margin-bottom: var(--spacing-md); line-height: 1.2;">
          Find the Perfect <span class="text-gradient">Immersive Tech</span> Expert
        </h1>
        <p class="animate-fade-in" style="font-size: var(--text-xl); color: var(--text-secondary); margin-bottom: var(--spacing-xl); max-width: 600px; margin-left: auto; margin-right: auto;">
          Connect with top-tier VR, AR, 3D, and animation professionals for your next project
        </p>
        
        <!-- Search Bar -->
        <div class="animate-fade-in" style="max-width: 700px; margin: 0 auto;">
          <div style="display: flex; gap: var(--spacing-sm); background: var(--bg-secondary); padding: 0.5rem; border-radius: var(--radius-lg); border: 1px solid var(--border);">
            <input 
              type="text" 
              id="searchInput" 
              placeholder="Search for services..." 
              style="flex: 1; background: transparent; border: none; padding: 0.875rem 1rem; color: var(--text-primary); font-size: var(--text-base);"
              onkeyup="handleSearch(event)"
            >
            <button class="btn btn-primary" onclick="performSearch()">
              <i class="fas fa-search"></i> Search
            </button>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Categories -->
    <section style="background: var(--bg-secondary); padding: var(--spacing-lg) 0; border-bottom: 1px solid var(--border);">
      <div class="container">
        <div class="flex" style="gap: var(--spacing-sm); overflow-x: auto; padding-bottom: var(--spacing-sm);">
          ${categories.map(cat => `
            <button 
              class="btn ${currentCategory === cat.toLowerCase() ? 'btn-primary' : 'btn-ghost'}" 
              onclick="filterByCategory('${cat.toLowerCase()}')"
              style="white-space: nowrap;"
            >
              ${cat}
            </button>
          `).join('')}
        </div>
      </div>
    </section>
    
    <!-- Services Grid -->
    <section style="padding: var(--spacing-2xl) 0;">
      <div class="container">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-lg);">
          <h2 style="font-size: var(--text-3xl); font-weight: 800;">
            ${currentCategory === 'all' ? 'Featured Services' : currentCategory}
          </h2>
          <p style="color: var(--text-secondary);">${filteredServices.length} services found</p>
        </div>
        
        ${filteredServices.length === 0 ? `
          <div class="text-center" style="padding: var(--spacing-2xl);">
            <i class="fas fa-search" style="font-size: 4rem; color: var(--text-muted); margin-bottom: var(--spacing-md);"></i>
            <p style="font-size: var(--text-xl); color: var(--text-secondary);">No services found</p>
          </div>
        ` : `
          <div class="grid grid-4">
            ${filteredServices.map(service => `
              <div class="service-card" onclick="viewService(${service.id})">
                <div class="service-card-image" style="background: var(--gradient-${['primary', 'secondary', 'accent', 'dark'][service.id % 4]}); display: flex; align-items: center; justify-content: center;">
                  <i class="fas fa-${getServiceIcon(service.category)}" style="font-size: 4rem; opacity: 0.3;"></i>
                </div>
                <div class="service-card-content">
                  <h3 class="service-card-title">${service.title}</h3>
                  <div class="service-card-seller">
                    <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--gradient-primary); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 700;">
                      ${service.sellerAvatar}
                    </div>
                    ${service.seller}
                  </div>
                  <p style="color: var(--text-secondary); font-size: var(--text-sm); line-height: 1.5; margin-bottom: var(--spacing-sm);">
                    ${service.description.substring(0, 80)}...
                  </p>
                  <div class="service-card-footer">
                    <div class="rating">
                      <i class="fas fa-star"></i>
                      ${service.rating} (${service.reviews})
                    </div>
                    <div class="price">${formatCurrency(service.price)}</div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    </section>
  `;
}

// Helper function to get icon
function getServiceIcon(category) {
    const icons = {
        'VR Development': 'vr-cardboard',
        'AR Development': 'mobile-alt',
        '3D Modeling': 'cube',
        'Animation': 'film',
        '360 Content': 'eye'
    };
    return icons[category] || 'star';
}

// Filter by category
function filterByCategory(category) {
    currentCategory = category;
    navigateTo('home');
}

// Handle search
function handleSearch(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
}

function performSearch() {
    searchQuery = document.getElementById('searchInput').value;
    navigateTo('home');
}

// View service details
function viewService(serviceId) {
    navigateTo('service', serviceId);
}
