// Helper functions

// Declare global helper function variables here
let convertVertexDatetimeToMoment;
// Get edges weight
let getWeight;

// Assign declared function variables to helper functions
$(document).ready(function () {

    convertVertexDatetimeToMoment = function (vertex_obj) {
        for (let index in vertex_obj) {
            // skip loop if the property is from prototype
            if (!vertex_obj.hasOwnProperty(index)) continue;
            vertex_obj[index]["datetime"] = moment(vertex_obj[index]["datetime"], ["MM-DD-YY H:mm", "L LTS"]);
        }
    };

    getWeight = function (vertex_1, vertex_2) {
        // swap vertex_1 and vertex_2 to ensure that vertex_1 smaller than vertex_2
        if (vertex_1 > vertex_2) {
            [vertex_1, vertex_2] = [vertex_2, vertex_1];
        }
        return edge[vertex_1][vertex_2];
    }

});

