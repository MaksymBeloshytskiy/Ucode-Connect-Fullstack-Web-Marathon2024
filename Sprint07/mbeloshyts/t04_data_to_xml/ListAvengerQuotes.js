const fs = require('fs');
const { DOMParser, XMLSerializer } = require('xmldom');
const AvengerQuote = require('./AvengerQuote');

// ListAvengerQuotes.js

class ListAvengerQuotes {
  constructor(quotes = []) {
    this.quotes = quotes;
  }

  // Convert the list of Avenger quotes to XML and save it to a file
  toXML(fileName) {
    const xmlContent = `<AvengerQuotes>${this.quotes.map(quote => quote.toXML()).join('')}</AvengerQuotes>`;
    fs.writeFileSync(fileName, xmlContent);
  }

  // Read XML content from a file, parse it, and create a ListAvengerQuotes object
  static fromXML(fileName) {
    const xmlContent = fs.readFileSync(fileName, 'utf8');
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlContent, 'application/xml');
    const quotes = Array.from(doc.getElementsByTagName('AvengerQuote')).map(quoteNode => {
      const xmlString = new XMLSerializer().serializeToString(quoteNode);
      return AvengerQuote.fromXML(xmlString);
    });
    return new ListAvengerQuotes(quotes);
  }
}

module.exports = ListAvengerQuotes;
