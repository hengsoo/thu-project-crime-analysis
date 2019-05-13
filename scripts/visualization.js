$(document).ready(function () {

    let result = {};
    result.nodes = [];
    result.links = [];

    vertex_data.forEach(function (element, index, array) {
        if (element.community_area < 10) {
            console.log(element.community_area);
            result.nodes.push({"id": index, "data": element});
        }

    });


    for (let i = 0; i < edge.length; i++) {
        for (let key in edge[i]) {
            if (edge[i][key] !== -1 && vertex_data[key].community_area < 10 && vertex_data[i].community_area < 10) {
                result.links.push({"source": i, "target": key})
            }
        }
    }

    // console.log(JSON.stringify(result));

    // Select svg
    let svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height");

    let simulation = d3.forceSimulation()
        .nodes(result.nodes);

    simulation
        .force("charge_force", d3.forceManyBody())
        .force("center_force", d3.forceCenter(width / 2, height / 2));



    //Create the link force
    //We need the id accessor to use named sources and targets
    let link_force = d3.forceLink(result.links)
        .id(function (d) {
            return d.id;
        })
        .distance(300);

    simulation.force("links",link_force);
    //add forces
    //we're going to add a charge to each node
    //also going to add a centering force


//draw lines for the links
    let link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(result.links)
        .enter().append("line")
        .attr("stroke-width", 2);

    //draw circles for the nodes
    let node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(result.nodes)
        .enter()
        .append("circle")
        .attr("r", 5)
        .attr("fill", "red");


    simulation.on("tick", ticked);
    // d3.select("svg")
    //     .call(d3.drag()
    //         .container(svg)
    //         .subject(dragsubject)
    //         .on("start", dragstarted)
    //         .on("drag", dragged)
    //         .on("end", dragended));

    function ticked() {
        node
            .attr("cx", function (d) {
                return d.x;
            })
            .attr("cy", function (d) {
                return d.y;
            })
            .call(d3.drag()
                .subject(dragsubject)
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));;
        // update link positions
        //simply tells one end of the line to follow one node around
        //and the other end of the line to follow the other node around
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

    function drawLink(d) {
        context.moveTo(d.source.x, d.source.y);
        context.lineTo(d.target.x, d.target.y);
    }

    function drawNode(d) {
        context.moveTo(d.x + 3, d.y);
        context.arc(d.x, d.y, 3, 0, 2 * Math.PI);

        if (d.data.community_area == 1) {
            context.beginPath();
            context.fillStyle = "#fff";

        } else {
            context.fillStyle = "#ff7765";
            context.fill();
        }

    }

});