import { userState } from '../store.js';

export function renderNavbar() {
    return `
    <div class="container">
        <a href="#/" class="navbar-brand">
            <i class="fas fa-leaf"></i> EcoHub
        </a>
        <button class="mobile-menu-btn" id="mobile-menu-toggle">
            <i class="fas fa-bars"></i>
        </button>
        <ul class="navbar-nav" id="nav-list">
            <li><a href="#/" class="nav-link">Home</a></li>
            <li><a href="#/news" class="nav-link">News</a></li>
            <li><a href="#/action" class="nav-link">Take Action</a></li>
            <li><a href="#/campaigns" class="nav-link">Campaigns</a></li>
            <li><a href="#/community" class="nav-link">Community</a></li>
            <li><a href="#/resources" class="nav-link">Resources</a></li>
            
            ${userState.isLoggedIn ? `
                <li><a href="#/dashboard" class="nav-link" style="color:var(--primary-color); font-weight:600;"><i class="fas fa-user-circle"></i> ${userState.user.name}</a></li>
                <li><a href="#/logout" class="nav-link" id="logout-btn">Logout</a></li>
            ` : `
                <li><a href="#/login" class="nav-link btn btn-sm btn-outline" style="margin-left:1rem;">Login</a></li>
                <li><a href="#/signup" class="nav-link btn btn-sm btn-primary" style="color:white; border:none;">Sign Up</a></li>
            `}
            
            <li>
                <button id="theme-toggle" title="Toggle Dark/Light Mode" style="background:none; border:none; color:inherit; font-size:1.2rem; cursor:pointer;">
                    <i class="fas fa-moon"></i>
                </button>
            </li>
        </ul>
    </div>
    `;
}

export function setupNavbarControls() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const navList = document.getElementById('nav-list');
    const themeBtn = document.getElementById('theme-toggle');
    
    // Setup toggle icon dynamically
    if (localStorage.getItem('theme') === 'dark') {
        themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            navList.classList.toggle('show');
        });
    }
    
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const root = document.documentElement;
            if (root.getAttribute('data-theme') === 'dark') {
                root.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
            } else {
                root.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
            }
        });
    }

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            userState.isLoggedIn = false;
            userState.user = null;
            localStorage.setItem('ecoUser', JSON.stringify(userState));
            window.showToast('Logged out successfully');
            document.getElementById('navbar').innerHTML = renderNavbar();
            setupNavbarControls();
            window.location.hash = '#/';
        });
    }
}
