import { renderNavbar, setupNavbarControls } from './components/navbar.js';
import { renderFooter } from './components/footer.js';

// Wait until pages are created before importing them fully,
// I'll create stub placeholders below for pages, and we will flesh them out later.
import { renderHome } from './pages/home.js';
import { renderNews } from './pages/news.js';
import { renderNewsDetail } from './pages/newsDetail.js';
import { renderAction } from './pages/action.js';
import { renderCampaigns } from './pages/campaigns.js';
import { renderCommunity } from './pages/community.js';
import { renderResources } from './pages/resources.js';
import { renderAbout } from './pages/about.js';
import { renderContact } from './pages/contact.js';
import { renderLogin, renderSignup } from './pages/auth.js';
import { renderDashboard } from './pages/dashboard.js';
import { renderAdmin } from './pages/admin.js';

import { initStore, userState } from './store.js';

const routes = {
    '/': renderHome,
    '/news': renderNews,
    '/action': renderAction,
    '/campaigns': renderCampaigns,
    '/community': renderCommunity,
    '/resources': renderResources,
    '/about': renderAbout,
    '/contact': renderContact,
    '/login': renderLogin,
    '/signup': renderSignup,
    '/dashboard': renderDashboard,
    '/admin': renderAdmin,
};

const appContainer = document.getElementById('app');

function router() {
    let hash = window.location.hash.slice(1);
    let basePath = hash ? hash.split('?')[0] : '/'; 

    if (!userState.isLoggedIn && basePath !== '/login' && basePath !== '/signup') {
        window.location.hash = '#/login';
        return;
    }
    
    let basePath = hash.split('?')[0]; 
    
    if (basePath === '/admin' && (!userState.isLoggedIn || userState.user.role !== 'admin')) {
        window.showToast('Access Denied. Admins only.', 'error');
        window.location.hash = userState.isLoggedIn ? '#/dashboard' : '#/login';
        return;
    }

    let renderFunc = routes[basePath];

    if(basePath.split('/').length > 2 && basePath.startsWith('/news')) {
        renderFunc = renderNewsDetail;
    } else if (!renderFunc) {
        renderFunc = renderHome;
    }

    window.scrollTo(0, 0);

    // Initial render layout (Loader)
    appContainer.innerHTML = '<div class="section flex justify-center items-center"><div style="font-size:1.5rem; color:var(--primary-color);"><i class="fas fa-spinner fa-spin"></i> Loading...</div></div>';
    
    // Render
    setTimeout(() => {
        appContainer.innerHTML = '';
        const page = renderFunc(hash);
        if (page instanceof HTMLElement) {
            appContainer.appendChild(page);
        } else {
            appContainer.innerHTML = page;
        }
        
        appContainer.firstElementChild?.classList.add('fade-in');
        
        // Update nav active link
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.getAttribute('href') === `#${basePath}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        // Close mobile nav if open
        const navList = document.querySelector('.navbar-nav');
        if (navList && navList.classList.contains('show')) {
            navList.classList.remove('show');
        }

    }, 50);
}

// Global Toast Window Method
window.showToast = (message, type = 'success') => {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};

function initApp() {
    initStore();
    
    const navEl = document.getElementById('navbar');
    const footEl = document.getElementById('footer');
    
    window.renderAppShell = () => {
        if (userState.isLoggedIn) {
            navEl.style.display = 'block';
            footEl.style.display = 'block';
            if (navEl.innerHTML === '') {
                navEl.innerHTML = renderNavbar();
                footEl.innerHTML = renderFooter();
                setupNavbarControls();
            }
        } else {
            navEl.style.display = 'none';
            footEl.style.display = 'none';
            navEl.innerHTML = '';
            footEl.innerHTML = '';
        }
    };

    renderAppShell();
    
    window.addEventListener('hashchange', () => {
        renderAppShell();
        router();
    });
    window.addEventListener('load', () => {
        renderAppShell();
        router();
    });
    
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    window.addEventListener('scroll', () => {
        const stt = document.getElementById('scroll-to-top');
        if (stt) {
            if (window.scrollY > 300) stt.classList.add('show');
            else stt.classList.remove('show');
        }
    });
    
    const sttBtn = document.getElementById('scroll-to-top');
    if (sttBtn) {
        sttBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

document.addEventListener('DOMContentLoaded', initApp);
