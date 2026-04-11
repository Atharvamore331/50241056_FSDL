import { db, userState, joinCampaign } from '../store.js';

export function renderCampaigns() {
    const container = document.createElement('div');
    container.className = 'container section';
    
    container.innerHTML = `
        <div class="flex justify-between items-center" style="margin-bottom: 2rem; flex-wrap: wrap; gap:1rem;">
            <h2>Upcoming Campaigns</h2>
            <button class="btn btn-primary" id="btn-create-campaign">Submit a Campaign</button>
        </div>
        <div class="grid grid-cols-2" id="campaign-grid"></div>
        
        <!-- Form Modal (Hidden by default) -->
        <div id="campaign-modal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100vh; background:rgba(0,0,0,0.5); z-index:1000; align-items:center; justify-content:center;">
            <div class="card fade-in" style="width: 100%; max-width: 500px; padding: 2rem; margin:1rem;">
                <h3 style="margin-bottom:1rem;">Submit New Campaign</h3>
                <div class="form-group">
                    <label class="form-label">Campaign Title</label>
                    <input type="text" id="c-title" class="form-control" />
                </div>
                <div class="form-group">
                    <label class="form-label">Date</label>
                    <input type="date" id="c-date" class="form-control" />
                </div>
                <div class="form-group">
                    <label class="form-label">Location (or Online)</label>
                    <input type="text" id="c-loc" class="form-control" />
                </div>
                <div class="flex justify-between" style="margin-top:2rem;">
                    <button class="btn btn-outline" id="c-cancel">Cancel</button>
                    <button class="btn btn-primary" id="c-submit">Submit</button>
                </div>
            </div>
        </div>
    `;

    const grid = container.querySelector('#campaign-grid');
    const modal = container.querySelector('#campaign-modal');
    
    // Modal Listeners
    container.querySelector('#btn-create-campaign').addEventListener('click', () => {
        if (!userState.isLoggedIn) {
            window.showToast('Please login to submit campaigns', 'error');
            return;
        }
        modal.style.display = 'flex';
    });
    
    container.querySelector('#c-cancel').addEventListener('click', () => {
        modal.style.display = 'none';
        container.querySelector('#c-title').value = '';
        container.querySelector('#c-date').value = '';
        container.querySelector('#c-loc').value = '';
    });
    
    container.querySelector('#c-submit').addEventListener('click', () => {
        const title = container.querySelector('#c-title').value;
        const date = container.querySelector('#c-date').value;
        const loc = container.querySelector('#c-loc').value;
        
        if (!title || !date || !loc) {
            window.showToast('Please fill all fields', 'error');
            return;
        }
        
        const newCamp = {
            id: Date.now(),
            title: title,
            date: date,
            location: loc,
            type: loc.toLowerCase() === 'online' ? 'Online' : 'Offline',
            registered: 0
        };
        
        import('../store.js').then(store => {
            store.db.campaigns.push(newCamp);
            store.saveDbState();
            modal.style.display = 'none';
            container.querySelector('#c-title').value = '';
            container.querySelector('#c-date').value = '';
            container.querySelector('#c-loc').value = '';
            window.showToast('Campaign submitted successfully!', 'success');
            renderList();
        });
    });

    function renderList() {
        grid.innerHTML = '';
        if (db.campaigns.length === 0) {
            grid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);"><i class="fas fa-calendar-times" style="font-size:3rem; margin-bottom:1rem; opacity:0.5;"></i><br>No campaigns scheduled yet. Be the first to submit one!</div>';
            return;
        }
        db.campaigns.forEach(camp => {
            const isJoined = userState.joinedCampaigns.includes(camp.id);
            const card = document.createElement('div');
            card.className = 'card fade-in';
            card.innerHTML = `
                <div class="card-body">
                    <div class="flex justify-between items-center" style="margin-bottom:1rem;">
                        <span class="badge ${camp.type === 'Online' ? 'badge-blue' : 'badge-green'}">${camp.type}</span>
                        <span style="color:var(--text-muted); font-size:0.875rem;"><i class="fas fa-users"></i> <span class="reg-count">${camp.registered}</span> joined</span>
                    </div>
                    <h3 class="card-title">${camp.title}</h3>
                    <div style="color:var(--text-muted); margin-bottom:0.5rem;"><i class="far fa-calendar-alt"></i> Date: ${camp.date}</div>
                    <div style="color:var(--text-muted); margin-bottom:1.5rem;"><i class="fas fa-map-marker-alt"></i> Loc: ${camp.location}</div>
                    <button class="btn btn-block ${isJoined ? 'btn-outline' : 'btn-primary'} join-btn" data-id="${camp.id}" ${isJoined ? 'disabled' : ''}>
                        ${isJoined ? 'Registered' : 'Join Campaign'}
                    </button>
                </div>
            `;
            grid.appendChild(card);
        });

        // Add Listeners
        grid.querySelectorAll('.join-btn').forEach(btn => {
            if (!btn.disabled) {
                btn.addEventListener('click', (e) => {
                    const id = parseInt(e.currentTarget.getAttribute('data-id'));
                    const res = joinCampaign(id);
                    if (res.success) {
                        const camp = db.campaigns.find(c => c.id === id);
                        if (camp) {
                            camp.registered++;
                            import('../store.js').then(store => store.saveDbState());
                        }
                        window.showToast(res.msg, 'success');
                        renderList(); // re-render to disable button and update count
                    } else {
                        window.showToast(res.msg, 'error');
                    }
                });
            }
        });
    }
    
    renderList();
    return container;
}
