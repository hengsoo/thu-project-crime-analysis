// Helper functions

// Declare global help function variables here
let convertVertexDatetimeToMoment;

// Assign declared function variables to helper functions
$(document).ready(function(){

    convertVertexDatetimeToMoment = function ( vertex_obj ){
        for (let index in vertex_obj) {
            // skip loop if the property is from prototype
            if (!vertex_obj.hasOwnProperty(index)) continue;
            vertex_obj[index]["datetime"] = moment(vertex_obj[index]["datetime"], ["MM-DD-YY H:mm", "L LTS"]);
        }
    }

});

