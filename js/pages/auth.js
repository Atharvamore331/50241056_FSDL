import { userState } from '../store.js';

function renderAuthPage(isLogin) {
    const container = document.createElement('div');
    container.className = 'container section fade-in flex justify-center items-center';
    container.style.minHeight = '70vh';
    
    container.innerHTML = `
        <div class="card" style="width: 100%; max-width: 400px; padding: 2rem; text-align: center;">
            <h2 style="color: var(--primary-color); margin-bottom: 0.5rem;"><i class="fas fa-leaf"></i> EcoHub</h2>
            <h3 style="margin-bottom: 2rem;">${isLogin ? 'Welcome Back' : 'Create an Account'}</h3>
            
            <form id="auth-form" style="text-align: left;">
                ${!isLogin ? `
                <div class="form-group">
                    <label class="form-label">Full Name</label>
                    <input type="text" id="auth-name" class="form-control" required placeholder="John Doe">
                </div>
                ` : ''}
                <div class="form-group">
                    <label class="form-label">Email</label>
                    <input type="email" id="auth-email" class="form-control" required placeholder="user@example.com">
                </div>
                <div class="form-group">
                    <label class="form-label">Password</label>
                    <input type="password" id="auth-pass" class="form-control" required placeholder="••••••••">
                </div>
                <button type="submit" class="btn btn-primary btn-block" style="margin-top: 1rem;">
                    ${isLogin ? 'Login' : 'Sign Up'}
                </button>
            </form>
            
            <div style="margin-top: 2rem; color: var(--text-muted);">
                ${isLogin ? 
                    'Don\'t have an account? <a href="#/signup" style="color:var(--primary-color); font-weight:600;">Sign Up</a>' : 
                    'Already have an account? <a href="#/login" style="color:var(--primary-color); font-weight:600;">Login</a>'
                }
            </div>
        </div>
    `;

    container.querySelector('#auth-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = container.querySelector('#auth-email').value;
        const name = isLogin ? email.split('@')[0] : container.querySelector('#auth-name').value;
        
        userState.isLoggedIn = true;
        userState.user = {
            name: name,
            email: email,
            points: isLogin ? 120 : 0
        };
        
        import('../store.js').then(store => {
            store.saveUserState();
            window.showToast(`${isLogin ? 'Logged in' : 'Account created'} successfully!`, 'success');
            
            // Trigger Navbar refresh by replacing HTML structure
            import('../components/navbar.js').then(nav => {
                document.getElementById('navbar').innerHTML = nav.renderNavbar();
                nav.setupNavbarControls();
                window.location.hash = '#/dashboard';
            });
        });
    });

    return container;
}

export function renderLogin() {
    return renderAuthPage(true);
}

export function renderSignup() {
    return renderAuthPage(false);
}
