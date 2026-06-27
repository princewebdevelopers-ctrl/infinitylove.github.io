let pendingEdits = {}; // store edits until saved

// ✅ Display all books from localStorage
function displayBooks() {
  const bookList = document.getElementById("bookList");
  bookList.innerHTML = "";
  const books = JSON.parse(localStorage.getItem("books")) || [];

  books.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.innerHTML = `
      <img src="${book.cover}" alt="${book.name}">
      <h3 contenteditable="true" oninput="queueEdit(${index}, 'name', this.innerText)">${book.name}</h3>
      <p class="price" contenteditable="true" oninput="queueEdit(${index}, 'price', this.innerText)">$${book.price}</p>
      <input type="file" onchange="queueCover(${index}, this.files[0])">
      <button onclick="deleteBook(${index})">Delete</button>
    `;
    bookList.appendChild(bookCard);
  });
}

// ✅ Queue edits instead of saving immediately
function queueEdit(index, field, value) {
  if (!pendingEdits[index]) pendingEdits[index] = {};
  pendingEdits[index][field] = value.replace("$", "");
}

function queueCover(index, file) {
  if (!pendingEdits[index]) pendingEdits[index] = {};
  if (file) {
    pendingEdits[index].cover = URL.createObjectURL(file);
  }
}

// ✅ Save all pending edits
function saveChanges() {
  let books = JSON.parse(localStorage.getItem("books")) || [];
  for (let index in pendingEdits) {
    Object.assign(books[index], pendingEdits[index]);
  }
  localStorage.setItem("books", JSON.stringify(books));
  pendingEdits = {}; // clear edits
  alert("Changes saved successfully!");
  displayBooks();
}

// ✅ Delete book
function deleteBook(index) {
  let books = JSON.parse(localStorage.getItem("books")) || [];
  books.splice(index, 1);
  localStorage.setItem("books", JSON.stringify(books));
  displayBooks();
}

// ✅ Add new book
document.getElementById("bookForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("bookName").value;
  const price = document.getElementById("bookPrice").value;
  const coverFile = document.getElementById("bookCover").files[0];
  const coverURL = URL.createObjectURL(coverFile);

  let books = JSON.parse(localStorage.getItem("books")) || [];
  books.push({ name, price, cover: coverURL });
  localStorage.setItem("books", JSON.stringify(books));

  alert("Book added successfully!");
  displayBooks();
});

// ✅ Load all books on page start
displayBooks();
function deleteDefaultBooks() {
  let books = JSON.parse(localStorage.getItem("books")) || [];
  // Remove the first 3 (defaults)
  books = books.slice(3);
  localStorage.setItem("books", JSON.stringify(books));
  displayBooks();
  alert("Deleted the 3 default books. Only your added books remain.");
}
// ✅ Reset back to the 3 default books
function resetToDefaultBooks() {
  const defaultBooks = [
    { name: "MADAARA", price: "12.99", cover: "madara cover page copy.jpeg" },
    { name: "So That’s How Love Is...", price: "9.99", cover: "so that cover page.jpeg" },
    { name: "That’s Why I Love", price: "14.99", cover: "that why i love cover page.jpeg" }
  ];
  localStorage.setItem("books", JSON.stringify(defaultBooks));
  displayBooks();
  alert("Reset complete — only the 3 default books are now in your store.");
}

function deleteNewlyAddedBooks() {
  let books = JSON.parse(localStorage.getItem("books")) || [];
  // Keep only the first 3 (defaults)
  books = books.slice(0, 3);
  localStorage.setItem("books", JSON.stringify(books));
  displayBooks();
  alert("Deleted all newly added books. Only the 3 defaults remain.");
}

// ✅ Save announcement text
function saveAnnouncement() {
  const announcementText = document.getElementById("announcementInput").value;
  localStorage.setItem("announcement", announcementText);
  alert("Announcement updated!");
  displayAnnouncement();
}

// ✅ Display announcement in admin preview
function displayAnnouncement() {
  const announcementText = localStorage.getItem("announcement") || "Welcome to our bookstore!";
  document.getElementById("announcementInput").value = announcementText;
}

function saveAuthorPhoto() {
  const fileInput = document.getElementById("authorPhotoInput");
  if (!fileInput || fileInput.files.length === 0) {
    alert("Please select a photo first.");
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    localStorage.setItem("authorPhoto", e.target.result);
    alert("Author photo updated!");
    // Optional: show preview immediately
    document.getElementById("authorPhoto").src = e.target.result;
  };

  reader.readAsDataURL(file);
}

