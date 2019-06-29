$(document).ready(function(){

    // Bootstraps input file
    $('input[type="file"]').change(function(e){
        var fileName = e.target.files[0].name;
        $('.custom-file-label').html(fileName);
    });

    drawGraph("closeness_centrality", vertex_data);
});