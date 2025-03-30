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
    date.style.fontSize ='27px'

    const dayOfWeek = document.createElement('h3')
    dayOfWeek.textContent = data.dayOfWeek;
    timeContainer.appendChild(dayOfWeek);

    const timeZn = document.createElement('h3')
    timeZn.textContent = data.timeZone;
    timeContainer.appendChild(timeZn);

    
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

async function searchCity(timeZone)  {
   // timeZone = formatString(timeZone)
    let result = await fetch(`https://timeapi.io/api/time/current/zone?timeZone=${timeZone}`)
    let data = await result.json()
    console.log(data)
    return (data)

}

//searchCity(formatString("Africa/Nairobi"))
searchCity("Australia/Victoria")

// function formatString(input) {
//     let parts = input.split("/");
//     if (parts.length >= 2) {
//         return `${parts[0]}%2F${parts[1]}`;
//     }
//     return input; 
// }

async function getTimezones() {
    let result = await fetch('https://timeapi.io/api/timezone/availabletimezones') 
    let data = await result.json()
    let timezoneSelect = document.getElementById("timezoneSelect")
    for (let element of data){
        let timeZone = document.createElement('option')
        timeZone.value = element
        timeZone.textContent = element
        timezoneSelect.appendChild(timeZone)
    }
    console.log(data);
    
}
getTimezones()

 let addtoWatchlistbtn = document.querySelector("#add-btn")
 addtoWatchlistbtn.addEventListener('click', ()=>{
    let timezoneInput = document.getElementById('timezoneSelect').value
    searchCity(timezoneInput)
    console.log(timezoneInput);
    addToWatchlist(timezoneInput)

    setTimeout(() => {
        displayWatchlist(); // Calls the function after 3 seconds
    }, 5000);
 })
 

 async function addToWatchlist(timeZone) {
    let result = await fetch('http://localhost:3000/timeZones',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {name:timeZone}

        )
   })
 }

//  async function displayWatchlist() {
//     let watchlist = document.getElementById('watchlist')
//     let result = await fetch('http://localhost:3000/timeZones')
//     let data = await result.json()
//     for (element of data){
//         let timeZonename = document.createElement('div')
//         timeZonename.className = "timeZonecard"
//         let timezoneData = await(searchCity(element.name))
//         timeZonename.innerHTML = `
//                 <div class="city" id="city">${element.name}</div>
//                 <div class="time" id="myTime">${timezoneData.time}</div>
//                 <div class="day" id="day">${timezoneData.dayOfWeek}</div>
//                 <button class="removebtns" id="removebtn" >x</button>
//         `
//         //searchCity(element.name)   
//         watchlist.appendChild(timeZonename)

        
//     }
//     let removebtn = document.querySelector("#removebtn")
//     removebtn.addEventListener('click',()=>{
//     alert('clicked')
// })
//     console.log(data);
    
//  }

async function displayWatchlist() {
    let watchlist = document.getElementById('watchlist');
    let result = await fetch('http://localhost:3000/timeZones');
    let data = await result.json();

    watchlist.innerHTML = ""; // Clear previous content

    for (let element of data) {
        let timeZonename = document.createElement('div');
        timeZonename.className = "timeZonecard";

        let timezoneData = await searchCity(element.name);

        timeZonename.innerHTML = ` 
            <div class="city">${element.name}</div>
            <div class="time" id="myTime">${timezoneData.time}</div>
            <div class="day">${timezoneData.dayOfWeek}</div>
            <button class="removebtn">x</button>`
            watchlist.appendChild(timeZonename);
        }
    
        let removeButtons = document.querySelectorAll(".removebtn");
        removeButtons.forEach(button => {
            button.addEventListener("click", (event) => {
    
                event.target.parentElement.remove(); // Remove the clicked card
            });
        });
    
        console.log(data);
    }


displayWatchlist()

async function removeItem(timeZone) {
    let result = await fetch(`http://localhost:3000/timeZones/${timeZone}`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {name:timeZone}

        )
   })

}



