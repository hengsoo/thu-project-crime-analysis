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

                // if vertex date is latest date, hence no shortest path
                // with regards to datetime order
                if (element.closeness === null) {
                    return;
                }
                // get lowest closeness
                if (element.closeness < min_closeness && element.closeness) {
                    min_closeness = element.closeness;
                }

                save_to.nodes.push({"id": index, "data": element});
            });
            // save min closeness to vertex data GLOBAL
            centrality_global_extremum["min_closeness"] = min_closeness;
            console.log("MIN CC: " + min_closeness);

            break;

        case "betweenness_centrality":
            let max_betweenness = -1;
            // Add all nodes
            vertex_data.forEach(function (element, index, array) {
                // get lowest closeness
                if (element.betweenness > max_betweenness && element.betweenness) {

                    max_betweenness = element.betweenness;
                }
                save_to.nodes.push({"id": index, "data": element});
            });

            console.log("MAX BC: " + max_betweenness);
            centrality_global_extremum["max_betweenness"] = max_betweenness;
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
            let closeness_color_blue = 255 - 255 * (centrality_global_extremum.min_closeness / node.data.closeness);
            let closeness_color_red = 255 - closeness_color_blue * 1.5;
            return "rgb(" + closeness_color_red + ",0," + closeness_color_blue + ")";

        case "betweenness_centrality":
            let betweenness_color_red = 255 * (node.data.betweenness / centrality_global_extremum.max_betweenness);
            let betweenness_color_blue = (255 - betweenness_color_red) * 0.5;
            return "rgb(" + betweenness_color_red + ",0," + betweenness_color_blue + ")";
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