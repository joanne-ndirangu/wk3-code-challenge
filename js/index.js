fetch('http://localhost:3000', {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
})
    .then(res => res.json())
    .then(data => {
        // Handle the response data
    })
    .catch(error => {
        // Handle any errors
    });

//make a request for the first film
fetch(`http://localhost:3000/films/1`)
.then(res => res.json())
.then(firstFilm => {
  displayFirstFilm(firstFilm);

//display first film details as default when page loads
  function displayFirstFilm(film) {
    let firstFilmElement = document.getElementById('first-film');
    const availableTickets = film.capacity - film.tickets_sold
    firstFilmElement.innerHTML = `
      <img class="pic" src="${film.poster}" alt="${film.title}">
      <h3>${film.title}</h3>
      <p>${film.description}</p>
      <p>Runtime: ${film.runtime} minutes</p>
      <p>Showtime: ${film.showtime}</p>
      <p class="tickets">Available tickets: ${availableTickets}</p>
      <button class="buy-button" onclick="buyTicket(${film.id})">Buy ticket</button>
      <button class="delete">Delete</button>
    `
  }
})

//Create list of all film titles
const filmList = document.getElementById('films')

fetch(`http://localhost:3000/films`)
  .then(res => res.json())
  .then(films => {
    films.forEach(film => {
      const ul = document.createElement('ul')
      ul.textContent = film.title

      // Make the names clickable to give film details
      ul.addEventListener('click', () => filmDetails(film))
      filmList.appendChild(ul)
    })
  })

//Display details of the selected film in place of the default first film
function filmDetails(film) {
    fetch(`http://localhost:3000/films/${film.id}`)
      .then(res => res.json())
      .then(selectedFilm => {
        const availableTickets = selectedFilm.capacity - selectedFilm.tickets_sold;
        let firstFilmElement = document.getElementById('first-film');
        firstFilmElement.innerHTML = `
          <img class="pic" src="${selectedFilm.poster}" alt="${selectedFilm.title}">
          <h3>${selectedFilm.title}</h3>
          <p>${selectedFilm.description}</p>
          <p>Runtime: ${selectedFilm.runtime} minutes</p>
          <p>Showtime: ${selectedFilm.showtime}</p>
          <p class="tickets">Available tickets: ${availableTickets}</p>
          <button class="buy-button" onclick="buyTicket(${selectedFilm.id})">Buy ticket</button>
          <button class="delete">Delete</button>
        `;
      })
    }

//Function to reduce available details for every ticket bought
    function buyTicket() {
        let ticketsElem = document.querySelector('.tickets');
        let availableTickets = parseInt(ticketsElem.textContent.split(': ')[1])

//Once available tickets get to zero, buy ticket button changes to sold out
        if (availableTickets > 0) {
          ticketsElem.textContent = `Available tickets: ${--availableTickets}`
          if (availableTickets === 0) {
            const buyButton = document.querySelector('.buy-button')
            buyButton.textContent = 'Sold Out'
            buyButton.disabled = true
            filmItem.classList.add('sold-out')
          }
        }
    }