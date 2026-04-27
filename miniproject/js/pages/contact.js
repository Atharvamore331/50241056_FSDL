export function renderContact() {
    const container = document.createElement('div');
    container.className = 'container section fade-in';
    
    container.innerHTML = `
        <div class="grid grid-cols-2" style="gap: 4rem; max-width: 1000px; margin: 0 auto;">
            <div>
                <h2 style="margin-bottom: 1rem; color: var(--primary-color);">Get in Touch</h2>
                <p style="color: var(--text-muted); margin-bottom: 2rem;">
                    Have questions, suggestions, or want to partner with us? Fill out the form and our team will get back to you shortly.
                </p>
                <div style="margin-bottom: 1.5rem; display: flex; align-items: center; gap: 1rem;">
                    <div style="width: 40px; height: 40px; background: rgba(47,133,90,0.1); color: var(--primary-color); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-envelope"></i>
                    </div>
                    <span>hello@ecohub.org</span>
                </div>
                <div style="margin-bottom: 1.5rem; display: flex; align-items: center; gap: 1rem;">
                    <div style="width: 40px; height: 40px; background: rgba(47,133,90,0.1); color: var(--primary-color); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-phone"></i>
                    </div>
                    <span>+1 (555) 123-4567</span>
                </div>
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <div style="width: 40px; height: 40px; background: rgba(47,133,90,0.1); color: var(--primary-color); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-map-marker-alt"></i>
                    </div>
                    <span>123 Green Way, Earth City, Planet Earth</span>
                </div>
            </div>
            
            <div class="card" style="padding: 2rem;">
                <h3 style="margin-bottom: 1.5rem;">Send a Message</h3>
                <form id="contact-form">
                    <div class="form-group">
                        <label class="form-label">Full Name</label>
                        <input type="text" class="form-control" required placeholder="Jane Doe">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Email Address</label>
                        <input type="email" class="form-control" required placeholder="jane@example.com">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Message</label>
                        <textarea class="form-control" required placeholder="How can we help?"></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Send Message</button>
                </form>
            </div>
        </div>
    `;

    container.querySelector('#contact-form').addEventListener('submit', (e) => {
        e.preventDefault();
        window.showToast('Message sent successfully! We will contact you soon.', 'success');
        e.target.reset();
    });

    return container;
}
