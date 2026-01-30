// Elements
const guestCount = document.getElementById('guestCount');
const guestSlider = document.getElementById('guestSlider');
const minBudget = document.getElementById('minBudget');
const maxBudget = document.getElementById('maxBudget');
const budgetMin = document.getElementById('budgetMin');
const budgetMax = document.getElementById('budgetMax');
const venueForm = document.getElementById('venueForm');

// Sync guest count input with slider
guestCount.addEventListener('input', function() {
    guestSlider.value = this.value;
    updateSliderBackground();
});

guestSlider.addEventListener('input', function() {
    guestCount.value = this.value;
    updateSliderBackground();
});

function updateSliderBackground() {
    const value = guestSlider.value;
    const min = guestSlider.min;
    const max = guestSlider.max;
    const percentage = ((value - min) / (max - min)) * 100;
    guestSlider.style.background = `linear-gradient(to right, #ff6b9d 0%, #ff6b9d ${percentage}%, #333 ${percentage}%, #333 100%)`;
}

// Update budget display
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

minBudget.addEventListener('input', function() {
    budgetMin.textContent = formatNumber(this.value);
});

maxBudget.addEventListener('input', function() {
    budgetMax.textContent = formatNumber(this.value);
});

// Form submission
venueForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        date: document.getElementById('weddingDate').value,
        guests: parseInt(guestCount.value),
        minBudget: parseInt(minBudget.value),
        maxBudget: parseInt(maxBudget.value),
        features: Array.from(document.querySelectorAll('input[name="features"]:checked'))
            .map(cb => cb.value)
    };

    // Save to localStorage and navigate to results page
    localStorage.setItem('searchData', JSON.stringify(formData));
    window.location.href = 'wedding-results.html';
});

// Initialize
updateSliderBackground();
