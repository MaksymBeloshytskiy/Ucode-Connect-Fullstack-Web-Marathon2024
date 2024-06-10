document.addEventListener('DOMContentLoaded', () => {
    const filmList = document.getElementById('film-list');
    const filmTitle = document.getElementById('film-title');
    const filmPoster = document.getElementById('film-poster');
    const productionDate = document.getElementById('production-date');
    const filmInfo = document.getElementById('film-info');
    const mainActors = document.getElementById('main-actors');
    const filmInfoContainer = document.querySelector('.film-info-container');

    // Sample film data
    const films = [
        { id: 1, title: 'Iron Man', poster: 'assets/images/iron_man.jpg', date: 'April 30, 2008', info: 'After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.', actors: ['Robert Downey Jr.', 'Gwyneth Paltrow', 'Jeff Bridges'] },
        { id: 2, title: 'Iron Man 2', poster: 'assets/images/iron_man2.jpg', date: 'April 29, 2010', info: 'With the world now aware of his identity as Iron Man, Tony Stark must contend with both his declining health and a vengeful mad man with ties to his father\'s legacy.', actors: ['Robert Downey Jr.', 'Gwyneth Paltrow', 'Don Cheadle'] },
        { id: 3, title: 'Iron Man 3', poster: 'assets/images/iron_man3.jpg', date: 'May 3, 2013', info: 'When Tony Stark\'s world is torn apart by a formidable terrorist called the Mandarin, he starts an odyssey of rebuilding and retribution.', actors: ['Robert Downey Jr.', 'Gwyneth Paltrow', 'Guy Pearce'] }
    ];

    // Function to display film information
    function displayFilmInfo(film) {
        filmTitle.textContent = film.title;
        filmPoster.src = film.poster;
        productionDate.textContent = film.date;
        filmInfo.textContent = film.info;
        mainActors.textContent = film.actors.join(', ');
        filmInfoContainer.style.display = 'block';
    }

    // Populate film list
    films.forEach(film => {
        const li = document.createElement('li');
        li.textContent = film.title;
        li.dataset.id = film.id;
        filmList.appendChild(li);
    });

    // Display information for the first film when the page loads
    displayFilmInfo(films[0]);

    // Event listener for clicking film titles
    filmList.addEventListener('click', (event) => {
        const selectedId = event.target.dataset.id;
        const selectedFilm = films.find(film => film.id === parseInt(selectedId));
        if (selectedFilm) {
            displayFilmInfo(selectedFilm);
        }
    });
});
