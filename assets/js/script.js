$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy - update sidebar + mobile nav
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.sidebar-nav a, .navbar ul li a').removeClass('active');
                $(`.sidebar-nav a[href="#${id}"], .navbar a[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').not('[href="#"]').on('click', function (e) {
        var target = $(this).attr('href');
        if (!target || target === '#') return;
        var $target = $(target);
        if ($target.length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $target.offset().top
            }, 800, 'swing');
            if ($('#menu').length) {
                $('#menu').removeClass('fa-times');
                $('.navbar').removeClass('nav-toggle');
            }
        }
    });

    // <!-- emailjs to mail contact form data -->
    $("#contact-form").submit(function (event) {
        emailjs.init("user_TTDmetQLYgWCLzHTDgqxm");

        emailjs.sendForm('contact_service', 'template_contact', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("contact-form").reset();
                alert("Form Submitted Successfully");
            }, function (error) {
                console.log('FAILED...', error);
                alert("Form Submission Failed! Try Again");
            });
        event.preventDefault();
    });
    // <!-- emailjs to mail contact form data -->

});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Thayaananthan";
            $("#favicon").attr("href", "assets/images/favicon.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "assets/images/favhand.png");
        }
    });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["AI/ML Engineer", "Data Scientist"],
    loop: true,
    typeSpeed: 75,
    backSpeed: 25,
    backDelay: 1000,
});
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
    let response
    type === "skills" ?
        response = await fetch("skills.json")
        :
        response = await fetch("./projects/projects.json")
    const data = await response.json();
    return data;
}

function showSkills(data) {
    const skillsContainer = document.getElementById("skillsContainer");
    if (!data.categories) {
        // Legacy flat format fallback
        let skillHTML = '<div class="skills-row"><div class="skills-grid">';
        (Array.isArray(data) ? data : []).forEach(skill => {
            skillHTML += `<div class="bar"><div class="info"><img src="${skill.icon}" alt="${skill.name}" /><span>${skill.name}</span></div></div>`;
        });
        skillHTML += '</div></div>';
        skillsContainer.innerHTML = skillHTML;
        return;
    }
    let html = "";
    data.categories.forEach(cat => {
        html += `<div class="skills-category"><h3 class="skills-category-title"><i class="fas ${cat.icon}"></i> ${cat.label}</h3><div class="skills-grid">`;
        cat.skills.forEach(skill => {
            html += `<div class="bar"><div class="info"><img src="${skill.icon}" alt="${skill.name}" onerror="this.src='https://img.icons8.com/color/48/000000/code.png'" /><span>${skill.name}</span></div></div>`;
        });
        html += '</div></div>';
    });
    skillsContainer.innerHTML = html;
}

function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";
    projects.slice(0, 10).filter(project => project.category != "android").forEach(project => {
        projectHTML += `
        <div class="box tilt">
      <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">
            <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
          </div>
        </div>
      </div>
    </div>`
    });
    projectsContainer.innerHTML = projectHTML;

    // <!-- tilt js effect starts -->
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });
    // <!-- tilt js effect ends -->

    /* ===== SCROLL REVEAL ANIMATION ===== */
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    /* SCROLL PROJECTS */
    srtop.reveal('.work .box', { interval: 200 });

}

fetchData().then(data => {
    showSkills(data);
});

fetchData("projects").then(data => {
    showProjects(data);
});

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});
// <!-- tilt js effect ends -->


// pre loader start
// function loader() {
//     document.querySelector('.loader-container').classList.add('fade-out');
// }
// function fadeOut() {
//     setInterval(loader, 500);
// }
// window.onload = fadeOut;
// pre loader end

// disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}



/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'bottom',
    distance: '40px',
    duration: 800,
    easing: 'ease-out',
    reset: false
});

/* SCROLL HOME */
srtop.reveal('.hero-title', { delay: 200 });
srtop.reveal('.hero-subtitle', { delay: 300 });
srtop.reveal('.hero-content .btn-ornn', { delay: 400 });
srtop.reveal('.hero-visual', { delay: 500 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


/* SCROLL SKILLS */
srtop.reveal('.skills-container', { delay: 200 });
srtop.reveal('.skills .bar', { interval: 50, delay: 300 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal('.work .box', { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });

// Scroll progress
window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress-bar');
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.width = scrolled + '%';
});