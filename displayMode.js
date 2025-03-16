const colors = new Proxy(
	{
		html:	{h:40, s:100, l:100, a:1},
		css:	{h:180, s:100, l:90, a:1},
		js:		{h:0, s:100, l:70, a:1},
		jpg:	{h:260, s:100, l:70, a:0.8},
		png:	{h:280, s:100, l:70, a:0.8},
		gif:	{h:290, s:100, l:70, a:0.8},
		jpeg:	{h:270, s:100, l:70, a:0.8},
		mp4:	{h:330, s:100, l:70, a:0.8},
		img:	{h:280, s:100, l:70, a:0.8}, 
		txt:	{h:120, s:100, l:90, a:1},
		other:	{h:220, s:0, l:0, a:1}
	},{
		get(target, key) {
			return key in target ? target[key] : {h:220, s:0, l:0, a:1};
		}
});
const darkValues={
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
		"--pathLightness":"45%",
		"--htmlStroke":`hsl(${colors["html"].h}, 100%, 65%)`,
		"--cssStroke":`hsl(${colors["css"].h}, 100%, 65%)`,
		"--jsStroke":`hsl(${colors["js"].h}, 100%, 65%)`,
		"--jpgStroke":`hsl(${colors["jpg"].h}, 100%, 65%)`,
		"--pngStroke":`hsl(${colors["png"].h}, 100%, 65%)`,
		"--gifStroke":`hsl(${colors["gif"].h}, 100%, 65%)`,
		"--jpegStroke":`hsl(${colors["jpeg"].h}, 100%, 65%)`,
		"--mp4Stroke":`hsl(${colors["mp4"].h}, 100%, 65%)`,
		"--imgStroke":`hsl(${colors["img"].h}, 100%, 65%)`,
		"--txtStroke":`hsl(${colors["txt"].h}, 100%, 65%)`,
		"--otherStroke":`hsl(${colors["other"].h}, 100%, 65%)`,
		"--jsonStroke":`hsl(${colors["json"].h}, 100%, 65%)`,
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
		"--pathLightness":"90%",
		"--htmlStroke":"inherit",
		"--cssStroke":"inherit",
		"--jsStroke":"inherit",
		"--jpgStroke":"inherit",
		"--pngStroke":"inherit",
		"--gifStroke":"inherit",
		"--jpegStroke":"inherit",
		"--mp4Stroke":"inherit",
		"--imgStroke":"inherit",
		"--txtStroke":"inherit",
		"--otherStroke":"inherit",
		"--jsonStroke":"inherit",
	}
	
};

var darkMdoe = true;
const toggleMode=(isDark)=>{
	darkMdoe = isDark;
	Object.keys(darkValues[darkMdoe]).forEach(varMode => {
		const root = document.documentElement;
		root.style.setProperty(varMode, darkValues[darkMdoe][varMode]);
	});
};