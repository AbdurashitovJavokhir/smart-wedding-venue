const images = [
    "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80",
    "https://images.unsplash.com/photo-1519167758481-83f29da8ae8d?w=1200&q=80",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80"
];

function changeImage(thumbnail, index) {
    // Update main image
    document.getElementById('mainImage').src = images[index];
    
    // Update active thumbnail
    document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
    thumbnail.classList.add('active');
}

function goBack() {
    window.location.href = 'wedding-results.html';
}

function openCalendar() {
    document.getElementById('calendarModal').classList.add('active');
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('selectedDate').min = today;
}

function closeCalendar() {
    document.getElementById('calendarModal').classList.remove('active');
}

function confirmDate() {
    const selectedDate = document.getElementById('selectedDate').value;
    if (!selectedDate) {
        alert('Please select a date');
        return;
    }
    
    // Redirect to booking page
    window.location.href = 'wedding-booking.html';
}

function bookVenue() {
    window.location.href = 'wedding-booking.html';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('calendarModal');
    if (event.target === modal) {
        closeCalendar();
    }
}

// Load venue data from URL params (if coming from results page)
const urlParams = new URLSearchParams(window.location.search);
const venueName = urlParams.get('venue');
if (venueName) {
    document.querySelector('.venue-name').textContent = venueName;
}
