import { db, toggleSavedArticle, userState } from '../store.js';

export function renderNews() {
    const container = document.createElement('div');
    container.className = 'container section';
    
    // Base layout with search and filter
    container.innerHTML = `
        <div class="flex justify-between items-center" style="margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
            <h2>Latest Eco News</h2>
            <div class="flex gap-2">
                <input type="text" id="news-search" class="form-control" placeholder="Search news..." style="width: 250px;">
                <select id="news-category" class="form-control" style="width: 200px;">
                    <option value="All">All Categories</option>
                    <option value="Climate Change">Climate Change</option>
                    <option value="Pollution">Pollution</option>
                    <option value="Wildlife">Wildlife</option>
                    <option value="Water Conservation">Water Conservation</option>
                    <option value="Renewable Energy">Renewable Energy</option>
                </select>
            </div>
        </div>
        <div id="news-grid" class="grid grid-cols-3"></div>
    `;

    const grid = container.querySelector('#news-grid');
    const searchInput = container.querySelector('#news-search');
    const categorySelect = container.querySelector('#news-category');

    function renderCards() {
        const query = searchInput.value.toLowerCase();
        const cat = categorySelect.value;
        
        const filtered = db.news.filter(n => {
            const matchQ = n.title.toLowerCase().includes(query) || n.summary.toLowerCase().includes(query);
            const matchC = cat === 'All' || n.category === cat;
            return matchQ && matchC;
        });

        grid.innerHTML = '';
        if (filtered.length === 0) {
            grid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);"><i class="fas fa-folder-open" style="font-size:3rem; margin-bottom:1rem; opacity:0.5;"></i><br>No articles found.</div>';
            return;
        }

        filtered.forEach(article => {
            const isSaved = userState.savedArticles.includes(article.id);
            const card = document.createElement('div');
            card.className = 'card fade-in';
            card.innerHTML = `
                <img src="${article.image}" class="card-img-top" alt="${article.title}">
                <div class="card-body">
                    <div class="flex justify-between items-center" style="margin-bottom:0.5rem;">
                        <span class="badge badge-green">${article.category}</span>
                        ${article.trending ? '<span class="badge badge-red"><i class="fas fa-fire"></i> Trending</span>' : ''}
                    </div>
                    <h3 class="card-title">${article.title}</h3>
                    <p class="card-text">${article.summary}</p>
                    <div style="font-size:0.875rem; color:var(--text-muted); margin-bottom:1rem;"><i class="far fa-calendar-alt"></i> ${article.date}</div>
                    
                    <div class="card-footer">
                        <button class="btn btn-primary btn-sm read-btn" data-id="${article.id}">Read More</button>
                        <button class="btn btn-outline btn-sm save-btn" data-id="${article.id}" style="${isSaved ? 'background:var(--primary-color); color:white;' : ''}">
                            <i class="${isSaved ? 'fas' : 'far'} fa-bookmark"></i>
                        </button>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });

        // Add Listeners
        grid.querySelectorAll('.save-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.getAttribute('data-id'));
                const res = toggleSavedArticle(id);
                if (res.success) {
                    window.showToast(res.msg, 'success');
                    renderCards(); // Re-render to update icon state
                } else {
                    window.showToast(res.msg, 'error');
                }
            });
        });

        grid.querySelectorAll('.read-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                window.location.hash = `#/news/${id}`;
            });
        });
    }

    searchInput.addEventListener('input', renderCards);
    categorySelect.addEventListener('change', renderCards);
    
    renderCards();
    return container;
}
