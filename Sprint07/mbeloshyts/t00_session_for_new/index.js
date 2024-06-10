document.addEventListener('DOMContentLoaded', () => {
    const formContainer = document.getElementById('form-container');
    const displayContainer = document.getElementById('display-content');

    // Check if session data exists
    const heroData = JSON.parse(sessionStorage.getItem('heroData'));

    if (heroData) {
        displayHeroData(heroData);
        formContainer.style.display = 'none'; // Hide the form container if data exists
    } else {
        displayHeroForm();
    }

    function displayHeroForm() {
        const formContent = document.getElementById('form-content');
        formContent.innerHTML = `
            <form id="hero-form">
                <div>
                    <label for="realName">Real Name</label>
                    <input type="text" id="realName" name="realName" required>
                </div>
                <div>
                    <label for="currentAlias">Current Alias</label>
                    <input type="text" id="currentAlias" name="currentAlias" required>
                </div>
                <div>
                    <label for="age">Age</label>
                    <input type="number" id="age" name="age" required>
                </div>
                <div>
                    <label for="description">Description</label>
                    <textarea id="description" name="description" required></textarea>
                </div>
                <div>
                    <label for="photo">Photo</label>
                    <input type="file" id="photo" name="photo">
                </div>
                <div class="powers">
                    <label>Powers</label>
                    <label><input type="checkbox" name="powers" value="Strength"> Strength</label>
                    <label><input type="checkbox" name="powers" value="Speed"> Speed</label>
                    <label><input type="checkbox" name="powers" value="Intelligence"> Intelligence</label>
                    <label><input type="checkbox" name="powers" value="Teleportation"> Teleportation</label>
                    <label><input type="checkbox" name="powers" value="Immortal"> Immortal</label>
                    <label><input type="checkbox" name="powers" value="Another"> Another</label>
                </div>
                <div>
                    <label for="controlLevel">Level of control</label>
                    <input type="range" id="controlLevel" name="controlLevel" min="0" max="10">
                </div>
                <div class="publicity">
                    <label>Publicity</label>
                    <label><input type="radio" name="publicity" value="UNKNOWN"> UNKNOWN</label>
                    <label><input type="radio" name="publicity" value="LIKE A GHOST"> LIKE A GHOST</label>
                    <label><input type="radio" name="publicity" value="I AM IN COMICS"> I AM IN COMICS</label>
                    <label><input type="radio" name="publicity" value="I HAVE FUN CLUB"> I HAVE FUN CLUB</label>
                    <label><input type="radio" name="publicity" value="SUPERSTAR"> SUPERSTAR</label>
                </div>
                <button type="submit">SEND</button>
            </form>
        `;

        const heroForm = document.getElementById('hero-form');
        heroForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const formData = new FormData(heroForm);
            const heroData = Object.fromEntries(formData.entries());
            heroData.powers = formData.getAll('powers');
            sessionStorage.setItem('heroData', JSON.stringify(heroData));

            displayHeroData(heroData);
            formContainer.style.display = 'none'; // Hide the form container after submission
        });
    }

    function displayHeroData(data) {
        displayContainer.innerHTML = `
            <p><strong>Name:</strong> ${data.realName}</p>
            <p><strong>Alias:</strong> ${data.currentAlias}</p>
            <p><strong>Age:</strong> ${data.age}</p>
            <p><strong>Description:</strong> ${data.description}</p>
            <p><strong>Photo:</strong> ${data.photo ? data.photo.name : 'No photo uploaded'}</p>
            <p><strong>Powers:</strong> ${data.powers.join(', ')}</p>
            <p><strong>Level of control:</strong> ${data.controlLevel}</p>
            <p><strong>Publicity:</strong> ${data.publicity}</p>
            <button id="forget-btn">FORGET</button>
        `;

        const forgetBtn = document.getElementById('forget-btn');
        forgetBtn.addEventListener('click', () => {
            sessionStorage.removeItem('heroData');
            location.reload();
        });
    }
});
