let myLibrary = [];
let libraryEl = document.getElementById("library");


function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
	/*console.log("addBookToLibrary called");*/
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    let read = document.querySelector("#read").checked;
	/*console.log("Input Values:", title, author, pages, read);*/
    let newBook = new Book(title, author, pages, read);
	myLibrary.push(newBook);
	render();	
    /*console.log(newBook);*/
	closeNewBookPopup(); // Close the popup after adding the book
}

function render() {
  const libraryEl = document.getElementById("library");
  const bookCards = document.querySelectorAll(".book-card");

  myLibrary.forEach((book, i) => {
    let bookCard = bookCards[i];
    if (!bookCard) {
      // If the book card doesn't exist, create a new one
      bookCard = document.createElement("div");
      bookCard.classList.add("book-card");
      libraryEl.appendChild(bookCard);
    }
    bookCard.innerHTML = `
      <div class="card-header">
        <h3 class="book-title">${book.title}</h3>
        <h5 class="book-author">${book.author}</h5>
        <p class="book-pages">${book.pages} Pages</p>
      </div>
      <div class="card-body">
        <button class="btn-delete" onclick="removeBook(${i})">Delete</button>
        <button class="btn-read" onclick="toggleRead(${i})">${book.read ? "Read" : "Not Read"}</button>
      </div>
    `;
  });
}


function removeBook(index) {
  // Retrieve the index from the button element's dataset
  let bookIndex = parseInt(index);
  myLibrary.splice(bookIndex, 1);
  render();
}

Book.prototype.toggleRead = function() {
	this.read = !this.read;
}

function toggleRead(index) {
	let book = myLibrary[index];
	book.toggleRead();
	render();
  
	let readButton = document.querySelectorAll(".btn-read")[index];
	if (book.read) {
	  readButton.style.backgroundColor = "green";
	  readButton.textContent = "Read";
	} else {
	  readButton.style.backgroundColor = "red";
	  readButton.textContent = "Not Read";
	}
  }
  

let newBookbtn = document.querySelector("#new-book-btn");
newBookbtn.addEventListener("click", function() {
    let newBookForm = document.querySelector("#new-book-form");
    newBookForm.style.display = "block";
});

document.querySelector("#new-book-form").addEventListener("submit", function(event) {
    event.preventDefault();
	/*console.log("submit event triggered")*/
    addBookToLibrary();
})

// library.js

function showNewBookPopup() {
    let modal = document.getElementById("new-book-modal");
    modal.style.display = "block";
}

function closeNewBookPopup() {
    let modal = document.getElementById("new-book-modal");
    modal.style.display = "none";
}

