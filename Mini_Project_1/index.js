 function openModal() {
    document.getElementById('modalOverlay').style.display = 'flex';
  }

  function closeModal() {
    document.getElementById('modalOverlay').style.display = 'none';
  }

  function submitForm() {
    const name = document.getElementById('textInput').value;
    const category = document.getElementById('categorySelect').value;

    if (!name || !category) {
      alert("Please fill out all fields.");
      return;
    }

        // Step 1: Create data object
    const data = {
      name: name,
      category: category,
       completed: false
    };

    // Step 2: Get existing data from localStorage or initialize empty array
    let storedData = JSON.parse(localStorage.getItem("userData")) || [];

    // Step 3: Add new entry
    storedData.push(data);

    // Step 4: Save back to localStorage
    localStorage.setItem("userData", JSON.stringify(storedData));

    alert("Data saved to localStorage!");

// clear the data fields
    document.getElementById('textInput').value = "";
    document.getElementById('categorySelect').value = "";




    // Process the data
    applyFilters()
    closeModal();  // Close modal after submit
    
  }

// Display all tasks
function displayTasks(searchQuery = "",categoryFilter = "") {
  const container = document.querySelector(".TaskList");
  container.innerHTML = ""; // clear existing tasks

  const tasks = JSON.parse(localStorage.getItem("userData")) || [];

  
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "" || task.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  filteredTasks.forEach((task, index) => {
    const div = document.createElement("div");

    const badge = document.createElement("p");
    badge.id = "badge";
    badge.textContent = task.category;

      const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", function () {
      updateCheckboxStatus(index, this.checked);
    });

    const title = document.createElement("h5");
    title.textContent = task.name;

    const delBtn = document.createElement("button");
    delBtn.innerHTML = "&#128465; Delete";
    delBtn.onclick = function () {
      deleteTask(index);
    };

    div.appendChild(badge);
    div.appendChild(checkbox);
    div.appendChild(title);
    div.appendChild(delBtn);

    container.appendChild(div);

    const hr = document.createElement("hr");
    container.appendChild(hr);
  });
}


// Apply both search and category filters
function applyFilters() {
  const searchText = document.getElementById("searchInput").value;
  const category = document.getElementById("categoryFilter").value;
  displayTasks(searchText, category);
}



// Update task completion status
function updateCheckboxStatus(index, isChecked) {
  let tasks = JSON.parse(localStorage.getItem("userData")) || [];
  if (tasks[index]) {
    tasks[index].completed = isChecked;
    localStorage.setItem("userData", JSON.stringify(tasks));
  }
}




// Delete a task by index
function deleteTask(index) {
  let tasks = JSON.parse(localStorage.getItem("userData")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("userData", JSON.stringify(tasks));


    displayTasks(document.getElementById("searchInput").value); // keep filtering
      applyFilters(); // refresh with current filters
  
}


// Live search event listener
document.getElementById("searchInput").addEventListener("input", applyFilters);
document.getElementById("categoryFilter").addEventListener("change", applyFilters);




// On page load
window.onload = function () {
  displayTasks();
};
