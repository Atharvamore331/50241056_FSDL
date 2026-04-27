import { db } from '../store.js';

export function renderResources() {
    const container = document.createElement('div');
    container.className = 'container section';
    
    container.innerHTML = `
        <div style="text-align: center; margin-bottom: 3rem;">
            <h2>Educational Resources</h2>
            <p style="color: var(--text-muted); max-width: 600px; margin: 0 auto;">
                Expand your knowledge with our curated list of guides, tools, and infographics.
            </p>
        </div>
        <div class="grid grid-cols-3" id="resources-grid"></div>
    `;

    const grid = container.querySelector('#resources-grid');

    function renderList() {
        grid.innerHTML = '';
        if (db.resources.length === 0) {
            grid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);"><i class="fas fa-book" style="font-size:3rem; margin-bottom:1rem; opacity:0.5;"></i><br>No educational resources available yet. Add them via the Admin Panel.</div>';
            return;
        }
        db.resources.forEach(res => {
            const card = document.createElement('div');
            card.className = 'card fade-in';
            card.style.textAlign = 'center';
            card.innerHTML = `
                <div class="card-body">
                    <div style="font-size: 3rem; color: var(--primary-color); margin-bottom: 1rem;">
                        <i class="fas ${res.type.includes('Guide') ? 'fa-file-pdf' : 'fa-tools'}"></i>
                    </div>
                    <span class="badge ${res.type.includes('Guide') ? 'badge-blue' : 'badge-green'}" style="margin-bottom:0.5rem;">${res.type}</span>
                    <h3 class="card-title">${res.title}</h3>
                    <a href="${res.url === '#' ? 'javascript:void(0)' : res.url}" class="btn btn-outline resource-link" ${res.url !== '#' ? 'target="_blank"' : ''} style="margin-top:1rem;">Access Resource</a>
                </div>
            `;
            grid.appendChild(card);
        });

        grid.querySelectorAll('.resource-link').forEach(link => {
            if (link.getAttribute('href') === 'javascript:void(0)') {
                link.addEventListener('click', () => {
                    window.showToast('This is a mock resource link!', 'success');
                });
            }
        });
    }
    
    renderList();
    return container;
}
