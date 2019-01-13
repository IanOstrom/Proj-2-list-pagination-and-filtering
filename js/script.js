/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

const studentUl = document.querySelector('.student-list');
const list = studentUl.children;


//Hides all of the items in the list except for the ten on the selected page.

function showPage(list, page){
   const min = (page + 1) * 10 - 10;
   const max = (page + 1) * 10;
   for (let i=0; i<list.length; i++){
      if(i>=min && i<max){
         list[i].style.display = '';
      } else{
         list[i].style.display = 'none';
      }
   }
}

// Creates a new HTML tag and appends it to the given parent element.

function addElement(tagName, parent){
   let newElement = document.createElement(tagName);
   parent.appendChild(newElement);
   return newElement;
}

// Generates and appends the pagination links to the bottom of the page.
// Adds an event listener to update the displayed list of students when a link is clicked.

function appendPageLinks(){
   const linksDiv = addElement('div', studentUl.parentNode);
   linksDiv.className = 'pagination';
   const linksList = addElement('ul', linksDiv);
   const pages = Math.ceil(list.length/10);

   // Sets the clicked page number as the active page.
   // Updates the list of students shown by calling showPage.

   function setActiveLink(activePage){
      for(let i=0; i<pages; i++){
         const link = linksList.children[i].firstElementChild;
         if (i===activePage){
            link.className = 'active';
         } else{
            link.className = '';
         }
      }
      showPage(list, activePage);
   }

   // Creates each link and adds an event listener.
   for (let i=0; i<pages; i++){
      let pageLi = addElement('li', linksList);
      let link = addElement('a', pageLi);
      link.href = '#';
      link.textContent = i+1;

      // Sets the first page as active on initial page load.
      if (i===0){
         link.className = 'active';
      } 
      link.addEventListener('click', ()=>{
         setActiveLink(i);
      });
   }
}

// Creates the pagination and shows the first page on initial page load.
appendPageLinks();
showPage(list, 0);