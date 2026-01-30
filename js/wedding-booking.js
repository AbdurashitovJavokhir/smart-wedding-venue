let selectedDate = null;
let selectedTimeSlot = 'Full Day (10:00 - 22:00)';
let selectedPrice = 9000;
let guestCount = 100;
let currentMonth = 0;
let currentYear = 2026;

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Generate calendar for specific month and year
function generateCalendar() {
    const calendarDays = document.getElementById('calendarDays');
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    
    document.getElementById('currentMonth').textContent = `${monthNames[currentMonth]} ${currentYear}`;

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    calendarDays.innerHTML = '';

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'day other-month';
        calendarDays.appendChild(emptyDay);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        dayElement.textContent = day;
        
        const currentDate = new Date(currentYear, currentMonth, day);
        currentDate.setHours(0, 0, 0, 0);

        // Disable dates before today and after Dec 30, 2026
        const cutoffDate = new Date(2026, 11, 30);
        cutoffDate.setHours(0, 0, 0, 0);

        if (currentDate < today || currentDate > cutoffDate) {
            dayElement.classList.add('disabled');
        } else {
            // Select January 31 by default if we're in January
            if (currentMonth === 0 && day === 31) {
                dayElement.classList.add('selected');
                selectedDate = currentDate;
                updateSummary();
            }
            
            dayElement.addEventListener('click', function() {
                document.querySelectorAll('.calendar-days .day').forEach(d => {
                    d.classList.remove('selected');
                });
                this.classList.add('selected');
                selectedDate = new Date(currentDate);
                updateSummary();
            });
        }

        calendarDays.appendChild(dayElement);
    }
}

// Navigate to previous month
function previousMonth() {
    if (currentMonth === 0) {
        currentMonth = 11;
        currentYear--;
    } else {
        currentMonth--;
    }
    generateCalendar();
}

// Navigate to next month
function nextMonth() {
    if (currentMonth === 11) {
        currentMonth = 0;
        currentYear++;
    } else {
        currentMonth++;
    }
    generateCalendar();
}

// Handle time slot selection
document.querySelectorAll('.time-slot').forEach(slot => {
    slot.addEventListener('click', function() {
        if (this.classList.contains('unavailable')) return;
        
        document.querySelectorAll('.time-slot').forEach(s => {
            s.classList.remove('selected');
        });
        this.classList.add('selected');
        
        selectedTimeSlot = this.textContent.trim();
        selectedPrice = parseInt(this.dataset.price);
        
        updateSummary();
    });
});

// Handle guest count change
document.getElementById('guestCount').addEventListener('input', function() {
    guestCount = parseInt(this.value) || 100;
    updateSummary();
});

// Update summary section
function updateSummary() {
    // Update date
    if (selectedDate) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('selectedDate').textContent = selectedDate.toLocaleDateString('en-US', options);
    }

    // Update time
    document.getElementById('selectedTime').textContent = selectedTimeSlot;

    // Calculate price based on time slot
    let basePrice = selectedPrice;
    
    // Add guest-based pricing (optional)
    let guestSurcharge = 0;
    if (guestCount > 200) {
        guestSurcharge = (guestCount - 200) * 10;
    }

    const totalPrice = basePrice + guestSurcharge;
    
    // Update price display
    document.getElementById('totalPrice').textContent = formatNumber(totalPrice);
    
    // Update breakdown
    let breakdown = `Base price for ${selectedTimeSlot}`;
    if (guestSurcharge > 0) {
        breakdown += `\n+ $${formatNumber(guestSurcharge)} for ${guestCount - 200} extra guests`;
    }
    document.getElementById('priceBreakdown').textContent = breakdown;

    // Enable/disable confirm button
    const confirmButton = document.getElementById('confirmButton');
    if (selectedDate && selectedTimeSlot) {
        confirmButton.disabled = false;
    } else {
        confirmButton.disabled = true;
    }
}

// Confirm booking
function confirmBooking() {
    if (!selectedDate || !selectedTimeSlot) {
        alert('Please select a date and time slot');
        return;
    }

    // Save booking data to localStorage
    const bookingData = {
        venue: 'Crystal Ballroom',
        date: selectedDate.toISOString().split('T')[0],
        timeSlot: selectedTimeSlot,
        guests: guestCount,
        price: document.getElementById('totalPrice').textContent
    };
    localStorage.setItem('bookingData', JSON.stringify(bookingData));

    // Redirect to confirmation page
    window.location.href = 'wedding-confirmation.html';
}

// Initialize navigation buttons
document.querySelectorAll('.nav-button').forEach(btn => {
    if (btn.textContent.includes('←')) {
        btn.addEventListener('click', previousMonth);
    } else if (btn.textContent.includes('→')) {
        btn.addEventListener('click', nextMonth);
    }
});

// Initialize
generateCalendar();
updateSummary();
