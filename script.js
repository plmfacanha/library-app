// =======================
// Book Class
// =======================
class Book {
  constructor({ title, author, isRead }) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.isRead = isRead;
  }

  toggleRead() {
    this.isRead = !this.isRead;
  }
}

// =======================
// Library State
// =======================
const library = [];

// =======================
// Add Book Helper
// =======================
function addBookToLibrary(title, author, isRead) {
  const book = new Book({ title, author, isRead });
  library.push(book);
}

// =======================
// Button / Dialog Logic
// =======================
const btn = document.querySelector(".btn");
const box = document.querySelector(".box");

btn.addEventListener("click", function () {
  const dialogBox = document.createElement("dialog");

  const form = document.createElement("form");
  form.setAttribute("method", "dialog");
  form.classList.add("card");

  const titleLabel = document.createElement("label");
  titleLabel.textContent = "Book Title:";

  const authorLabel = document.createElement("label");
  authorLabel.textContent = "Book Author:";

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.name = "title";
  titleInput.placeholder = "Enter the title";
  titleInput.required = true;

  const authorInput = document.createElement("input");
  authorInput.type = "text";
  authorInput.name = "author";
  authorInput.placeholder = "Enter the author";
  authorInput.required = true;

  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Submit";

  const titleDiv = document.createElement("div");
  const authorDiv = document.createElement("div");

  titleDiv.append(titleLabel, titleInput);
  authorDiv.append(authorLabel, authorInput);

  form.append(titleDiv, authorDiv, submitBtn);
  dialogBox.append(form);
  box.appendChild(dialogBox);

  dialogBox.showModal();

  // TODO: Function that display a custom message if there's an error for titleInput and authorInput
  titleInput.required = true;
  titleInput.setCustomValidity("Don't ya remember the title?");

  form.addEventListener("submit", function (e) {
    addBookToLibrary(titleInput.value, authorInput.value, false);
    renderInventory();

    dialogBox.close();
  });

  document.addEventListener("keyup", function (event) {
    if (event.key === "Escape") {
      dialogBox.close();
    }
  });
});

// =======================
// Render Inventory
// =======================
const inventory = document.querySelector(".inventory");

function renderInventory() {
  inventory.textContent = "";

  library.forEach((currentBook, index) => {
    const card = document.createElement("div");
    card.dataset.id = index;
    card.classList.add("card");

    const title = document.createElement("p");
    title.textContent = currentBook.title;

    const author = document.createElement("p");
    author.textContent = currentBook.author;

    const read = document.createElement("p");
    read.textContent = currentBook.isRead ? "read" : "not read yet";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("btn");

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "Toggle Read";
    toggleBtn.classList.add("btn");

    deleteBtn.addEventListener("click", function () {
      handleDelete(index);
      renderInventory();
    });

    toggleBtn.addEventListener("click", function () {
      currentBook.toggleRead();
      renderInventory();
    });

    card.append(title, author, read, deleteBtn, toggleBtn);
    inventory.appendChild(card);
  });
}

// =======================
// Delete Handler
// =======================
function handleDelete(id) {
  library.splice(id, 1);
}
