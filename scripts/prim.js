$(document).ready(function () {

    // Driver code
    $("#input_community_area").change(function (e) {

        let community_area = parseInt($("#input_community_area").val());

        if (community_area !== 0) {

            let tree = minimum_tree_span(community_area);

            if (tree.span.length === 0) {
                $('#prim-error').text("***不存在该社区编号***");
            }
            else {
                $('#prim-error').text("");
            }

            drawGraph("minimum_tree_span", tree, "#prim-svg");
            console.log("Minimum tree span");
            console.log("Community area: " + tree.community_area);
            console.log("Weight: " + tree.weight);
            console.log("Span: ");
            console.log(tree.span);
        }

    });
    //End of driver

});

function minimum_tree_span(community_area = 1) {

    // ( tree )  <-   ( pick_set )
    let pick_set = new Set();
    let min_tree_span = [];
    let min_weight = Infinity;
    // Algorithm variables
    let adj_nodes = [];
    let tree_node, final_tree_node;
    let final_pick_node;
    let sum_of_weight = 0;

    // Add all the nodes in the community area to pick_set
    for (let i = 0; i < vertex_data.length; i++) {
        if (vertex_data[i].community_area === community_area) {
            pick_set.add(i);
        }
    }

    // delete first node from pick_set ( 1st node is set to be starting node)
    pick_set.delete(pick_set.values().next().value);

    // while pick set is not empty
    while (pick_set.size !== 0) {

        // reset min weight to infinity
        min_weight = Infinity;

        // loop through pick set
        for (let pick_node of pick_set) {

            // get adjacent nodes of pick_node
            adj_nodes = getAdjNodes(pick_node);

            // loop through pick_node's adjacent nodes
            for (let i = 0; i < adj_nodes.length; i++) {
                // adjacent node as tree node
                tree_node = adj_nodes[i];

                // if tree_node is in pick_set or tree_node is not in the community_area then skip
                if (pick_set.has(tree_node) || vertex_data[tree_node].community_area !== community_area) continue;

                // get weight of pick_node of pick_set and tree_node
                let weight = getWeight(tree_node, pick_node);

                // if weight of the edge of (tree_node)->(pick_node) is less than min_weight
                if (weight < min_weight) {
                    // set new min_weight
                    min_weight = weight;
                    final_tree_node = tree_node;
                    final_pick_node = pick_node;
                }
            }

        }

        // sum up the weight
        sum_of_weight += min_weight;

        // add edge to min_tree_span (tree_node)->(pick_node)
        min_tree_span.push([final_tree_node, final_pick_node]);

        // pop the final_picked_node from pick_set
        pick_set.delete(final_pick_node);

    }

    return {"span": min_tree_span, "weight": sum_of_weight, "community_area": community_area};
}