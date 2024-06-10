document.addEventListener('DOMContentLoaded', function() {
    const lis = document.getElementsByTagName('li');
    
    for (let item of lis) {
        // Check and correct the class attribute
        if (!item.classList.contains('good') && 
            !item.classList.contains('evil') && 
            !item.classList.contains('unknown')) {
            item.classList.add('unknown');
        }

        // Check and correct the data-element attribute
        if (!item.hasAttribute('data-element')) {
            item.setAttribute('data-element', 'none');
        }
        
        // Get the data elements
        const elements = item.getAttribute('data-element').split(' ');

        // Append a line break for visual separation
        const br = document.createElement('br');
        item.appendChild(br);

        // Append circles based on data elements
        elements.forEach(element => {
            const circle = document.createElement('div');
            circle.classList.add('elem');
            
            if (element === 'none') {
                const line = document.createElement('div');
                line.classList.add('line');
                circle.appendChild(line);
            } else {
                circle.classList.add(element);
            }

            item.appendChild(circle);
        });
    }
});
