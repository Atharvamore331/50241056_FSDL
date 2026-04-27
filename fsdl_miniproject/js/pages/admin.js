import { db, saveDbState } from '../store.js';

export function renderAdmin() {
    const container = document.createElement('div');
    container.className = 'container section fade-in';
    
    container.innerHTML = `
        <h2 style="margin-bottom: 2rem;">Admin Panel Sandbox</h2>
        
        <div class="grid grid-cols-2">
            <!-- News Form -->
            <div class="card" style="padding:2rem;">
                <h3 style="margin-bottom:1.5rem;">Add News Article</h3>
                <div class="form-group">
                    <input type="text" id="n-title" class="form-control" placeholder="News Title">
                </div>
                <div class="form-group">
                    <input type="text" id="n-cat" class="form-control" placeholder="Category (e.g. Wildlife)">
                </div>
                <div class="form-group">
                    <input type="text" id="n-img" class="form-control" placeholder="Image URL">
                </div>
                <div class="form-group">
                    <textarea id="n-sum" class="form-control" placeholder="Summary/Content"></textarea>
                </div>
                <button id="add-news-btn" class="btn btn-primary">Add News</button>
            </div>
            
            <!-- Actions Form -->
            <div class="card" style="padding:2rem;">
                <h3 style="margin-bottom:1.5rem;">Add Actionable Item</h3>
                <div class="form-group">
                    <input type="text" id="a-title" class="form-control" placeholder="Action Title (e.g. Save Water)">
                </div>
                <div class="flex gap-2" style="margin-bottom: 1.5rem;">
                    <select id="a-diff" class="form-control">
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                    <select id="a-imp" class="form-control">
                        <option value="Low">Low Impact</option>
                        <option value="Medium">Medium Impact</option>
                        <option value="High">High Impact</option>
                    </select>
                </div>
                <div class="form-group">
                    <input type="number" id="a-pts" class="form-control" placeholder="Points Awarded">
                </div>
                <button id="add-action-btn" class="btn btn-primary">Add Action</button>
            </div>
            
            <!-- Resources Form -->
            <div class="card" style="padding:2rem;">
                <h3 style="margin-bottom:1.5rem;">Add Educational Resource</h3>
                <div class="form-group">
                    <input type="text" id="r-title" class="form-control" placeholder="Resource Title">
                </div>
                <div class="form-group">
                    <input type="text" id="r-type" class="form-control" placeholder="Type (e.g. PDF, Tool, Guide)">
                </div>
                <div class="form-group">
                    <input type="text" id="r-url" class="form-control" placeholder="External URL link">
                </div>
                <button id="add-resource-btn" class="btn btn-primary">Add Resource</button>
            </div>

            <div class="card" style="padding:2rem; background: rgba(0,0,0,0.02); box-shadow:none;">
                <h3 style="margin-bottom:1.5rem;">Database Stats</h3>
                <ul style="list-style:none; line-height:2;">
                    <li><strong>News Articles:</strong> <span id="stat-news">${db.news.length}</span></li>
                    <li><strong>Actions:</strong> <span id="stat-acts">${db.actions.length}</span></li>
                    <li><strong>Resources:</strong> <span id="stat-res">${db.resources.length}</span></li>
                    <li><strong>Campaigns:</strong> <span id="stat-camps">${db.campaigns.length}</span></li>
                    <li><strong>Community Posts:</strong> <span id="stat-posts">${db.community.length}</span></li>
                </ul>
            </div>
        </div>
    `;

    // Listeners
    container.querySelector('#add-news-btn').addEventListener('click', () => {
        const t = container.querySelector('#n-title').value;
        const c = container.querySelector('#n-cat').value;
        const i = container.querySelector('#n-img').value;
        const s = container.querySelector('#n-sum').value;
        
        if(!t || !s) {
            window.showToast('Title and Summary are required', 'error');
            return;
        }

        db.news.unshift({
            id: Date.now(),
            title: t,
            category: c || 'General',
            summary: s,
            date: new Date().toISOString().split('T')[0],
            image: i || 'https://images.unsplash.com/photo-1497435334941-8c899eff968c?auto=format&fit=crop&w=800&q=80',
            trending: false
        });
        
        saveDbState();
        container.querySelector('#stat-news').innerText = db.news.length;
        window.showToast('News article added!', 'success');
        
        container.querySelector('#n-title').value = '';
        container.querySelector('#n-cat').value = '';
        container.querySelector('#n-img').value = '';
        container.querySelector('#n-sum').value = '';
    });

    container.querySelector('#add-action-btn').addEventListener('click', () => {
        const t = container.querySelector('#a-title').value;
        const d = container.querySelector('#a-diff').value;
        const i = container.querySelector('#a-imp').value;
        const p = parseInt(container.querySelector('#a-pts').value);
        
        if(!t || isNaN(p)) {
            window.showToast('Title and numeric points are required', 'error');
            return;
        }

        db.actions.unshift({
            id: Date.now(),
            title: t,
            difficulty: d,
            impact: i,
            points: p
        });
        
        saveDbState();
        container.querySelector('#stat-acts').innerText = db.actions.length;
        window.showToast('Action item added!', 'success');
        container.querySelector('#a-title').value = '';
        container.querySelector('#a-pts').value = '';
    });

    container.querySelector('#add-resource-btn').addEventListener('click', () => {
        const t = container.querySelector('#r-title').value;
        const ty = container.querySelector('#r-type').value;
        const u = container.querySelector('#r-url').value;
        
        if(!t || !ty) {
            window.showToast('Title and type are required', 'error');
            return;
        }

        db.resources.unshift({
            id: Date.now(),
            title: t,
            type: ty,
            url: u || '#'
        });
        
        saveDbState();
        container.querySelector('#stat-res').innerText = db.resources.length;
        window.showToast('Resource item added!', 'success');
        container.querySelector('#r-title').value = '';
        container.querySelector('#r-type').value = '';
        container.querySelector('#r-url').value = '';
    });

    return container;
}
