// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to light-mode
const currentTheme = localStorage.getItem('theme') || 'light-mode';
body.classList.add(currentTheme);

// Function to update theme-specific elements
function updateThemeElements(isDarkMode) {
    const themeIcon = document.getElementById('theme-toggle').querySelector('i');
    themeIcon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';

    // Add any donor-specific theme adaptations here
    const donationCards = document.querySelectorAll('.donation-item');
    donationCards.forEach(card => {
        card.style.backgroundColor = isDarkMode ? '#2c3e50' : '#ecf0f1';
        card.style.color = isDarkMode ? '#ecf0f1' : '#2c3e50';
    });
}

// Function to handle theme changes
function handleThemeChange() {
    const isDarkMode = body.classList.contains('dark-mode');
    updateThemeElements(isDarkMode);
}

// Set up theme toggle
themeToggle.addEventListener('click', () => {
    if (body.classList.contains('light-mode')) {
        body.classList.replace('light-mode', 'dark-mode');
        localStorage.setItem('theme', 'dark-mode');
    } else {
        body.classList.replace('dark-mode', 'light-mode');
        localStorage.setItem('theme', 'light-mode');
    }
    handleThemeChange();
});

// Initial theme setup
handleThemeChange();

// Donor-specific functionality
document.addEventListener('DOMContentLoaded', () => {
    const donateForm = document.getElementById('donate-form');
    const historyList = document.getElementById('history-list');
    const donationsCountSpan = document.getElementById('donations-count');

    // Modify the donate form to include address input
    donateForm.innerHTML += `
        <input type="text" name="address" id="address-input" placeholder="Enter your address" required>
        <div id="map" style="height: 300px; width: 100%; margin-top: 10px;"></div>
    `;

    let map, marker;

    function initMap() {
        map = L.map('map').setView([0, 0], 2);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        marker = L.marker([0, 0]).addTo(map);
    }

    function updateMap(address) {
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const lat = parseFloat(data[0].lat);
                    const lon = parseFloat(data[0].lon);
                    map.setView([lat, lon], 13);
                    marker.setLatLng([lat, lon]);
                } else {
                    alert('Address not found');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while geocoding the address');
            });
    }

    document.getElementById('address-input').addEventListener('change', (e) => {
        updateMap(e.target.value);
    });

    function createDonationElement(donationItem) {
        const donationElement = document.createElement('div');
        donationElement.className = 'donation-item';
        donationElement.innerHTML = `
            <h3>${donationItem.foodItem}</h3>
            <p><i class="fas fa-box"></i> Quantity: ${donationItem.quantity}</p>
            <p><i class="fas fa-calendar-alt"></i> Expiration Date: ${donationItem.expirationDate}</p>
            <p><i class="fas fa-info-circle"></i> Description: ${donationItem.description}</p>
            <p><i class="fas fa-map-marker-alt"></i> Address: ${donationItem.address}</p>
            <p><i class="fas fa-tasks"></i> Status: ${donationItem.status || 'Pending'}</p>
        `;
        return donationElement;
    }

    donateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(donateForm);
        const donationItem = {
            id: Date.now(), // Add a unique ID
            foodItem: formData.get('foodItem'),
            quantity: formData.get('quantity'),
            expirationDate: formData.get('expirationDate'),
            description: formData.get('description') || 'N/A',
            date: new Date().toISOString().split('T')[0],
            address: formData.get('address'),
            status: 'Available' // Change status to 'Available'
        };

        const donationElement = createDonationElement(donationItem);
        historyList.prepend(donationElement);

        let donations = JSON.parse(localStorage.getItem('donations')) || [];
        donations.push(donationItem);
        localStorage.setItem('donations', JSON.stringify(donations));

        // Store donation as an available task
        let availableTasks = JSON.parse(localStorage.getItem('availableTasks')) || [];
        availableTasks.push(donationItem);
        localStorage.setItem('availableTasks', JSON.stringify(availableTasks));

        updateDonationsCount(1);
        donateForm.reset();
        handleThemeChange();
    });

    function updateDonationsCount(increment) {
        let donationsCount = parseInt(donationsCountSpan.textContent) || 0;
        donationsCount += increment;
        donationsCountSpan.textContent = donationsCount;
        localStorage.setItem('donationsCount', donationsCount);
    }

    function loadDonations() {
        const donations = JSON.parse(localStorage.getItem('donations')) || [];
        historyList.innerHTML = '';
        donations.forEach(donation => {
            const donationElement = createDonationElement(donation);
            historyList.appendChild(donationElement);
        });
        handleThemeChange();
    }

    loadDonations();
    initMap();

    // Load donations count
    donationsCountSpan.textContent = localStorage.getItem('donationsCount') || '0';
});

// Rest of your donor dashboard JavaScript code...
