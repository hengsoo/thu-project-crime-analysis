// Helper functions
// Declare global helper functions here

// Convert Vertex_data datetime to moment object
function convertVertexDatetimeToMoment(vertex_obj) {
    for (let index in vertex_obj) {
        // skip loop if the property is from prototype
        if (!vertex_obj.hasOwnProperty(index)) continue;
        vertex_obj[index]["datetime"] = moment(vertex_obj[index]["datetime"], ["MM-DD-YY H:mm", "L LTS"]);
    }
}

// Get edges weight
function getWeight(vertex_1, vertex_2) {
    //distance from self to self is just zero
    if (vertex_1 == vertex_2) return 0;
    // swap vertex_1 and vertex_2 to ensure that vertex_1 smaller than vertex_2
    if (vertex_1 > vertex_2) {
        [vertex_1, vertex_2] = [vertex_2, vertex_1];
    }
    return edge[vertex_1][vertex_2];
}

// Get adjacent nodes
function getAdjNodes(node_no, adj_mat = edge) {
    let adj_nodes = [];

    // add last node as edge doesn't store the last one
    let node_count = adj_mat.length + 1;

    for (let i = 0; i < node_count; i++) {

        if (i === node_no) continue;
        // if weight is -1 means no edge between the two nodes
        if (getWeight(node_no, i) !== -1) {
            adj_nodes.push(i);
        }

    }
    return adj_nodes;
}

//Download a json file
function downloadContentToFileName(content, file_name, content_type) {
    //Example of usage:
    // var obj = {a:514,b:"Hello World"};
    // download(JSON.stringify(obj),"test.json")
    // A system alert box will pop up to select download destination
    // data saved in json file named test
    let anchor_element = document.createElement("a");

    let file = new Blob([content], {type: content_type});

    anchor_element.href = URL.createObjectURL(file);

    anchor_element.download = file_name;

    anchor_element.click();
}
