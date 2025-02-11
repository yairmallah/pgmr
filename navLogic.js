document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("navButton");

    // Load position from localStorage
    let posX = localStorage.getItem("navButtonX") || 50;
    let posY = localStorage.getItem("navButtonY") || 50;
    button.style.left = `${posX}px`;
    button.style.top = `${posY}px`;

    let offsetX, offsetY, isDragging = false;

    button.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX - button.offsetLeft;
        offsetY = e.clientY - button.offsetTop;
        button.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", (e) => {
        if (isDragging && !isDragging) {
            let newX = e.clientX - offsetX;
            let newY = e.clientY - offsetY;
            button.style.left = `${newX}px`;
            button.style.top = `${newY}px`;
        }
    });

    document.addEventListener("mouseup", () => {
        if (isDragging) {
            localStorage.setItem("navButtonX", button.style.left.replace("px", ""));
            localStorage.setItem("navButtonY", button.style.top.replace("px", ""));
        }
        isDragging = false;
        button.style.cursor = "grab";
    });

    // Navigation Function
    button.addEventListener("click", () => {
        window.location.href = "index.html"; // Change this to the desired page
    });
});
