$(document).ready(function () {

    // Driver code
    $("#input_start_node, #input_end_node").change(function (e) {
        let start = parseInt($("#input_start_node").val());
        let end = parseInt($("#input_end_node").val());

        // if both input area is filled and contains in vertex set
        if (start >= 0 && end >= 0 && start < vertex_data.length && end < vertex_data.length) {
            let sp = shortestPath(start, end);
            if (sp.cost === Infinity) {
                $('#shortest-path-error').text("***不存在该路径***");
            }
            else {
                $('#shortest-path-error').text("");
            }
            drawGraph("shortest_path", sp, "#shortest-path-svg");
            console.log("Shortest Path " + start + " -> " + end + ":");
            console.log("Cost: " + sp.cost);
            console.log("Path: ");
            console.log(sp.path);
        }

    }); // End of driver

});

// Given start and end, finds the shortest path using dijkstra
function shortestPath(start = 0, end = 10) {
    const MAX = Infinity;
    const node_count = edge.length + 1;

    //double security
    if (!(start >= 0 && end < vertex_data.length)) {
        console.log("start and end node error");
        //end the function
        return;
    }
    //distance to self is 
    if (start == end) {
        return {"path": [start], "cost": 0};
    }
    //initialize some array that will be used to store parent,shortest path length
    let vertices = [];
    for (let i = 0; i < node_count; i++) {
        vertices[i] = {};
        vertices[i].min_cost = MAX;
        vertices[i].parent = 0;
    }

    let q = new Queue;

    //initialize the queue with the starting node
    q.enqueue(start);
    vertices[start].parent = start;
    vertices[start].min_cost = 0;

    while (q.len > 0) //queue is not empty
    {
        let current_node = q.dequeue();
        let adj_nodes = getAdjNodes(current_node);
        if (adj_nodes.length > 0) {
            //for each nodes connected to current node
            adj_nodes.forEach((next_node) => {
                //if there is a change in shortest distance from start to next_node AND timeline is preserved
                if (vertices[current_node].min_cost + getWeight(current_node, next_node) < vertices[next_node].min_cost &&
                    vertex_data[next_node].datetime.isAfter(vertex_data[current_node].datetime)) {
                    vertices[next_node].min_cost = vertices[current_node].min_cost + getWeight(current_node, next_node);
                    //update parent on the shortest path
                    vertices[next_node].parent = current_node;
                    //add it to the queue
                    q.enqueue(next_node);
                }
            })
        }
    }
    //If path is found
    if (vertices[end].min_cost !== Infinity) {

        let steps = [];
        let parent = vertices[end].parent;

        //Because end is not considered in the assignment above, we need to add end explicitly
        steps.unshift(end);
        while (parent !== start) {
            steps.unshift(parent);
            parent = vertices[parent].parent;
        }
        //Because start is not considered when the while loop ends, so we need to add start explicitly
        steps.unshift(start);

        // Return result
        return {"path": steps, "cost": vertices[end].min_cost};
    }
    else {
        return {"path": "No Path", "cost": Infinity};
    }
}

// Custom queue constructor function
function Queue() {
    this.q = [];
    this.len = 0;
    this.enqueue = function (val) {
        this.len++;
        this.q.push(val);
    };
    this.dequeue = function () {
        this.len--;
        return this.q.shift();
    }
}