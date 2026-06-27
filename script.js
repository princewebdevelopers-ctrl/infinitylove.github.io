// script.js

// Select slides and navigation dots
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll("#bubbleNav span");
let currentIndex = 0;
let slideInterval;

// Show a specific slide
function showSlide(index) {
  slides.forEach(s => s.classList.remove("active"));
  dots.forEach(d => d.classList.remove("active"));

  slides[index].classList.add("active");
  dots[index].classList.add("active");

  currentIndex = index;
}

// Move to next slide
function nextSlide() {
  const nextIndex = (currentIndex + 1) % slides.length;
  showSlide(nextIndex);
}

// Move to previous slide
function prevSlide() {
  const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(prevIndex);
}

// Dot navigation
dots.forEach(dot => {
  dot.addEventListener("click", () => {
    showSlide(parseInt(dot.dataset.index));
    resetInterval(); // reset autoplay when user clicks
  });
});

// Start autoplay
function startInterval() {
  slideInterval = setInterval(nextSlide, 7000);
}

// Reset autoplay when user interacts
function resetInterval() {
  clearInterval(slideInterval);
  startInterval();
}

// Swipe support for mobile
let startX = 0;
let endX = 0;

const slideshow = document.querySelector(".slideshow");

slideshow.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

slideshow.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (Math.abs(diff) > 50) { // threshold to avoid accidental swipes
    if (diff > 0) {
      nextSlide(); // swipe left → next
    } else {
      prevSlide(); // swipe right → previous
    }
    resetInterval(); // reset autoplay after swipe
  }
});

// Initialize slideshow
startInterval();
