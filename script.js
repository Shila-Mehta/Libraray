const myLibrary= [] ;
let lastSubmittedBook=null;


 // making container  for holding all the   book  cards
 const container=document.createElement('div');
 container.className="container";


 // search   feature
 const search=document.querySelector('.search');
 search.addEventListener('input',()=>{
     searchValue= search.value.toLowerCase();

     const filteredBooks= myLibrary.filter((book)=>{
        return book.author.toLowerCase().includes(searchValue) || book.title.toLowerCase().includes(searchValue);
        
     })

     displayBooks(filteredBooks);
 })

   function displayBooks(filteredBooks){
    container.innerHTML= '';
    filteredBooks.forEach((book)=>{
        bookDisplay(book);
    })
    
 }




// defining object constructor for book
function Book(author,title,pages,isRead=false){
this.author=author;
this.title=title;
this.pages=pages;
this.isRead=isRead;
this.id=crypto.randomUUID();
}


function addBookToLibrary(author,title,pages){

  //  creating new book with some arguments and pushing it's id to array
    const book=new Book(author,title,pages);
    lastSubmittedBook=book;
    console.log("Book created: ", book);
   
}


// gathering information from form on submit  and giving it to book object
document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const formData = new FormData(this);

     author=formData.get('author');
     title=formData.get('title');
     pages=formData.get('pages');


     addBookToLibrary(author,title,pages);

     document.getElementById("myForm").reset();

    
     
  });


 


  function bookDisplay(book) {

    // making div for  displaying book  and adding three text fields
    const div=document.createElement('div');
    div.className='card';

    // making  three  text fields
        const p1=document.createElement('p');
        p1.textContent=`Author:${book.author}`;
        p1.className='paraauthor';
        const p2=document.createElement('p');
        p2.textContent=`Title:${book.title}`;
        p2.className='paratitle';
        const p3=document.createElement('p');
        p3.textContent=`Pages:${book.pages}`;
        p3.className='parapages';
        div.append(p1,p2,p3);


    // making remove button for deleting and appennding to div
    const removeButton=document.createElement('button');
    removeButton.className='remove';
    removeButton.textContent='❌remove';
    div.append(removeButton);

    //  on click  on remove button  removing div 
    removeButton.addEventListener('click',()=>{
        div.remove();
        // remove the book from the library  array
        const index=myLibrary.findIndex(b=>b.id===book.id);
        if(index!==-1){
            myLibrary.splice(index,1);
            console.log("Book removed. Updated library:", myLibrary); 
        }
    })


    // making button for read and appending to div
    const readStatus=document.createElement('button');
    readStatus.className='read';
    readStatus.textContent=(book.isRead)?"📘  read ":" 📕  unread ";
    readStatus.style.background=(book.isRead)?'lightgreen':'grey';
    div.append(readStatus);

    //on click on read button we are changing the color
    readStatus.addEventListener('click',()=>{

        book.isRead=!book.isRead; //toggle the button status
        readStatus.textContent=(book.isRead)?"📘  read ":" 📕  unread ";
        readStatus.style.background=(book.isRead)?'lightgreen':'grey';
       
    })



    // Logic for  edit
    const editButton=document.createElement('button');
    editButton.className='edit';
    editButton.textContent=" ✏️  edit";
    div.append(editButton);
    //  mini  form
    const form=document.createElement('form');
        form.className='miniForm';
     // Inputs with values
        const authorInput=document.createElement("input");
        authorInput.type='text';
        authorInput.value=book.author;
        const titleInput=document.createElement("input");
        titleInput.type='text';
        titleInput.value=book.title;
        const pagesInput=document.createElement("input");
        pagesInput.type='number';
        pagesInput.value=book.pages;
        const saveButton=document.createElement('button');
        saveButton.type='submit';
        saveButton.className='save';
        saveButton.textContent='Save';
    // event listener  for edit
    editButton.addEventListener('click',()=>{

        const dialog=document.querySelector('#miniFormdialog');
        dialog.showModal();
        container.style.display='none';
    form.append(authorInput,titleInput,pagesInput,saveButton);
       
        saveButton.addEventListener('click',(e)=>{
            e.preventDefault();
           
            const index=myLibrary.findIndex(b=>b.id===book.id);
            if(index!==-1){
                book.author=authorInput.value;
                book.title=titleInput.value;
                book.pages=pagesInput.value;
               
               // updating values of text fields
                p1.textContent=`Author:${book.author}`;
                p2.textContent=`Title:${book.title}`;
                p3.textContent=`Pages:${book.pages}`;
    
            }

            dialog.close();
            container.style.display='grid';
           
           
        })

    
        const miniFormDialog=document.querySelector('#miniFormdialog');
            miniFormDialog.append(form);
             document.body.append(miniFormDialog);

        

       
    })

    // appending divs  to container 
    container.append(div);
    
    // appending container  to body
    document.body.append(container);

    
  }
  




//Logic  on opening dialog
let  openDialog=document.querySelector('.newButton');
openDialog.addEventListener('click',()=>{

    let dialog=document.querySelector('dialog');
    dialog.showModal()
})


// Logic on closing dailog
let closeDialog=document.querySelector('.close');

closeDialog.addEventListener('click',()=>{
    //on click on close buuton we are closing the dialog
    let dialog=document.querySelector('#myFormdailog');
    dialog.close();

    if(lastSubmittedBook){
        myLibrary.push(lastSubmittedBook);
        console.log("Library after adding book: ", myLibrary);
        bookDisplay(lastSubmittedBook);
        lastSubmittedBook=null;
    }

   
    
    
})








