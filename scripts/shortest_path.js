$(document).ready(function () {
    
    //Driver
    $("#input_start_node, #input_end_node").change(function(e){
        let start = $("#input_start_node").val();
        let end = $("#input_end_node").val();

        //if both input area is filled
        if(start!=-1 && end!=-1)
        {
            //if data given is between 0 and number of nodes
            if(start>=0 && end<vertex_data.length)
            {
                shortestPath(start,end);
            }
        }

    });
    //End of driver
    
    //Custom queue function
    function Queue()
    {
        this.q = [];
        this.len = 0;
        this.enqueue = function(val)
        {
            this.len++; this.q.push(val);
        }
        this.dequeue = function()
        {
            this.len--; 
            return this.q.shift();
        }
    }

    //given start and end, finds the shortest path using dijkstra
    function shortestPath(start=0,end=10)
    {
        const MAX = Infinity;
        const node_count = edge.length+1;

        //double security
        if(!(start>=0 && end<vertex_data.length))
        {
            console.log("start and end node error");
            //end the function
            return;
        }
        //initialize some array that will be used to store parent,shortest path length
        var vertices = [];
        for(let i=0 ; i<node_count ; i++)
        {
            vertices[i] = {};
            vertices[i].shortest = MAX;
            vertices[i].parent = 0;
        }

        var q = new Queue;

        //initialize the queue with the starting node
        q.enqueue(start);
        vertices[start].parent = start;
        vertices[start].shortest = 0;

        while(q.len>0) //queue is not empty
        {
            let current_node = q.dequeue();
            let adj_nodes = getAdjNodes(current_node);
            if(adj_nodes.length>0);
            {
                //for each nodes connected to current node
                adj_nodes.forEach((next_node)=>{ 
                    //if there is a change in shortest distance from start to next_node
                    if(vertices[current_node].shortest + getWeight(current_node,next_node) < vertices[next_node].shortest)
                    {
                        vertices[next_node].shortest = vertices[current_node].shortest + getWeight(current_node,next_node);
                        //update parent on the shortest path
                        vertices[next_node].parent = current_node;
                        //add it to the queue
                        q.enqueue(next_node);
                    }
                })
            }
        }

        //gives the shortest distance from start to end
        console.log("Shortest path length: " + vertices[end].shortest) 

        //Computes the path using the parent array
        var steps = [];
        var parent = vertices[end].parent;

        //Because end is not considered in the assignment above, we need to add end explicitly
        steps.unshift(end);
        while(parent!=start)
        {
            steps.unshift(parent);
            parent = vertices[parent].parent;
        }
        //Because start is not considered when the while loop ends, so we need to add start explicitly
        steps.unshift(start);
        //Prints shortest path separated by arrow
        console.log("Shortest path: " + steps.join(" -> "));
    }
}); //end document ready