const apiKey = "dd865f82f89ff1aa2593a7e407b63d37";
const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const list = document.querySelector(".ajax-section .cities");
const msg = document.querySelector(".top-banner span");

form.addEventListener("submit", async (e) => {
try{
  //Prevent the page from refreshing causing the DOM to restart or wtv
  e.preventDefault();
  //Take the value in the input field and call the API
  const inputVal = input.value;
  const url2 = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;
  const wth = await fetch(url2);
  const wthData = await wth.json();
  if(wthData.cod > 400){
    throw new Error();
  }
  const { main, name, sys, weather } = wthData;
  const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
  const li = document.createElement("li");
  li.classList.add("city");
  const markup = `
        <h2 class="city-name" data-name="${name}, ${sys.country}">
            <span>${name}</span>
            <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">
        ${Math.round(main.temp)}
        <sup>°C</sup>
        </div>
        <figure>
            <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
            <figcaption>${weather[0]["description"]}</figcaption>
        </figure> 
    `;
  li.innerHTML = markup;
  list.appendChild(li);
  msg.textContent = "";
  form.reset();
  input.focus();
}catch(err){
msg.textContent = "Please enter a valid city";
}
});
