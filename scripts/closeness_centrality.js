$(document).ready(function () {
    // Driver code
    // runClosenessCentrality();
});

async function runClosenessCentrality() {
    let result = await closenessCentrality();
    console.log(result);
    downloadContentToFileName(result, "closeness_data.json")
}

function closenessCentrality() {
    return new Promise(function (resolve, reject) {

        let closeness = [];
        let sum_of_distance = 0;
        let num_of_nodes = vertex_data.length;
        let path_cost = 0;

        for (let i = 0; i < num_of_nodes; i++) {
            console.log("Calculating node: " + i);
            sum_of_distance = 0;

            for (let j = 0; j < num_of_nodes; j++) {

                if (i === j) {
                    continue;
                }

                path_cost = shortestPath(i, j).cost;

                if (path_cost !== Infinity) {
                    sum_of_distance += path_cost;
                }

            }

            closeness.push((num_of_nodes - 1) / sum_of_distance);
        }
        resolve(closeness);
    });
}

