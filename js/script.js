/******************************************
 List Filter and Pagination
 By: Billy Shelton
 Date: 11/23/2018
******************************************/
   
//given a string, only as many characters as the length are returned(from left to right of string)
function partOfString(length, string) {
  let stringPart = '';
  for(let i = 0; i < length; i++) {
    stringPart += string[i];
  } return stringPart;
}

//given a list of students and a page number, only 10 students are shown at a time according to the page number given
function showPage(studentList, pageNum) {
  let students = studentList.children;

  //a ul to hold the 10 students is created
  let tenStudents = document.createElement('ul');
  tenStudents.className = 'student-list';

  //based on the page number given, only the appropriate students to that page number are appended to the DOM
  if(pageNum === 1) { pageNum = 0;
  } else { pageNum = pageNum * 10;
  } 
  //each student in the correct page is added to 10 student list
  for(let i = pageNum; i < pageNum + 10 && i < originalStudentList.children.length; i++) {
    let student = document.createElement('li');
    student = originalStudentList.children[i].cloneNode(1);
    tenStudents.appendChild(student);
  } //the 10 student list is appended to the DOM
  studentList.parentNode.replaceChild(tenStudents, studentList);
}

//based on a student list, page links are created for every 10 students and displayed when the links are clicked
function appendPageLinks(studentList) {
  let numPages = Math.floor(studentList.children.length/10);
  let paginationClass = document.createElement('div');
  paginationClass.className = 'pagination';

  document.getElementsByClassName('page')[0].appendChild(paginationClass);
  let ul = document.createElement('ul');
  document.getElementsByClassName('pagination')[0].appendChild(ul);

  //if the user clicks a page link, the 10 students to that page are displayed
  for(let i = 1; i < numPages+1; i++) {
    let a = document.createElement('a');
    let li = document.createElement('li');
    a.innerHTML = i;
    a.addEventListener('click', () => {
      showPage(document.getElementsByClassName('student-list')[0], i);
    });
    ul.appendChild(li);
    li.appendChild(a);
  }
}

//a search box is added to the DOM and searches are returned the page
function searchForm(){
  let input = document.createElement('input');
  input.className = 'student-search';
  input.type = 'form';
  input.name = 'search';

  let button = document.createElement('button');
  button.className = 'student-search';
  button.type = 'submit';
  button.innerText = 'Submit';

  document.getElementsByClassName('page-header cf')[0].appendChild(input);
  document.getElementsByClassName('page-header cf')[0].appendChild(button);

  //students with a name or email matching the user input are displayed on the page
  function appendDOM(input) {
    let students = document.createElement('ul');
    students.className = 'student-list';

    for(let i = 0; i < originalStudentList.children.length; i++) {
      //if the user erases their entry, the first 10 students are shown and page links from the original starting list are displayed
      if(input.value === '') {
        showPage(document.getElementsByClassName('student-list')[0], 1);
        appendPageLinks(originalStudentList);
        return;
      }  //any input with the same name or email is appeneded to the DOM
      else if((input.value === partOfString(input.value.length, originalStudentList.children[i].getElementsByTagName('h3')[0].innerText) || (input.value === partOfString(input.value.length, originalStudentList.children[i].getElementsByTagName('span')[0].innerText)))) {
        let student = document.createElement('li');
        student = originalStudentList.children[i].cloneNode(1);
        students.appendChild(student);
      } 
    } 
    //if no results are found, the page displays no results found
    if(students.children.length === 0 ) {
      let student = document.createElement('li');
      student.innerText = 'No Results Found';
      students.appendChild(student);
    }
    document.getElementsByClassName('student-list')[0].parentNode.replaceChild(students, document.getElementsByClassName('student-list')[0]); 

    //if there are already page links, the page links are removed because the number of students on the page may have changed
    if(document.getElementsByClassName('page')[0].children[2] != null) { 
      document.getElementsByClassName('page')[0].removeChild(document.getElementsByClassName('page')[0].children[2]); 
    }
  }

  //as the user types the page is updated with matching students
  input.addEventListener('keyup', function() { appendDOM(input) });
  //when the user clicks submit the page is updated with matching students
  button.addEventListener('click', function() { appendDOM(input) });
}

//a copy of the original student list is created
let originalStudentList = document.createElement('ul');
originalStudentList = document.getElementsByClassName('student-list')[0].cloneNode(1);

//only the first 10 students of the original list are dynamically appended to DOM
showPage(document.getElementsByClassName('student-list')[0], 1);

//page links are created for the original list of students
appendPageLinks(originalStudentList);

//the DOM is altered based on what the user enters into the search field
searchForm();

