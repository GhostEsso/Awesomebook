// Sélection des liens de la barre de navigation
const booksLink = document.getElementById('booksLink');
const addBookLink = document.getElementById('addBookLink');
const contactLink = document.getElementById('contactLink');

// Sélection des sections de contenu
const bookListSection = document.getElementById('bookListSection');
const addBookSection = document.getElementById('addBookSection');
const contactSection = document.getElementById('contactSection');

document.addEventListener('DOMContentLoaded', function() {
  const currentDateElement = document.getElementById('current_date');
  
  function updateDateTime() {
    const current_date = new Date();
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const date = current_date.toLocaleDateString(undefined, dateOptions);
    const time = current_date.toLocaleTimeString(undefined, timeOptions);
    const dateTimeString = `${date} ${time}`;
    
    currentDateElement.textContent = dateTimeString;
  }
  
  // Mettre à jour la date et l'heure chaque seconde
  setInterval(updateDateTime, 1000);
  
  // Appel initial pour afficher la date et l'heure
  updateDateTime();
});

//
const logoLink = document.querySelector('.logo');

logoLink.addEventListener('click', () => {
  window.location.href = 'index.html';
});




// Écouteurs d'événements pour les liens de la barre de navigation
booksLink.addEventListener('click', () => {
  booksLink.classList.add('active');
  addBookLink.classList.remove('active');
  contactLink.classList.remove('active');

  bookListSection.style.display = 'block';
  addBookSection.style.display = 'none';
  contactSection.style.display = 'none';
});

addBookLink.addEventListener('click', () => {
  booksLink.classList.remove('active');
  addBookLink.classList.add('active');
  contactLink.classList.remove('active');

  bookListSection.style.display = 'none';
  addBookSection.style.display = 'block';
  contactSection.style.display = 'none';
});

contactLink.addEventListener('click', () => {
  booksLink.classList.remove('active');
  addBookLink.classList.remove('active');
  contactLink.classList.add('active');

  bookListSection.style.display = 'none';
  addBookSection.style.display = 'none';
  contactSection.style.display = 'grid';

});

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

    // Update bookList border based on collection length
    if (this.books.length === 0) {
      bookListElement.classList.remove('border');
    } else {
      bookListElement.classList.add('border');
    }
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