$(document).ready(function () {

    // Display graph data
    let graph = {};
    graph.nodes = [];
    graph.links = [];

    // Graph nodes
    // Currently set nodes of community area <= 10
    vertex_data.forEach(function (element, index, array) {
        if (element.community_area < 10) {
            graph.nodes.push({"id": index, "data": element});
        }
    });

    // Graph links
    // Currently set links that consist of nodes of community area <= 10
    for (let i = 0; i < edge.length; i++) {
        for (let key in edge[i]) {
            if (edge[i][key] !== -1 && vertex_data[key].community_area < 10 && vertex_data[i].community_area < 10) {
                graph.links.push({"source": i, "target": key})
            }
        }
    }

    // Select svg
    let svg = d3.select("#basic_svg"),
        width = svg.attr("width"),
        height = svg.attr("height");

    // Create the simulation with nodes data
    let simulation = d3.forceSimulation()
    // Nodes data
        .nodes(graph.nodes);

    // Add forces
    // We're going to add a charge (like electrical charge) to each node
    //  forceManyBody (for making elements attract or repel one another)
    // Also going to add a centering force (pushing all nodes to center)
    simulation
        .force("charge_force", d3.forceManyBody())
        .force("center_force", d3.forceCenter(width / 2, height / 2));


    // Create the link force
    // forceLink(links_data) pushes linked elements to be a fixed distance apart
    // can be configured using .distance() (default value is 30) and .strength()
    // We need the id accessor to use named sources and targets
    let link_force = d3.forceLink(graph.links)
        .id(function (d) {
            return d.id;
        })
        .distance(300);

    // Add force
    simulation.force("links", link_force);


    // Draw lines for the links
    let link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line")
        .attr("stroke-width", 2);

    // Draw circles for the nodes
    let node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(graph.nodes)
        .enter()
        .append("circle")
        .attr("r", 5)
        .attr("fill", "red");

    // Tick can be regarded as how frame moves to frame
    simulation.on("tick", ticked);
    // Ticked function
    function ticked() {
        node
            .attr("cx", function (d) {
                return d.x;
            })
            .attr("cy", function (d) {
                return d.y;
            })
            // Dragging properties
            .call(d3.drag()
                .subject(dragsubject)
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        // Update link positions
        // Simply tells one end of the line to follow one node around
        // And the other end of the line to follow the other node around
        link
            .attr("x1", function (d) {
                return d.source.x;
            })
            .attr("y1", function (d) {
                return d.source.y;
            })
            .attr("x2", function (d) {
                return d.target.x;
            })
            .attr("y2", function (d) {
                return d.target.y;
            });
    }

    // List of drag functions
    function dragsubject() {
        return simulation.find(d3.event.x, d3.event.y);
    }

    function dragstarted() {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d3.event.subject.fx = d3.event.subject.x;
        d3.event.subject.fy = d3.event.subject.y;
    }

    function dragged() {
        d3.event.subject.fx = d3.event.x;
        d3.event.subject.fy = d3.event.y;
    }

    function dragended() {
        if (!d3.event.active) simulation.alphaTarget(0);
        d3.event.subject.fx = null;
        d3.event.subject.fy = null;
    }
    // End of drag functions
});