/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

const studentUl = document.querySelector('.student-list');
const list = studentUl.children;

// Creates the 'No results found.' message for empty search results. 
const noResultsDiv = addElement('div', studentUl.parentNode);
noResultsDiv.textContent = 'No results found.';

// Hides all of the items in the list except for the ten on the selected page.
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

   // Toggles the 'No results found.' message.
   if (list.length === 0){
      noResultsDiv.style.display = '';
   } else {
      noResultsDiv.style.display = 'none';
   }
}

// Generates the search box.
function appendSearchBox(){
   const searchForm = addElement('form', studentUl.previousElementSibling);
   searchForm.className = 'student-search';
   const searchBox = addElement('input', searchForm);
   searchBox.placeholder = 'Search for students...';
   const searchButton = addElement('button', searchForm);
   searchButton.type = 'submit';
   searchButton.textContent = 'Search';
   
   // Filters the search results. 
   function searchPage(){
      let newList = [];
      for (let i=0;i<list.length;i++){
         if (list[i].textContent.includes(searchBox.value)){
            newList.push(list[i]);
         } else {
            list[i].style.display = 'none';
         }
      }

      // Deletes the page links so new ones can be generated for the search results.
      function deletePageLinks(){
         const linksDiv = document.querySelector('.pagination');
         studentUl.parentNode.removeChild(linksDiv);
      }

      // Shows the filtered search results and deletes and generates new page links.
      showPage(newList, 0);
      deletePageLinks();
      appendPageLinks(newList);
   }

   // Adds event listeners for the search form.
   searchForm.addEventListener('keyup', searchPage);
   searchForm.addEventListener('submit', (event)=>{
      event.preventDefault();
      searchPage();
   });
}

// Creates a new HTML tag and appends it to the given parent element.
function addElement(tagName, parent){
   let newElement = document.createElement(tagName);
   parent.appendChild(newElement);
   return newElement;
}

// Generates and appends the pagination links to the bottom of the page.
// Adds an event listener to update the displayed list of students when a link is clicked.
function appendPageLinks(list){
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

// Creates the pagination, shows the first page on initial page load, and creates the search box.
appendPageLinks(list);
showPage(list, 0);
appendSearchBox();