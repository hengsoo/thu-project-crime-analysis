$(document).ready(function(){

    // Bootstraps input file
    $('input[type="file"]').change(function(e){
        let fileName = e.target.files[0].name;
        $('.custom-file-label').html(fileName);
    });

    // Stat Counter For Home Page
    //-----------------------------------------------
    $('#case-counter').attr('data-to', vertex_data.length);
    $('#edge-counter').attr('data-to', edge_count);

    if ($(".stats [data-to]").length>0) {
        $(".stats [data-to]").each(function() {
            waypoints = $(this).waypoint(function(direction) {
                countingObject = $(this.element);
                countingObject.countTo();
                this.destroy();
            },{
                offset: '95%'
            });
        });
    }



    drawGraph("closeness_centrality", vertex_data, "#basic_svg");
    drawGraph("betweenness_centrality", vertex_data, "#basic_svg2");
});