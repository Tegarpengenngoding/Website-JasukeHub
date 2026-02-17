// ====================================
// JASUKE HUB - SERVICE DETAIL PAGE
// ====================================

function renderServiceDetailPage(serviceId) {
    const service = getServiceById(serviceId);

    if (!service) {
        return '<div class="container" style="padding: var(--spacing-2xl);"><h2>Service not found</h2></div>';
    }

    return `
    <div class="container" style="padding: var(--spacing-2xl) 0;">
      <!-- Breadcrumb -->
      <div style="margin-bottom: var(--spacing-lg);">
        <a href="#" onclick="navigateTo('home')" style="color: var(--text-secondary); text-decoration: none;">
          <i class="fas fa-arrow-left"></i> Back to Services
        </a>
      </div>
      
      <div class="grid grid-3" style="gap: var(--spacing-xl);">
        <!-- Main Content -->
        <div style="grid-column: span 2;">
          <!-- Service Header -->
          <div style="margin-bottom: var(--spacing-xl);">
            <div style="height: 400px; background: var(--gradient-${['primary', 'secondary', 'accent'][serviceId % 3]}); border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; margin-bottom: var(--spacing-lg);">
              <i class="fas fa-${getServiceIcon(service.category)}" style="font-size: 8rem; opacity: 0.3;"></i>
            </div>
            
            <span class="badge badge-primary" style="margin-bottom: var(--spacing-sm);">${service.category}</span>
            <h1 style="font-size: var(--text-4xl); font-weight: 900; margin-bottom: var(--spacing-md); line-height: 1.2;">
              ${service.title}
            </h1>
            
            <div class="flex items-center gap-md" style="margin-bottom: var(--spacing-lg);">
              <div style="width: 48px; height: 48px; border-radius: 50%; background: var(--gradient-primary); display: flex; align-items: center; justify-content: center; font-size: var(--text-lg); font-weight: 700;">
                ${service.sellerAvatar}
              </div>
              <div>
                <p style="font-weight: 600; font-size: var(--text-lg);">${service.seller}</p>
                <div class="rating">
                  <i class="fas fa-star"></i>
                  ${service.rating} (${service.reviews} reviews)
                </div>
              </div>
            </div>
          </div>
          
          <!-- Description -->
          <div class="glass-card" style="margin-bottom: var(--spacing-lg);">
            <h3 style="font-size: var(--text-2xl); font-weight: 700; margin-bottom: var(--spacing-md);">About This Service</h3>
            <p style="color: var(--text-secondary); line-height: 1.8; font-size: var(--text-lg);">
              ${service.description}
            </p>
            
            <div class="grid grid-3" style="margin-top: var(--spacing-lg); gap: var(--spacing-md);">
              <div style="text-align: center; padding: var(--spacing-md); background: var(--surface); border-radius: var(--radius-md);">
                <i class="fas fa-clock" style="font-size: var(--text-2xl); color: var(--primary); margin-bottom: var(--spacing-xs);"></i>
                <p style="font-weight: 600;">${service.deliveryTime}</p>
                <p style="font-size: var(--text-sm); color: var(--text-muted);">Delivery Time</p>
              </div>
              <div style="text-align: center; padding: var(--spacing-md); background: var(--surface); border-radius: var(--radius-md);">
                <i class="fas fa-redo" style="font-size: var(--text-2xl); color: var(--accent); margin-bottom: var(--spacing-xs);"></i>
                <p style="font-weight: 600;">${service.revisions} Revisions</p>
                <p style="font-size: var(--text-sm); color: var(--text-muted);">Free Revisions</p>
              </div>
              <div style="text-align: center; padding: var(--spacing-md); background: var(--surface); border-radius: var(--radius-md);">
                <i class="fas fa-award" style="font-size: var(--text-2xl); color: var(--secondary); margin-bottom: var(--spacing-xs);"></i>
                <p style="font-weight: 600;">Top Rated</p>
                <p style="font-size: var(--text-sm); color: var(--text-muted);">Seller Level</p>
              </div>
            </div>
          </div>
          
          <!-- Portfolio -->
          <div class="glass-card" style="margin-bottom: var(--spacing-lg);">
            <h3 style="font-size: var(--text-2xl); font-weight: 700; margin-bottom: var(--spacing-md);">Portfolio</h3>
            <div class="grid grid-3">
              ${service.portfolio.map((item, index) => `
                <div style="aspect-ratio: 1; background: var(--gradient-${['primary', 'accent', 'secondary'][index % 3]}); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: transform var(--transition-base);" 
                     onmouseover="this.style.transform='scale(1.05)'" 
                     onmouseout="this.style.transform='scale(1)'">
                  <i class="fas fa-image" style="font-size: 2rem; opacity: 0.3;"></i>
                </div>
              `).join('')}
            </div>
          </div>
          
          <!-- Reviews -->
          <div class="glass-card">
            <h3 style="font-size: var(--text-2xl); font-weight: 700; margin-bottom: var(--spacing-md);">Reviews</h3>
            ${renderReviews(service)}
          </div>
        </div>
        
        <!-- Sidebar -->
        <div>
          <div class="glass-card" style="position: sticky; top: 100px;">
            <div style="text-align: center; margin-bottom: var(--spacing-lg);">
              <p style="font-size: var(--text-sm); color: var(--text-muted); margin-bottom: var(--spacing-xs);">Starting at</p>
              <p style="font-size: var(--text-4xl); font-weight: 900;" class="text-gradient">${formatCurrency(service.price)}</p>
            </div>
            
            <button class="btn btn-primary" onclick="startOrder(${service.id})" style="width: 100%; margin-bottom: var(--spacing-sm); font-size: var(--text-lg); padding: 1rem;">
              <i class="fas fa-shopping-cart"></i> Buy Service
            </button>
            
            <button class="btn btn-outline" onclick="contactSeller(${service.id})" style="width: 100%;">
              <i class="fas fa-comment"></i> Contact Seller
            </button>
            
            <div style="margin-top: var(--spacing-lg); padding-top: var(--spacing-lg); border-top: 1px solid var(--border);">
              <p style="font-size: var(--text-sm); color: var(--text-secondary); text-align: center;">
                <i class="fas fa-shield-alt" style="color: var(--accent);"></i> 
                Money-back guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderReviews(service) {
    const sampleReviews = [
        { name: "John Doe", rating: 5, comment: "Outstanding work! Highly professional and delivered exactly what I needed.", date: "2026-02-10" },
        { name: "Jane Smith", rating: 5, comment: "Excellent communication throughout the project. Will definitely hire again!", date: "2026-02-05" },
        { name: "Mike Johnson", rating: 4, comment: "Great quality work, minor revisions needed but overall very satisfied.", date: "2026-01-28" }
    ];

    return sampleReviews.map(review => `
    <div style="padding: var(--spacing-md); background: var(--surface); border-radius: var(--radius-md); margin-bottom: var(--spacing-md);">
      <div class="flex justify-between" style="margin-bottom: var(--spacing-sm);">
        <div class="flex items-center gap-sm">
          <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--gradient-secondary); display: flex; align-items: center; justify-content: center; font-weight: 700;">
            ${review.name[0]}
          </div>
          <div>
            <p style="font-weight: 600;">${review.name}</p>
            <div class="rating" style="font-size: var(--text-sm);">
              ${'<i class="fas fa-star"></i>'.repeat(review.rating)}
            </div>
          </div>
        </div>
        <p style="font-size: var(--text-sm); color: var(--text-muted);">${formatDate(review.date)}</p>
      </div>
      <p style="color: var(--text-secondary);">${review.comment}</p>
    </div>
  `).join('');
}

function startOrder(serviceId) {
    contactSeller(serviceId);
}

function contactSeller(serviceId) {
    const service = getServiceById(serviceId);
    if (!service) return;

    openChat(serviceId, service.seller, service.title);
}
