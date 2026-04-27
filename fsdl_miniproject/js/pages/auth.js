import { userState } from '../store.js';

export function renderLogin() {
    return renderAuthPage(true);
}

export function renderSignup() {
    return renderAuthPage(false);
}

function renderAuthPage(isLogin) {
    const container = document.createElement('div');
    container.className = 'container section fade-in flex justify-center items-center';
    container.style.minHeight = '80vh';
    
    let isAdminMode = false;
    
    function buildForm() {
        return `
            <div class="card" style="width: 100%; max-width: 450px; padding: 2.5rem; text-align: center;">
                <h2 style="color: var(--primary-color); margin-bottom: 0.5rem;"><i class="fas fa-leaf"></i> EcoHub</h2>
                
                ${isLogin ? `
                    <div style="display:flex; background:rgba(0,0,0,0.05); border-radius:100px; margin: 2rem 0; padding:0.35rem;">
                        <div id="btn-user-mode" style="flex:1; padding:0.65rem; cursor:pointer; font-weight:600; font-size:0.9rem; border-radius:100px; transition:all 0.3s; background:${!isAdminMode ? 'white' : 'transparent'}; box-shadow:${!isAdminMode ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'};">User Login</div>
                        <div id="btn-admin-mode" style="flex:1; padding:0.65rem; cursor:pointer; font-weight:600; font-size:0.9rem; border-radius:100px; transition:all 0.3s; background:${isAdminMode ? 'var(--primary-color)' : 'transparent'}; color:${isAdminMode ? 'white' : 'inherit'}; box-shadow:${isAdminMode ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'};">Admin Login</div>
                    </div>
                ` : `<h3 style="margin: 1.5rem 0;">Create an Account</h3>`}
                
                <form id="auth-form" style="text-align: left;">
                    ${(!isLogin) ? `
                    <div class="form-group">
                        <label class="form-label">Full Name</label>
                        <input type="text" id="auth-name" class="form-control" required placeholder="John Doe">
                    </div>
                    ` : ''}
                    <div class="form-group">
                        <label class="form-label">Email Address</label>
                        <input type="email" id="auth-email" class="form-control" ${isAdminMode ? 'value="admin@ecohub.com" readonly' : 'placeholder="user@example.com"'} required style="${isAdminMode ? 'background:#f9f9f9; color:#888; cursor:not-allowed;' : ''}">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Password</label>
                        <input type="password" id="auth-pass" class="form-control" required placeholder="••••••••" ${isAdminMode ? 'value="admin123"' : ''}>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block" style="margin-top: 1.5rem; padding: 0.8rem; font-size:1.1rem;">
                        ${isLogin ? (isAdminMode ? '<i class="fas fa-shield-alt"></i> Access Admin Dashboard' : 'Login') : 'Sign Up'}
                    </button>
                </form>
                
                <div style="margin-top: 2rem; color: var(--text-muted); font-size:0.9rem;">
                    ${isLogin ? 
                        'Don\'t have an account? <a href="#/signup" style="color:var(--primary-color); font-weight:600;">Sign Up</a>' : 
                        'Already have an account? <a href="#/login" style="color:var(--primary-color); font-weight:600;">Login</a>'
                    }
                </div>
            </div>
        `;
    }

    function initListeners() {
        if(isLogin) {
            const btnUser = container.querySelector('#btn-user-mode');
            const btnAdmin = container.querySelector('#btn-admin-mode');
            
            btnUser.addEventListener('click', () => {
                if(isAdminMode) {
                    isAdminMode = false;
                    container.innerHTML = buildForm();
                    initListeners();
                }
            });
            btnAdmin.addEventListener('click', () => {
                if(!isAdminMode) {
                    isAdminMode = true;
                    container.innerHTML = buildForm();
                    initListeners();
                }
            });
        }

        container.querySelector('#auth-form').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = container.querySelector('#auth-email').value;
            const nameEl = container.querySelector('#auth-name');
            const name = nameEl ? nameEl.value : (isAdminMode ? 'System Administrator' : email.split('@')[0]);
            const role = isAdminMode ? 'admin' : (email.toLowerCase() === 'admin@ecohub.com' ? 'admin' : 'user');
            
            userState.isLoggedIn = true;
            userState.user = {
                name: name,
                email: email,
                points: isLogin ? 120 : 0,
                role: role
            };
            
            import('../store.js').then(store => {
                store.saveUserState();
                window.showToast(`${isLogin ? (isAdminMode ? 'Admin authentication successful!' : 'Logged in successfully!') : 'Account created'}`, 'success');
                
                // Route manually here, hashchange will automatically update AppShell (navbar/footer)
                window.location.hash = isAdminMode ? '#/admin' : '#/dashboard';
            });
        });
    }

    container.innerHTML = buildForm();
    initListeners();

    return container;
}
