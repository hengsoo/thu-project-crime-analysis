$(document).ready(function () {
    // drawGraph();
    // End of drag functions
});

function drawGraph(type, data, id) {
    $(id).empty();

    // Display graph data
    let graph = {};
    graph.nodes = [];
    graph.links = [];

    // Graph nodes
    graphData(type, data, graph);

    // Select svg
    let svg = d3.select(id),
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

    if (type === "closeness_centrality" || type === "betweenness_centrality") {
        simulation
            .force("charge_force", d3.forceManyBody().strength(-1).distanceMin(600));
    }

    // Create the link force
    // forceLink(links_data) pushes linked elements to be a fixed distance apart
    // can be configured using .distance() (default value is 30) and .strength()
    // We need the id accessor to use named sources and targets
    let link_force = d3.forceLink(graph.links)
        .id(function (d) {
            return d.id;
        })
        .distance(function (d) {
            //length scales with distance
            return (getWeight(d.source.id, d.target.id)) * 10000 % 500 || 300;
        });

    // Add force
    simulation.force("links", link_force);

    // Draw lines for the links
    let link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line")
        .attr("stroke-width", 4)
        .style("stroke", function (node) {
            return linkColoring(node, data, type);
        });

    // Draw circles for the nodes
    let node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(graph.nodes)
        .enter()
        .append("circle")
        .attr("r", 5)
        .attr("class", "node_tooltip")
        .attr("fill", "red")
        .attr("data-toggle", "tooltip")
        .attr("data-html", true)
        .attr("title", function (d) {

            let title = "<b>ID: </b>" + d.data.case_id + "<br>"
                + "<b>DateTime: </b>" + d.data.datetime.format("dddd, MMMM Do YYYY, h:mm:ss a") + "<br>"
                + "<b>Type: </b>" + d.data.pri_description +"<br>"
                + "<b>Location: </b>" + d.data.block_address +"<br>"
                + "<b>Community Area: </b>" + d.data.community_area + "<br>"
                + "<b>Closeness Centrality: </b>" + Math.round(d.data.closeness) + "<br>"
                + "<b>Betweenness Centrality: </b>" + Math.round(d.data.betweenness*1000);
            return title;
        })
        .style("fill", function (node) {
            return nodeColoring(node, data, type);
        });

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
            .attr("source-id", function (d) {
                return d.source.id;
            })
            .attr("target-id", function (d) {
                return d.target.id;
            })
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

    // Bootstrap tooltips settings
    $('svg circle').tooltip({
        'container': 'body',
    });
    // Custom position line tooltip
    $('svg line').hover(function (e) {
            // Get absolute offset value of svg item
            let rect = e.target.getBoundingClientRect();
            // Get absolute offset value
            let y_offset = rect.top + rect.height / 2 - 20 + $(document).scrollTop();
            let x_offset = rect.left + rect.width;
            
            let weight = getWeight(parseInt($(e.target).attr("source-id")), parseInt($(e.target).attr("target-id")));

            $('body').append($("<div class=\"bs-tooltip-right line-tooltip tooltip fade show\" " +
                "style=\"will-change: transform; position: absolute; " +
                "top:" + Math.round(y_offset) + "px;" +
                "left:" + Math.round(x_offset) + "px;>" +
                "\">" +
                "<div class=\"tooltip-inner\">" +
                "Length: " + weight +
                "</div>\n" +
                "</div>"));
        }, function () {
            $('body').find(".tooltip.fade.show.line-tooltip.bs-tooltip-right").remove();
        }
    );
}


