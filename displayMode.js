export const darkValues={
	false: {
		"--bgBody":"hsl(50, 50%, 95%)",
		"--textColor":"#000",
		"--circStroke":"rgba(0, 0, 0, 0.7)",
		
		"--circLightness":"90%",
		"--txtLightness":"42%",
		"--linkColor":"#bbb",
		
		"--navButtonImage":'url("https://yairmallah.github.io/pgmr/imgs/navSchame.gif")',
		"--navSubMenu":221,
		"--navItem":"#f1edd8",

		"--scrollbarColor":"#ccc",
		"--scrollbarHover":"#666"
	},
	true: {
		"--bgBody":"#000",
		"--textColor":"white",
		"--circStroke":"white",
		
		"--circLightness":"25%",
		"--txtLightness":"55%",
		"--linkColor":"#999",
		
		"--navButtonImage":'url("https://yairmallah.github.io/pgmr/imgs/navSchameD.gif")',
		"--navSubMenu":34,
		"--navItem":"#111",
		
		"--scrollbarColor":"#333",
		"--scrollbarHover":"#999"
	}
	
};

export const toggleMode=(isDark)=>{
	Object.keys(darkValues[isDark]).forEach(varMode => {
		const root = document.documentElement;
		root.style.setProperty(varMode, darkValues[isDark][varMode]);
	});
	sessionStorage.setItem("isDark", isDark);
};