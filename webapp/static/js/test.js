let slideIndex = 1;
initSlides();

function initSlides() {
    showSlides(slideIndex); // Initialize the first slide
    setInterval(nextSlide, 3000); // Set the interval to change slides every 10 seconds
}

function showSlides(n) {
    let slides = document.getElementsByClassName("carousel-item");
    let dots = document.getElementsByClassName("dot");

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function prevSlide() {
    showSlides(slideIndex -= 1);
}

function nextSlide() {
    showSlides(slideIndex += 1);
}



let scrollAmount = 0;

function scrollLeft() {
    let track = document.querySelector('.card_carousel-track');
    let cardWidth = document.querySelector('.card').offsetWidth + 20; // 20px is the margin
    scrollAmount -= cardWidth;
    if (scrollAmount < 0) {
        scrollAmount = 0;
    }
    track.style.transform = `translateX(-${scrollAmount}px)`;
}

function scrollRight() {
    let track = document.querySelector('.card_carousel-track');
    let cardWidth = document.querySelector('.card').offsetWidth + 20; // 20px is the margin
    let maxScroll = track.scrollWidth - track.clientWidth;
    scrollAmount += cardWidth;
    if (scrollAmount > maxScroll) {
        scrollAmount = maxScroll;
    }
    track.style.transform = `translateX(-${scrollAmount}px)`;
}
