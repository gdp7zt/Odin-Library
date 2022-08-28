
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
        if(this.isRead){
            return `${title} by ${author}, ${pages} pages, has been read`;
        }
        else{
            return `${title} by ${author}, ${pages} pages, not read yet`
        }
    }
    /* This method changes the isRead status */
    this.changedRead = function() {
        if(this.isRead){
            this.isRead = false;
        }
        else this.isRead = true;
    }
}

/* This function adds a new book to the library using the constructor */
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
    myLibrary.forEach(function(entry, index){
        const outsideDiv = document.createElement('div');
        outsideDiv.classList.add('card');

        const titleDiv = document.createElement('div');
        titleDiv.innerHTML = "\"" + entry.title + "\"";
        const authorDiv = document.createElement('div');
        authorDiv.innerHTML = "Author:      " + entry.author;
        const pagesDiv = document.createElement('div');
        pagesDiv.innerHTML = "Pages:       " + entry.pages;
        const readDiv = document.createElement('input');
        readDiv.setAttribute("type", "button");
        readDiv.setAttribute("id", "readButton");
        readDiv.setAttribute("name", "readButton");

        const deleteButton = document.createElement('input');
        deleteButton.setAttribute("type", "button");
        deleteButton.setAttribute("id", "deleteButton");
        deleteButton.setAttribute("name", "deleteButton");
        deleteButton.setAttribute("data-v", `${index}`);
        deleteButton.setAttribute("value", 'Remove');
        deleteButton.classList.add("deleteButton");

        if(entry.isRead) {
            readDiv.classList.add('read');
            readDiv.setAttribute("value", 'Read');
        }
        else {
            readDiv.classList.add('unread');
            readDiv.setAttribute("value", 'Unread');
        }
        outsideDiv.appendChild(titleDiv);
        outsideDiv.appendChild(authorDiv);
        outsideDiv.appendChild(pagesDiv);
        outsideDiv.appendChild(readDiv);
        outsideDiv.appendChild(deleteButton);
        mainDiv.appendChild(outsideDiv);
    });
    /* Check whether there are any elements or not */
    if(document.getElementById('deleteButton') !== null) booksDisplayed();
    changedRead();
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


/* This function adds event listeners to each delete button and will delete the book from the array and recall display books once deleted */
function booksDisplayed(){
    let deleteButton = document.querySelectorAll('.deleteButton');
    for (let i = 0; i < deleteButton.length; i++){
        deleteButton[i].addEventListener('click', () =>{
            let arrayValue = deleteButton[i].getAttribute('data-v');
            myLibrary.splice(arrayValue, 1);
            displayBooks();
        });
    }
}

/* Similarly. this function changes the read status while doing the same thing */
function changedRead(){
    let readButton = document.querySelectorAll('#readButton');
    let deleteButton = document.querySelectorAll('.deleteButton');
    for (let i = 0; i < readButton.length; i++){
        readButton[i].addEventListener('click', () => {
            let arrayValue = deleteButton[i].getAttribute("data-v");
            myLibrary[arrayValue].changedRead();
            displayBooks();
        });
    }
}
