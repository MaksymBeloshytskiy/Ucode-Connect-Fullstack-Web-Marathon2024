// Function to split a string into an array of words and remove extra spaces
function deleteExtraSpaces(str) {
    return str.trim().split(/\s+/);
}

// Function to remove duplicates from an array
function removeDuplicates(arr) {
    return Array.from(new Set(arr));
}

// Function to add words to the object's property
function addWords(obj, words) {
    if (obj && words) {
        // Split the object's words and the new words, remove duplicates, and join them back into a string
        let arr = deleteExtraSpaces(obj.words).concat(deleteExtraSpaces(words));
        obj.words = removeDuplicates(arr).join(' ');
    }
}

// Function to remove specified words from the object's property
function removeWords(obj, words) {
    if (obj && words) {
        // Split the object's words and the words to remove, remove specified words, and join them back into a string
        let objArr = deleteExtraSpaces(obj.words);
        let wordsArr = deleteExtraSpaces(words);
        
        wordsArr.forEach(word => {
            let index = objArr.indexOf(word);
            if (index !== -1) {
                objArr.splice(index, 1);
            }
        });

        obj.words = objArr.join(' ');
    }
}

// Function to change one or more words in the object's property
function changeWords(obj, oldWords, newWords) {
    if (obj && oldWords && newWords) {
        // Split the object's words, old words, and new words, replace old words with new words, and join them back into a string
        let objArr = deleteExtraSpaces(obj.words);
        let oldArr = deleteExtraSpaces(oldWords);
        let newArr = deleteExtraSpaces(newWords);
        
        oldArr.forEach(oldWord => {
            let index = objArr.indexOf(oldWord);
            if (index !== -1) {
                objArr[index] = newArr.shift(); // Replace old word with new word
            }
        });

        // Append any remaining new words
        obj.words = objArr.concat(newArr).join(' ');
    }
}
