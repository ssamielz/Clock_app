fetch('https://timeapi.io/api/time/current/zone?timeZone=Africa%2FNairobi')
.then(res => res.json())
.then(data => {
    console.log(data);
    const time = document.createElement('h1')
    time.style.fontSize = '114px'

    const timeContainer = document.getElementById('currentTime')
    time.textContent = data.time;
    timeContainer.appendChild(time)
    
    const date = document.createElement('h3')
    date.textContent = data.date;
    timeContainer.appendChild(date);

    const dayOfWeek = document.createElement('h3')
    dayOfWeek.textContent = data.dayOfWeek;
    timeContainer.appendChild(dayOfWeek);


    fetch('https://timeapi.io/api/timezone/availabletimezones')
    .then(res => res.json())
    .then(timezones => {
        if (timezones.includes("Africa/Nairobi")) {
            const timezoneDisplay = document.createElement('h3');
            timezoneDisplay.textContent = "Timezone: Africa/Nairobi";
            timeContainer.appendChild(timezoneDisplay);
        } else {
            const timezoneDisplay = document.createElement('h3');
            timezoneDisplay.textContent = "Timezone not found.";
            timeContainer.appendChild(timezoneDisplay);
        }
    })
    .catch(err => console.log("Timezone fetch error:", err.message));

    
})
.catch(err => console.log(err.message))

// Global variables
let watchlist = [];
let alarms = [];

// ... (fetchCityTime, addCity, addToWatchlist, displayWatchlist, fetchCurrentTime) ...

// Function to add alarm
function addAlarm() {
    const alarmTime = document.getElementById('alarmTime').value;
    if (alarmTime) {
        alarms.push(alarmTime);
        displayAlarms();
        document.getElementById('alarmTime').value = ''; // Clear input
    } else {
        alert("Please select an alarm time.");
    }
}

// Function to remove alarm 
function removeAlarm(index) {
    if (index >= 0 && index < alarms.length) {
        alarms.splice(index, 1);
        displayAlarms();
    } else {
        alert("Invalid alarm selection.");
    }
}

// Function to display alarms in the HTML 
function displayAlarms() {
    const alarmListUl = document.getElementById('alarmList');
    alarmListUl.innerHTML = ''; // Clear existing list

    alarms.forEach((time, index) => {
        const li = document.createElement('li');
        li.textContent = time;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeAlarm(index); // Pass index to removeAlarm
        li.appendChild(removeButton);
        alarmListUl.appendChild(li);
    });
}

