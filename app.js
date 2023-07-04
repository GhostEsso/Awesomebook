// Get reference to HTML elements
const bookListElement = document.getElementById('bookList');
const addBookForm = document.getElementById('addBookForm');
const titleInput = document.getElementById('titleInput');
const authorInput = document.getElementById('authorInput');

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class BookCollection {
  constructor() {
    this.books = [];
  }

  addBook(title, author) {
    const book = new Book(title, author);
    this.books.push(book);
    this.displayBooks();
  }

  removeBook(index) {
    this.books.splice(index, 1);
    this.displayBooks();
  }

  displayBooks() {
    // Reset the list of displayed books
    bookListElement.innerHTML = '';

    // Browse the collection and view each book
    this.books.forEach((book, index) => {
      const bookElement = document.createElement('div');
      bookElement.classList.add('book');
    
      const titleElement = document.createElement('span');
      titleElement.textContent = book.title;
    
      const authorElement = document.createElement('span');
      authorElement.textContent = ' by ' + book.author;
    
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', () => {
        this.removeBook(index);
      });


      bookElement.appendChild(titleElement);
      bookElement.appendChild(authorElement);
      bookElement.appendChild(removeButton);
      bookListElement.appendChild(bookElement);

      if (index % 2 === 0) {
        bookElement.classList.add('even-book');
      } else {
        bookElement.classList.add('odd-book');
      }
  });

    // Save the collection in localStorage
    localStorage.setItem('bookCollection', JSON.stringify(this.books));
  }
}

// Create an instance of BookCollection
const bookCollection = new BookCollection();

// Listen for the form submit event to add a book
addBookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = titleInput.value;
  const author = authorInput.value;
  bookCollection.addBook(title, author);
  titleInput.value = '';
  authorInput.value = '';
});

// Check if book collection data exists in localStorage
if (localStorage.getItem('bookCollection')) {
  bookCollection.books = JSON.parse(localStorage.getItem('bookCollection'));
}

// Display initial books
bookCollection.displayBooks();