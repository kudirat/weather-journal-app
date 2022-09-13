/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const key = "&appid=c9ebc067c1d0b156a4cf55c3d1845137&units=imperial";
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

const generate = document.getElementById('generate').addEventListener('click', performAction);

//Create an event listener with a callback function to execute when it is clicked
function performAction(e) {
  const zipCode = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  //call async function
  getWeather(baseURL, zipCode, key)
    .then((data) => {
      console.log(data)
      postData('/add', { temp: data.main.temp, date: newDate, content: feelings });
    })
    .then(data => updateUI());
}

//make a GET request to the OpenWeatherMap API.
const getWeather = async (baseURL, zipCode, key) => {
  const res = await fetch(baseURL + zipCode + key)
  try {
    const data = await res.json();
    // console.log(data)
    return data;
  } catch (error) {
    console.log("error", error);
  }
}

// Chain promise to POST request to add the API data, as well as data entered by the user, to your app.
const postData = async (url = "", data = {}) => {
  //console.log(data)
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await res.json();
    console.log(newData);
    return newData
  } catch (error) {
    console.log("error", error);
  }
}

//chain another Promise that updates the UI dynamically
const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json();
    temp.innerHTML = Math.round(allData.temp) + ' degrees';
    date.innerHTML = allData.date;
    content.innerHTML = allData.userResponse;
  } catch (error) {
    console.log("erorr", error);
  }
}