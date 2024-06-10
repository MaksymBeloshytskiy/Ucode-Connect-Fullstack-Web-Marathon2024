let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let sliderInterval = setInterval(showNextSlide, 3000);

// Event listener for the 'prev' button
document.getElementById('prev').addEventListener('click', () => {
    clearInterval(sliderInterval);
    showPrevSlide();
});

// Event listener for the 'next' button
document.getElementById('next').addEventListener('click', () => {
    clearInterval(sliderInterval);
    showNextSlide();
});

// Function to show a specific slide
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(-${index * 100}%)`;
    });
}

// Function to show the next slide
function showNextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
}

// Function to show the previous slide
function showPrevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentIndex);
}
