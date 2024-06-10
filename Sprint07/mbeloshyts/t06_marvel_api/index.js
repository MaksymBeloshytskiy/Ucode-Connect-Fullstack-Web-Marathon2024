document.addEventListener('DOMContentLoaded', () => {
  // Fetch comics data from the API
  fetch('/api/comics')
    .then(response => response.json())
    .then(data => {
    const container = document.getElementById('comics-container');
    data.forEach(comic => {
      const comicDiv = document.createElement('div');
      comicDiv.classList.add('comic');
  
      const title = document.createElement('h2');
      title.textContent = comic.title;
      comicDiv.appendChild(title);
  
      if (comic.description) {
      const description = document.createElement('p');
      description.textContent = comic.description;
      comicDiv.appendChild(description);
      }
  
      if (comic.thumbnail) {
      const img = document.createElement('img');
      img.src = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
      comicDiv.appendChild(img);
      }
  
      container.appendChild(comicDiv);
    });
    })
    .catch(error => {
    console.error('Error fetching comics:', error);
    });
});
