// AvengerQuote.js
const { DOMParser } = require('xmldom');

class AvengerQuote {
  constructor(id, author, quote, photo, publishDate, comments) {
    this.id = id;
    this.author = author;
    this.quote = quote;
    this.photo = photo; // array of links to images from a movie scene
    this.publishDate = publishDate;
    this.comments = comments; // object { date: comment }
  }

  toXML() {
    let xml = `<AvengerQuote>`;
    xml += `<id>${this.id}</id>`;
    xml += `<author>${this.author}</author>`;
    xml += `<quote>${this.quote}</quote>`;
    xml += `<photo>`;
    this.photo.forEach(link => {
      xml += `<link>${link}</link>`;
    });
    xml += `</photo>`;
    xml += `<publishDate>${this.publishDate}</publishDate>`;
    xml += `<comments>`;
    for (const [date, comment] of Object.entries(this.comments)) {
      xml += `<comment><date>${date}</date><text>${comment}</text></comment>`;
    }
    xml += `</comments>`;
    xml += `</AvengerQuote>`;
    return xml;
  }

  static fromXML(xml) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'application/xml');
    const id = doc.getElementsByTagName('id')[0].textContent;
    const author = doc.getElementsByTagName('author')[0].textContent;
    const quote = doc.getElementsByTagName('quote')[0].textContent;
    const photo = Array.from(doc.getElementsByTagName('link')).map(link => link.textContent);
    const publishDate = doc.getElementsByTagName('publishDate')[0].textContent;
    const comments = {};
    const commentNodes = doc.getElementsByTagName('comment');
    for (let i = 0; i < commentNodes.length; i++) {
      const date = commentNodes[i].getElementsByTagName('date')[0].textContent;
      const text = commentNodes[i].getElementsByTagName('text')[0].textContent;
      comments[date] = text;
    }
    return new AvengerQuote(id, author, quote, photo, publishDate, comments);
  }
}

module.exports = AvengerQuote;
