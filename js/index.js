// document.addEventListener('DOMContentLoaded', () => {

fetch('http://localhost:3000/films/1')
.then(res => res.json())
.then(firstFilm => {
  displayFirstFilm(firstFilm);

  function displayFirstFilm(film) {
    let firstFilmElement = document.getElementById('first-film');
    const availableTickets = film.capacity - film.tickets_sold
    firstFilmElement.innerHTML = `
      <img class="pic" src="${film.poster}" alt="${film.title}">
      <h2>${film.title}</h2>
      <p>${film.description}</p>
      <p>Runtime: ${film.runtime} minutes</p>
      <p>Showtime: ${film.showtime}</p>
      <p class="tickets">Available tickets: ${availableTickets}</p>
      <button onclick="buyTicket(${film.id})">Buy ticket</button>
    `
  }
})
// })

const filmList = document.getElementById('films')

fetch('http://localhost:3000/films')
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

function filmDetails(film) {
  const availableTickets = film.capacity - film.tickets_sold;
  filmList.innerHTML = `
    <img class="pic" src="${film.poster}" alt="${film.title}">
    <h2>${film.title}</h2>
    <p>${film.description}</p>
    <p>Runtime: ${film.runtime} minutes</p>
    <p>Showtime: ${film.showtime}</p>
    <p class="tickets">Available tickets: ${availableTickets}</p>
    <button onclick="buyTicket(${film.id})">Buy ticket</button>
  `
}

function buyTicket() {
    let filmDetails = document.getElementById('films')
    let ticketsElem = filmDetails.querySelector('.tickets')
    let availableTickets = parseInt(ticketsElem.textContent.split(': ')[1])
    if (availableTickets > 0)
    ticketsElem.textContent = `Available tickets: ${--availableTickets}`
    } if (availableTickets === 0) {
          alert("Sold out")
        }
