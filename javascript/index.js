const hamburgerBtn = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburgerBtn && navLinks) {
  hamburgerBtn.addEventListener('click', () => navLinks.classList.toggle('show'));
  
  // Close menu when a link is clicked
  const navLinkItems = navLinks.querySelectorAll('a');
  navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('show');
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
      navLinks.classList.remove('show');
    }
  });
}

// Travel quotes rotator
const quotes = [
  { text: "The world is a book and those who do not travel read only one page.", author: "Saint Augustine" },
  { text: "Travel is the only thing you buy that makes you richer.", author: "Anonymous" },
  { text: "Not all those who wander are lost.", author: "J.R.R. Tolkien" }
];

let currentQuote = 0;
const quoteEl = document.getElementById('travel-quote');
const authorEl = document.getElementById('quote-author');

function showQuote() {
  quoteEl.textContent = quotes[currentQuote].text;
  authorEl.textContent = "— " + quotes[currentQuote].author;
  currentQuote = (currentQuote + 1) % quotes.length;
}
if (quoteEl && authorEl) {
  showQuote();
  setInterval(showQuote, 6000);
}

// Destination of the Day
const destinationsOfDay = [
  { name: "Santorini", country: "Greece", description: "White-washed buildings and stunning sunsets over the Aegean Sea.", image: "images/santorini.jpg" },
  { name: "Dubai", country: "UAE", description: "Dramatic landscapes and vibrant culture.", image: "images/dubai.jpg" },
  { name: "Tokyo", country: "Japan", description: "Futuristic metropolis meets ancient temples.", image: "images/tokyo.jpg" }
];

const dayIndex = new Date().getDay() % destinationsOfDay.length;
const daily = destinationsOfDay[dayIndex];

document.getElementById('daily-name').textContent = daily.name;
document.getElementById('daily-country').textContent = daily.country;
document.getElementById('daily-description').textContent = daily.description;
document.getElementById('daily-image').src = daily.image;


const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('newsletter-email').value;
    if (email) {
      localStorage.setItem('newsletterEmail', email);
      alert('Thank you! You are now subscribed to TravelNest tips ✨');
      newsletterForm.reset();
    }
  });
}