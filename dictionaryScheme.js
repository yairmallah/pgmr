var nodeMessages = window.messages;
var nodeClass = window.classes;
var nodeScheme = window.images;

const width = document.getElementById("graph-container").offsetWidth;
const height = document.getElementById("graph-container").offsetHeight;

var current_node = null;

export async function initializeGraph(){
	await initializeAllDicts();
	nodeMessages = window.messages;
	nodeClass = window.classes;
	nodeScheme = window.images;

	const links = [];
	// Generate links if messages share a common word
	const nodesKeys = Object.keys(nodeMessages);
	for (let i = 0; i < nodesKeys.length; i++) {
		const source = nodesKeys[i];
		const regex = new RegExp(`(\\b|\\s|^)([המלכבשו]?)(${source})(ים|ות|ה|ת|ית|י)?(?=\\s|$|[:;.,!?])`, 'g');
		for (let j = 0; j < nodesKeys.length; j++) {
			const target = nodesKeys[j];
			const targetWords = nodeMessages[target];
			if (regex.test(targetWords)) {
				links.push({ source, target });
			}
		}
	}

	const offs = 15;
	const bounds = { 
		xMin: offs, xMax: width - offs, 
		yMin: offs, yMax: height - offs 
	};

	const svg = d3.select("#graph-container").append("svg")
		.attr("width", "100%")
		.attr("height", "100%");
	// Define the simulation with forces
	const simulation = d3.forceSimulation()
		.force("link", d3.forceLink().id(d => d.id).distance(40).strength(2))
		.force("charge", d3.forceManyBody().strength(-0.1))
		.force("center", d3.forceCenter(width / 2, height / 2).strength(0.1))
		.force("bounds", forceBounds(bounds))
		.force("collide", d3.forceCollide(20).strength(0.5));
	window.dictionarySchemeSimulation = simulation;
		
	function forceBounds(bounds) {
		return function(alpha) {
			for (const node of simulation.nodes()) {
				node.x = Math.max(bounds.xMin, Math.min(bounds.xMax, node.x));
				node.y = Math.max(bounds.yMin, Math.min(bounds.yMax, node.y));
			}
		};
	}
		
		
	function forceSameClassAttraction(strength) {
		return (alpha) => {
			const nodes = simulation.nodes();
			for (let i = 0; i < nodes.length; i++) {
				for (let j = i + 1; j < nodes.length; j++) {
					const nodeA = nodes[i];
					const nodeB = nodes[j];
					// Apply attraction only for nodes of the same class
					if (nodeClass[nodeA.id] === nodeClass[nodeB.id]) {
						const dx = nodeB.x - nodeA.x;
						const dy = nodeB.y - nodeA.y;
						const distance = Math.sqrt(dx * dx + dy * dy) || 1; // Avoid division by zero

						// Strength of the attraction
						const force = (distance - 100) * strength * alpha / distance; // 100 is the desired distance

						// Apply forces to nodes
						nodeA.vx += force * dx;
						nodeA.vy += force * dy;
						nodeB.vx -= force * dx;
						nodeB.vy -= force * dy;
					}
				}
			}
		};
	}

	// Create links
	const link = svg.append("g")
		.selectAll(".link")
		.data(links)
		.enter().append("line")
		.attr("class", "link");

	// Create nodes with initial positions
	const node = svg.append("g")
		.selectAll(".node")
		.data(Object.keys(nodeMessages).map(id => ({
			id,
			group: nodeClass[id] || "default",
			x: Math.random() * width,
			y: Math.random() * height
		})))
		.enter().append("g")
		.attr("class", "node")
		.call(d3.drag()
			.on("start", dragStart)
			.on("drag", dragged)
			.on("end", dragEnd));

	node.on("click", function(event, d){
		nodeClick(d.id, d);

	});

	node.append("circle")
		.attr("class", d => nodeClass[d.id])

	simulation.nodes(node.data())
		.on("tick", ticked);

	simulation.force("link").links(links);

	function ticked() {
		link
			.attr("x1", d => d.source.x)
			.attr("y1", d => d.source.y)
			.attr("x2", d => d.target.x)
			.attr("y2", d => d.target.y);

		node
			.attr("transform", d => `translate(${Math.max(bounds.xMin, Math.min(bounds.xMax, d.x))},${bounds.yMin, Math.min(bounds.yMax, d.y)})`);
	}

	function dragStart(event, d) {
		if (!event.active) simulation.alphaTarget(0.3).restart();
		d.fx = d.x;
		d.fy = d.y;
	}

	function dragged(event, d) {
		d.fx = event.x;
		d.fy = event.y;
	}

	function dragEnd(event, d) {
		if (!event.active) simulation.alphaTarget(0);
		d.fx = null;
		d.fy = null;
	}
}

export async function nodeClick(nodeName) {
	await initializeAllDicts();
	const infoTitle = document.getElementById('node-title');
	let node_obj = null;

	d3.selectAll(".node").filter(d => {
		if (d.id === nodeName) {
			node_obj = d;
		}
		return d._group && d._group.g === nodeName;
	});

	infoTitle.textContent = `${nodeName}`;
	const infoParagraph = document.getElementById('node-info');
	infoParagraph.innerHTML = nodeMessages[nodeName];
	scanForDefinitions(infoParagraph);

	//node position
	if (current_node != null) {
		current_node.fx = null;
		current_node.fy = null;
		current_node.select("circle").style("opacity", "");
		console.log(current_node);
	}
	// Fix the current node
	node_obj.fx = width / 10;
	node_obj.fy = height / 10;
	node_obj.select("circle").style("opacity", "1");
	current_node = node_obj
	sessionStorage.setItem("def", current_node.id);
	window.dictionarySchemeSimulation.alpha(1).restart();
}
window.nodeClick = nodeClick;

export async function scanForDefinitions(txtElement){
	await initializeAllDicts();
	let txt = txtElement.innerHTML;
	for (let key in nodeMessages) {
		const regex = new RegExp(`(\\b|\\s|^)([המכלבשו]?)(${key})(ים|ות|ה|ת|ית|י)?(?=\\s|$|[:;.,!?])`, 'g');
		txt = txt.replace(regex, (match, before, prefix = '', base, suffix = '') => {
		return before+`<b class='b${nodeClass[key]}' onclick='window.nodeClick("${key}")'>${match}</b>`;});
	}
	txtElement.innerHTML = txt;
}
