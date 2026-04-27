export function renderFooter() {
    return `
    <div class="container grid grid-cols-4">
        <div>
            <h3 style="color: var(--primary-color); display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                <i class="fas fa-leaf"></i> EcoHub
            </h3>
            <p style="color: var(--text-muted); font-size: 0.875rem;">Stay Informed. Take Action. Build a Greener Future.</p>
        </div>
        <div>
            <h4 style="margin-bottom: 1rem;">Quick Links</h4>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem;">
                <li><a href="#/news" style="color: var(--text-muted); font-size: 0.875rem;">Eco News</a></li>
                <li><a href="#/action" style="color: var(--text-muted); font-size: 0.875rem;">Take Action</a></li>
                <li><a href="#/campaigns" style="color: var(--text-muted); font-size: 0.875rem;">Campaigns</a></li>
            </ul>
        </div>
        <div>
            <h4 style="margin-bottom: 1rem;">Legal & About</h4>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem;">
                <li><a href="#/about" style="color: var(--text-muted); font-size: 0.875rem;">About Us</a></li>
                <li><a href="#/contact" style="color: var(--text-muted); font-size: 0.875rem;">Contact</a></li>
            </ul>
        </div>
        <div>
            <h4 style="margin-bottom: 1rem;">Newsletter</h4>
            <div style="display: flex; gap: 0.5rem;">
                <input type="email" placeholder="Your Email" class="form-control" style="padding: 0.25rem 0.5rem;" />
                <button class="btn btn-primary btn-sm" onclick="window.showToast('Subscribed!')">Subscribe</button>
            </div>
            <div style="margin-top: 1rem; display: flex; gap: 1rem; font-size: 1.25rem; color: var(--text-muted);">
                <i class="fab fa-twitter" style="cursor:pointer"></i>
                <i class="fab fa-instagram" style="cursor:pointer"></i>
                <i class="fab fa-facebook" style="cursor:pointer"></i>
            </div>
        </div>
    </div>
    <div style="text-align: center; color: var(--text-muted); font-size: 0.75rem; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
        &copy; 2026 Eco News & Action Hub. Earth Day Every Day.
    </div>
    `;
}
