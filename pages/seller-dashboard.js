// ====================================
// JASUKE HUB - SELLER DASHBOARD PAGE
// ====================================

let currentDashboardTab = 'overview';

function renderSellerDashboardPage() {
    if (!requireLogin()) {
        return '';
    }

    const user = Storage.getUser();
    if (user.role !== 'seller' && user.role !== 'both') {
        return `
      <div class="container" style="padding: var(--spacing-2xl);">
        <div class="glass-card text-center" style="padding: var(--spacing-2xl);">
          <h2 style="font-size: var(--text-3xl); margin-bottom: var(--spacing-md);">Access Denied</h2>
          <p style="color: var(--text-secondary);">You need a seller account to access the dashboard.</p>
        </div>
      </div>
    `;
    }

    return `
    <div class="container" style="padding: var(--spacing-2xl) 0;">
      <h1 style="font-size: var(--text-4xl); font-weight: 900; margin-bottom: var(--spacing-xl);">Seller Dashboard</h1>
      
      <!-- Tabs -->
      <div class="flex" style="gap: var(--spacing-sm); margin-bottom: var(--spacing-xl); border-bottom: 2px solid var(--border); padding-bottom: var(--spacing-sm); overflow-x: auto;">
        ${renderTab('overview', '<i class="fas fa-chart-line"></i> Overview')}
        ${renderTab('balance', '<i class="fas fa-wallet"></i> Balance')}
        ${renderTab('ecourse', '<i class="fas fa-graduation-cap"></i> E-Course')}
        ${renderTab('analytics', '<i class="fas fa-chart-bar"></i> Analytics')}
      </div>
      
      <!-- Tab Content -->
      <div id="dashboardContent">
        ${renderDashboardContent()}
      </div>
    </div>
  `;
}

function renderTab(tabId, label) {
    const isActive = currentDashboardTab === tabId;
    return `
    <button 
      class="btn ${isActive ? 'btn-primary' : 'btn-ghost'}" 
      onclick="switchDashboardTab('${tabId}')"
      style="white-space: nowrap;"
    >
      ${label}
    </button>
  `;
}

function switchDashboardTab(tab) {
    currentDashboardTab = tab;
    navigateTo('dashboard');
}

function renderDashboardContent() {
    switch (currentDashboardTab) {
        case 'overview':
            return renderOverviewTab();
        case 'balance':
            return renderBalanceTab();
        case 'ecourse':
            return renderECourseTab();
        case 'analytics':
            return renderAnalyticsTab();
        default:
            return renderOverviewTab();
    }
}

function renderOverviewTab() {
    const balance = Storage.getBalance();
    const points = Storage.getPoints();

    return `
    <!-- Stats Grid -->
    <div class="grid grid-4" style="margin-bottom: var(--spacing-xl);">
      <div class="glass-card" style="background: var(--gradient-primary); border: none; text-align: center; padding: var(--spacing-xl);">
        <p style="font-size: var(--text-sm); opacity: 0.9; margin-bottom: var(--spacing-xs);">Unclaimed Balance</p>
        <p style="font-size: var(--text-3xl); font-weight: 900;">${formatCurrency(balance)}</p>
      </div>
      
      <div class="glass-card" style="background: var(--gradient-secondary); border: none; text-align: center; padding: var(--spacing-xl);">
        <p style="font-size: var(--text-sm); opacity: 0.9; margin-bottom: var(--spacing-xs);">Total Orders</p>
        <p style="font-size: var(--text-3xl); font-weight: 900;">24</p>
      </div>
      
      <div class="glass-card" style="background: var(--gradient-accent); border: none; text-align: center; padding: var(--spacing-xl);">
        <p style="font-size: var(--text-sm); opacity: 0.9; margin-bottom: var(--spacing-xs);">Learning Points</p>
        <p style="font-size: var(--text-3xl); font-weight: 900;">${points}</p>
      </div>
      
      <div class="glass-card" style="background: var(--gradient-success); border: none; text-align: center; padding: var(--spacing-xl);">
        <p style="font-size: var(--text-sm); opacity: 0.9; margin-bottom: var(--spacing-xs);">Avg. Rating</p>
        <p style="font-size: var(--text-3xl); font-weight: 900;">4.9 <i class="fas fa-star" style="font-size: var(--text-lg);"></i></p>
      </div>
    </div>
    
    <!-- Quick Actions -->
    <div class="grid grid-2" style="gap: var(--spacing-lg);">
      <div class="glass-card">
        <h3 style="font-size: var(--text-2xl); font-weight: 700; margin-bottom: var(--spacing-md);">
          <i class="fas fa-wallet" style="color: var(--primary);"></i> Quick Actions
        </h3>
        <div style="display: flex; flex-direction: column; gap: var(--spacing-sm);">
          <button class="btn btn-primary" onclick="showWithdrawalForm()">
            <i class="fas fa-money-bill-wave"></i> Withdraw Balance
          </button>
          <button class="btn btn-secondary" onclick="switchDashboardTab('ecourse')">
            <i class="fas fa-graduation-cap"></i> Continue Learning
          </button>
        </div>
      </div>
      
      <div class="glass-card">
        <h3 style="font-size: var(--text-2xl); font-weight: 700; margin-bottom: var(--spacing-md);">
          <i class="fas fa-trophy" style="color: var(--accent);"></i> Achievements
        </h3>
        <div style="display: flex; flex-direction: column; gap: var(--spacing-sm);">
          <div style="padding: var(--spacing-sm); background: var(--surface); border-radius: var(--radius-md); display: flex; align-items: center; gap: var(--spacing-sm);">
            <i class="fas fa-medal" style="font-size: var(--text-2xl); color: #fbbf24;"></i>
            <div>
              <p style="font-weight: 600;">Top Rated Seller</p>
              <p style="font-size: var(--text-sm); color: var(--text-muted);">Maintain 4.8+ rating</p>
            </div>
          </div>
          <div style="padding: var(--spacing-sm); background: var(--surface); border-radius: var(--radius-md); display: flex; align-items: center; gap: var(--spacing-sm);">
            <i class="fas fa-fire" style="font-size: var(--text-2xl); color: #f97316;"></i>
            <div>
              <p style="font-weight: 600;">Fast Responder</p>
              <p style="font-size: var(--text-sm); color: var(--text-muted);">Reply within 1 hour</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderBalanceTab() {
    const balance = Storage.getBalance();

    return `
    <div class="grid grid-2" style="gap: var(--spacing-xl);">
      <div>
        <div class="glass-card" style="background: var(--gradient-primary); border: none; text-align: center; padding: var(--spacing-2xl); margin-bottom: var(--spacing-lg);">
          <p style="font-size: var(--text-lg); opacity: 0.9; margin-bottom: var(--spacing-sm);">Unclaimed Balance</p>
          <p style="font-size: var(--text-4xl); font-weight: 900; margin-bottom: var(--spacing-lg);">${formatCurrency(balance)}</p>
          <button class="btn btn-secondary" onclick="showWithdrawalForm()" style="padding: 0.875rem 2rem;">
            <i class="fas fa-money-bill-wave"></i> Withdraw Now
          </button>
        </div>
        
        <div class="glass-card">
          <h3 style="font-size: var(--text-xl); font-weight: 700; margin-bottom: var(--spacing-md);">Withdrawal Info</h3>
          <div style="display: flex; flex-direction: column; gap: var(--spacing-sm); color: var(--text-secondary);">
            <p><i class="fas fa-info-circle" style="color: var(--primary);"></i> Minimum withdrawal: IDR 50,000</p>
            <p><i class="fas fa-clock" style="color: var(--accent);"></i> Processing time: 1-3 business days</p>
            <p><i class="fas fa-percentage" style="color: var(--secondary);"></i> Platform fee: 10% (already deducted)</p>
          </div>
        </div>
      </div>
      
      <div>
        <h3 style="font-size: var(--text-2xl); font-weight: 700; margin-bottom: var(--spacing-lg);">Withdrawal History</h3>
        ${renderWithdrawalHistory()}
      </div>
    </div>
  `;
}

function renderECourseTab() {
    return renderCourses();
}

function renderAnalyticsTab() {
    return `
    <div class="grid grid-2" style="gap: var(--spacing-lg);">
      <div class="glass-card">
        <h3 style="font-size: var(--text-2xl); font-weight: 700; margin-bottom: var(--spacing-lg);">Earnings Overview</h3>
        <div style="height: 300px; background: var(--surface); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center;">
          <div style="text-align: center;">
            <i class="fas fa-chart-line" style="font-size: 4rem; color: var(--text-muted); margin-bottom: var(--spacing-md);"></i>
            <p style="color: var(--text-secondary);">Earnings chart visualization</p>
            <p style="font-size: var(--text-sm); color: var(--text-muted);">(Demo - would show actual chart)</p>
          </div>
        </div>
      </div>
      
      <div class="glass-card">
        <h3 style="font-size: var(--text-2xl); font-weight: 700; margin-bottom: var(--spacing-lg);">Service Views</h3>
        <div style="height: 300px; background: var(--surface); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center;">
          <div style="text-align: center;">
            <i class="fas fa-eye" style="font-size: 4rem; color: var(--text-muted); margin-bottom: var(--spacing-md);"></i>
            <p style="color: var(--text-secondary);">Views analytics</p>
            <p style="font-size: var(--text-sm); color: var(--text-muted);">(Demo - would show actual stats)</p>
          </div>
        </div>
      </div>
      
      <div class="glass-card">
        <h3 style="font-size: var(--text-2xl); font-weight: 700; margin-bottom: var(--spacing-lg);">Performance Metrics</h3>
        <div style="display: flex; flex-direction: column; gap: var(--spacing-md);">
          ${renderMetric('Response Rate', '98%', 'var(--gradient-success)')}
          ${renderMetric('Order Completion', '96%', 'var(--gradient-primary)')}
          ${renderMetric('On-Time Delivery', '94%', 'var(--gradient-accent)')}
        </div>
      </div>
      
      <div class="glass-card">
        <h3 style="font-size: var(--text-2xl); font-weight: 700; margin-bottom: var(--spacing-lg);">Recent Activity</h3>
        <div style="display: flex; flex-direction: column; gap: var(--spacing-sm);">
          ${renderActivity('New order received', '2 hours ago')}
          ${renderActivity('Order completed', '5 hours ago')}
          ${renderActivity('Review received (5★)', '1 day ago')}
          ${renderActivity('Balance updated', '2 days ago')}
        </div>
      </div>
    </div>
  `;
}

function renderMetric(label, value, gradient) {
    return `
    <div style="padding: var(--spacing-md); background: ${gradient}; border-radius: var(--radius-md);">
      <p style="font-size: var(--text-sm); opacity: 0.9; margin-bottom: var(--spacing-xs);">${label}</p>
      <p style="font-size: var(--text-3xl); font-weight: 900;">${value}</p>
    </div>
  `;
}

function renderActivity(text, time) {
    return `
    <div style="padding: var(--spacing-sm); background: var(--surface); border-radius: var(--radius-md); display: flex; justify-content: space-between; align-items: center;">
      <p>${text}</p>
      <p style="font-size: var(--text-sm); color: var(--text-muted);">${time}</p>
    </div>
  `;
}
