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
    myLibrary.forEach(function(entry){
        
    });
}