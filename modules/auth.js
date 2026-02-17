// ====================================
// JASUKE HUB - AUTHENTICATION MODULE
// ====================================

let currentUser = Storage.getUser();

// Open Login Modal
function openAuthModal() {
    document.getElementById('authModal').classList.add('active');
    showLoginForm();
}

// Close Login Modal
function closeAuthModal() {
    document.getElementById('authModal').classList.remove('active');
}

// Show Login Form
function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('authTitle').textContent = 'Welcome Back';
}

// Show Register Form
function showRegisterForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('authTitle').textContent = 'Create Account';
}

// Handle Login
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Mock authentication - in production, this would be an API call
    const user = {
        name: email.split('@')[0],
        email: email,
        role: 'buyer', // Default to buyer
        avatar: email[0].toUpperCase() + email[1].toUpperCase()
    };

    Storage.setUser(user);
    currentUser = user;

    closeAuthModal();
    updateNavigation();

    // Show success message
    alert('Login successful! Welcome to Jasuke Hub.');

    // Reload current page
    if (window.currentRoute) {
        navigateTo(window.currentRoute);
    }
});

// Handle Registration
document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const role = document.getElementById('registerRole').value;

    if (!role) {
        alert('Please select your role');
        return;
    }

    // Create user
    const user = {
        name: name,
        email: email,
        role: role,
        avatar: name.split(' ').map(n => n[0]).join('').toUpperCase()
    };

    Storage.setUser(user);
    currentUser = user;

    closeAuthModal();
    updateNavigation();

    // Show success message
    alert(`Account created successfully! Welcome to Jasuke Hub, ${name}!`);

    // Navigate based on role
    if (role === 'seller' || role === 'both') {
        navigateTo('dashboard');
    } else {
        navigateTo('home');
    }
});

// Handle Logout
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        Storage.clearUser();
        currentUser = null;
        updateNavigation();
        navigateTo('home');
    }
}

// Update Navigation based on auth state
function updateNavigation() {
    const user = Storage.getUser();

    if (user) {
        // Hide login, show profile
        document.getElementById('navLogin').style.display = 'none';
        document.getElementById('navProfile').style.display = 'block';
        document.getElementById('userNameDisplay').textContent = user.name;

        // Show appropriate menu items
        if (user.role === 'buyer' || user.role === 'both') {
            document.getElementById('navOrders').style.display = 'block';
        } else {
            document.getElementById('navOrders').style.display = 'none';
        }

        if (user.role === 'seller' || user.role === 'both') {
            document.getElementById('navDashboard').style.display = 'block';
        } else {
            document.getElementById('navDashboard').style.display = 'none';
        }
    } else {
        // Show login, hide profile
        document.getElementById('navLogin').style.display = 'block';
        document.getElementById('navProfile').style.display = 'none';
        document.getElementById('navOrders').style.display = 'none';
        document.getElementById('navDashboard').style.display = 'none';
    }
}

// Check login status
function requireLogin() {
    const user = Storage.getUser();
    if (!user) {
        openAuthModal();
        return false;
    }
    return true;
}

// Event Listeners
document.getElementById('loginBtn').addEventListener('click', openAuthModal);
document.getElementById('logoutBtn').addEventListener('click', logout);

// Initialize
updateNavigation();
