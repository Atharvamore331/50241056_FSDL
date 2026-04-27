export function renderAbout() {
    const container = document.createElement('div');
    container.className = 'container section fade-in';
    
    container.innerHTML = `
        <div style="max-width: 800px; margin: 0 auto; text-align: center;">
            <h2 style="font-size: 2.5rem; margin-bottom: 1.5rem; color: var(--primary-color);">About EcoHub</h2>
            <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80" alt="Nature" style="border-radius: var(--border-radius-xl); margin-bottom: 2rem; box-shadow: var(--shadow-lg);">
            <p style="font-size: 1.1rem; color: var(--text-muted); line-height: 1.8; margin-bottom: 2rem;">
                Eco News & Action Hub was founded with a single mission: to bridge the gap between environmental awareness and actionable change. We believe that staying informed is only half the battle. By providing a platform where knowledge directly translates into local and global action, we empower individuals to make a tangible impact on our planet.
            </p>
            <div class="grid grid-cols-2" style="text-align: left; gap: 2rem; margin-top: 3rem;">
                <div class="card" style="padding: 1.5rem;">
                    <h3>Our Vision</h3>
                    <p style="color: var(--text-muted);">A world where sustainable living is not an alternative, but the standard way of life for communities everywhere.</p>
                </div>
                <div class="card" style="padding: 1.5rem;">
                    <h3>Our Mission</h3>
                    <p style="color: var(--text-muted);">To provide accessible, accurate environmental news while equipping our users with the tools they need to take meaningful action.</p>
                </div>
            </div>
        </div>
    `;
    return container;
}
