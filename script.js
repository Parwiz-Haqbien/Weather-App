const form = document.querySelector(".top-banner form");
//this line of code will stop the page from reloading when the sumbit or enter button  is pressed 
//and also grabbing the value in the search feild

form.addEventListener("submit" , e=> {
    e.preventDefault();
    const inputVal = input.value;
});

const apiKey = "992932a3ca9ef3fc48998d4d7770474d";
const inputVal = input.value

const url = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}';

fetch(url)
.then(Response => Response.json())
.then(data => {
})
.catch (()=>{
    MessageChannel.textContent = "Please search for a valid city"
});


const { main , name , sys , weather } = data;
const icon = `https://openweathermap.org/img/wn/${
  weather[0]["icon"]
}@2x.png`;

