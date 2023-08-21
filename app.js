document.addEventListener('DOMContentLoaded', function(){
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  
  const readingList = document.querySelector('.reading-list');
  readingList.insertAdjacentElement('beforebegin', prevBtn);
  readingList.insertAdjacentElement('afterend', nextBtn);
  
  let scrollPosition = 0;
  
  prevBtn.addEventListener('click', () => {
    scrollPosition -= 300; 
    readingList.scroll(scrollPosition, 0);
  });
  
  nextBtn.addEventListener('click', () => {
    scrollPosition += 300;
    readingList.scroll(scrollPosition, 0);
  });
  
  function showDialog(){
    const dialog = document.getElementById('new-book');
    document.getElementById('add-books').onclick = () => {
      dialog.show();
    }
    document.getElementById('hide').onclick = function() {    
      dialog.close();    
    };    
  }
  
  showDialog();

  const addBtn = document.getElementById('add');

  const bookShelve = [];

  function addBookToShelve() {
    addBtn.addEventListener('click', () => {
      const imageInput = document.querySelector('input[name="upload"]');
      const bookImage = document.getElementById('book-image');
      const newTittle = document.querySelector('input[name="title"]');
      const newAuthor = document.querySelector('input[name="author"]');
      const newPages = document.querySelector('input[name="pages"]');
      const newBookStatus = document.querySelectorAll('input[name="readingStatus"]');
      
      if (newTittle.value === '' || newAuthor.value === '' || newPages.value === '' ||  newBookStatus.length === 0) {
        alert("Please fill all fields");
      } else {
        const newStatus = newBookStatus[0].checked ? 'read' : 'not-read';
        const newBook = new Book(newTittle.value, newAuthor.value, newPages.value, newStatus);
        bookShelve.push(newBook);
        if (imageInput.files.length > 0) {
          const selectedImage = imageInput.files[0];
          const imageURL = URL.createObjectURL(selectedImage);
          bookImage.src = imageURL;
        }
        console.log(`${newBook.title} has been added successfully`);
        displayBooks();
        
        // Clear input fields
        newTittle.value = '';
        newAuthor.value = '';
        newPages.value = '';
        bookImage.value = '';
        newBookStatus.forEach(status => status.checked = false);
      }
    });
  }

  addBookToShelve();

  function displayBooks() {
    const readingList = document.querySelector('.reading-list');
    // readingList.innerHTML = '';

    bookShelve.forEach(book => {
      const bookContent = document.createElement('div');
      bookContent.classList.add('book-content');

      const bookInfo = document.createElement('ul');
      bookInfo.classList.add('book-info');
      const bookImageContainer = document.createElement('div');
      bookImageContainer.classList.add('img-container');
      const bookImage = document.createElement('img');
      bookImage.classList.add('book-img');
      bookImage.src = ''; // Set the image source here
      bookImage.id = 'book-image';
      bookImageContainer.appendChild(bookImage);
      
      bookContent.appendChild(bookImageContainer);
      bookContent.appendChild(bookInfo);
      const bookTitle = document.createElement('li');
      bookTitle.textContent = book.title;
      bookTitle.id = 'book-title';
      const bookAuthor = document.createElement('li');
      bookAuthor.textContent = book.author;
      bookAuthor.id = 'book-author';
      const bookPages = document.createElement('li');
      bookPages.textContent = `${book.pages} pages`;
      bookPages.id = 'book-pages';
      const bookStatus = document.createElement('li');
      bookStatus.textContent = book.bookStatus === 'read' ? 'Read' : 'Not read';
      bookStatus.id = 'book-status';

      bookInfo.appendChild(bookTitle);
      bookInfo.appendChild(bookAuthor);
      bookInfo.appendChild(bookPages);
      bookInfo.appendChild(bookStatus);

      bookContent.appendChild(bookInfo);

      readingList.appendChild(bookContent);
    });
  }

  class Book {
    constructor(title, author, pages, bookStatus) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.bookStatus = bookStatus;
    }
  }

  displayBooks();


// TODO: add other functions to store the books on the page , remove and update
});
