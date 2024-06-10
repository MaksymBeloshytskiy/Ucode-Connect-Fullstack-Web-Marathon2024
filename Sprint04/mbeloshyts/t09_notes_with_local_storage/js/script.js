const clearButton = document.querySelector('.clear');
const addButton = document.querySelector('.add');
const notesContainer = document.querySelector('.output-field');
let noteIndex = 0;

function translateLocalStorage() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.getItem(i.toString());
    if (i === 0) {
      notesContainer.innerHTML = `--> ${key}`;
    } else {
      notesContainer.innerHTML += `<div>--> ${key}</div>`;
    }
  }
}

function clearLocalStorage() {
  const shouldDelete = confirm('Delete cookies?');
  if (shouldDelete) {
    localStorage.clear();
    notesContainer.innerHTML = '[Empty]';
  }
}

function saveToLocalStorage() {
    const textAreaValue = document.querySelector('.text-color').value;
    if (textAreaValue === "") {
        alert('It\'s empty. Try to input something in "Text input"');
    } else {
        const currentDate = new Date();
        const formattedDate = formatDate(currentDate); // Use formatDate function to format date
        const noteContent = `${textAreaValue} ${formattedDate}`; // Combine note and date/time
        localStorage.setItem(noteIndex.toString(), noteContent);
        if (notesContainer.innerHTML === '[Empty]') {
            notesContainer.innerHTML = '';
        }
        notesContainer.insertAdjacentHTML('beforeend', `<div>--> ${noteContent}</div>`);
        noteIndex++;
    }
}

// Function to format the date in the desired format
function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `[${day}.${month}.${year}, ${hours}:${minutes}:${seconds}]`;
}


if (localStorage.length === 0) {
  notesContainer.innerHTML = '[Empty]';
} else {
  translateLocalStorage();
}

addButton.addEventListener('click', saveToLocalStorage);
clearButton.addEventListener('click', clearLocalStorage);
