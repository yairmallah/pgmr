export const darkValues={
	false: {
		"--bgBody":"hsl(50, 50%, 95%)",
		"--bgImg": "unset",
		"--staticShadow":  "unset",
		"--circSaturatin":"0%",
		"--circLihgtness":"90%",
		"--textColor":"#000",
		"--textShadow":"none",
		"--circStroke":"3.5px",
		"--waveFill":"hsla(240, 100%, 30%,1)",
		"--waveStroke":"1.5px",
		"--waveShadow":"none",
		"--pathSaturation":"100%",
		"--pathLightness":"45%"
	},
	true: {
		"--bgBody":"#000",
		"--bgImg": "linear-gradient(hsla(120, 100%, 50%, 0.4) .1em, transparent .1em), linear-gradient(90deg, hsla(120, 100%, 50%, 0.4) .1em, transparent .1em)",
		"--staticShadow":  "drop-shadow(0 0 5px hsl(84,100%,59%))",
		"--circSaturatin":"100%",
		"--circLihgtness":"65%",
		"--textColor":"white",
		"--textShadow":"2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000",
		"--circStroke":"2px",
		"--waveFill":"hsla(72, 100%, 75%,1)",
		"--waveStroke":"0px",
		"--waveShadow":"drop-shadow(0 0 5px hsl(75,72%,72%))",
		"--pathSaturation":"100%",
		"--pathLightness":"90%"
	}
	
};

export var darkMdoe = true;
export const toggleMode=(isDark)=>{
	darkMdoe = isDark;
	Object.keys(darkValues[darkMdoe]).forEach(varMode => {
		const root = document.documentElement;
		root.style.setProperty(varMode, darkValues[darkMdoe][varMode]);
	});
};