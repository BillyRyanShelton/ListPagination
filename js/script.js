/******************************************
 List Filter and Pagination
******************************************/
   
//given a string, only as many characters as the length are returned
function partOfString(length, string) {
  let stringPart = '';
  for(let i = 0; i < length; i++) {
    stringPart += string[i];
  } return stringPart;
}

function showPage(studentList, pageNum) {
  let students = studentList.children;

  let tenStudents = document.createElement('ul');
  tenStudents.className = 'student-list';

  if(pageNum === 1) { pageNum = 0;
  } else { pageNum = pageNum * 10;
  }
  for(let i = pageNum; i < pageNum + 10 && i < originalStudentList.children.length; i++) {
    let student = document.createElement('li');
    student = originalStudentList.children[i].cloneNode(1);
    tenStudents.appendChild(student);
  }
  studentList.parentNode.replaceChild(tenStudents, studentList);
}


function appendPageLinks(studentList) {
  let numPages = Math.floor(studentList.children.length/10);

  //duplicate create elem and classname
  let paginationClass = document.createElement('div');
  paginationClass.className = 'pagination';

  if(document.getElementsByClassName('page')[0].children[2] != null) { 
    document.getElementsByClassName('page')[0].removeChild(document.getElementsByClassName('page')[0].children[2]); 
  }
  document.getElementsByClassName('page')[0].appendChild(paginationClass);

  let ul = document.createElement('ul');
  document.getElementsByClassName('pagination')[0].appendChild(ul);

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

  function appendDOM(input) {
    let students = document.createElement('ul');
    students.className = 'student-list';

    for(let i = 0; i < originalStudentList.children.length; i++) {
      //if the user erases their entry, the first 10 students are shown and page links from the original starting list
      if(input.value === '') {
        showPage(document.getElementsByClassName('student-list')[0], 1);
        appendPageLinks(originalStudentList);
        return;
      }  //any typed input with the same name or email is appeneded to the DOM
      else if((input.value === partOfString(input.value.length, originalStudentList.children[i].getElementsByTagName('h3')[0].innerText) || (input.value === partOfString(input.value.length, originalStudentList.children[i].getElementsByTagName('span')[0].innerText)))) {
        let student = document.createElement('li');
        student = originalStudentList.children[i].cloneNode(1);
        students.appendChild(student);
      } 
    } 

    document.getElementsByClassName('student-list')[0].parentNode.replaceChild(students, document.getElementsByClassName('student-list')[0]); 
    appendPageLinks(document.getElementsByClassName('student-list')[0]); 
  }

  input.addEventListener('keyup', function() { appendDOM(input) });
  button.addEventListener('click', function() { appendDOM(input)});
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

