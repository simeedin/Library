const pageOne = document.querySelector('#pageOne');
const pageTwo = document.querySelector('#pageTwo');
const library = document.querySelector('#library');
const bookFront = document.querySelector('#bookFront');
const bookInfo = document.querySelector('#bookInfo');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const plot = document.querySelector('#plot');
const audience = document.querySelector('#audience');
const year = document.querySelector('#year');
const pages = document.querySelector('#pages');
const publisher = document.querySelector('#publisher'); 
const backBtn = document.querySelector('#backBtn');
const readIt = document.querySelector('#readIt');
const byAuthor = document.querySelector('#byAuthor');
let audiHead = document.querySelector('#audiHead');
const yearHead = document.querySelector('#yearHead');
const pageHead = document.querySelector('#pageHead');
const pubHead = document.querySelector('#pubHead');


interface Book {
    audience: string,
    author: string,
    color?: string,
    id?: number,
    pages: number,
    plot: string,
    publisher: string   
    title: string,
    year: number,
}



async function getBooks() {
   const response = await fetch('https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books');
   const data: Book[] = await response.json();
   console.log(data); 

   displayBooks(data);
}

getBooks();

function showOrHide() {
    pageOne.classList.toggle('hide'); 
    pageTwo.classList.toggle('hide'); 
} 

function displayBooks(data: Book[]) {
    for(let book of data) {
        let booksInfo: Book = {
            title: book.title,
            author: book.author,
            plot: book.plot,
            audience: book.audience,
            year: book.year,
            pages: book.pages,
            publisher: book.publisher  
        }
        createBookElem(booksInfo, book.id);
        // createFrontElem(booksInfo, book.id);
    }
}

function createBookElem(booksInfo: Book, id: number) {
    let bookElem = document.createElement('div');
    bookElem.setAttribute('class', `book${id.toString()}`);
    library.append(bookElem);
    let bookTitle = document.createElement('h3');
    bookTitle.innerText = booksInfo.title;
    let bookAuthor = document.createElement('p');
    bookAuthor.innerText = booksInfo.author;
    bookElem.append(bookTitle, bookAuthor);

    let frontElem = document.createElement('article');
    frontElem.setAttribute('class', `front${id.toString()}`);
    let frontTitle = document.createElement('h1');
    frontTitle.innerText = booksInfo.title;
    let frontAuthor = document.createElement('p');
    frontAuthor.innerText = booksInfo.author;
    frontElem.append(frontTitle, frontAuthor);
    
    bookElem.addEventListener('click', () => {
        bookFront.innerHTML = '';
        bookInfo.innerHTML = '';
        title.innerHTML = '';
        author.innerHTML = byAuthor.innerHTML;
        plot.innerHTML = '';
        audience.innerHTML = audiHead.innerHTML;
        year.innerHTML = yearHead.innerHTML;
        pages.innerHTML = pageHead.innerHTML;
        publisher.innerHTML = pubHead.innerHTML;
        bookFront.append(frontElem);
        bookInfo.append(title, author, plot, audience, year, pages, publisher, readIt, backBtn);
        title.append(booksInfo.title);
        author.append(booksInfo.author);
        plot.append(booksInfo.plot);
        audience.append(booksInfo.audience);
        year.append(booksInfo.year.toString());
        if(booksInfo.pages == null) {
            pages.append('unknown');
        }
        else {
            pages.append(booksInfo.pages.toString());
            
        }
        publisher.append(booksInfo.publisher);
        showOrHide();
    })
}

backBtn.addEventListener('click', () => {
    pageOne;
    showOrHide();
})
