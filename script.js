const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

const stars = [];

for (let i = 0; i < 300; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.8 + 0.2,
        a: Math.random()
    });
}

const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    targetX: canvas.width / 2,
    targetY: canvas.height / 2
};

window.addEventListener("mousemove", e => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
});

function drawGlow() {
    const gradient = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        180
    );

    gradient.addColorStop(0, "rgba(120,160,255,.28)");
    gradient.addColorStop(.35, "rgba(90,80,255,.12)");
    gradient.addColorStop(1, "rgba(0,0,0,0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function animate() {

    mouse.x += (mouse.targetX - mouse.x) * 0.08;
    mouse.y += (mouse.targetY - mouse.y) * 0.08;

    ctx.fillStyle = "#03050d";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawGlow();

    for (const star of stars) {

        star.a += 0.01;

        const alpha = 0.55 + Math.sin(star.a) * 0.45;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
    }

    requestAnimationFrame(animate);
}

animate();

document.querySelectorAll(".project-card").forEach(card => {

    const tilt = card.querySelector(".tilt");
    const inner = card.querySelector(".card-inner");


    card.addEventListener("mousemove", e => {

        if(card.classList.contains("flipped")) return;


        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;


        const rotateY = ((x / rect.width) - .5) * 20;
        const rotateX = ((y / rect.height) - .5) * -20;


        tilt.style.transform =
        `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    });


    card.addEventListener("mouseleave", () => {

        tilt.style.transform =
        "rotateX(0deg) rotateY(0deg)";

    });


    card.addEventListener("click", () => {

        card.classList.toggle("flipped");

    });

});

document.querySelectorAll("#title span, #about-title span").forEach(letter => {

    if (letter.innerHTML === "&nbsp;") return;

    letter.addEventListener("mouseenter", () => {
        letter.style.transform = "translateY(-5px)";
    });

    letter.addEventListener("mouseleave", () => {
        letter.style.transform = "translateY(0)";
    });

});