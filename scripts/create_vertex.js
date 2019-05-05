$(document).ready(function () {

    $('input[type="file"]').change(function (e) {
        let file = $('input[type="file"]')[0].files[0];

        if (file == null) return 0;

        let reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(e) {
            let csv_data = e.target.result;

            let result = Papa.parse(csv_data, {
                header: true,
                dynamicTyping: true,
                preview: 2500,
            });

            let str = JSON.stringify(result.data);
            str = str.replace(/CASE#/gi, "case_id");
            str = str.replace(/DATE\s\sOF\sOCCURRENCE/gi, "datetime");
            str = str.replace(/LATITUDE/gi, "latitude");
            str = str.replace(/LONGITUDE/gi, "longitude");
            str = str.replace(/\sLOCATION\sDESCRIPTION/gi, "location_description");
            str = str.replace(/Community\sAreas/gi, "community_area");
            str = str.replace(/BLOCK/gi, "block_address");
            str = str.replace(/\sPRIMARY\sDESCRIPTION/gi, "pri_description");
            str = str.replace(/\sSECONDARY\sDESCRIPTION/gi, "sec_description");

            vertex_data = JSON.parse(str);

            convertVertexDatetimeToMoment(vertex_data);
            console.log("User input data loaded successfully");
        };

    });


}); // End document ready