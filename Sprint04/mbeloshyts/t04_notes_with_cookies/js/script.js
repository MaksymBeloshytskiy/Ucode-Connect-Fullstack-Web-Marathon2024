const clearButton = document.querySelector('.clear');
const addButton = document.querySelector('.add');
const notesContainer = document.querySelector('.output-field');
let noteIndex = 0;

// Function to translate and display cookies as notes
function translateCookies() {
  const cookieString = document.cookie;
  const cookieArray = cookieString.split('; ');

  for (let i = 0; i < cookieArray.length; i++) {
    const keyValue = cookieArray[i].split('=');
    const key = keyValue[0];
    const value = decodeURIComponent(keyValue[1]);
    if (i === 0) {
      notesContainer.innerHTML = `--> ${value}`;
    } else {
      notesContainer.innerHTML += `<div>--> ${value}</div>`;
    }
  }
}

// Function to clear all cookies
function clearCookies() {
  const shouldDelete = confirm('Delete cookies?');
  if (shouldDelete) {
    const cookieArray = document.cookie.split('; ');
    for (let i = 0; i < cookieArray.length; i++) {
      const keyValue = cookieArray[i].split('=');
      const key = keyValue[0];
      document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
    notesContainer.innerHTML = '[Empty]';
  }
}

// Function to save a note to cookies
function saveToCookies() {
  const textAreaValue = document.querySelector('.text-color').value;
  if (textAreaValue === "") {
    alert('It\'s empty. Try to input something in "Text input"');
  } else {
    document.cookie = `note_${noteIndex}=${encodeURIComponent(textAreaValue)}`;
    if (notesContainer.innerHTML === '[Empty]') {
      notesContainer.innerHTML = '';
      notesContainer.insertAdjacentHTML('beforeend', `<div>--> ${textAreaValue}</div>`);
    } else {
      notesContainer.insertAdjacentHTML('beforeend', `<div>--> ${textAreaValue}</div>`);
    }
    noteIndex++;
  }
}

// Check if there are any cookies and translate them if present
if (document.cookie === "") {
  notesContainer.innerHTML = '[Empty]';
} else {
  translateCookies();
}

// Add event listeners to buttons
addButton.addEventListener('click', saveToCookies);
clearButton.addEventListener('click', clearCookies);
