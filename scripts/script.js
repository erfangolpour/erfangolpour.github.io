particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 50,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "polygon": {
        "nb_sides": 5
      }
    },
    "opacity": {
      "value": 0.5,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0,
      }
    },
    "size": {
      "value": 4,
      "random": false
    },
    "line_linked": {
      "enable": true,
      "distance": 200,
      "color": "#ffffff",
      "opacity": 0.3,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 1,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "repulse"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 200,
        "line_linked": {
          "opacity": 1
        }
      },
      "repulse": {
        "distance": 150,
        "duration": 1
      },
      "push": {
        "particles_nb": 4
      }
    }
  },
  "retina_detect": true
});

menu = document.querySelector("#horizontal-navigation").children

var observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    targetBtn = menu[entry.target.getAttribute("menu-index")]
    if (entry.isIntersecting) targetBtn.classList.add("active")
    else targetBtn.classList.remove("active");
  })
}, { threshold: 0.2 });

observer.observe(document.querySelector("#main-container"));
observer.observe(document.querySelector("#projects-container"));
observer.observe(document.querySelector("#resume-container"));


resumeMenu = document.getElementById("resume-navigation").children
resumeContent = document.getElementById("resume-content").children

Array.from(resumeMenu).forEach(child => {
  child.addEventListener("click", function () {
    if (!child.classList.contains("active")) {
      previousMenu = document.querySelector("#resume-navigation > div.active")
      previousContent = resumeContent[Array.prototype.indexOf.call(resumeMenu, previousMenu)];
      previousContent.style.display = "none"
      previousMenu.classList.remove("active");

      targetContent = resumeContent[Array.prototype.indexOf.call(resumeMenu, child)];
      targetContent.style.display = "block";
      child.classList.add("active");
    }
  })
})

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("horizontal-navigation").style.top = "0";
    document.getElementById("vertical-navigation").style.top = "0";
  } else {
    document.getElementById("horizontal-navigation").style.top = "-100px";
    document.getElementById("vertical-navigation").style.top = "-100px";
    document.getElementById("show-menu").checked = false;
  }
  prevScrollpos = currentScrollPos;

  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("horizontal-navigation").style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  } else {
    document.getElementById("horizontal-navigation").style.backgroundColor = "transparent";
  }
} 
