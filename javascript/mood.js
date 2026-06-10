const hamburgerBtn = document.querySelector('.hamburger');
const navigationLinks = document.querySelector('.nav-links');

if (hamburgerBtn && navigationLinks) {
  hamburgerBtn.addEventListener('click', () => navigationLinks.classList.toggle('show'));
}

const destinations = [
  "Santorini, Greece",
  "Machu Picchu, Peru",
  "Tokyo, Japan",
  "Banff, Canada",
  "Marrakech, Morocco",
  "Kandy, Sri Lanka",
  "Bali, Indonesia",
  "Barcelona, Spain",
  "Maldives",
  "New York, USA"
];

let currentAudio = null;


const sounds = {
  beach: "sounds/ocean-waves.mp3",
  forest: "sounds/forest-rain.mp3",
  city: "sounds/city-hustle.mp3"
};

document.addEventListener('DOMContentLoaded', () => {
  // Populate visited destinations dropdown
  const visitedSelect = document.getElementById('visited-select');
  destinations.forEach(dest => {
    const option = document.createElement('option');
    option.value = dest;
    option.textContent = dest;
    visitedSelect.appendChild(option);
  });

  document.getElementById('play-beach-btn').addEventListener('click', () => playSound('beach'));
  document.getElementById('play-forest-btn').addEventListener('click', () => playSound('forest'));
  document.getElementById('play-city-btn').addEventListener('click', () => playSound('city'));
  document.getElementById('stop-sound-btn').addEventListener('click', stopSound);

  renderVisited();

  
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.getElementById('newsletter-email').value;
      if (email) {
        localStorage.setItem("newsletterEmail", email);
        alert("✅ Subscribed successfully! ✈️");
        newsletterForm.reset();
      }
    });
  }
});

function playSound(type) {
  if (currentAudio) currentAudio.pause();
  currentAudio = new Audio(sounds[type]);
  currentAudio.loop = true;
  currentAudio.play().catch(() => alert("Audio playback blocked by browser. Try clicking again."));
  
  document.getElementById('stop-sound-btn').disabled = false;
}

function stopSound() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  document.getElementById('stop-sound-btn').disabled = true;
}

// Visited destinations tracker
let visited = JSON.parse(localStorage.getItem('visitedDestinations')) || [];

const visitedForm = document.getElementById('add-visited-form');
visitedForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const select = document.getElementById('visited-select');
  const destination = select.value;
  if (destination && !visited.includes(destination)) {
    visited.push(destination);
    localStorage.setItem('visitedDestinations', JSON.stringify(visited));
    renderVisited();
    select.value = '';
  }
});

function renderVisited() {
  const list = document.getElementById('visited-list');
  list.innerHTML = visited.length 
    ? visited.map(d => `<li>✅ ${d}</li>`).join('')
    : '<li>No destinations marked yet. Add one above!</li>';
}