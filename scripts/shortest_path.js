$(document).ready(function () {
    
    //Test case
    shortestPath(2,0);
    shortestPath(0,2);
    //End of test case
    
    //Custom queue function
    function Queue()
    {
    this.q = [];
    this.len = 0;
    this.enqueue = function(val){this.len++; this.q.push(val);}
    this.dequeue = function(){this.len--; return this.q.shift()}
    }

    //given start and end, finds the shortest path using dijkstra
    function shortestPath(start=0,end=10)
    {
        const MAX = Infinity;
        const node_count = edge.length+1;

        //initialize some array that will be used to store parent,shortest path length
        var shortest = (new Array(node_count)).fill(MAX);
        var parent = (new Array(node_count)).map((v,index)=>{return index+1});

        var q = new Queue;

        //initialize the queue with the starting node
        q.enqueue(start);
        parent[start] = start;
        shortest[start] = 0;

        while(q.len>0) //queue is not empty
        {
            let current_node = q.dequeue();
            let adj_nodes = getAdjNodes(current_node);
            if(adj_nodes.length>0);
            {
                //for each nodes connected to current node
                adj_nodes.forEach((next_node)=>{ 
                //if there is a change in shortest distance from start to next_node
                if(shortest[current_node]+getWeight(current_node,next_node) < shortest[next_node])
                {
                    shortest[next_node] = shortest[current_node]+getWeight(current_node,next_node);
                    //update parent on the shortest path
                    parent[next_node] = current_node;
                    //add it to the queue
                    q.enqueue(next_node);
                }
                })
            }
        }

        console.log("Shortest path length: " + shortest[end]) //gives the shortest distance from start to end

        //Computes the path using the parent array
        var steps = [];
        var paren = parent[end];
        //Because end is not considered in the assignment above, we need to add end explicitly
        steps.unshift(end);
        while(paren!=start)
        {
            steps.unshift(paren);
            //console.log(`From node ${paren} to ${parent[paren]} has weight ${getWeight(paren,parent[paren])}`)
            paren = parent[paren];
        }
        //Because start is not considered when the while loop ends, so we need to add start explicitly
        steps.unshift(start);
        //Prints shortest path separated by arrow
        console.log("Shortest path: " + steps.join(" -> "));
    }
}); //end document ready