import { db, userState, toggleActionComplete } from '../store.js';

export function renderAction() {
    const container = document.createElement('div');
    container.className = 'container section';
    
    container.innerHTML = `
        <div style="text-align: center; margin-bottom: 3rem;">
            <h2>What You Can Do</h2>
            <p style="color: var(--text-muted); max-width: 600px; margin: 0 auto;">
                Small steps lead to big changes. Check off the actions you take to earn eco-points and track your sustainability journey.
            </p>
        </div>
        
        <div class="grid grid-cols-2" id="action-list"></div>
    `;

    const list = container.querySelector('#action-list');

    function renderList() {
        list.innerHTML = '';
        if (db.actions.length === 0) {
            list.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);"><i class="fas fa-clipboard-list" style="font-size:3rem; margin-bottom:1rem; opacity:0.5;"></i><br>No actions available yet. Visit Admin Panel to create some.</div>';
            return;
        }
        db.actions.forEach(act => {
            const isCompleted = userState.completedActions.includes(act.id);
            const card = document.createElement('div');
            card.className = 'card fade-in';
            card.style.display = 'flex';
            card.style.flexDirection = 'row';
            card.style.alignItems = 'center';
            card.style.padding = '1.5rem';
            
            // Layout inner HTML
            card.innerHTML = `
                <div style="font-size: 2.5rem; color: ${isCompleted ? 'var(--primary-color)' : 'var(--text-muted)'}; margin-right: 1.5rem; opacity: ${isCompleted ? '1' : '0.3'}; transition: all 0.3s;">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div style="flex: 1;">
                    <h3 style="margin-bottom: 0.25rem; text-decoration: ${isCompleted ? 'line-through' : 'none'}; color: ${isCompleted ? 'var(--text-muted)' : 'inherit'};">${act.title}</h3>
                    <div style="display:flex; gap:0.5rem; margin-bottom: 0.5rem; flex-wrap:wrap;">
                        <span class="badge ${act.difficulty === 'Easy' ? 'badge-green' : act.difficulty === 'Medium' ? 'badge-yellow' : 'badge-red'}">Diff: ${act.difficulty}</span>
                        <span class="badge badge-blue">Impact: ${act.impact}</span>
                        <span class="badge badge-gray">+${act.points} pts</span>
                    </div>
                </div>
                <button class="btn ${isCompleted ? 'btn-outline' : 'btn-primary'} toggle-btn" data-id="${act.id}" data-pts="${act.points}">
                    ${isCompleted ? 'Undo' : 'Mark as Done'}
                </button>
            `;
            list.appendChild(card);
        });

        // Add Listeners
        list.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.getAttribute('data-id'));
                const pts = parseInt(e.currentTarget.getAttribute('data-pts'));
                const res = toggleActionComplete(id, pts);
                if (res.success) {
                    window.showToast(res.msg, 'success');
                    renderList();
                } else {
                    window.showToast(res.msg, 'error');
                }
            });
        });
    }
    
    renderList();
    return container;
}
