function checkDivision(start = 1, end = 60) {
    for (let i = start; i <= end; i++) {
        let info = `The number ${i}`;

        // Check if the number is divisible by 2
        if (i % 2 === 0) info += " is divisible by 2";

        // Check if the number is divisible by 3
        if (i % 3 === 0) {
            info += (info.endsWith("divisible by 2") || info.endsWith("is divisible by 2") ? "," : "") + " is divisible by 3";
        }

        // Check if the number is divisible by 10
        if (i % 10 === 0) {
            info += (info.endsWith("divisible by 2") || info.endsWith("divisible by 3") || info.endsWith("is divisible by 3") ? "," : "") + " is divisible by 10";
        }

        // If the number is not divisible by 2, 3, or 10
        if (!info.endsWith("divisible by 2") && !info.endsWith("divisible by 3") && !info.endsWith("is divisible by 3") && !info.endsWith("divisible by 10")) {
            info += " -";
        }

        // Print the information about the number
        console.log(info);
    }
}

module.exports = {
    checkDivision
};
