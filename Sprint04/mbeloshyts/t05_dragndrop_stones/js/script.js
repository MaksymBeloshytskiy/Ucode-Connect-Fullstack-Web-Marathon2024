document.addEventListener('DOMContentLoaded', () => {
    const diamonds = document.querySelectorAll('.diamond');
    const container = document.querySelector('.container');
    let currentDraggedElement = null;

    // Function to set random positions for the diamonds
    function setRandomPosition(element) {
        const containerRect = container.getBoundingClientRect();
        const diamondSize = 100; // 100px is the size of the diamond
        const maxX = containerRect.width - diamondSize;
        const maxY = containerRect.height - diamondSize;
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        element.style.left = `${randomX}px`;
        element.style.top = `${randomY}px`;
    }

    diamonds.forEach(diamond => {
        setRandomPosition(diamond);
        diamond.setAttribute('draggable', 'false');
        diamond.addEventListener('click', toggleDrag);
        diamond.addEventListener('dragstart', dragStart);
        diamond.addEventListener('dragend', dragEnd);
    });

    function toggleDrag(event) {
        const diamond = event.target;
        const isDraggable = diamond.getAttribute('draggable') === 'true';

        // Remove draggable and border from all diamonds
        diamonds.forEach(d => {
            d.setAttribute('draggable', 'false');
            d.classList.remove('draggable');
        });

        if (!isDraggable) {
            diamond.setAttribute('draggable', 'true');
            diamond.classList.add('draggable');
        }
    }

    function dragStart(event) {
        currentDraggedElement = event.target;
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', '');
        setTimeout(() => {
            currentDraggedElement.style.visibility = 'hidden';
        }, 0);
    }

    function dragEnd(event) {
        currentDraggedElement.style.visibility = 'visible';
        currentDraggedElement = null;
    }

    document.addEventListener('dragover', event => {
        event.preventDefault();
    });

    document.addEventListener('drop', event => {
        event.preventDefault();
        if (currentDraggedElement) {
            const x = event.clientX - 50; // Adjusting to center the diamond
            const y = event.clientY - 50; // Adjusting to center the diamond
            currentDraggedElement.style.left = `${x}px`;
            currentDraggedElement.style.top = `${y}px`;
            currentDraggedElement.style.visibility = 'visible';
        }
    });
});
