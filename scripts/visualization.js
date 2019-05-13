$(document).ready(function () {

    let result = {};
    result.nodes = [];
    result.links = [];

    vertex_data.forEach(function (element, index, array) {
        result.nodes.push({"id": index});
    });


    for (let i = 0; i < edge.length; i++) {
        for (let key in edge[i]) {
            if (edge[i][key] !== -1 && vertex_data[key].community_area < 10 && vertex_data[i].community_area < 10) {
                result.links.push({"source": i, "target": key})
            }
        }
    }

    console.log(JSON.stringify(result));

    // Select canvas
    let canvas = $("canvas").get(0),
        context = canvas.getContext("2d"),
        width = canvas.width,
        height = canvas.height;

    let simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function (d) {
            return d.id;
        }).distance(300) )
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2));


    simulation
        .nodes(result.nodes)
        .on("tick", ticked);

    simulation.force("link")
        .links(result.links)
    ;

    d3.select(canvas)
        .call(d3.drag()
            .container(canvas)
            .subject(dragsubject)
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    function ticked() {
        context.clearRect(0, 0, width, height);

        context.beginPath();
        result.links.forEach(drawLink);
        context.strokeStyle = "#1e31aa";
        context.stroke();

        context.beginPath();
        result.nodes.forEach(drawNode);

        context.fill();
        context.stroke();
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
        // console.log(d);
        context.arc(d.x, d.y, 3, 0, 2 * Math.PI);
        if (d.id == 81) {
            context.fillStyle = "#fff";
            // console.log("asd")
        } else {
            context.fillStyle = "#ff7765";
        }

    }

});