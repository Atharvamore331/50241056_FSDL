class Room {
    constructor(id, name, type, price, features, imageUrl) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.price = price;
        this.features = features;
        this.imageUrl = imageUrl;
        this.isBooked = false; // By default, rooms start as available
    }
}
class Booking {
    constructor(id, guestName, room, checkInStr, checkOutStr) {
        // Variables & Assignment
        this.id = id;
        this.guestName = guestName;
        this.room = room;
        this.checkIn = new Date(checkInStr);
        this.checkOut = new Date(checkOutStr);
        this.bookingDate = new Date(); // timestamp
        // Operators to calculate Duration
        const MS_PER_DAY = 1000 * 60 * 60 * 24;
        const durationMs = Math.abs(this.checkOut - this.checkIn);
        this.nights = Math.ceil(durationMs / MS_PER_DAY);
        
        // Logical Operators and Conditions (Min 1 night)
        if (this.nights === 0 || this.checkIn.getTime() === this.checkOut.getTime()) {
            this.nights = 1; 
        }
        // Arithmetic Operator (Multiplication for total cost)
        this.totalCost = this.nights * this.room.price;
    }
}
class Hotel {
    constructor(name) {
        this.name = name;
        this.rooms = [];
        this.bookings = [];
    }
    // Function adding room to hotel
    addRoom(room) {
        this.rooms.push(room);
    }
    getRooms() {
        return this.rooms;
    }
    getRoomById(roomId) {
        // Loop: for...of
        let foundRoom = null;
        for (const room of this.rooms) {
            if (room.id === roomId) {
                foundRoom = room;
                break;
            }
        }
        return foundRoom;
    }
    createBooking(guestName, roomId, checkInStr, checkOutStr) {
        const room = this.getRoomById(roomId);
        
        // Conditions & Logic checks
        if (room !== null && room.isBooked === false) {
            room.isBooked = true;
            
            // Generate Random ID using operators
            const randomSuffix = Math.floor(Math.random() * 90000) + 10000;
            const bookingId = "BKG-" + randomSuffix;
            
            // Instantiating new Booking object
            const newBooking = new Booking(bookingId, guestName, room, checkInStr, checkOutStr);
            this.bookings.push(newBooking);
            
            return { success: true, booking: newBooking };
        }
        return { success: false, message: "Sorry, this room is currently unavailable." };
    }
    cancelBooking(bookingId) {
        let bookingIndex = -1;
        
        // Loop: standard for loop
        for (let i = 0; i < this.bookings.length; i++) {
            if (this.bookings[i].id === bookingId) {
                bookingIndex = i;
                break;
            }
        }
        if (bookingIndex !== -1) {
            // Unbook room
            this.bookings[bookingIndex].room.isBooked = false;
            // Remove from array
            this.bookings.splice(bookingIndex, 1);
            return true;
        }
        return false;
    }
    getTotalRevenue() {
        let sum = 0;
        // Loop: while loop
        let i = 0;
        while (i < this.bookings.length) {
            sum += this.bookings[i].totalCost; // Arithmetic addition assignment
            i++;
        }
        return sum;
    }
    searchGuestBookings(guestSearchStr) {
        const matchingBookings = [];
        const lowerSearch = guestSearchStr.toLowerCase();
        
        // Loop: forEach or native for..of
        for (const booking of this.bookings) {
            if (booking.guestName.toLowerCase().includes(lowerSearch)) {
                matchingBookings.push(booking);
            }
        }
        return matchingBookings;
    }
}
// --- INITIALIZATION ---
const SystemHotel = new Hotel("The Grand Elegance");
// Generate data (Objects into Hotel instance)
SystemHotel.addRoom(new Room(
    1, "Royal Penthouse Suite", "Penthouse", 1200, 
    ["Master Bedroom", "Panoramic City View", "Private Pool", "24/7 Butler"], 
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
));
SystemHotel.addRoom(new Room(
    2, "Executive Oceanfront", "Suite", 650, 
    ["King Bed", "Ocean View", "Balcony", "Premium Minibar"], 
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
));
SystemHotel.addRoom(new Room(
    3, "Premium Deluxe Room", "Deluxe", 350, 
    ["Queen Bed", "City View", "Workspace", "Espresso Machine"], 
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
));
SystemHotel.addRoom(new Room(
    4, "Classic Double", "Standard", 250, 
    ["2 Double Beds", "Garden View", "Free WiFi"], 
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
));
// --- FUNCTIONS (DOM Updating) ---
// 1. Render Rooms
const renderRooms = () => {
    const container = document.getElementById('rooms-container');
    container.innerHTML = ''; 
    const allRooms = SystemHotel.getRooms();
    for (let count = 0; count < allRooms.length; count++) {
        const room = allRooms[count];
        
        // Ternary Operator for visual status
        const statusClass = room.isBooked ? 'status-booked' : 'status-available';
        const statusText = room.isBooked ? 'Unavailable' : 'Available';
        const buttonDisabled = room.isBooked ? 'disabled style="background:#cbd5e1; color:#94a3b8; cursor:not-allowed;"' : '';
        const buttonText = room.isBooked ? 'Booked' : 'Book Room';
        let featuresHtml = '';
        for (const feat of room.features) {
            featuresHtml += `<li>${feat}</li>`;
        }
        const roomCard = `
            <div class="room-card">
                <div class="room-img" style="background-image: url('${room.imageUrl}')"></div>
                <div class="room-details">
                    <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                        <h3>${room.name}</h3>
                        <span class="status-badge ${statusClass}">${statusText}</span>
                    </div>
                    <p class="room-type">${room.type}</p>
                    <ul class="room-features">${featuresHtml}</ul>
                    <div class="room-footer">
                        <span class="room-price">$${room.price}/n</span>
                        <button class="btn-primary" onclick="openModal(${room.id})" ${buttonDisabled}>${buttonText}</button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += roomCard;
    }
};
// 2. Render Admin Dashboard
const renderAdminDashboard = () => {
    // Basic stats
    document.getElementById('stat-total-rooms').innerText = SystemHotel.getRooms().length;
    document.getElementById('stat-active-bookings').innerText = SystemHotel.bookings.length;
    document.getElementById('stat-revenue').innerText = '$' + SystemHotel.getTotalRevenue().toLocaleString();
    // Table
    const tbody = document.getElementById('admin-table-body');
    tbody.innerHTML = '';
    if (SystemHotel.bookings.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding: 2rem; color: #64748b;">No bookings found. the system is empty.</td></tr>';
        return;
    }
    SystemHotel.bookings.forEach((booking) => {
        const row = `
            <tr>
                <td><strong>${booking.id}</strong></td>
                <td>${booking.guestName}</td>
                <td>${booking.room.name} (Room ${booking.room.id})</td>
                <td>${booking.checkIn.toLocaleDateString()}</td>
                <td>${booking.checkOut.toLocaleDateString()}</td>
                <td style="font-weight:bold;">$${booking.totalCost}</td>
                <td>
                    <button class="btn-danger" onclick="cancelBookingHandler('${booking.id}')">Cancel</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
};
// 3. Render Guest Bookings View
const renderGuestBookings = (searchValue) => {
    const container = document.getElementById('guest-bookings-container');
    container.innerHTML = '';
    
    if (searchValue === '') {
        container.innerHTML = '<p style="text-align:center; color:#64748b; font-size:1.1rem; padding: 2rem;">Please enter your name to view your reservations.</p>';
        return;
    }
    const arr = SystemHotel.searchGuestBookings(searchValue);
    if (arr.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#ef4444; font-size:1.1rem; padding: 2rem;">No bookings found under this name.</p>';
        return;
    }
    let resultHtml = '<div class="rooms-grid">';
    for (const b of arr) {
        resultHtml += `
            <div class="room-card" style="border-top: 5px solid var(--secondary-color);">
                 <div class="room-details">
                    <h3 style="margin-bottom:0.2rem;">${b.room.name}</h3>
                    <p class="room-type">Booking Reference: ${b.id}</p>
                    <div style="margin: 1.5rem 0; line-height: 1.8;">
                        <p><strong>Check-In Date:</strong> ${b.checkIn.toLocaleDateString()}</p>
                        <p><strong>Check-Out Date:</strong> ${b.checkOut.toLocaleDateString()}</p>
                        <p><strong>Nights Reserved:</strong> ${b.nights}</p>
                    </div>
                    <div class="room-footer">
                        <span class="room-price">Total Settled: $${b.totalCost}</span>
                    </div>
                 </div>
            </div>
        `;
    }
    resultHtml += '</div>';
    container.innerHTML = resultHtml;
};
// --- EVENTS ---
// Modal Components Setup
const modal = document.getElementById('booking-modal');
const closeBtn = document.querySelector('.close-btn');
const bookingForm = document.getElementById('booking-form');
// Global scope exposed function for onclick
window.openModal = function(roomId) {
    const room = SystemHotel.getRoomById(roomId);
    if (!room) return;
    // Prefill data
    document.getElementById('modal-room-name').innerText = room.name;
    document.getElementById('modal-room-price').innerText = `$${room.price} per night`;
    document.getElementById('book-room-id').value = room.id;
    
    // Reset Form elements
    bookingForm.reset();
    document.getElementById('total-price-display').innerText = 'Total: $0';
    document.getElementById('form-messages').innerText = '';
    // Date configuration
    const dt = new Date();
    const today = dt.toISOString().split('T')[0];
    document.getElementById('check-in').setAttribute('min', today);
    document.getElementById('check-out').setAttribute('min', today);
    // Show
    modal.style.display = 'flex';
};
window.cancelBookingHandler = function(bookingId) {
    const conf = confirm(`Administrator, you are about to cancel booking ${bookingId}. Confirm action?`);
    if (conf === true) {
        if (SystemHotel.cancelBooking(bookingId)) {
            renderAdminDashboard();
            renderRooms();
            alert("Booking successfully cancelled. The room is available again.");
        }
    }
};
closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
// Dynamic form price calculation
function calcLiveTotal() {
    const cIn = document.getElementById('check-in').value;
    const cOut = document.getElementById('check-out').value;
    const roomId = parseInt(document.getElementById('book-room-id').value);
    
    if (cIn && cOut) {
        if (new Date(cOut) >= new Date(cIn)) {
            const ms = Math.abs(new Date(cOut) - new Date(cIn));
            let span = Math.ceil(ms / (1000 * 60 * 60 * 24));
            if (span === 0) span = 1;
            const room = SystemHotel.getRoomById(roomId);
            document.getElementById('total-price-display').innerText = `Total: $${span * room.price}`;
        } else {
            document.getElementById('total-price-display').innerText = 'Invalid Dates';
        }
    }
}
document.getElementById('check-in').addEventListener('change', (e) => {
    document.getElementById('check-out').setAttribute('min', e.target.value);
    calcLiveTotal();
});
document.getElementById('check-out').addEventListener('change', calcLiveTotal);
// Form Submission handling (Event listener overrides default)
bookingForm.addEventListener('submit', function(e) {
    e.preventDefault(); 
    const nm = document.getElementById('guest-name').value;
    const ci = document.getElementById('check-in').value;
    const co = document.getElementById('check-out').value;
    const id = parseInt(document.getElementById('book-room-id').value);
    const msgs = document.getElementById('form-messages');
    if (new Date(co) < new Date(ci)) {
        msgs.innerText = "Error: Check-out date precedes check-in date.";
        return;
    }
    const attempt = SystemHotel.createBooking(nm, id, ci, co);
    if (attempt.success) {
        modal.style.display = 'none';
        renderRooms(); // Re-render to show updated unavailability
        alert(`Success! Enjoy your stay at The Grand Elegance. Reference ID: ${attempt.booking.id}`);
    } else {
        msgs.innerText = attempt.message;
    }
});
// Navigation Menu (Tab Switching)
function togglePage(pageName) {
    const pages = ['rooms', 'bookings', 'admin'];
    
    // Using for loop
    for (let i = 0; i < pages.length; i++) {
        const id = pages[i];
        document.getElementById(`section-${id}`).classList.remove('active-section');
        document.getElementById(`section-${id}`).classList.add('hidden-section');
        document.getElementById(`nav-${id}`).classList.remove('active');
    }
    
    // Activating chosen
    document.getElementById(`section-${pageName}`).classList.remove('hidden-section');
    document.getElementById(`section-${pageName}`).classList.add('active-section');
    document.getElementById(`nav-${pageName}`).classList.add('active');
    // Context-dependent render tasks
    if (pageName === 'rooms') renderRooms();
    else if (pageName === 'admin') renderAdminDashboard();
    else if (pageName === 'bookings') {
        renderGuestBookings(document.getElementById('guest-search').value);
    }
}
document.getElementById('nav-rooms').addEventListener('click', (e) => { e.preventDefault(); togglePage('rooms'); });
document.getElementById('nav-bookings').addEventListener('click', (e) => { e.preventDefault(); togglePage('bookings'); });
document.getElementById('nav-admin').addEventListener('click', (e) => { e.preventDefault(); togglePage('admin'); });
// Search Event Binding
document.getElementById('btn-search').addEventListener('click', () => {
    const ipt = document.getElementById('guest-search').value;
    renderGuestBookings(ipt);
});
// App Entry Point
window.onload = () => {
    renderRooms();
};
