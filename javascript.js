let myLibrary = [];

const container = document.querySelector(".container");

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

function addBookToLibrary(){
    let title = prompt("Title: ");
    let author = prompt("Author: ");
    let pages = prompt("Pages: ");
    let isRead = prompt("Has the book been read? (y/n): ");
    if(isRead === 'y') isRead = true;
    else isRead = false;
    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
}

function displayBooks(){
    mainDiv = document.querySelector('.cardContainer');
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
        if(entry.isRead === 'y') {
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

    document.body.appendChild(dimmer);

    box.style.visibility = 'visible';
    box.style.top = '50%';
    box.style.left = '50%';
    box.style.transform = "translate(-50%, -50%)";
    return false;
}




let book1 = new Book('The mockingbird', 'Mary Jane Blige', 578, 'y');
let book2 = new Book('The mockingbird', 'Mary Jane Blige', 578, 'n');
let book3 = new Book('The mockingbird', 'Mary Jane Blige', 578, 'y');
let book4 = new Book('The mockingbird', 'Mary Jane Blige', 578, 'y');
let book5 = new Book('The mockingbird', 'Mary Jane Blige', 578, 'y');
let book6 = new Book('The mockingbird', 'Mary Jane Blige', 578, 'y');
let book7 = new Book('The mockingbird', 'Mary Jane Blige', 578, 'y');
let book8 = new Book('The mockingbird', 'Mary Jane Blige', 578, 'y');
myLibrary.push(book1, book2, book3, book4, book5, book6, book7, book8);
displayBooks();
