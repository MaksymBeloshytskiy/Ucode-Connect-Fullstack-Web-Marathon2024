// js/script.js
function checkBrackets(str) {
    if (typeof str !== 'string' || !/\(|\)/.test(str)) return -1;
  
    let openCount = 0;
    let closeCount = 0;
  
    for (let char of str) {
      if (char === '(') {
        openCount++;
      } else if (char === ')') {
        if (openCount === 0) {
          closeCount++;
        } else {
          openCount--;
        }
      }
    }
  
    return openCount + closeCount;
  }
  