// Function to prompt the user for animal name and validate input
function getAnimal() {
    let animal = prompt('What animal is the superhero most similar to?', '');
    let regex = RegExp(/^[a-zA-Z]+$/);

    if (animal.length > 20 || !regex.test(animal)) {
        alert('ERROR: Accepts only one word, which consists only of Latin letters and its length does not exceed 20 characters.');
        return null;
    }
    return animal;
}

// Function to prompt the user for gender and validate input
function getGender() {
    let gender = prompt('Is the superhero male or female? Leave blank if unknown or other.', '');
    let reqGender = RegExp(/^(male|female|)$/i);

    if (!reqGender.test(gender)) {
        alert('ERROR: Accepts only male, female gender or blank (not case sensitive)!');
        return null;
    }
    return gender;
}

// Function to prompt the user for age and validate input
function getAge() {
    let age = prompt('How old is the superhero?', '');
    let reqAge = RegExp(/^[1-9][0-9]{0,4}$/);

    if (age.length > 5 || !reqAge.test(age)) {
        alert('ERROR: Accepts only digits, cannot start with a zero, no more than 5 characters!');
        return null;
    }
    return age;
}

// Function to generate superhero name based on input
function generateSuperheroName() {
    let animal = null;
    let gender = null;
    let age = null;
    let description = null;

    // Prompt for animal, gender, and age until valid inputs are received
    while (animal === null) {
        animal = getAnimal();
    }
    while (gender === null) {
        gender = getGender();
    }
    while (age === null) {
        age = getAge();
    }

    // Determine the description based on gender and age
    if (/^male$/i.test(gender) && age < 18) {
        description = "boy";
    } else if (/^male$/i.test(gender) && age >= 18) {
        description = "man";
    } else if (/^female$/i.test(gender) && age < 18) {
        description = "girl";
    } else if (/^female$/i.test(gender) && age >= 18) {
        description = "woman";
    } else if (gender === '' && age < 18) {
        description = "kid";
    } else if (gender === '' && age >= 18) {
        description = "hero";
    }

    // Display the superhero name
    alert('The superhero name is: ' + animal + '-' + description + '!');
}

// Call the function to generate superhero name
generateSuperheroName();
