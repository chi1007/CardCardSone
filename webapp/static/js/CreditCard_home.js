
// 首頁滾動條
let slideIndex = 1;
initSlides();

function initSlides() {
    showSlides(slideIndex); // Initialize the first slide
    setInterval(nextSlide, 10000); // Set the interval to change slides every 10 seconds
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


// 信用卡自動滾動條
let scrollAmountCredit = 0;
let scrollAmountDebit = 0;

function scrollLeftCredit() {
    let track = document.querySelector('.card_carousel-track');
    let cardWidth = document.querySelector('.card').offsetWidth + 20; // 20px is the margin
    scrollAmountCredit -= cardWidth;
    if (scrollAmountCredit < 0) {
        scrollAmountCredit = 0;
    }
    track.style.transform = `translateX(-${scrollAmountCredit}px)`;
}

function scrollRightCredit() {
    let track = document.querySelector('.card_carousel-track');
    let cardWidth = document.querySelector('.card').offsetWidth + 20; // 20px is the margin
    let maxScroll = track.scrollWidth - track.clientWidth;
    scrollAmountCredit += cardWidth;
    if (scrollAmountCredit > maxScroll) {
        scrollAmountCredit = maxScroll;
    }
    track.style.transform = `translateX(-${scrollAmountCredit}px)`;
}

function scrollLeftDebit() {
    let track = document.querySelector('.debitcard_carousel-track');
    let cardWidth = document.querySelector('.card').offsetWidth + 20; // 20px is the margin
    let maxScroll = track.scrollWidth - track.clientWidth;
    scrollAmountDebit += cardWidth;
    if (scrollAmountDebit > maxScroll) {
        scrollAmountDebit = maxScroll;
    }
    track.style.transform = `translateX(-${scrollAmountDebit}px)`;
}

function scrollRightDebit() {
    let track = document.querySelector('.debitcard_carousel-track');
    let cardWidth = document.querySelector('.card').offsetWidth + 20; // 20px is the margin
    scrollAmountDebit -= cardWidth;
    if (scrollAmountDebit < 0) {
        scrollAmountDebit = 0;
    }
    track.style.transform = `translateX(-${scrollAmountDebit}px)`;
}
