// Fetch quotes and populate into HTML
fetch('/quotes') // Assuming the server is running and handles '/quotes' endpoint
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('quotes-container');
    data.before.forEach(quote => {
      const quoteBox = document.createElement('div');
      quoteBox.className = 'quote-box';
      quoteBox.innerHTML = `
        <h2>${quote.author}</h2>
        <p>${quote.quote}</p>
        ${quote.photo && quote.photo.length > 0 ? `<img src="${quote.photo[0]}" alt="Avenger photo">` : ''}
        <p>Publish Date: ${quote.publishDate}</p>
        <p>Comments:</p>
        <ul>
          ${Object.entries(quote.comments).map(([date, comment]) => `<li>${date}: ${comment}</li>`).join('')}
        </ul>
      `;
      container.appendChild(quoteBox);
    });
  })
  .catch(err => console.error('Error fetching quotes:', err));