
/* Library storage array for the books */
let myLibrary = [];

const container = document.querySelector(".container");
const formSubmit = document.getElementById("submitButton");


/* Constructor to assign a book some values */
function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.sayInfo = function() {
        if(isRead){
            return `${title} by ${author}, ${pages} pages, has been read`;
        }
        else{
            return `${title} by ${author}, ${pages} pages, not read yet`
        }
    }
}

function addBookToLibrary(title, author, pages, isRead){
    let addBook = new Book();
    addBook.title = title;
    addBook.author = author;
    addBook.pages = pages;
    addBook.isRead = isRead;
    myLibrary.push(addBook);
}

function displayBooks(){
    mainDiv = document.querySelector('.cardContainer');
    /* This will remove all children currently displayed to prevent the same child being added twice */
    while(mainDiv.firstChild){
        mainDiv.removeChild(mainDiv.firstChild);
    }

    /*This function adds a entry in for each book currently in the array*/
    myLibrary.forEach(function(entry){
        const outsideDiv = document.createElement('div');
        outsideDiv.classList.add('card');

        const titleDiv = document.createElement('div');
        titleDiv.innerHTML = "\"" + entry.title + "\"";
        const authorDiv = document.createElement('div');
        authorDiv.innerHTML = entry.author;
        const pagesDiv = document.createElement('div');
        pagesDiv.innerHTML = entry.pages;
        const readDiv = document.createElement('div');
        if(entry.isRead) {
            readDiv.classList.add('read');
            readDiv.innerHTML = 'Read';
        }
        else {
            readDiv.classList.add('unread');
            readDiv.innerHTML = 'Not read';
        }
        outsideDiv.appendChild(titleDiv);
        outsideDiv.appendChild(authorDiv);
        outsideDiv.appendChild(pagesDiv);
        outsideDiv.appendChild(readDiv);
        mainDiv.appendChild(outsideDiv);
    });
}

/* When a user adds a new book, this function will be called to add it to the array and display it */
function submit(){
    const newTitle = document.getElementById("title");
    const newAuthor = document.getElementById('author');
    const newPages = document.getElementById('pages');
    const newIsRead = document.getElementById('read');

    addBookToLibrary(newTitle.value, newAuthor.value, newPages.value, newIsRead.checked);

    newTitle.value = null;
    newAuthor.value = null;
    newPages.value = null;

    displayBooks();
}


/* This function is called when a user adds a book to display the popup form */
let popupOpener = document.getElementById("addBook");

popupOpener.onclick = function(){

    let box = document.getElementById("box"),
        dimmer = document.createElement("div");

    dimmer.style.width = document.documentElement.scrollWidth + 'px';
    dimmer.style.height = document.documentElement.scrollHeight + 'px';
    dimmer.className = 'dimmer';

    dimmer.onclick = function(){
        document.body.removeChild(this);
        box.style.visibility = 'hidden';
    }

    formSubmit.onclick = function(){
        submit();
        document.body.removeChild(dimmer);
        box.style.visibility='hidden';
        return false;
    }

    document.body.appendChild(dimmer);

    box.style.visibility = 'visible';
    box.style.top = '50%';
    box.style.left = '50%';
    box.style.transform = "translate(-50%, -50%)";
    return false;
}