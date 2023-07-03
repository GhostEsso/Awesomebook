// Get reference to HTML elements
const bookListElement = document.getElementById('bookList');
const addBookForm = document.getElementById('addBookForm');
const titleInput = document.getElementById('titleInput');
const authorInput = document.getElementById('authorInput');

// Create a Book Collection (Array of Objects)
let bookCollection = [];

// Function to display all books of the collection
function displayBooks() {
  // Reset the list of displayed books
  bookListElement.innerHTML = '';

  // Browse the collection and view each book
  bookCollection.forEach((book, index) => {
    const bookElement = document.createElement('div');
    const titleElement = document.createElement('div');
    titleElement.textContent = book.title;
    const authorElement = document.createElement('p');
    authorElement.textContent = book.author;

    // Function to delete a book from the collection
    function removeBook(index) {
      bookCollection.splice(index, 1);
      displayBooks();
    }

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
      removeBook(index);
    });

    bookElement.appendChild(titleElement);
    bookElement.appendChild(authorElement);
    bookElement.appendChild(removeButton);
    bookListElement.appendChild(bookElement);
  });

  // Save the collection in localStorage
  localStorage.setItem('bookCollection', JSON.stringify(bookCollection));
}

// Function to add a new book to the collection
function addBook(title, author) {
  const newBook = { title, author };
  bookCollection.push(newBook);
  displayBooks();
}

// Listen for the form submit event to add a book
addBookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = titleInput.value;
  const author = authorInput.value;
  addBook(title, author);
  titleInput.value = '';
  authorInput.value = '';
});

// Check if book collection data exists in localStorage
if (localStorage.getItem('bookCollection')) {
  bookCollection = JSON.parse(localStorage.getItem('bookCollection'));
}

// Display initial books
displayBooks();