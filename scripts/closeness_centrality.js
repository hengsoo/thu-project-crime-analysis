$(document).ready(function () {
    runClosenessCentrality();
    console.log("banana")
});

async function runClosenessCentrality(){
    let result = await closenessCentrality();
    console.log(result);
}

function closenessCentrality() {
    return new Promise(function (resolve, reject) {
        alert("asda");
        let closeness = [];
        let distance = 0;
        let num_of_nodes = vertex_data.length;
        for (let i = 0; i < num_of_nodes; i++) {
            console.log(i);
            for (let j = 0; j < num_of_nodes; j++) {
                if (i === j) {
                    continue;
                }
                distance += shortestPath(i, j).cost;
            }
            closeness.push((num_of_nodes - 1) / distance);
        }
        resolve(closeness);
    });
}

