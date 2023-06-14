"use strict";
const books =  JSON.parse(localStorage.getItem('books')) || [];

const bookModal = document.getElementById("bookModal");
const overlay = document.querySelector(".overlay");
const addBookBtn = document.getElementById('addBtn');
const booksContainer = document.querySelector(".books_container");
const form = document.getElementById('addBookForm');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const bookPages = document.getElementById('pages');
const bookStatus = document.getElementById('read');

// object constructor
class Book {
  constructor(title, author, pages, status) {
  this.id = "id" + Math.random().toString(16).slice(2);
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
  }
}

// functions
function closeModal() {
  bookModal.classList.remove('active');
  overlay.classList.remove('active');
}

function showModal(){
  bookModal.classList.add('active')
  overlay.classList.add('active');
}

function createBookCard(book){
  const bookDiv = document.createElement('div')
  bookDiv.setAttribute('class','book__card');
  bookDiv.setAttribute('id',`${book.id}`);
  bookDiv.innerHTML = `
          <div data-id="${book.id}" class="book__card--image">
            <img src= "https://unsplash.it/300/300" />
          </div>
          <div class="book__card--info">
            <h2>Title: ${book.title}</h2>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <button id="read" class="btn">${book.status ? 'READ' : 'NOT READ'}</button>
            <button id="delete" class="btn">DELETE</button>
  `
  booksContainer.appendChild(bookDiv);
}

// function addBookFunction(){
//   showModal();
//   form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     let book = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookStatus.checked === true);
//     books.push(book);
//     createBookCard(book);
//     //localStorage.setItem('books', JSON.stringify(books))
//     closeModal();
//   })
// }

function addBookFunction() {
  showModal();
  form.removeEventListener('submit', handleSubmit);
  form.addEventListener('submit', handleSubmit);
}

function editBook(e){
  console.log(e.target.id);
}

function handleSubmit(e) {
  e.preventDefault();
  let book = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookStatus.checked === true);
  books.push(book);
  createBookCard(book);
  localStorage.setItem('books', JSON.stringify(books))
  closeModal();
}

addBookBtn.addEventListener("click", addBookFunction)
overlay.addEventListener("click", closeModal)

window.onload = function() {
  for(const book of books){
    createBookCard(book);
    const bookCards = document.querySelectorAll('.book__card');
    bookCards.forEach((card) => {
      card.addEventListener('click', editBook)
    })
  }
};