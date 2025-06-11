import * as dispMode from './displayMode.js';

document.addEventListener("DOMContentLoaded", function () {
	const navContainer = document.createElement("div");
	navContainer.id = "navContainer";
	navContainer.innerHTML = `
		<button id="navButton"></button>
		<div id="subMenu" class="hidden">
			<table id="subMenuTable">
				<tr class="subMenuTR">
					<td class="subMenuTD"><button class="navItem" data-link="turb.html">אורבניזם</button></td>
					<td class="subMenuTD"><button class="navItem" data-link="index.html">בית</button></td>
				</tr>
				<tr class="subMenuTR">
					<td class="subMenuTD"><button class="navItem" data-link="log.html">מילון</button></td>
					<td class="subMenuTD"><button class="navItem" data-link="tba.html">תב"ע</button></td>
				</tr>
				<tr class="subMenuTR">
					<td class="subMenuTD"><button class="navItem" data-link="video.html">סימולציה</button></td>
					<td class="subMenuTD"><button class="navItem" data-link="references.html">רפרנסים</button></td>
				</tr>
			</table>
		</div>
		<div id="dark-button" class="hidden">
			<div id="toggle-light"></div>
			<div id="toggle-dark"></div>
		</div>
	`;
	document.body.appendChild(navContainer);
	const navButton = document.getElementById("navButton");
	const subMenu = document.getElementById("subMenu");
	const navItems = document.querySelectorAll(".navItem");
	const darkButton = document.getElementById("dark-button");
	const TlightButton = document.getElementById("toggle-light");
	const TdarkButton = document.getElementById("toggle-dark");
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
			
			if (buttonRect.top < darkButton.offsetWidth) {
				darkButton.style.top = "50px";
			} else {
				darkButton.style.top = "-50px";
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
		if (dragged){
			subMenu.classList.toggle("hidden");
			darkButton.classList.toggle("hidden");
		}
		dragged = false;
	});

	// Toggle Submenu
	navButton.addEventListener("click", () => {
		subMenu.classList.toggle("hidden");
		darkButton.classList.toggle("hidden");
		//subMenu.style.right = "60px";
	});

	// Navigation for sub-items
	navItems.forEach(item => {
		item.addEventListener("click", function () {
			window.location.href = this.getAttribute("data-link");
		});
	});
	let isDark = sessionStorage.getItem("isDark") || true;
	dispMode.toggleMode(isDark);
	TdarkButton.addEventListener("click", () => {dispMode.toggleMode(true)});
	TlightButton.addEventListener("click", () => {dispMode.toggleMode(false)});
	
});

// not here!! routes the pages on a route
// Dictionary loading function using Promises
function activePresMode(){
	sessionStorage.setItem("presMode", true);
	document.documentElement.style.setProperty("--nonPresHeight", "80vh");
	document.documentElement.style.setProperty("--PresHeight", "20vh");
}
function deActivePresMode(){
	sessionStorage.setItem("presMode", false);
	document.documentElement.style.setProperty("--nonPresHeight", "100vh");
	document.documentElement.style.setProperty("--PresHeight", "0vh");
}

if (sessionStorage.getItem("activatePresMode") === "true") {
	activePresMode();
	console.log("in");
	const presTxt = document.createElement("div");
	presTxt.id = "presTxt";
	presTxt.innerHTML = window.pgsTxts[window.location.pathname]; // or use proper route key
	document.body.appendChild(presTxt);
}




function loadPgTxts(filePath, delimiter = ':\n') {
	filePath = 'https://yairmallah.github.io/pgmr/texts/rouTxt.txt';
    return fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load file: ${response.statusText} | from ${filePath}`);
            }
            return response.text();
        })
        .then(text => {
            const lines = text.split('\n\n').map(line => line.trim()).filter(line => line);
            const dictionary = {};
            lines.forEach(line => {
                const [key, value] = line.split(delimiter).map(part => part.trim());
                if (key && value !== undefined) {
                    dictionary[key] = value.replaceAll("\n", "<br/>");
                }
            });
            window.pgsTxts = dictionary;
        })
        .catch(error => {
            console.error("Error loading dictionary:", error.message);
            return {};
        });
}

loadPgTxts();



function setupRoute(){
	if (sessionStorage.getItem("presMode") == null || sessionStorage.getItem("presMode") == false){
		sessionStorage.setItem("routeStep", 0);
		sessionStorage.setItem("presMode", false);
	}
}
setupRoute();

const route = ['/pgmr/index.html', '/pgmr/log.html', '/pgmr/tba.html', '/pgmr/turb.html', '/pgmr/references.html', '/pgmr/video.html'];


function routeRunWhileInactive(callback, intervalSeconds = 20) {
	let intervalId;
	let timeoutId;

	function startInterval() {
		// Start repeating the callback every N seconds
		intervalId = setInterval(callback, intervalSeconds * 1000);
	}

	function stopInterval() {
		clearInterval(intervalId);
		clearTimeout(timeoutId);
	}

	function reset() {
		stopInterval();
		// Restart the interval after inactivity
		timeoutId = setTimeout(startInterval, 1000);
		sessionStorage.setItem("routeStep", 0);
		deActivePresMode();
	}

	const events = ['mousemove', 'keydown', 'scroll', 'touchstart'];
	events.forEach(event => {
		document.addEventListener(event, reset, { passive: true });
	});

	startInterval();
}
routeRunWhileInactive(() => {
	activePresMode();
	let step = parseInt(sessionStorage.getItem("routeStep"));
	sessionStorage.setItem("routeStep", (step + 1));
	window.location.href = route[step%route.length];
});