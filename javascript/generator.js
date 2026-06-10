const hamburgerBtn = document.querySelector('.hamburger');
const navigationLinks = document.querySelector('.nav-links');

if (hamburgerBtn && navigationLinks) {
  hamburgerBtn.addEventListener('click', () => {
    navigationLinks.classList.toggle('show');
  });
}

const trips = [
  { title: "Santorini Sunset Escape", type: "relaxation", budget: "medium", country: "Greece", days: "7" },
  { title: "Machu Picchu Adventure", type: "adventure", budget: "medium", country: "Peru", days: "10" },
  { title: "Tokyo Cultural Journey", type: "cultural", budget: "high", country: "Japan", days: "8" },
  { title: "Banff Mountain Escape", type: "nature", budget: "medium", country: "Canada", days: "6" },
  { title: "Marrakech Souk Explorer", type: "cultural", budget: "low", country: "Morocco", days: "5" },
  { title: "Sri Dalada Maligawa", type: "cultural", budget: "low", country: "Sri Lanka", days: "5" },
  { title: "Bali Beach Bliss", type: "relaxation", budget: "low", country: "Indonesia", days: "7" },
  { title: "Barcelona Art & Food", type: "cultural", budget: "medium", country: "Spain", days: "5" },
  { title: "Maldives Paradise", type: "relaxation", budget: "high", country: "Maldives", days: "7" },
  { title: "New York City Explorer", type: "cultural", budget: "high", country: "USA", days: "5" }
];

let currentTrip = null;

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('pick-btn').addEventListener('click', pickTrip);
  document.getElementById('pick-again-btn').addEventListener('click', pickTrip);
  document.getElementById('save-btn').addEventListener('click', saveTrip);

  renderWishlist();

  // Newsletter
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.getElementById('newsletter-email').value;
      if (email) {
        localStorage.setItem("newsletterEmail", email);
        alert("✅ Subscribed to TravelNest tips! ✈️");
        newsletterForm.reset();
      }
    });
  }
});

function pickTrip() {
  const type = document.getElementById('type-select').value;
  const budget = document.getElementById('budget-select').value;

  let filtered = trips.filter(t => {
    const typeMatch = !type || t.type === type;
    const budgetMatch = !budget || t.budget === budget;
    return typeMatch && budgetMatch;
  });

  if (filtered.length === 0) filtered = trips;

  const randomIndex = Math.floor(Math.random() * filtered.length);
  currentTrip = filtered[randomIndex];

  const area = document.getElementById('recommendation-area');
  area.innerHTML = `
    <div class="recommendation-card">
      <h3>🌍 ${currentTrip.title}</h3>
      <p><strong>${currentTrip.country}</strong></p>
      <p style="color:#666;margin:0.5rem 0;">📅 ${currentTrip.days} days</p>
      <p style="color:#0284c8;margin:0.5rem 0;font-weight:600;">${currentTrip.type.toUpperCase()} • 💰 ${currentTrip.budget.toUpperCase()} BUDGET</p>
    </div>
  `;

  document.getElementById('pick-again-btn').style.display = 'inline-block';
  document.getElementById('save-btn').style.display = 'inline-block';
}

function saveTrip() {
  if (!currentTrip) return;
  let wishlist = JSON.parse(localStorage.getItem('travelWishlist')) || [];
  
  if (!wishlist.some(item => item.title === currentTrip.title)) {
    wishlist.push(currentTrip);
    localStorage.setItem('travelWishlist', JSON.stringify(wishlist));
    renderWishlist();
    alert('✅ Trip saved to your Wishlist!');
  } else {
    alert('ℹ️ Already in your wishlist!');
  }
}

function renderWishlist() {
  const list = JSON.parse(localStorage.getItem('travelWishlist')) || [];
  const ul = document.getElementById('wishlist-list');
  ul.innerHTML = list.length 
    ? list.map((item, index) => `<li style="display:flex;justify-content:space-between;align-items:center;"><span>🗺️ ${item.title} — ${item.country} (${item.days} days)</span><button onclick="removeWishlistItem(${index})" style="background:#ff6b6b;color:#fff;border:none;border-radius:4px;padding:0.3rem 0.6rem;cursor:pointer;font-weight:600;">×</button></li>`).join('')
    : '<li>No trips saved yet. Generate one above!</li>';
}

function removeWishlistItem(index) {
  let wishlist = JSON.parse(localStorage.getItem('travelWishlist')) || [];
  const removedTrip = wishlist[index];
  wishlist.splice(index, 1);
  localStorage.setItem('travelWishlist', JSON.stringify(wishlist));
  renderWishlist();
  alert(`❌ "${removedTrip.title}" removed from wishlist!`);
}