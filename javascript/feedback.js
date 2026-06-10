const hamburgerBtn = document.querySelector('.hamburger');
const navigationLinks = document.querySelector('.nav-links');

if (hamburgerBtn && navigationLinks) {
  hamburgerBtn.addEventListener('click', () => navigationLinks.classList.toggle('show'));
}

const form = document.getElementById('feedback-form');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('feedback-name').value.trim();
  const email = document.getElementById('feedback-email').value.trim();
  const message = document.getElementById('feedback-message').value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  const feedback = {
    name: name,
    email: email,
    message: message,
    rating: document.getElementById('feedback-rating').value,
    date: new Date().toLocaleDateString()
  };

  let feedbackList = JSON.parse(localStorage.getItem('travelFeedback')) || [];
  feedbackList.push(feedback);
  localStorage.setItem('travelFeedback', JSON.stringify(feedbackList));

  alert('Thank you for your feedback! We appreciate it ❤️');

  form.reset();
});

// FAQ Accordion (already in HTML as <details>, but JS can enhance if needed)
console.log('%c✅ Feedback page loaded with localStorage support', 'color:#0284c8');


const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('newsletter-email').value;
    if (email) {
      localStorage.setItem("newsletterEmail", email);
      alert("Subscribed to TravelNest tips! ✈️");
      newsletterForm.reset();
    }
  });
}