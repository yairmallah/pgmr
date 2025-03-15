export async function initializeGraph() {
    await initializeAllDicts();

    const width = document.getElementById("graph-container").offsetWidth;
    const height = document.getElementById("graph-container").offsetHeight;

    let nodeMessages = window.messages;
    let nodeClass = window.classes;
    let nodeScheme = window.images;
    
    const svg = d3.select("#graph-container").append("svg")
        .attr("width", "100%")
        .attr("height", "100%");

    const simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(d => d.id).distance(40).strength(2))
        .force("charge", d3.forceManyBody().strength(-0.1))
        .force("center", d3.forceCenter(width / 2, height / 2).strength(0.1))
        .force("collide", d3.forceCollide(20).strength(0.5));

    function ticked() {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node.attr("transform", d => `translate(${d.x}, ${d.y})`);
    }

    simulation.nodes(node.data()).on("tick", ticked);
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
    let text = nodeMessages[nodeName];

    for (let key in nodeMessages) {
        if (problem_words.includes(key)) {
            if (key === "הר" && !mountain_con.includes(nodeName)) continue;
            if (key === "קו" && !line_con.includes(nodeName)) continue;
            if (key === "לב" && !heart_con.includes(nodeName)) continue;
        }
        text = text.replace(new RegExp(key, "g"), `<b class='b${nodeClass[key]}' onclick='nodeClick("${key}")'>${key}</b>`);
    }
    
    infoParagraph.innerHTML = text;
}
