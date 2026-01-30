// Sample venue data with images
const venues = [
    {
        name: "Rose Garden Estate",
        description: "Elegant outdoor garden with romantic rose arches",
        capacity: 200,
        price: 3500,
        image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80",
        features: ["outdoor", "parking", "catering", "ceremony"],
        matchScore: 92
    },
    {
        name: "The Grand Terrace",
        description: "Modern venue with indoor and outdoor spaces",
        capacity: 220,
        price: 3800,
        image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
        features: ["indoor", "outdoor", "bar", "parking", "av"],
        matchScore: 90
    },
    {
        name: "Crystal Ballroom",
        description: "Luxurious indoor hall with crystal chandeliers",
        capacity: 250,
        price: 5000,
        image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&q=80",
        features: ["indoor", "bar", "dance", "av", "catering"],
        matchScore: 88
    },
    {
        name: "Seaside Pavilion",
        description: "Stunning waterfront venue with ocean views",
        capacity: 180,
        price: 4200,
        image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
        features: ["waterfront", "outdoor", "ceremony", "parking"],
        matchScore: 85
    },
    {
        name: "Historic Manor",
        description: "Charming historic estate with elegant gardens",
        capacity: 150,
        price: 4500,
        image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80",
        features: ["outdoor", "indoor", "bar", "parking"],
        matchScore: 83
    },
    {
        name: "Lakeside Resort",
        description: "Peaceful lakeside setting with mountain views",
        capacity: 200,
        price: 5500,
        image: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&q=80",
        features: ["waterfront", "outdoor", "catering", "bar"],
        matchScore: 82
    },
    {
        name: "Urban Loft",
        description: "Contemporary industrial space in the city",
        capacity: 120,
        price: 3200,
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
        features: ["indoor", "bar", "dance", "av"],
        matchScore: 78
    },
    {
        name: "Vineyard Estate",
        description: "Rustic charm among rolling vineyards",
        capacity: 180,
        price: 6000,
        image: "https://images.unsplash.com/photo-1510076857177-7470076d4098?w=800&q=80",
        features: ["outdoor", "ceremony", "catering", "parking"],
        matchScore: 76
    }
];

// Load search data from localStorage
let searchData = JSON.parse(localStorage.getItem('searchData') || '{}');

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Update filter tags
function updateFilterTags() {
    if (searchData.date) {
        document.getElementById('dateTag').textContent = new Date(searchData.date).toLocaleDateString();
    }
    if (searchData.guests) {
        document.getElementById('guestsTag').textContent = `${searchData.guests} guests`;
    }
    if (searchData.minBudget && searchData.maxBudget) {
        document.getElementById('budgetTag').textContent = 
            `$${formatNumber(searchData.minBudget)} - $${formatNumber(searchData.maxBudget)}`;
    }
}

// Filter venues based on search criteria
function filterVenues() {
    return venues.filter(venue => {
        const capacityMatch = !searchData.guests || venue.capacity >= searchData.guests;
        const budgetMatch = (!searchData.minBudget || venue.price >= searchData.minBudget) &&
                           (!searchData.maxBudget || venue.price <= searchData.maxBudget);
        const featuresMatch = !searchData.features || searchData.features.length === 0 || 
            searchData.features.some(feature => venue.features.includes(feature));
        
        return capacityMatch && budgetMatch && featuresMatch;
    });
}

// Sort venues
function sortVenues(venueList, sortBy) {
    const sorted = [...venueList];
    switch(sortBy) {
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'capacity':
            return sorted.sort((a, b) => b.capacity - a.capacity);
        case 'match':
        default:
            return sorted.sort((a, b) => b.matchScore - a.matchScore);
    }
}

// Display venues
function displayVenues() {
    const filteredVenues = filterVenues();
    const sortBy = document.getElementById('sortSelect').value;
    const sortedVenues = sortVenues(filteredVenues, sortBy);

    const venuesGrid = document.getElementById('venuesGrid');

    if (sortedVenues.length === 0) {
        venuesGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                <p style="font-size: 24px; color: #999; margin-bottom: 10px;">😔 No venues found</p>
                <p style="font-size: 16px; color: #bbb;">Try adjusting your filters</p>
                <button onclick="goBack()" style="margin-top: 20px; padding: 12px 24px; background: #ff6b9d; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px;">Edit Filters</button>
            </div>
        `;
        return;
    }

    venuesGrid.innerHTML = sortedVenues.map(venue => `
        <div class="venue-card">
            <div class="venue-image-container">
                <img src="${venue.image}" alt="${venue.name}" class="venue-image">
                <div class="match-score">
                    <span class="star-icon">⭐</span>
                    ${venue.matchScore}/100
                </div>
            </div>
            <div class="venue-info">
                <h3 class="venue-name">${venue.name}</h3>
                <p class="venue-description">${venue.description}</p>
                <div class="venue-details">
                    <span class="venue-capacity">
                        👥 Capacity: ${venue.capacity} guests
                    </span>
                    <span class="venue-price">From $${formatNumber(venue.price)}</span>
                </div>
                <button class="view-details-btn" onclick="viewDetails('${venue.name}')">
                    View Details
                </button>
            </div>
        </div>
    `).join('');
}

// View details function
function viewDetails(venueName) {
    window.location.href = `wedding-details.html?venue=${encodeURIComponent(venueName)}`;
}

// Go back to search page
function goBack() {
    window.location.href = 'wedding-venue-finder.html';
}

// Sort change handler
document.getElementById('sortSelect').addEventListener('change', displayVenues);

// Initialize
updateFilterTags();
displayVenues();
