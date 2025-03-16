export const darkValues={
	false: {
		"--bgBody":"hsl(50, 50%, 95%)",
		"--bgImg": "unset",
		"--staticShadow":  "unset",
		"--circSaturatin":"0%",
		"--circLihgtness":"90%",
		"--textColor":"#000",
		"--textShadow":"none",
		"--circStroke":"rgba(0, 0, 0, 0.7)",
		
		"--circLightness":"75%",
		"--txtLightness":"42%",
		"--linkColor":"#bbb",
		
		"--navButtonImage":'url("https://yairmallah.github.io/pgmr/imgs/navSchame.gif")',
		"--navSubMenu":221,
		"--navItem":"#eee",

		"--scrollbarColor":"#ccc",
		"--scrollbarHover":"#666"
	},
	true: {
		"--bgBody":"#000",
		"--bgImg": "linear-gradient(hsla(120, 100%, 50%, 0.4) .1em, transparent .1em), linear-gradient(90deg, hsla(120, 100%, 50%, 0.4) .1em, transparent .1em)",
		"--staticShadow":  "drop-shadow(0 0 14px hsl(84,100%,79%)) drop-shadow(0 0 26px hsl(84,100%,79%))",
		"--circSaturatin":"100%",
		"--circLihgtness":"55%",
		"--textColor":"white",
		"--textShadow":"2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000",
		"--circStroke":"white",
		
		"--circLightness":"25%",
		"--txtLightness":"75%",
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