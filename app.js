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
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const dateTimeString = current_date.toLocaleString(undefined, options);
    
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

// Fonction pour activer un lien et afficher une section
function activateLink(link) {
  booksLink.classList.remove('active');
  addBookLink.classList.remove('active');
  contactLink.classList.remove('active');

  link.classList.add('active');
}

// Fonction pour afficher une section et masquer les autres
function showSection(section) {
  bookListSection.style.display = 'none';
  addBookSection.style.display = 'none';
  contactSection.style.display = 'none';

  section.style.display = 'block';
}

// Écouteurs d'événements pour les liens de la barre de navigation
booksLink.addEventListener('click', () => {
  activateLink(booksLink);
  showSection(bookListSection);
});

addBookLink.addEventListener('click', () => {
  activateLink(addBookLink);
  showSection(addBookSection);
});

contactLink.addEventListener('click', () => {
  activateLink(contactLink);
  showSection(contactSection);
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

      bookElement.classList.add(index % 2 === 0 ? 'even-book' : 'odd-book');
    });

    // Save the collection in localStorage
    localStorage.setItem('bookCollection', JSON.stringify(this.books));

    // Update bookList border based on collection length
    bookListElement.classList.toggle('border', this.books.length > 0);
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