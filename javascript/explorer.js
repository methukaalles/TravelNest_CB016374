const destinations = [
  { id: 1, name: "Paris", country: "France", continent: "Europe", image: "images/paris.jpg", description: "City of Light, art, and romance.", attractions: ["Eiffel Tower", "Louvre", "Notre-Dame"], costLow: 120, costMed: 250, costHigh: 450 },
  { id: 2, name: "Tokyo", country: "Japan", continent: "Asia", image: "images/tokyo.jpg", description: "Futuristic metropolis meets ancient temples.", attractions: ["Shibuya", "Senso-ji", "Mount Fuji day trip", "Tokyo Skytree"], costLow: 150, costMed: 300, costHigh: 600 },
  { id: 3, name: "Santorini", country: "Greece", continent: "Europe", image: "images/santorini.jpg", description: "Iconic blue domes and breathtaking sunsets.", attractions: ["Oia Village", "Red Beach", "Volcano hike"], costLow: 130, costMed: 280, costHigh: 520 },
  { id: 4, name: "Marrakech", country: "Morocco", continent: "Africa", image: "images/marrakech.jpg", description: "Vibrant souks and rich cultural heritage.", attractions: ["Jemaa el-Fnaa", "Majorelle Garden", "Koutoubia Mosque"], costLow: 80, costMed: 180, costHigh: 350 },
  { id: 5, name: "New York City", country: "USA", continent: "North America", image: "images/newyork.jpg", description: "Dynamic metropolis where cultures and commerce collide.", attractions: ["Statue of Liberty", "Central Park", "Times Square"], costLow: 130, costMed: 360, costHigh: 1100 },
  { id: 6, name: "Sydney", country: "Australia", continent: "Oceania", image: "images/sydney.jpg", description: "Iconic harbor city with vibrant culture.", attractions: ["Sydney Opera House", "Bondi Beach", "Taronga Zoo"], costLow: 160, costMed: 350, costHigh: 700 },
  { id: 7, name: "Rio de Janeiro", country: "Brazil", continent: "South America", image: "images/rio.jpg", description: "Lively city with stunning beaches and culture.", attractions: ["Christ the Redeemer", "Copacabana Beach", "Sugar Loaf Mountain"], costLow: 100, costMed: 220, costHigh: 400 },
  { id: 8, name: "Dubai", country: "UAE", continent: "Asia", image: "images/dubai.jpg", description: "Dramatic landscapes and vibrant culture.", attractions: ["Burj Khalifa", "Desert Safari", "Palm Jumeirah"], costLow: 90, costMed: 200, costHigh: 380 }
];

let currentList = [...destinations];

function renderDestinations(list) {
  const grid = document.getElementById('destination-grid');
  grid.innerHTML = list.map(d => `
    <div class="card" onclick="showModal(${d.id})">
      <img src="${d.image}" alt="${d.name}">
      <h3>${d.name}</h3>
      <p><strong>${d.country}</strong></p>
    </div>
  `).join('');
}

function showModal(id) {
  const dest = destinations.find(d => d.id === id);
  if (!dest) return;

  document.getElementById('modal-image').src = dest.image;
  document.getElementById('modal-name').textContent = dest.name;
  document.getElementById('modal-country').textContent = dest.country;
  document.getElementById('modal-description').textContent = dest.description;
  
  const attrList = document.getElementById('modal-attractions');
  attrList.innerHTML = dest.attractions.map(a => `<li>${a}</li>`).join('');
  
  const tableHTML = `
    <tr><th>Estimated Daily Cost (USD)</th><th></th></tr>
    <tr><td>Budget</td><td>$${dest.costLow}</td></tr>
    <tr><td>Moderate</td><td>$${dest.costMed}</td></tr>
    <tr><td>Luxury</td><td>$${dest.costHigh}</td></tr>`;
  document.getElementById('modal-cost-table').innerHTML = tableHTML;
  
  document.getElementById('destination-modal').style.display = 'flex';
}

window.closeModal = () => document.getElementById('destination-modal').style.display = 'none';

document.addEventListener('DOMContentLoaded', () => {
  renderDestinations(destinations);

  document.getElementById('search-input').addEventListener('input', e => {
    const term = e.target.value.toLowerCase();
    const filtered = destinations.filter(d => 
      d.name.toLowerCase().includes(term) || d.country.toLowerCase().includes(term)
    );
    renderDestinations(filtered);
  });

  document.getElementById('continent-filter').addEventListener('change', e => {
    const continent = e.target.value;
    const filtered = continent ? destinations.filter(d => d.continent === continent) : destinations;
    renderDestinations(filtered);
  });

  window.sortByCost = () => {
    const sorted = [...destinations].sort((a,b) => a.costMed - b.costMed);
    renderDestinations(sorted);
  };

  // Hamburger (shared)
  const ham = document.querySelector('.hamburger');
  if (ham) ham.addEventListener('click', () => document.querySelector('.nav-links').classList.toggle('show'));
});