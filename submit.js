let submitBtn = document.getElementById("submitBtn");
let monthAndYear = document.querySelector("body > div > h3").textContent;



function submitForm(event) {
    event.preventDefault();
    
    // data from DOM
    const name = document.getElementById('name').value;
    const type = document.getElementById('type').value;
    const cellphone = document.getElementById('cellphone').value;
    const hour = document.getElementById('hour').value;
    const email = document.getElementById('email').value;
    
    // Checking data
    console.log(`Name: ${name}`);
    console.log(`Type: ${type}`);
    console.log(`Cellphone: ${cellphone}`);
    console.log(`Hour: ${hour}`);
    console.log(`selected day: ${selectedDay}`);
    console.log(`Email: ${email}`);

    // Transform data to send
    let theHour = parseInt(hour);

    // Check witch day was selected
    let date = new Date(`${monthAndYear} ${selectedDay}`);
    let dayOfWeek = date.getDay();
    let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let dayOfWeekStr = daysOfWeek[dayOfWeek];

    // hours and day to check for send to DB or not
    console.log(dayOfWeekStr)

    // Check and send data
    if (theHour >= 20 || theHour < 8) {
        showAlert("A");
    } else if (dayOfWeekStr === "Sunday") {
        showAlert("B");
    } else if (dayOfWeekStr === "Saturday" && (theHour < 9 || theHour >= 13)) {
        showAlert("C");
    } else {
        // Post to backend-DB
        const requestBody = {
            name: name,
            type: type,
            cellphone: cellphone,
            hour: hour,
            email: email,
            selectedDay: selectedDay
        };

        // Send POST request to backend API
        fetch('http://your-backend-api-url.com/reservations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
        },
            body: JSON.stringify(requestBody)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
        }
            return response.json();
        })
        .then(data => {
            showAlert("D");
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}

submitBtn.click = submitForm;
