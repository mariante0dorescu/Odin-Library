"use strict";
const books = JSON.parse(localStorage.getItem('items')) || {};

const bookModal = document.getElementById("bookModal");
const overlay = document.querySelector(".overlay")
const addBookBtn = document.getElementById('addBtn');

function closeModal() {
  bookModal.classList.remove('active');
  overlay.classList.remove('active');
}

function showModal(){
  bookModal.classList.add('active')
  overlay.classList.add('active');
}

function addBookFunction(){
  showModal();
}

addBookBtn.addEventListener("click", addBookFunction)
overlay.addEventListener("click", closeModal)