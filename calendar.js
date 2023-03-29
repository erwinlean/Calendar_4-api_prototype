const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span");
const modal = document.getElementById("myModal");
var closeBtn = modal.querySelector(".close");
let selectedDay;

// Getting new date, current year and month
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

// Stor full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const renderCalendar = () => { 
    // Get the days, hour , month, etc
    var firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";

    // Creating li of previous month last days
    for (let i = firstDayofMonth; i > 0; i--) { 
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    // Creating li of all days of current month
    for (let i = 1; i <= lastDateofMonth; i++) { 
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? "currentDay" : "";
        liTag += `<li class="${isToday}" data-date="${i}">${i}</li>`;

    }

    // Creating li of next month first days
    for (let i = lastDayofMonth; i < 6; i++) { 
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
        
    }

    // Show the month and year in the DOM
    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;

    // Check witch day is selected
    const dayEls = daysTag.querySelectorAll("li");

    // Getting the selected day, and add/remove style when is clicked
    dayEls.forEach((daySelected) => {
        daySelected.addEventListener("click", () => {
            selectedDay = daySelected.dataset.date || parseInt(daySelected.innerHTML);
            // check if data-date exists and use it, otherwise parse the day from innerHTML
            modal.style.display = "block";

            const prevActiveDayEl = daysTag.querySelector(".active");
            if (prevActiveDayEl) {
                prevActiveDayEl.classList.remove("active");
            }
            daySelected.classList.add("active");
        });
    });
};

renderCalendar();

prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        modal.style.display = "flex";
        input.focus();

        if(currMonth < 0 || currMonth > 11) {
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        } else {
            date = new Date();
        }

        renderCalendar();
    });
});

window.onclick = function(event) {
    if (event.target == modal || event.target == closeBtn) {
        modal.style.display = "none";
    };
};

