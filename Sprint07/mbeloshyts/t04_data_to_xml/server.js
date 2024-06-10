// server.js
const express = require('express');
const path = require('path');
const ListAvengerQuotes = require('./ListAvengerQuotes');
const AvengerQuote = require('./AvengerQuote');

const app = express();

app.use(express.static(path.join(__dirname, './')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './', 'index.html'));
});

app.get('/quotes', (req, res) => {
  const quotes = [
    new AvengerQuote(1, 'Iron Man', 'I am Iron Man.', ['https://as2.ftcdn.net/v2/jpg/03/61/64/85/1000_F_361648530_mg5GX0tKcHEbKYSXKpVr2XujrP2qRau3.jpg'], '2022-01-01', { '2022-01-01': 'First comment' }),
    new AvengerQuote(2, 'Captain America', 'I can do this all day.', ['link_to_photo2'], '2022-02-01', { '2022-02-01': 'Second comment' }),
    new AvengerQuote(3, 'Thor', 'Bring me Thanos!', ['link_to_photo3'], '2022-03-01', { '2022-03-01': 'Third comment' }),
    new AvengerQuote(4, 'Hulk', 'Hulk smash!', ['link_to_photo4'], '2022-04-01', { '2022-04-01': 'Fourth comment' })
  ];

  const list = new ListAvengerQuotes(quotes);
  list.toXML(path.join(__dirname, 'avenger_quote.xml'));

  const fromXMLList = ListAvengerQuotes.fromXML(path.join(__dirname, 'avenger_quote.xml'));

  res.json({ before: quotes, after: fromXMLList.quotes });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/`);
});
