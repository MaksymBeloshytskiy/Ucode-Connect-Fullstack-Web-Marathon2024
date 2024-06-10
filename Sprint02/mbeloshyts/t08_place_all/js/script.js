// Function to sort a number array with even numbers on the left and odd numbers on the right
function sortNumbers(array) {
    let left = 0;
    let right = array.length - 1;

    while (left < right) {
        // Move left pointer to the right until it finds an odd number
        while (array[left] % 2 === 0) {
            left++;
        }

        // Move right pointer to the left until it finds an even number
        while (array[right] % 2 !== 0) {
            right--;
        }

        // Swap the elements if left pointer is still to the left of right pointer
        if (left < right) {
            let temp = array[left];
            array[left] = array[right];
            array[right] = temp;
        }
    }
}
