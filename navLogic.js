document.addEventListener("DOMContentLoaded", function () {
    const navContainer = document.createElement("div");
    navContainer.id = "navContainer";
    navContainer.innerHTML = `
        <button id="navButton"></button>
        <div id="subMenu" class="hidden">
			<table>
					<tr>
						<td><button class="navItem" data-link="video.html">סימולציה</button></td>
						<td><button class="navItem" data-link="index.html">בית</button></td>
					</tr>
					<tr>
						<td><button class="navItem" data-link="log.html">מילון</button></td>
						<td><button class="navItem" data-link="tba.html">תב"ע</button></td>
					</tr>
				</table>
        </div>
    `;
    document.body.appendChild(navContainer);

    const navButton = document.getElementById("navButton");
    const subMenu = document.getElementById("subMenu");
    const navItems = document.querySelectorAll(".navItem");

    // Load position from localStorage
    let posX = localStorage.getItem("navX") || 50;
    let posY = localStorage.getItem("navY") || 50;
    navContainer.style.position = "fixed";
    navContainer.style.left = `${posX}px`;
    navContainer.style.top = `${posY}px`;

    let offsetX, offsetY, isDragging = false;

    navButton.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX - navContainer.offsetLeft;
        offsetY = e.clientY - navContainer.offsetTop;
        navButton.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", (e) => {
        if (isDragging) {
            let newX = e.clientX - offsetX;
            let newY = e.clientY - offsetY;
            navContainer.style.left = `${newX}px`;
            navContainer.style.top = `${newY}px`;
        }
    });

    document.addEventListener("mouseup", () => {
        if (isDragging) {
            localStorage.setItem("navX", navContainer.style.left.replace("px", ""));
            localStorage.setItem("navY", navContainer.style.top.replace("px", ""));
        }
        isDragging = false;
        navButton.style.cursor = "grab";
    });

    // Toggle Submenu
    navButton.addEventListener("click", () => {
        subMenu.classList.toggle("hidden");
		//subMenu.style.right = "60px";
    });

    // Navigation for sub-items
    navItems.forEach(item => {
        item.addEventListener("click", function () {
            window.location.href = this.getAttribute("data-link");
        });
    });
});