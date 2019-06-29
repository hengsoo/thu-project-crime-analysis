function graphData(type, data, save_to) {
    switch (type) {
        case "shortest_path":
            //Ignore cases where no paths are found
            if (data.path == "No Path") return;

            //Add nodes in the path
            for (let i = 0; i < data.path.length; i++) {
                let node = {"id": data.path[i], "data": vertex_data[data.path[i]]};
                save_to.nodes.push(node);
            }

            //Add links linking nodes after another
            for (let i = 0; i < data.path.length - 1; i++) {
                let link = {"source": data.path[i], "target": data.path[i + 1]};
                save_to.links.push(link);
            }

            break;
        case "minimum_tree_span":
            // Set nodes of community area
            vertex_data.forEach(function (element, index, array) {
                if (element.community_area == data.community_area) {
                    save_to.nodes.push({"id": index, "data": element});
                }
            });

            // Set links that consist of nodes of community area <= 10
            for (let i = 0; i < edge.length; i++) {
                for (let key in edge[i]) {
                    if (edge[i][key] !== -1 && vertex_data[key].community_area == data.community_area && vertex_data[i].community_area == data.community_area) {
                        save_to.links.push({"source": i, "target": key})
                    }
                }
            }

            break;

        case "closeness_centrality":
            let min_closeness = Infinity;
            // Add all nodes
            vertex_data.forEach(function (element, index, array) {
                // get lowest closeness

                if (element.closeness < min_closeness && element.closeness) {
                    min_closeness = element.closeness;
                    console.log(min_closeness);
                }

                save_to.nodes.push({"id": index, "data": element});
            });
            // save min closeness to vertex data GLOBAL
            console.log(min_closeness);
            vertex_data["min_closeness"] = min_closeness;
            break;

        case "betweenness_centrality":
            break;
    }
}

function nodeColoring(node, data, type) {
    switch (type) {
        case "shortest_path":
            break;
        case "minimum_tree_span":
            break;
        case "closeness_centrality":
            let closeness_color_red = 255 - 255 * (data.min_closeness/node.data.closeness);
            let closeness_color_blue = 255 - closeness_color_red;

            return "rgb(" + closeness_color_red  + ",0," + closeness_color_blue + ")";

            break;
        case "betweenness_centrality":
            break;
    }
}

function linkColoring(node, data, type) {
    switch (type) {
        case "shortest_path":
            break;
        case "minimum_tree_span":
            // Set links that consist of nodes of community area <= 10
            for (let i = 0; i < data.span.length; i++) {
                if (data.span[i].includes(node.source.id) && data.span[i].includes(node.target.id)) {
                    return "green";
                }
            }
            break;
        case "closeness_centrality":
            break;
        case "betweenness_centrality":
            break;
    }
}