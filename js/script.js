/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/




/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/
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

let originalStudentList = document.createElement('ul');
originalStudentList = document.getElementsByClassName('student-list')[0].cloneNode(1);
showPage(document.getElementsByClassName('student-list')[0], 3);
showPage(document.getElementsByClassName('student-list')[0], 4);
/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
function appendPageLinks(studentList) {
  let numPages = Math.floor(studentList.children.length/10);
  console.log(numPages);

  let paginationClass = document.createElement('div');
  paginationClass.className = 'pagination';
  document.getElementsByClassName('page')[0].appendChild(paginationClass);

  for(let i = 0; i < numPages; i++) {
  let ul = document.createElement('ul');
  document.getElementsByClassName('pagination')[0].appendChild(ul);

  }
}

appendPageLinks(originalStudentList);




// Remember to delete the comments that came with this file, and replace them with your own code comments.