$(document).ready(function(){

    // Bootstraps input file
    $('input[type="file"]').change(function(e){
        var fileName = e.target.files[0].name;
        $('.custom-file-label').html(fileName);
    });

    // Stat Counter For Home Page
    //-----------------------------------------------
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

    // drawGraph("closeness_centrality", vertex_data, "#basic_svg");
});