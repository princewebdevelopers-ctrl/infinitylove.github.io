// ✅ Initialize with 3 default books if none exist
if (!localStorage.getItem("books")) {
  const defaultBooks = [
    { name: "MADAARA", price: "12.99", cover: "madara cover page copy.jpeg" },
    { name: "So That’s How Love Is...", price: "9.99", cover: "so that cover page.jpeg" },
    { name: "That’s Why I Love", price: "14.99", cover: "that why i love cover page.jpeg" }
  ];
  localStorage.setItem("books", JSON.stringify(defaultBooks));
}

// ✅ Load books from localStorage and render them
function loadBooks() {
  const bookGrid = document.getElementById("bookGrid");
  bookGrid.innerHTML = "";

  const books = JSON.parse(localStorage.getItem("books")) || [];
  books.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.innerHTML = `
      <img src="${book.cover}" alt="${book.name}">
      <h3>${book.name}</h3>
      <p class="price">${book.price}</p>   <!-- removed $ -->
      <div class="book-buttons">
        <button class="view-btn">View</button>
        <button class="buy-btn">Buy</button>
      </div>
    `;
    bookGrid.appendChild(bookCard);
  });
}

// ✅ Run on page load
loadBooks();





function loadAnnouncement() {
  const announcementText = localStorage.getItem("announcement") || "Welcome to our bookstore!";
  document.getElementById("announcementBar").textContent = announcementText;
}

loadAnnouncement();


function loadAuthorPhoto() {
  const photo = localStorage.getItem("authorPhoto");
  if (photo) {
    document.getElementById("authorPhoto").src = photo;
  }
}
loadAuthorPhoto();
