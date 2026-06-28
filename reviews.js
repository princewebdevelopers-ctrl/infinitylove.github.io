const reviewForm = document.getElementById("reviewForm");
const reviewText = document.getElementById("reviewText");
const reviewImage = document.getElementById("reviewImage");
const reviewsList = document.getElementById("reviewsList");

// Get book identifier from data attribute
const bookKey = document.querySelector(".review-center").dataset.book;
const storageKey = `reviews_${bookKey}`;

// Load saved reviews for this book
window.onload = () => {
  const savedReviews = JSON.parse(localStorage.getItem(storageKey)) || [];
  savedReviews.forEach(r => addReviewToPage(r.text, r.image));
};

// Handle form submission
reviewForm.addEventListener("submit", e => {
  e.preventDefault();
  const text = reviewText.value.trim();
  if (!text) return;

  let imageData = null;
  if (reviewImage.files[0]) {
    const reader = new FileReader();
    reader.onload = () => {
      imageData = reader.result;
      saveReview(text, imageData);
      addReviewToPage(text, imageData);
    };
    reader.readAsDataURL(reviewImage.files[0]);
  } else {
    saveReview(text, imageData);
    addReviewToPage(text, imageData);
  }

  reviewText.value = "";
  reviewImage.value = "";
});

// Save review to localStorage (book-specific)
function saveReview(text, image) {
  const savedReviews = JSON.parse(localStorage.getItem(storageKey)) || [];
  savedReviews.push({ text, image });
  localStorage.setItem(storageKey, JSON.stringify(savedReviews));
}

// Add review to page
function addReviewToPage(text, image) {
  const reviewDiv = document.createElement("div");
  reviewDiv.classList.add("review-item");
  reviewDiv.innerHTML = `
    <p>${text}</p>
    ${image ? `<img src="${image}" alt="User photo" style="max-width:150px; border-radius:10px; margin-top:10px;">` : ""}
  `;
  reviewsList.appendChild(reviewDiv);
}
