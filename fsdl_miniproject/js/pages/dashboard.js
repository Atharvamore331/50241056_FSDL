import { db, userState } from '../store.js';

export function renderDashboard() {
    const container = document.createElement('div');
    container.className = 'container section fade-in';
    
    if (!userState.isLoggedIn) {
        container.innerHTML = `
            <div style="text-align:center; padding: 4rem;">
                <h2>Please log in to view your dashboard</h2>
                <a href="#/login" class="btn btn-primary" style="margin-top:1rem;">Login</a>
            </div>
        `;
        return container;
    }

    const { user, savedArticles, completedActions, joinedCampaigns } = userState;
    const progress = Math.min((user.points / 500) * 100, 100);

    // Get actual details
    const myArticles = db.news.filter(n => savedArticles.includes(n.id));
    const myCamps = db.campaigns.filter(c => joinedCampaigns.includes(c.id));
    
    container.innerHTML = `
        <div class="flex justify-between items-center" style="margin-bottom: 2rem;">
            <div>
                <h2>Welcome back, ${user.name}!</h2>
                <p style="color: var(--text-muted);">Here's a summary of your eco-impact.</p>
            </div>
            ${user.role === 'admin' ? '<a href="#/admin" class="btn btn-outline btn-sm">Admin Panel</a>' : ''}
        </div>
        
        <!-- Stats summary -->
        <div class="grid grid-cols-4" style="margin-bottom: 3rem;">
            <div class="card" style="text-align:center;">
                <div class="card-body">
                    <h3 style="font-size:2rem; color:var(--primary-color);">${user.points}</h3>
                    <div style="color:var(--text-muted);">Eco Points</div>
                </div>
            </div>
            <div class="card" style="text-align:center;">
                <div class="card-body">
                    <h3 style="font-size:2rem; color:var(--primary-color);">${completedActions.length}</h3>
                    <div style="color:var(--text-muted);">Actions Completed</div>
                </div>
            </div>
            <div class="card" style="text-align:center;">
                <div class="card-body">
                    <h3 style="font-size:2rem; color:var(--primary-color);">${joinedCampaigns.length}</h3>
                    <div style="color:var(--text-muted);">Campaigns Joined</div>
                </div>
            </div>
            <div class="card" style="text-align:center;">
                <div class="card-body">
                    <h3 style="font-size:2rem; color:var(--primary-color);">${savedArticles.length}</h3>
                    <div style="color:var(--text-muted);">Articles Saved</div>
                </div>
            </div>
        </div>

        <div style="margin-bottom: 3rem;">
            <h3>Eco Level Progress</h3>
            <div style="background:var(--border-color); height:20px; border-radius:10px; margin-top:1rem; overflow:hidden;">
                <div style="width:${progress}%; height:100%; background:var(--primary-color); border-radius:10px; transition:width 1s ease;"></div>
            </div>
            <div class="flex justify-between" style="font-size:0.875rem; color:var(--text-muted); margin-top:0.5rem;">
                <span>Seedling</span>
                <span>Forest Guardian (500 pts)</span>
            </div>
        </div>

        <div class="grid grid-cols-2" style="gap: 3rem;">
            <div>
                <h3 style="margin-bottom: 1.5rem;">Saved Articles</h3>
                ${myArticles.length === 0 ? '<p style="color:var(--text-muted);">No saved articles yet.</p>' : 
                    myArticles.map(a => `
                        <div class="card" style="margin-bottom:1rem; display:flex; flex-direction:row; overflow:hidden; box-shadow:none;">
                            <img src="${a.image}" style="width:100px; height:100px; object-fit:cover;">
                            <div style="padding:1rem;">
                                <h4 style="margin-bottom:0.25rem;">${a.title}</h4>
                                <a href="#/news" style="color:var(--primary-color); font-size:0.875rem;">Read</a>
                            </div>
                        </div>
                    `).join('')
                }
            </div>
            <div>
                <h3 style="margin-bottom: 1.5rem;">Upcoming Events</h3>
                ${myCamps.length === 0 ? '<p style="color:var(--text-muted);">No campaigns joined yet.</p>' : 
                    myCamps.map(c => `
                        <div class="card" style="margin-bottom:1rem; padding:1rem; box-shadow:none;">
                            <div class="flex justify-between" style="margin-bottom:0.5rem;">
                                <h4 style="margin:0;">${c.title}</h4>
                                <span class="badge ${c.type === 'Online' ? 'badge-blue' : 'badge-green'}">${c.type}</span>
                            </div>
                            <div style="font-size:0.875rem; color:var(--text-muted);">
                                <div><i class="far fa-calendar-alt"></i> ${c.date}</div>
                                <div><i class="fas fa-map-marker-alt"></i> ${c.location}</div>
                            </div>
                        </div>
                    `).join('')
                }
            </div>
        </div>
    `;

    return container;
}
