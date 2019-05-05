// Helper functions

// Declare global help function variables here
let convertGraphDatetimeToMoment;

// Assign declared function variables to helper functions
$(document).ready(function(){

    convertGraphDatetimeToMoment = function ( graph_obj ){
        for (let index in graph_obj) {
            // skip loop if the property is from prototype
            if (!graph_obj.hasOwnProperty(index)) continue;
            graph_obj[index]["datetime"] = moment(graph_obj[index]["datetime"], ["MM-DD-YY H:mm", "L LTS"]);
        }
    }

});

