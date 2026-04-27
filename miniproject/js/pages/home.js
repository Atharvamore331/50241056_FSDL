import { db } from '../store.js';

export function renderHome() {
    const container = document.createElement('div');
    
    // Calculate stats
    const articleCount = db.news.length;
    const campaignCount = db.campaigns.length;
    let participants = db.campaigns.reduce((sum, c) => sum + (c.registered || 0), 0);
    
    container.innerHTML = `
        <!-- Hero Section -->
        <section style="background: linear-gradient(rgba(47, 133, 90, 0.8), rgba(39, 103, 73, 0.9)), url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80') center/cover; padding: 6rem 0; color: white; text-align: center;">
            <div class="container fade-in">
                <h1 style="font-size: 3rem; font-weight: 700; margin-bottom: 1rem;">Stay Informed. Take Action. Build a Greener Future.</h1>
                <p style="font-size: 1.25rem; font-weight: 300; margin-bottom: 2rem; max-width: 800px; margin-left: auto; margin-right: auto;">
                    Your central hub for environmental news, community campaigns, and personal sustainability tracking.
                </p>
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <a href="#/news" class="btn btn-primary" style="background-color: white; color: var(--primary-color);">Explore News</a>
                    <a href="#/action" class="btn btn-outline" style="border-color: white; color: white;">Take Action</a>
                    <a href="#/community" class="btn btn-outline" style="border-color: white; color: white;">Join Community</a>
                </div>
            </div>
        </section>

        <!-- Stats Section -->
        <section class="section" style="background-color: var(--surface-color); border-bottom: 1px solid var(--border-color);">
            <div class="container grid grid-cols-4" style="text-align: center;">
                <div>
                    <div style="font-size: 2.5rem; font-weight: 700; color: var(--primary-color);">${articleCount}+</div>
                    <div style="color: var(--text-muted); font-weight: 500;">Eco Articles</div>
                </div>
                <div>
                    <div style="font-size: 2.5rem; font-weight: 700; color: var(--primary-color);">${campaignCount}</div>
                    <div style="color: var(--text-muted); font-weight: 500;">Active Campaigns</div>
                </div>
                <div>
                    <div style="font-size: 2.5rem; font-weight: 700; color: var(--primary-color);">${participants}</div>
                    <div style="color: var(--text-muted); font-weight: 500;">Volunteers</div>
                </div>
                <div>
                    <div style="font-size: 2.5rem; font-weight: 700; color: var(--primary-color);">10K+</div>
                    <div style="color: var(--text-muted); font-weight: 500;">Actions Completed</div>
                </div>
            </div>
        </section>

        <!-- Featured Areas -->
        <section class="section container">
            <h2 style="text-align: center; margin-bottom: 3rem; font-size: 2rem;">How It Works</h2>
            <div class="grid grid-cols-3">
                <div class="card" style="text-align: center; border: none; background: transparent; box-shadow: none;">
                    <div style="width: 80px; height: 80px; background-color: rgba(47, 133, 90, 0.1); color: var(--primary-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 1.5rem;">
                        <i class="fas fa-newspaper"></i>
                    </div>
                    <h3>Read the Latest</h3>
                    <p style="color: var(--text-muted);">Stay updated with reliable news about climate, conservation, and pollution.</p>
                </div>
                <div class="card" style="text-align: center; border: none; background: transparent; box-shadow: none;">
                    <div style="width: 80px; height: 80px; background-color: rgba(47, 133, 90, 0.1); color: var(--primary-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 1.5rem;">
                        <i class="fas fa-hands-helping"></i>
                    </div>
                    <h3>Take Local Action</h3>
                    <p style="color: var(--text-muted);">Find actionable sustainability tasks and build a long-term eco-habit.</p>
                </div>
                <div class="card" style="text-align: center; border: none; background: transparent; box-shadow: none;">
                    <div style="width: 80px; height: 80px; background-color: rgba(47, 133, 90, 0.1); color: var(--primary-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 1.5rem;">
                        <i class="fas fa-users"></i>
                    </div>
                    <h3>Join Events</h3>
                    <p style="color: var(--text-muted);">Participate in online or offline cleanup drives and tree-planting campaigns.</p>
                </div>
            </div>
        </section>
    `;
    return container;
}
