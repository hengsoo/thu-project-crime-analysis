$(document).ready(function () {
    // Driver code
    //runBetweennessCentrality();
    //End of driver
});

//This function calculates betweenness centrality for each node
//and store the result into a json file named betweenness_data
function runBetweennessCentrality()
{
    let result = [];
    for (let i = 0; i < edge.length + 1; i++) {
        result.push(betweennessCentrality(i));
    }
    downloadContentToFileName(result, "betweenness_data.json");
}

function betweennessCentrality(node) {

    const node_count = edge.length + 1; // number of nodes
    const shortest_path_count = (node_count - 1) * (node_count - 2); // total number of possible permutation of sides, nP2
    let shortest_path_count_passing_through_node = 0; // number of shortest path passing through this node

    for (let i = 0; i < node_count; i++) {
        for (let j = 0; j < node_count; j++) {

            if (i == j || node == i || node == j) continue;

            let info = shortest_paths[i][j];

            if (info.path == "No Path") continue; // 

            if (info.path.indexOf(node) >= 0) {

                shortest_path_count_passing_through_node++;

            }

        }
    }

    console.log("Total number of shortest paths passing through " + node + "th node = " + shortest_path_count_passing_through_node);
    return shortest_path_count_passing_through_node / (shortest_path_count / 2);
}
