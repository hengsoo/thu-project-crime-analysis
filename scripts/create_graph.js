$(document).ready(function () {

    $('input[type="file"]').change(function (e) {
        create_vertex_data(e).then(
            function(){
                create_edge();
            }
        )
    });

    function create_vertex_data (e) {
        return new Promise(function (resolve, reject) {
            let file = $('input[type="file"]')[0].files[0];

            if (file == null) return 0;

            let reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function (e) {
                let csv_data = e.target.result;

                let result = Papa.parse(csv_data, {
                    header: true,
                    dynamicTyping: true,
                    preview: 300,
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

                // Print stringify JSON result to set default vertex_data
                // console.log(str);

                vertex_data = JSON.parse(str);
                convertVertexDatetimeToMoment(vertex_data);
                console.log("User input vertex_data loaded successfully");
                resolve('Success!');
            };

        });
    }

    function create_edge() {
        let vertex_number = Object.keys(vertex_data).length;
        console.log("Vertex Number: " + vertex_number);

        let distance_between_cases, datetime_diff, travel_velocity_between_case, case_similarity;

        // upper triangle matrix, simple graph
        for (let i = 0; i < vertex_number - 1; i++) {
            edge[i] = {};
            for (let j = i+1; j < vertex_number; j++) {
                distance_between_cases = getDistanceBetween(vertex_data[i].latitude, vertex_data[i].longitude, vertex_data[j].latitude, vertex_data[j].longitude);
                datetime_diff = vertex_data[i].datetime.diff(vertex_data[j].datetime, 'hours', true);
                travel_velocity_between_case = getTravelVelocity(distance_between_cases, datetime_diff);
                case_similarity = getCaseSimilarity(vertex_data[i], vertex_data[j]);

                // if suspect travels faster than 200km/h, forfeit edge
                if (travel_velocity_between_case > 200 || (distance_between_cases * Math.abs(datetime_diff) * case_similarity ) / 10000 > 20 ) {
                    edge[i][j] = -1;
                }
                else {
                    edge[i][j] = ( distance_between_cases * Math.abs(datetime_diff) * case_similarity ) / 10000;
                }
            }
        }

        // Print stringified edge to set default edge_data
        // console.log(JSON.stringify(edge));

        console.log("User input edge loaded successfully");
    }

    function getDistanceBetween(lat1, lon1, lat2, lon2) {
        let R = 6378.137; // Radius of earth in KM
        let dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
        let dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // kilometers
    }

    function getTravelVelocity(distance, time_spent) {
        return distance / Math.abs(time_spent);
    }

    function getCaseSimilarity(case_1, case_2) {
        if (case_1.pri_description == case_2.pri_description) {
            return 1;
        }
        else {
            return 10;
        }
    }
}); // End document ready