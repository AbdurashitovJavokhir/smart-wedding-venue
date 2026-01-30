// Generate random booking ID
function generateBookingId() {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 900) + 100;
    return `BK-${year}-${randomNum}`;
}

// Load booking data from localStorage (if available)
function loadBookingData() {
    const bookingData = JSON.parse(localStorage.getItem('bookingData') || '{}');
    
    // Update booking ID
    document.getElementById('bookingId').textContent = generateBookingId();
    
    // Update venue name
    if (bookingData.venue) {
        document.getElementById('venueName').textContent = bookingData.venue;
    }
    
    // Update date
    if (bookingData.date) {
        const date = new Date(bookingData.date);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('bookingDate').textContent = date.toLocaleDateString('en-US', options);
    }
    
    // Update time slot
    if (bookingData.timeSlot) {
        document.getElementById('bookingTime').textContent = bookingData.timeSlot;
    }
    
    // Update guests
    if (bookingData.guests) {
        document.getElementById('bookingGuests').textContent = `${bookingData.guests} guests`;
    }
    
    // Update price
    if (bookingData.price) {
        document.getElementById('bookingPrice').textContent = `$${bookingData.price}`;
    }
}

// Download confirmation as text file
function downloadConfirmation() {
    const bookingId = document.getElementById('bookingId').textContent;
    const venueName = document.getElementById('venueName').textContent;
    const date = document.getElementById('bookingDate').textContent;
    const time = document.getElementById('bookingTime').textContent;
    const guests = document.getElementById('bookingGuests').textContent;
    const price = document.getElementById('bookingPrice').textContent;

    const confirmationText = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    WEDDING VENUE BOOKING CONFIRMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ YOUR BOOKING IS CONFIRMED!

Booking ID: ${bookingId}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VENUE DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Venue Name:     ${venueName}
Date:           ${date}
Time Slot:      ${time}
Guests:         ${guests}
Total Price:    ${price}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NEXT STEPS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Contract Review
   Our team will send you the venue contract
   within 24 hours for your review and signature.

2. Deposit Payment
   A 30% deposit (${(parseInt(price.replace(/[$,]/g, '')) * 0.3).toLocaleString()}) is required to 
   secure your booking within 7 days.

3. Venue Tour
   Schedule a personal tour of the venue to
   finalize your setup preferences.

4. Catering Consultation
   Meet with our catering team to discuss
   your menu options and preferences.

5. Final Payment
   The remaining balance is due 30 days
   before your wedding date.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTACT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Phone:          +998 (94) 998-7088
Email:          J.Abdurashitov@wlv.ac.uk
Website:        ::::www.smartvenueplatform.com::::

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Thank you for choosing our Smart Venue 
Platform. We wish you a beautiful celebration!

🎊 Congratulations on your upcoming wedding! 🎊

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            `;

    // Create blob and download
    const blob = new Blob([confirmationText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Booking-Confirmation-${bookingId}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    // Show success message
    alert('📥 Confirmation downloaded successfully!\n\nPlease save this file for your records.');
}

// Add confetti effect (optional)
function createConfetti() {
    const colors = ['#ff6b9d', '#ffc107', '#00d084', '#667eea', '#764ba2'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-10px';
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            document.body.appendChild(confetti);

            const fallDuration = Math.random() * 3 + 2;
            const drift = (Math.random() - 0.5) * 100;

            confetti.animate([
                { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(${window.innerHeight + 10}px) translateX(${drift}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: fallDuration * 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });

            setTimeout(() => confetti.remove(), fallDuration * 1000);
        }, i * 30);
    }
}

// Trigger confetti on page load
window.addEventListener('load', () => {
    setTimeout(createConfetti, 500);
});

// Initialize page
loadBookingData();
