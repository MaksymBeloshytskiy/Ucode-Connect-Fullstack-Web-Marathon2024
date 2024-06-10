function transformation() {
    const heroElement = document.getElementById('hero');
    const labElement = document.getElementById('lab');

    if (heroElement.innerText === 'Bruce Banner') {
        // Switch to State 2: Hulk
        heroElement.innerText = 'Hulk';
        heroElement.style.fontSize = '130px';
        heroElement.style.letterSpacing = '6px';
        labElement.style.backgroundColor = '#70964b';
    } else {
        // Switch to State 1: Bruce Banner
        heroElement.innerText = 'Bruce Banner';
        heroElement.style.fontSize = '60px';
        heroElement.style.letterSpacing = '2px';
        labElement.style.backgroundColor = '#ffb300';
    }
}
