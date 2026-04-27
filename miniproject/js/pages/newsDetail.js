import { db, userState, toggleSavedArticle } from '../store.js';

export function renderNewsDetail(route) {
    const container = document.createElement('div');
    container.className = 'container section fade-in';
    
    // route is like "/news/123"
    const parts = route.split('/');
    const id = parseInt(parts[2]);
    
    const article = db.news.find(a => a.id === id);
    if (!article) {
        container.innerHTML = `
            <div style="text-align: center; padding: 4rem;">
                <h2>Article not found</h2>
                <a href="#/news" class="btn btn-primary" style="margin-top: 1rem;">Back to News</a>
            </div>
        `;
        return container;
    }

    const isSaved = userState.savedArticles.includes(article.id);
    
    container.innerHTML = `
        <div style="max-width: 800px; margin: 0 auto;">
            <a href="#/news" class="btn btn-outline btn-sm" style="margin-bottom: 2rem;"><i class="fas fa-arrow-left"></i> Back to News</a>
            
            <div style="margin-bottom: 1rem;">
                <span class="badge badge-green">${article.category}</span>
                ${article.trending ? '<span class="badge badge-red"><i class="fas fa-fire"></i> Trending</span>' : ''}
                <span style="color:var(--text-muted); font-size:0.875rem; margin-left:1rem;"><i class="far fa-calendar-alt"></i> ${article.date}</span>
            </div>
            
            <h1 style="font-size: 2.5rem; margin-bottom: 1.5rem; color: var(--primary-color);">${article.title}</h1>
            
            <img src="${article.image}" alt="${article.title}" style="width: 100%; border-radius: var(--border-radius-xl); margin-bottom: 2rem; box-shadow: var(--shadow-sm);">
            
            <div style="font-size: 1.125rem; line-height: 1.8; color: var(--text-main); margin-bottom: 3rem;">
                <!-- Using summary as main text since it's just dummy input -->
                <p style="font-weight: 500; font-size: 1.25rem; margin-bottom:1.5rem;">${article.summary}</p>
                <p style="margin-bottom: 1rem;">This details page is fully functional. Any new news items created via the admin panel will automatically populate a dedicated URL just like this one.</p>
                <p>Thank you for contributing to a greener future by submitting information into the dynamic database!</p>
            </div>
            
            <div style="border-top: 1px solid var(--border-color); padding-top: 2rem; display: flex; justify-content: space-between; align-items: center;">
                <button class="btn ${isSaved ? 'btn-primary' : 'btn-outline'} save-btn" data-id="${article.id}">
                    <i class="${isSaved ? 'fas' : 'far'} fa-bookmark"></i> ${isSaved ? 'Saved' : 'Save Article'}
                </button>
                <div style="display:flex; gap:1rem;">
                    <button class="btn btn-outline btn-sm" onclick="window.showToast('Link copied!')"><i class="fas fa-share-alt"></i> Share</button>
                </div>
            </div>
        </div>
    `;

    container.querySelector('.save-btn').addEventListener('click', (e) => {
        const btn = e.currentTarget;
        const res = toggleSavedArticle(id);
        if(res.success) {
            window.showToast(res.msg, 'success');
            if(res.saved) {
                btn.className = 'btn btn-primary save-btn';
                btn.innerHTML = `<i class="fas fa-bookmark"></i> Saved`;
            } else {
                btn.className = 'btn btn-outline save-btn';
                btn.innerHTML = `<i class="far fa-bookmark"></i> Save Article`;
            }
        } else {
            window.showToast(res.msg, 'error');
        }
    });

    return container;
}
