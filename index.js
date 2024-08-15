const myLibrary = [];

function Book(title, author, pages, haveRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  displayBooks();
}

function displayBooks(){
  const library = document.getElementById("library");
  library.innerHTML = '';

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add('book-card');
    bookCard.setAttribute('data-index', index);
    bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Read: ${book.haveRead}</p>
            <button class="toggle-read">Toggle Read Status</button>
            <button class="remove-book">Remove Book</button>
        `;
      library.appendChild(bookCard);
  })

  attachBookEventListeners();
}

function attachBookEventListeners() {
  const removeButtons = document.querySelectorAll('.remove-book');
  const toggleButtons = document.querySelectorAll('.toggle-read');

  removeButtons.forEach(button => {
      button.addEventListener('click', removeBook);
  });

  toggleButtons.forEach(button => {
      button.addEventListener('click', toggleReadStatus);
  });
}


function removeBook(event) {
  const bookIndex = event.target.parentElement.getAttribute('data-index');
  myLibrary.splice(bookIndex, 1);
  displayBooks();
}

function toggleReadStatus(event){
  const bookIndex = event.target.parentElement.getAttribute('data-index');
  myLibrary[bookIndex].haveRead = myLibrary[bookIndex].haveRead === 'Yes' ? 'No' : 'Yes';
  displayBooks();
}

document.getElementById("new-book-btn").addEventListener('click', () => {
  const formContainer = document.getElementById('form-container');
  formContainer.classList.toggle('hidden');
})

document.getElementById('book-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").value;

  const newBook = new Book(title, author, pages, read);
  addBookToLibrary(newBook);

  document.getElementById('book-form').reset();
  document.getElementById('form-container').classList.add('hidden');


})
const theHobbit1 = new Book('The Hobbit', 'Ishan', '235', 'Yes');
const theHobbit2 = new Book('Harry Potter', 'George Orwell', '328', 'No');
addBookToLibrary(theHobbit1);
addBookToLibrary(theHobbit2);
