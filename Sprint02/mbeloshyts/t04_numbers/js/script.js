let beginRange = +prompt('Enter the number for the beginning of a range', '1');
let endRange = +prompt('Enter the number for the end of a range', '100');

function checkDivision(beginRange, endRange) {
    for (let i = beginRange; i <= endRange; i++) {
        let description = " - ";

        // Check if the number is even
        if (i % 2 === 0) {
            description = " is even";
        }

        // Check if the number is a multiple of 3 and not even
        if (i % 3 === 0 && i % 2 !== 0) {
            description = " is a multiple of 3";
        }
        // Check if the number is a multiple of 3
        else if (i % 3 === 0) {
            description = description.concat(", a multiple of 3");
        }

        // Check if the number is a multiple of 10
        if (i % 10 === 0) {
            description = description.concat(", a multiple of 10");
        }
        
        console.log(i + description);
    }
}

checkDivision(beginRange, endRange);
