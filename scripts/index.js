$(document).ready(function () {

    // Bootstraps input file
    $('input[type="file"]').change(function (e) {
        let fileName = e.target.files[0].name;
        $('.custom-file-label').html(fileName);
    });

    // Stat Counter For Home Page
    //-----------------------------------------------
    $('#case-counter').attr('data-to', vertex_data.length);
    $('#edge-counter').attr('data-to', edge_count);

    if ($(".stats [data-to]").length > 0) {
        $(".stats [data-to]").each(function () {
            waypoints = $(this).waypoint(function (direction) {
                countingObject = $(this.element);
                countingObject.countTo();
                this.destroy();
            }, {
                offset: '95%'
            });
        });
    }

    // Smooth Scroll
    let scroll = new SmoothScroll('a[href*="#"]:not([href*="?t="]):not([href="#"])',{
        offset:200,
    });

    // Initialize graph
    let initialize_shortest_path_data = shortestPath(1,5);
    drawGraph("shortest_path", initialize_shortest_path_data, "#shortest-path-svg");
    let initialize_minimum_tree_span_data = minimum_tree_span(1);
    drawGraph("minimum_tree_span", initialize_minimum_tree_span_data, "#prim-svg");
    drawGraph("closeness_centrality", vertex_data, "#closeness-svg");
    drawGraph("betweenness_centrality", vertex_data, "#betweenness-svg");

});