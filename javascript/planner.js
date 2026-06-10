const hamburgerBtn = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburgerBtn && navLinks) {
  hamburgerBtn.addEventListener('click', () => navLinks.classList.toggle('show'));
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

document.addEventListener('DOMContentLoaded', () => {
  // Populate destination dropdown
  const destinationSelect = document.getElementById('trip-destination');
  destinations.forEach(dest => {
    const option = document.createElement('option');
    option.value = dest;
    option.textContent = dest;
    destinationSelect.appendChild(option);
  });

  const form = document.getElementById('add-trip-form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const days = parseInt(document.getElementById('trip-days').value);
    const daily = parseInt(document.getElementById('daily-budget').value);
    const total = days * daily;

    const percent = Math.min(Math.round((total / 5000) * 100), 100);

    document.getElementById('total-cost').innerHTML = `<strong>Total Estimated Cost: $${total}</strong>`;
    document.getElementById('budget-fill').style.width = percent + '%';
    document.getElementById('budget-status').textContent = total > 3000 ? 'Luxury Trip ✨' : total > 1500 ? 'Moderate Trip 🌏' : 'Budget-Friendly 🌍';
    document.getElementById('budget-results').style.display = 'block';

    document.getElementById('save-trip-btn').onclick = () => {
      let trips = JSON.parse(localStorage.getItem('savedTrips')) || [];
      trips.push({ destination: document.getElementById('trip-destination').value, days, daily, total });
      localStorage.setItem('savedTrips', JSON.stringify(trips));
      alert('✅ Trip saved to My Trips!');
    };
  });

  
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = document.getElementById('newsletter-email').value;
      if (email) {
        localStorage.setItem('newsletterEmail', email);
        alert('✅ Subscribed to TravelNest tips!');
        newsletterForm.reset();
      }
    });
  }
});