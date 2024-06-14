document.addEventListener("DOMContentLoaded", function () {
  let todoHolder = document.getElementById("todoHolder");
  let inputTag = document.getElementById("inputTag");
  let addButton = document.getElementById("addButton");
  let editForm = document.getElementById("editForm");
  let deleteConfirmBox = document.getElementById("deleteConfirmBox");
  let editInput = document.getElementById("editInput");
  let updateThisBtn = document.getElementById("updateThisBtn");
  let cancelThisBtn = document.getElementById("cancelThisBtn");
  let dateCopyRight = document.getElementById("dateCopyRight");
  let storedTodos = JSON.parse(localStorage.getItem("todos")) || [];




//   adding splash screen & showing it for 3 sec
  setTimeout(() => {
    document.querySelector(".loaderContainer").style.display = "none";
  },2000);



  // Copy Right Year
  let date = new Date();
  dateCopyRight.innerHTML = date.getFullYear();

  // Load todos from localStorage on page load
  loadTodos();

  // Adding on Click
  addButton.addEventListener("click", function () {
    doAdd();
  });

  // Adding on ENTER button
  inputTag.addEventListener("keyup", function (e) {
    if (e.key == "Enter") {
      doAdd();
    }
  });

  // Event delegation for dynamically added buttons
  todoHolder.addEventListener("click", function (event) {
    if (event.target.matches("button.delete")) {
      deleteTask(event.target.parentNode);
    } else if (event.target.matches("button.edit")) {
      editThis(event.target.parentNode);
    }
  });

  function doAdd() {
    let inputTagData = inputTag.value.trim();
    if (inputTagData == "") {
      // do an animation on input
      addButton.style.pointerEvents = "none";
      inputTag.style.pointerEvents = "none";
      document.getElementById("inputTagContainer").classList.add("error");
      setTimeout(() => {
        document.getElementById("inputTagContainer").classList.remove("error");
        addButton.style.pointerEvents = "auto";
        inputTag.style.pointerEvents = "auto";
      }, 1500);
    } else {
      let todoItem = {
        text: inputTagData,
        id: Date.now(),
      };
      storedTodos.push(todoItem);
      localStorage.setItem("todos", JSON.stringify(storedTodos));
      renderTodoItem(todoItem);
      updateUI(); // Update UI after adding todo
      inputTag.value = "";
    }
  }

  function editThis(listItem) {
    let todoId = listItem.dataset.id;
    editInput.value = listItem.querySelector("span").textContent.trim();
    editForm.style.display = "flex";
    updateThisBtn.classList.add("selectedCCBtn");

    updateThisBtn.onclick = function () {
      editingThis();
    };

    // Adding on ENTER button
    editInput.addEventListener("keyup", function (e) {
      if (e.key == "Enter") {
        editingThis();
      }
    });

    function editingThis() {
      let updatedText = editInput.value.trim();
      if (updatedText == "") {
        updateThisBtn.classList.add("disabledBtn");
        updateThisBtn.classList.remove("selectedCCBtn");
      } else {
        updateThisBtn.classList.remove("disabledBtn");
        updateThisBtn.classList.add("selectedCCBtn");
        listItem.querySelector("span").textContent = updatedText;
        let index = storedTodos.findIndex((todo) => todo.id == todoId);
        storedTodos[index].text = updatedText;
        localStorage.setItem("todos", JSON.stringify(storedTodos));
        editForm.style.display = "none";
        updateUI(); // Update UI after editing todo
      }
    }

    // Add input event listener to editInput
    editInput.addEventListener("input", function () {
      let updatedText = editInput.value.trim();
      if (updatedText == "") {
        updateThisBtn.classList.add("disabledBtn");
        updateThisBtn.classList.remove("selectedCCBtn");
      } else {
        updateThisBtn.classList.remove("disabledBtn");
        updateThisBtn.classList.add("selectedCCBtn");
      }
    });

    cancelThisBtn.onclick = function () {
      editForm.style.display = "none";
    };
  }


function deleteTask(listItem) {
    let todoId = listItem.dataset.id;
    deleteConfirmBox.style.display = "flex";
    document.getElementById("delteThisBtn").classList.add("selectedCCBtn");

    // Function to perform delete task action
    function doDeleteTask() {
        storedTodos = storedTodos.filter(todo => todo.id != todoId);
        localStorage.setItem("todos", JSON.stringify(storedTodos));
        listItem.parentNode.removeChild(listItem);
        deleteConfirmBox.style.display = "none";
        updateUI(); // Update UI after deleting todo
        document.removeEventListener("keyup", handleEnterKeyPress);
    }

    // Event listener for delete button click
    document.getElementById("delteThisBtn").onclick = doDeleteTask;

    // Event listener for Enter key press
    document.addEventListener("keyup", handleEnterKeyPress);

    // Event listener function for Enter key press
    function handleEnterKeyPress(e) {
        if (e.key === "Enter" && !document.getElementById("delteThisBtn").classList.contains("disabledBtn")) {
            doDeleteTask();
        }
    }

    // Event listener for cancel button click
    document.getElementById("canceldeleteThisBtn").onclick = function () {
        deleteConfirmBox.style.display = "none";
        document.removeEventListener("keyup", handleEnterKeyPress);
    };
}




  function updateUI() {
    let noTodo = document.getElementById("noTodo");
    if (storedTodos.length === 0) {
      noTodo.style.display = "flex";
    } else {
      noTodo.style.display = "none";
    }
  }

  function renderTodoItem(todo) {
    todoHolder.innerHTML += `
            <li data-id="${todo.id}">
                <span>${todo.text}</span>
                <button class="delete">DELETE</button>
                <button class="edit">EDIT</button>
            </li>`;
  }



  function loadTodos() {
    if (storedTodos.length > 0) {
      storedTodos.forEach((todo) => {
        renderTodoItem(todo);
      });
      updateUI();
    }
  }




  ///////// code to prevent F12
  document.addEventListener('keydown', function(event) {
    // Check if the pressed key is F5
    if (event.key === 'F12') {
        // Prevent the default behavior (refresh)
        event.preventDefault();
        
        // Perform your action here
        // console.log('F12 key was pressed. Custom action performed.');
    }
});
document.addEventListener('keydown', function(event) {
  // Check if the pressed key is U and the Ctrl key is pressed simultaneously
  if ((event.key === 'u' || event.key === 'U') && (event.ctrlKey || event.metaKey)) {
      // Prevent the default behavior (view page source)
      event.preventDefault();
      
      // Perform your action here
      // console.log('Ctrl + U key combination was pressed. Custom action performed.');
  }
});
window.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});
  ///////// code to prevent F12


});
