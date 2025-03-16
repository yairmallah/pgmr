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
				<tr>
					<td><button class="navItem" data-link="turb.html">אורבניזם</button></td>
				</tr>
			</table>
		</div>
		<div id="dark-button">
			<div id="toggle-light" onclick="toggleMode(false)"></div>
			<div id="toggle-dark" onclick="toggleMode(true)"></div>
		</div>
	`;
	document.body.appendChild(navContainer);

	const navButton = document.getElementById("navButton");
	const subMenu = document.getElementById("subMenu");
	const navItems = document.querySelectorAll(".navItem");
	var dragged = false;
	// Load position from localStorage
	let posX = localStorage.getItem("navX") || 50;
	let posY = localStorage.getItem("navY") || 50;
	navContainer.style.position = "fixed";
	navContainer.style.left = `${posX}px`;
	navContainer.style.top = `${posY}px`;

	let offsetX, offsetY, isDragging = false;

	navButton.addEventListener("mousedown", (e) => {
		isDragging = true;
		dragged = false;
		offsetX = e.clientX - navContainer.offsetLeft;
		offsetY = e.clientY - navContainer.offsetTop;
		navButton.style.cursor = "grabbing";
	});

	document.addEventListener("mousemove", (e) => {
		if (isDragging) {
			dragged = true;
			let newX = e.clientX - offsetX;
			let newY = e.clientY - offsetY;
			navContainer.style.left = `${newX}px`;
			navContainer.style.top = `${newY}px`;
			
			// adj sub menu position
			let buttonRect = navButton.getBoundingClientRect();
			let windowHeight = window.innerHeight;
			let windowWidth = window.innerWidth;
			// Check if the menu will overflow the bottom
			if (buttonRect.bottom + subMenu.offsetHeight > windowHeight) {
				subMenu.style.top = "auto";
				subMenu.style.bottom = "0"; // Flip up
			} else {
				subMenu.style.top = "0";
				subMenu.style.bottom = "auto";
			}
			if (buttonRect.left - subMenu.offsetWidth < 0) {
				subMenu.style.left = navButton.offsetWidth + 5 + "px";
				subMenu.style.right = "auto";
			} else {
				subMenu.style.left = "auto";
				subMenu.style.right = navButton.offsetWidth + 5 + "px"; // Flip up
			}
		}
	});

	document.addEventListener("mouseup", () => {
		if (isDragging) {
			localStorage.setItem("navX", navContainer.style.left.replace("px", ""));
			localStorage.setItem("navY", navContainer.style.top.replace("px", ""));
			// adj sub menu position
			let buttonRect = navButton.getBoundingClientRect();
			let windowHeight = window.innerHeight;
			let windowWidth = window.innerWidth;
			// Check if the menu will overflow the bottom
			if (buttonRect.bottom + subMenu.offsetHeight > windowHeight) {
				subMenu.style.top = "auto";
				subMenu.style.bottom = "0"; // Flip up
			} else {
				subMenu.style.top = "0";
				subMenu.style.bottom = "auto";
			}
			if (buttonRect.left - subMenu.offsetWidth < 0) {
				subMenu.style.left = navButton.offsetWidth + 5 + "px";
				subMenu.style.right = "auto";
			} else {
				subMenu.style.left = "auto";
				subMenu.style.right = navButton.offsetWidth + 5 + "px"; // Flip up
			}
		}
		isDragging = false;
		navButton.style.cursor = "grab";
		if (dragged){subMenu.classList.toggle("hidden");}
		dragged = false;
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