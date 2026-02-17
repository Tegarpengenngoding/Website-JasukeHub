// ====================================
// JASUKE HUB - MAIN APPLICATION & ROUTER
// ====================================

// Global state
window.currentRoute = 'home';
window.currentParam = null;

// SPA Router
function navigateTo(route, param = null) {
    window.currentRoute = route;
    window.currentParam = param;

    const app = document.getElementById('app');

    // Update active nav links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });

    // Render page based on route
    switch (route) {
        case 'home':
            app.innerHTML = renderHomePage();
            document.querySelector('[data-route="home"]')?.classList.add('active');
            break;

        case 'service':
            app.innerHTML = renderServiceDetailPage(param);
            break;

        case 'orders':
            if (!requireLogin()) {
                navigateTo('home');
                return;
            }
            app.innerHTML = renderBuyerOrdersPage();
            document.querySelector('[data-route="orders"]')?.classList.add('active');
            break;

        case 'dashboard':
            if (!requireLogin()) {
                navigateTo('home');
                return;
            }
            app.innerHTML = renderSellerDashboardPage();
            document.querySelector('[data-route="dashboard"]')?.classList.add('active');
            break;

        default:
            app.innerHTML = renderHomePage();
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Handle navigation clicks
document.addEventListener('click', (e) => {
    const routeLink = e.target.closest('[data-route]');
    if (routeLink) {
        e.preventDefault();
        const route = routeLink.getAttribute('data-route');
        navigateTo(route);
    }
});

// Handle browser back/forward
window.addEventListener('popstate', () => {
    navigateTo(window.currentRoute, window.currentParam);
});

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎉 Jasuke Hub initialized');

    // Check for hash navigation
    const hash = window.location.hash.substring(1);
    if (hash) {
        navigateTo(hash);
    } else {
        navigateTo('home');
    }
});
