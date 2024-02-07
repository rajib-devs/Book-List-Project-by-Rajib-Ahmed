// Get the UI elements

let form =  document.querySelector('#bookListForm');
let save = document.querySelector('#saveBook'); 
let tableList = document.querySelector('#TableList'); 










//book class

class Book {
    constructor(title, author, isbn){
        this.title = title; 
        this.author =  author; 
        this.isbn = isbn; 
    }
}

// ui class

class UI {
static addToBookList(book){
let bookList = document.querySelector('#TableList'); 

let row = document.createElement('tr'); 
row.innerHTML = `
<td id="bookNameOfList">${book.title}</td>
<td>${book.author}</td>
<td>${book.isbn}</td>
<td><a  href='#'>x</a></td>

`

bookList.appendChild(row); 




       
    }; 



static clearFields(){

        inputTitle.value = "";
        inputAuthor.value = "";
        inputIsbn.value = "";     
    }

    
static showAlert(message, className){


    let msg = document.querySelector('#msg');
    
    let msgBody = document.createElement('p');
    msgBody.classList = `alert ${className}`;
    console.log(msgBody);
    msgBody.innerText = message;
    msg.appendChild(msgBody);
    setTimeout(function(){

    msgBody.remove(); 
    
    }, 2000)



}

 static removeBook(e){
    if(e.target.hasAttribute('href')){
        let val = e.target.parentElement.parentElement; 
       
        
        if(confirm('Are you sure? ')){
            val.remove();     
            LocalStore.removeBook(e.target.parentElement.previousElementSibling.textContent.trim())
            UI.showAlert(`Item removed successfully`, 'alert-warning')
        }
        
        
       
    }
    
    

 }

    
    
}


function addBook(param){

let inputTitle = document.querySelector('#inputTitle').value;
let inputAuthor = document.querySelector('#inputAuthor').value;
let inputIsbn = document.querySelector('#inputIsbn').value;



if(inputTitle === "" || inputAuthor === "" || inputIsbn === ""){    

        UI.showAlert(`Please fill all fields`, `alert-warning`);
    
}else {

   

    let book = new Book (inputTitle, inputAuthor, inputIsbn );


    UI.addToBookList(book); 
    UI.clearFields();

    UI.showAlert(`${inputTitle} saved successfully`, `alert-success`); 
    LocalStore.addBook(book); 

}


    param.preventDefault();

}

function removeBook(e){




UI.removeBook(e);   


e.preventDefault(); 


}


class LocalStore{
    static getBooks(){
        let books;

        if(localStorage.getItem('books')=== null){

            books = [];

        } else {
            books =JSON.parse(localStorage.getItem('books'));
        }

        return books; 
    }
    static addBook (book){

        let books = LocalStore.getBooks(); 

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books))


    }

    static showBooks(){
        let books = LocalStore.getBooks(); 

        books.forEach(book => {
            UI.addToBookList(book); 
           
        })
    }
    static removeBook(isbn){
        let books = LocalStore.getBooks()

        books.forEach((book, index) => {

            if(book.isbn === isbn ){
                books.splice(index, 1)
            }
        })
        localStorage.setItem('books', JSON.stringify(books))
    }
    
    
}

// add Event Lister

form.addEventListener('submit', addBook);

tableList.addEventListener('click', removeBook); 

document.addEventListener('DOMContentLoaded', LocalStore.showBooks());