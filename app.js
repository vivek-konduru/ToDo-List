// Select elements
const calendarIcon = document.querySelector('.calendar-icon');
const calendarDropdown = document.querySelector('.calendar-dropdown');
const plusIcon = document.querySelector('.plus-icon');
const taskInput = document.querySelector('.task-input');
const taskList = document.querySelector('.tasks-list');
const bullets = document.querySelectorAll('.bullet');
const categories = document.querySelectorAll('.category');
const selectedCategoryText = document.getElementById('selected-category');
const calendarTimeInput = document.getElementById('calendar-time');

// Variable to store the selected bullet color
let selectedBulletColor = '#FD99AF'; // Default to personal category

// Function to format time to 12-hour format (with AM/PM)
function formatTimeTo12Hr(time) {
    let hours = time.getHours();
    let minutes = time.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 12-hour format, not 0
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
}

// Initialize the time picker with 12-hour format when focused
$(document).ready(function () {
    $('#calendar-time').timepicker({
        timeFormat: 'h:mm p', // 12-hour format with AM/PM
        interval: 15,         // 30-minute intervals
        minTime: '12:00am',   // Min time
        maxTime: '11:59pm',   // Max time
        defaultTime: '8:00am',// Default time
        dynamic: false,       // Disable dynamic time updates
        dropdown: true,       // Enable dropdown
        scrollbar: true       // Enable scrollbar
    });

    // Set initial time on focus
    calendarTimeInput.addEventListener('focus', () => {
        const currentTime = new Date();
        calendarTimeInput.value = formatTimeTo12Hr(currentTime);
    });
});


// Add functionality to the calendar icon to toggle the calendar dropdown
calendarIcon.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent the click event from propagating to document-level handlers
    calendarDropdown.classList.toggle('visible'); // Toggle the dropdown's visibility
});


// Set up event listeners for each bullet to change the selected category color
bullets.forEach(bullet => {
    bullet.addEventListener('click', () => {
        // Remove the 'selected' class from all bullets
        bullets.forEach(b => b.classList.remove('selected'));
        // Add 'selected' class to the clicked bullet
        bullet.classList.add('selected');
        // Update the selected bullet color
        selectedBulletColor = bullet.style.background;
    });
});

// Add functionality to the + icon to add a task with the selected bullet color
plusIcon.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    const taskTime = calendarTimeInput.value; // Get selected time

    if (taskText && taskTime) {
        // Create a new task item
        const newTask = document.createElement('div');
        newTask.classList.add('task-item');
        newTask.innerHTML = `
            <span class="bullet" style="background: ${selectedBulletColor};"></span>
            <div class="task-content">${taskText}</div>
            <div class="task-time">${taskTime}</div>
            <div class="task-check"></div>
        `;

        // Add the new task to the task list
        taskList.appendChild(newTask);

        // Clear the input field and reset the time picker
        taskInput.value = '';
        calendarTimeInput.value = ''; // Clear time input

        // Add event listener to mark task as completed when the circle is clicked
        const taskCheck = newTask.querySelector('.task-check');
        taskCheck.addEventListener('click', () => {
            taskCheck.classList.toggle('completed');
        });

        // Ensure the calendar dropdown stays functional
        calendarDropdown.classList.remove('visible');

    } else {
        alert('Please select the bullet at input bar ,enter a task and time!');
    }
});

// Set up event listeners for each category to display tasks under that category
categories.forEach(category => {
    category.addEventListener('click', () => {
        const categoryBulletColor = category.querySelector('.bullet').style.background;
        filterTasksByCategory(categoryBulletColor);
    }); 
});

// Function to filter tasks by category bullet color
function filterTasksByCategory(categoryBulletColor) {
    // Get all tasks
    const tasks = document.querySelectorAll('.task-item');
    
    /* Get the bullet color of the selected category
    const categoryBulletColor = category.querySelector('.bullet').style.background;
    */
    tasks.forEach(task => {
        const taskBulletColor = task.querySelector('.bullet').style.background;
         // Show only tasks matching the category bullet color
        task.style.display = (taskBulletColor === categoryBulletColor) ? 'block' : 'none';
    });
}


document.querySelector('.nav-item[data-view="today"]').addEventListener('click', () => {
    document.getElementById('task-input').style.display = 'block';
    document.getElementById('categories').style.display = 'none';
});


document.querySelectorAll('.category').forEach(category => {
    category.addEventListener('click', function () {
        const selectedCategory = this.getAttribute('data-category');
        displayTasks(selectedCategory);
    });
});

$(document).ready(function () {
    $(".nav-item").on("click", function () {
        var view = $(this).data("view");
        
        $(".view").hide();

        $("#" + view + "-view").show();
    });
});