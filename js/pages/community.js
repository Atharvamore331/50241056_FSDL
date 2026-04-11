import { db, userState } from '../store.js';

export function renderCommunity() {
    const container = document.createElement('div');
    container.className = 'container section';
    
    container.innerHTML = `
        <div class="flex justify-between items-center" style="margin-bottom: 2rem; flex-wrap:wrap; gap:1rem;">
            <div>
                <h2>Community Hub</h2>
                <p style="color:var(--text-muted);">Share your eco-friendly actions and inspire others.</p>
            </div>
            <button class="btn btn-primary" id="btn-share-story">Share Your Story</button>
        </div>
        
        <div class="grid grid-cols-2" id="community-grid"></div>
        
        <!-- Form Modal (Hidden by default) -->
        <div id="story-modal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100vh; background:rgba(0,0,0,0.5); z-index:1000; align-items:center; justify-content:center;">
            <div class="card fade-in" style="width: 100%; max-width: 500px; padding: 2rem; margin:1rem;">
                <h3 style="margin-bottom:1rem;">Share Your Contribution</h3>
                <div class="form-group">
                    <label class="form-label">Title</label>
                    <input type="text" id="s-title" class="form-control" placeholder="E.g. Cleaned up the local park!" />
                </div>
                <div class="form-group">
                    <label class="form-label">Category</label>
                    <select id="s-cat" class="form-control">
                        <option value="Sustainable Living">Sustainable Living</option>
                        <option value="Pollution">Pollution</option>
                        <option value="Wildlife">Wildlife</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Description</label>
                    <textarea id="s-desc" class="form-control" placeholder="Tell us about it..."></textarea>
                </div>
                <div class="flex justify-between" style="margin-top:2rem;">
                    <button class="btn btn-outline" id="s-cancel">Cancel</button>
                    <button class="btn btn-primary" id="s-submit">Post</button>
                </div>
            </div>
        </div>
    `;

    const grid = container.querySelector('#community-grid');
    const modal = container.querySelector('#story-modal');
    
    // Modal Listeners
    container.querySelector('#btn-share-story').addEventListener('click', () => {
        if (!userState.isLoggedIn) {
            window.showToast('Please login to share your story', 'error');
            return;
        }
        modal.style.display = 'flex';
    });
    
    container.querySelector('#s-cancel').addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    container.querySelector('#s-submit').addEventListener('click', () => {
        const title = container.querySelector('#s-title').value;
        const cat = container.querySelector('#s-cat').value;
        const desc = container.querySelector('#s-desc').value;
        
        if (!title || !desc) {
            window.showToast('Please fill title and description', 'error');
            return;
        }
        
        const newStory = {
            id: Date.now(),
            author: userState.user.name,
            title: title,
            content: desc,
            category: cat,
            likes: 0
        };
        
        import('../store.js').then(store => {
            store.db.community.unshift(newStory); // Add to beginning
            store.saveDbState();
            modal.style.display = 'none';
            container.querySelector('#s-title').value = '';
            container.querySelector('#s-desc').value = '';
            window.showToast('Story posted successfully!', 'success');
            renderList();
        });
    });

    function renderList() {
        grid.innerHTML = '';
        if (db.community.length === 0) {
            grid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);"><i class="fas fa-users-slash" style="font-size:3rem; margin-bottom:1rem; opacity:0.5;"></i><br>No community stories yet. Share your contribution above!</div>';
            return;
        }
        db.community.forEach(story => {
            const card = document.createElement('div');
            card.className = 'card fade-in';
            card.innerHTML = `
                <div class="card-body">
                    <div class="flex justify-between items-center" style="margin-bottom:1rem;">
                        <div style="font-weight:600; color:var(--text-main);"><i class="fas fa-user-circle"></i> ${story.author}</div>
                        <span class="badge badge-gray">${story.category}</span>
                    </div>
                    <h3 class="card-title">${story.title}</h3>
                    <p class="card-text">${story.content}</p>
                    <div style="border-top:1px solid var(--border-color); padding-top:1rem; margin-top:1rem; display:flex; gap:1rem;">
                        <button class="btn btn-outline btn-sm like-btn"><i class="far fa-heart"></i> <span>${story.likes}</span></button>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });

        // Add Listeners
        grid.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (!userState.isLoggedIn) {
                    window.showToast('Please login to like posts', 'error');
                    return;
                }
                const icon = btn.querySelector('i');
                const span = btn.querySelector('span');
                let count = parseInt(span.innerText);
                if (icon.classList.contains('far')) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    icon.style.color = 'red';
                    span.innerText = count + 1;
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    icon.style.color = 'inherit';
                    span.innerText = count - 1;
                }
            });
        });
    }
    
    renderList();
    return container;
}
