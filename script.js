var slider = document.getElementById("showcase")
var step = document.querySelector("#showcase div").offsetWidth + 30
var current_slide = 0
var scrollAmount = 0
var slideInterval = 0

function next_slide() {
    if (current_slide != 2) {
        slider.scrollTo({
            top: 0,
            left: scrollAmount += step,
            behavior: 'smooth'
        });
        current_slide += 1
    } else {
        slider.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        current_slide = 0
        scrollAmount = 0
    }
}

function set_slider() {
    clearInterval(slideInterval)
    setTimeout(() => {
        if (window.innerWidth <= 600) {
            slideInterval = setInterval(() => {
                next_slide()
            }, 5000);
        }
    }, 500);
}

window.onresize = set_slider
set_slider()